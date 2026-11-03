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
import { parseArgs } from 'node:util';
import { c, fail, installCrashHandler, printBanner } from './lib/cli-utils.mjs';
import { findComponent, loadComponents, NO_TABLE, P, STATUS_FILE } from './lib/components.mjs';

installCrashHandler('pnpm parity');
printBanner('Parity: every component in every layer');

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

let args;
let positionals;
try {
  ({ values: args, positionals } = parseArgs({ allowPositionals: true, options: { tests: { type: 'boolean' } } }));
} catch (err) {
  /* Node's hint ("place it after '--'") would pass the flag on as a name. */
  fail({ what: err.message.replace(/\. To specify.*$/s, ''), fix: 'pnpm parity [component] [--tests]' });
  process.exit(1);
}
const listTests = Boolean(args.tests);
/* The same lookup as pnpm where and pnpm test ("PasswordInput", "<tilburg-tooltip>", "heading-1"); a name that fits
   several components (pnpm parity form) checks them all. A name that is given but empty is not "everything". */
const filter = positionals.join(' ').trim();
if (positionals.length && !filter) {
  fail({ what: 'The component name is empty', fix: 'pnpm parity <component>, or pnpm parity for everything' });
  process.exit(1);
}
const found = filter ? findComponent(filter) : null;
const wanted = found?.component ? [found.component] : (found?.matches ?? []);
if (found && !wanted.length) {
  const close = found.suggestions;
  fail({
    what: `No component matches "${filter}"`,
    why: close.length ? `Did you mean ${close.map((component) => component.name).join(', ')}?` : undefined,
    fix: close.length ? `pnpm parity ${close[0].slug}` : 'pnpm where --list shows every component',
  });
  process.exit(1);
}
const selected = filter ? rows.filter((row) => wanted.some((component) => component.slug === row.slug)) : rows;
/* Nothing selected would report "0 components, every layer is there": parity that was never checked. */
if (!selected.length) {
  fail({
    what: filter ? `No component matches "${filter}"` : 'No components found',
    why: filter ? `${STATUS_FILE} has no row for it.` : NO_TABLE,
    fix: 'pnpm where --list shows every component',
  });
  process.exit(1);
}

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
    `components-react/src/${row.reactTest ?? row.react}.test.tsx`,
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
/* Only a folder with its main file: a branch switch leaves a removed component's folder behind with a .DS_Store. */
const orphan = (dir, label, main) =>
  existsSync(P(dir))
    ? readdirSync(P(dir), { withFileTypes: true })
        .filter(
          (entry) => entry.isDirectory() && !helpers.has(entry.name) && !/^(heading-[2-6]|table-.+)$/.test(entry.name),
        )
        .filter((entry) => !known.has(entry.name) && existsSync(P(dir, entry.name, main)))
        .map((entry) => ({
          row: { name: entry.name },
          text: `${label} has packages/${dir}/${entry.name}, but ${STATUS_FILE} has no row for it`,
        }))
    : [];
/* A story file whose row is gone: Storybook would still show it. */
const orphanStories = (dir) =>
  existsSync(P(dir))
    ? readdirSync(P(dir))
        .map((file) => [file, file.match(/^tilburg-(.+?)(-react|-wbc|-html)?\.stories\.tsx?$/)?.[1]])
        .filter(([, slug]) => slug && !slug.startsWith('tokens-') && !known.has(slug))
        .map(([file, slug]) => ({
          row: { name: slug },
          text: `has packages/${dir}/${file}, but ${STATUS_FILE} has no row for it`,
        }))
    : [];
if (!filter) {
  problems.push(
    ...orphan('components-css', 'HTML/CSS', 'index.scss'),
    ...orphan('components-angular/src', 'Angular', 'component.ts'),
    ...orphan('web-components-stencil/src', 'Web Components', 'component.tsx'),
    ...orphanStories('storybook/src'),
    ...orphanStories('storybook-angular/src'),
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
