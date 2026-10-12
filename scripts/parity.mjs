/* `pnpm parity [name]`: is every component complete in every layer? Reads the table in
   storybook-shared/src/documentation/implementation-status.md (what we promise) and checks it against the files:

     HTML/CSS  components-css/<name>/index.scss and the shared examples (storybook-shared/src/tilburg-<name>.examples.ts)
     React     components-react/src/<Name>.tsx, exported from index.ts, with <Name>.test.tsx
     Angular   components-angular/src/<name>/component.ts, in components.ts, with component.spec.ts
     Web Comp. web-components-stencil/src/<name>/component.tsx, with component.spec.tsx
     Stories   one story file per layer in each Storybook
     Docs      an .mdx docs page (only some components have one: shown, not required)

   and the other way round: a component with files but no row in the table. Exits 1 on ❌ (the table and the files
   disagree, or a layer misses a file), not on missing tests: the Tests column counts them, `--tests` lists them. */
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { ROOT } from './dev-config.mjs';
import { c, installCrashHandler, printBanner } from './lib/cli-utils.mjs';
import { loadComponents, STATUS_FILE } from './lib/components.mjs';

installCrashHandler('pnpm parity');
printBanner('Parity: every component in every layer');

const P = (...parts) => resolve(ROOT, 'packages', ...parts);
const read = (path) => (existsSync(path) ? readFileSync(path, 'utf8') : '');

// ─── The promise: the table (through the shared component lookup) ────────────

const rows = loadComponents().map(({ name, slug, names, layers }) => ({
  name,
  slug,
  promise: {
    css: layers.html.promised ? '✅' : layers.html.utrecht ? 'utrecht' : '—',
    react: layers.react.promised,
    angular: layers.angular.promised,
    wbc: layers.wbc.promised,
  },
  ...names,
}));

const listTests = process.argv.includes('--tests');
const filter = process.argv
  .slice(2)
  .find((arg) => !arg.startsWith('-'))
  ?.toLowerCase();
const selected = filter
  ? rows.filter((row) => row.slug.includes(filter) || row.name.toLowerCase().includes(filter))
  : rows;

// ─── The facts: the files ────────────────────────────────────────────────────

const reactIndex = read(P('components-react/src/index.ts'));
const angularIndex = read(P('components-angular/src/components.ts'));
const problems = [];
const warnings = [];
const missing = (row, what, path) => problems.push({ row, text: `${what}: ${path} is missing` });

function checkRow(row) {
  const cells = {};
  const file = (path) => existsSync(P(path));

  /* HTML/CSS: `✅` means a Tilburg layer on top of utrecht, `utrecht` means the utrecht base is enough. */
  const cssPath = `components-css/${row.css}/index.scss`;
  if (row.promise.css === '✅') {
    cells.css = file(cssPath);
    if (!cells.css) missing(row, 'HTML/CSS', `packages/${cssPath}`);
  } else {
    cells.css = 'utrecht';
    if (file(cssPath))
      problems.push({ row, text: `the table says "utrecht", but packages/${cssPath} exists: mark it ✅` });
  }
  const examples = `storybook-shared/src/tilburg-${row.slug}.examples.ts`;
  if (!file(examples)) missing(row, 'shared HTML examples', `packages/${examples}`);

  cells.tests = [0, 0];
  const layer = (key, label, mainPath, registered, registeredWhere, testPath) => {
    const exists = file(mainPath);
    if (row.promise[key] && exists) {
      cells.tests[1]++;
      if (file(testPath)) cells.tests[0]++;
    }
    if (row.promise[key]) {
      cells[key] = exists && registered;
      if (!exists) missing(row, label, `packages/${mainPath}`);
      else if (!registered) problems.push({ row, text: `${label}: not exported from ${registeredWhere}` });
      else if (!file(testPath)) warnings.push({ row, text: `${label}: no test (packages/${testPath})` });
    } else {
      cells[key] = null;
      if (exists)
        problems.push({ row, text: `the table says ${label} "—", but packages/${mainPath} exists: mark it ✅` });
    }
  };
  layer(
    'react',
    'React',
    `components-react/src/${row.react}.tsx`,
    reactIndex.includes(`from './${row.react}'`),
    'components-react/src/index.ts',
    `components-react/src/${row.react}.test.tsx`,
  );
  layer(
    'angular',
    'Angular',
    `components-angular/src/${row.angular}/component.ts`,
    angularIndex.includes(`./${row.angular}/component'`),
    'components-angular/src/components.ts',
    `components-angular/src/${row.angular}/component.spec.ts`,
  );
  layer(
    'wbc',
    'Web Component',
    `web-components-stencil/src/${row.wbc}/component.tsx`,
    true,
    '',
    `web-components-stencil/src/${row.wbc}/component.spec.tsx`,
  );

  /* One story file per layer that exists, in the Storybook that shows that layer. */
  const stories = [
    [`storybook/src/tilburg-${row.slug}.stories.tsx`, true],
    [`storybook-angular/src/tilburg-${row.slug}-html.stories.ts`, true],
    [`storybook/src/tilburg-${row.slug}-react.stories.tsx`, row.promise.react],
    [`storybook/src/tilburg-${row.slug}-wbc.stories.tsx`, row.promise.wbc],
    [`storybook-angular/src/tilburg-${row.slug}.stories.ts`, row.promise.angular],
  ].filter(([, needed]) => needed);
  const missingStories = stories.filter(([path]) => !file(path));
  missingStories.forEach(([path]) => missing(row, 'story', `packages/${path}`));
  cells.stories = `${stories.length - missingStories.length}/${stories.length}`;
  cells.storiesOk = missingStories.length === 0;

  cells.docs = file(`storybook/src/tilburg-${row.slug}.mdx`) || file(`storybook/src/tilburg-${row.slug}-react.mdx`);
  return cells;
}

/* The other way round: a component folder in a layer without a row in the table. */
const known = new Set(rows.flatMap((row) => [row.slug, row.css, row.angular, row.wbc]));
const helpers = new Set(['utils', 'announce', 'tokens', 'node_modules']);
const orphan = (dir, label) =>
  existsSync(P(dir))
    ? readdirSync(P(dir), { withFileTypes: true })
        .filter(
          (entry) => entry.isDirectory() && !helpers.has(entry.name) && !/^(heading-[2-6]|table-.+)$/.test(entry.name),
        )
        .filter((entry) => !known.has(entry.name))
        .map((entry) => ({
          row: { name: entry.name },
          text: `${label} has packages/${dir}/${entry.name}, but ${STATUS_FILE} has no row for it`,
        }))
    : [];
if (!filter) {
  problems.push(
    ...orphan('components-css', 'HTML/CSS'),
    ...orphan('components-angular/src', 'Angular'),
    ...orphan('web-components-stencil/src', 'Web Components'),
  );
}

// ─── Report ──────────────────────────────────────────────────────────────────

const mark = (value) =>
  value === null
    ? `${c.gray}—${c.reset}`
    : value === 'utrecht'
      ? `${c.gray}u${c.reset}`
      : value
        ? `${c.green}✓${c.reset}`
        : `${c.red}✗${c.reset}`;
const width = Math.max('Component'.length, ...selected.map((row) => row.name.length)) + 2;
console.log(`  ${c.bold}${'Component'.padEnd(width)}CSS  React  Angular  WC   Stories  Tests  Docs${c.reset}`);
for (const row of selected) {
  const cells = checkRow(row);
  const hasProblem = problems.some((problem) => problem.row === row);
  const name = hasProblem ? `${c.red}${row.name.padEnd(width)}${c.reset}` : row.name.padEnd(width);
  const stories = cells.storiesOk ? cells.stories.padEnd(7) : `${c.red}${cells.stories.padEnd(7)}${c.reset}`;
  const [tested, testable] = cells.tests;
  const testsText = `${tested}/${testable}`.padEnd(5);
  const tests = tested === testable ? testsText : `${c.yellow}${testsText}${c.reset}`;
  console.log(
    `  ${name}${mark(cells.css)}    ${mark(cells.react)}      ${mark(cells.angular)}        ${mark(cells.wbc)}    ${stories}  ${tests}  ${cells.docs ? `${c.green}✓${c.reset}` : `${c.gray}·${c.reset}`}`,
  );
}
console.log(
  `\n  ${c.gray}✓ complete   ✗ missing   — no wrapper (on purpose, per the table)   u utrecht base only   · no docs page yet${c.reset}\n`,
);

for (const { row, text } of problems) console.log(`  ❌  ${c.bold}${row.name}${c.reset}  ${text}`);
if (listTests) for (const { row, text } of warnings) console.log(`  ⚠️   ${c.bold}${row.name}${c.reset}  ${text}`);
if (problems.length || (listTests && warnings.length)) console.log('');

if (problems.length) {
  console.log(
    `  ${c.red}${problems.length} problem${problems.length === 1 ? '' : 's'}.${c.reset} ${c.gray}Add the file, or fix the row in ${STATUS_FILE}.${c.reset}\n`,
  );
  process.exit(1);
}
console.log(
  `  ${c.green}${selected.length} component${selected.length === 1 ? '' : 's'}, every layer the table promises is there.${c.reset}${warnings.length ? ` ${c.yellow}${warnings.length} layers have no test${c.reset}${listTests ? '' : ` ${c.gray}(pnpm parity --tests lists them)${c.reset}`}.` : ''}\n`,
);
