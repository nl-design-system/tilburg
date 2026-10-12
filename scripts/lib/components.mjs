/* Every component and where it lives, in every layer: one lookup for `pnpm where`, `pnpm dev <name>`, `pnpm test <name>`
   and `pnpm parity`. The list comes from the table in implementation-status.md (what we promise); the paths follow the
   naming conventions, and the Storybook ids are read from the story files themselves. */
import { existsSync, readFileSync } from 'node:fs';
import { relative, resolve } from 'node:path';
import { ROOT } from '../dev-config.mjs';

export const STATUS_FILE = 'packages/storybook-shared/src/documentation/implementation-status.md';
const P = (...parts) => resolve(ROOT, 'packages', ...parts);

/** The online Storybooks (GitHub Pages, from main): the React one at the root, the Angular one under angular/. */
export const SITE = {
  react: 'https://nl-design-system.github.io/tilburg/',
  angular: 'https://nl-design-system.github.io/tilburg/angular/',
};

/* Names that do not follow "Form Label" → form-label / FormLabel. */
const EXCEPTIONS = {
  heading: { css: 'heading-1', react: 'Heading1', angular: 'heading-1', wbc: 'heading-1' },
  'form-fieldset': { react: 'Fieldset' },
};

export const kebab = (text) =>
  text
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
const pascal = (slug) => slug.replace(/(^|-)(\w)/g, (_, __, letter) => letter.toUpperCase());

/** A story file's meta: its id (for the URL) and whether it carries the `tilburg` (TLB) tag. */
function storyMeta(path) {
  if (!existsSync(path)) return null;
  const source = readFileSync(path, 'utf8');
  const id = source.match(/^\s*id:\s*['"]([^'"]+)['"]/m)?.[1] ?? null;
  const tags = source.match(/^\s*tags:\s*\[([^\]]*)\]/m)?.[1] ?? '';
  return { path, id, tlb: /['"]tilburg['"]/.test(tags) };
}

/**
 * Every row of the implementation-status table, with its files. `layers` lists, per layer, whether the table
 * promises it (`promised`), the main file, its test, and the story (with its Storybook id) that shows it.
 */
export function loadComponents() {
  const table = existsSync(resolve(ROOT, STATUS_FILE)) ? readFileSync(resolve(ROOT, STATUS_FILE), 'utf8') : '';
  return table
    .split('\n')
    .filter((line) => /^\| [A-Z]/.test(line) && !line.startsWith('| Component'))
    .map((line) => {
      const [name, css, react, angular, wbc] = line
        .split('|')
        .slice(1, 6)
        .map((cell) => cell.trim());
      const slug = kebab(name);
      const names = { css: slug, react: pascal(slug), angular: slug, wbc: slug, ...EXCEPTIONS[slug] };
      const story = (storybook, suffix) =>
        storyMeta(P(storybook, 'src', `tilburg-${slug}${suffix}.stories.${storybook === 'storybook' ? 'tsx' : 'ts'}`));
      return {
        name,
        slug,
        names,
        examples: P('storybook-shared/src', `tilburg-${slug}.examples.ts`),
        guidance: P('storybook-shared/src/documentation/components', `${slug}.md`),
        layers: {
          html: {
            label: 'HTML/CSS',
            promised: css === '✅',
            utrecht: css === 'utrecht',
            main: P('components-css', names.css, 'index.scss'),
            script: P('components-css', names.css, 'index.js'),
            stories: [story('storybook', ''), story('storybook-angular', '-html')],
          },
          react: {
            label: 'React',
            promised: react === '✅',
            main: P('components-react/src', `${names.react}.tsx`),
            test: P('components-react/src', `${names.react}.test.tsx`),
            exported: () =>
              readFileSync(P('components-react/src/index.ts'), 'utf8').includes(`from './${names.react}'`),
            stories: [story('storybook', '-react')],
          },
          angular: {
            label: 'Angular',
            promised: angular === '✅',
            main: P('components-angular/src', names.angular, 'component.ts'),
            test: P('components-angular/src', names.angular, 'component.spec.ts'),
            exported: () =>
              readFileSync(P('components-angular/src/components.ts'), 'utf8').includes(`./${names.angular}/component'`),
            stories: [story('storybook-angular', '')],
          },
          wbc: {
            label: 'Web Component',
            promised: wbc === '✅',
            main: P('web-components-stencil/src', names.wbc, 'component.tsx'),
            test: P('web-components-stencil/src', names.wbc, 'component.spec.tsx'),
            exported: () => true,
            stories: [story('storybook', '-wbc')],
          },
        },
      };
    });
}

/** Is it a Tilburg-only (TLB) component? Its stories carry the `tilburg` tag. */
export const isTlb = (component) =>
  Object.values(component.layers).some((layer) => layer.stories.some((story) => story?.tlb));

/** Levenshtein distance, for "did you mean". */
function distance(a, b) {
  const row = Array.from({ length: b.length + 1 }, (_, index) => index);
  for (let i = 1; i <= a.length; i++) {
    let previous = row[0];
    row[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const current = row[j];
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, previous + (a[i - 1] === b[j - 1] ? 0 : 1));
      previous = current;
    }
  }
  return row[b.length];
}

/**
 * Find a component by any of its names: "tooltip", "Tooltip", "password input", "PasswordInput", "tilburg-wbc-tooltip",
 * "<tilburg-tooltip>", "fieldset". Returns { component } on one match, { matches } when several fit, or
 * { suggestions } (closest names) when none does.
 */
export function findComponent(query, components = loadComponents()) {
  const wanted = kebab(String(query).replace(/^<|>$/g, '')).replace(/^tilburg-(wbc-)?/, '');
  if (!wanted) return { suggestions: [] };
  const keys = (component) => [
    component.slug,
    kebab(component.name),
    kebab(component.names.react),
    component.names.angular,
    component.names.wbc,
  ];
  const exact = components.filter((component) => keys(component).includes(wanted));
  if (exact.length === 1) return { component: exact[0] };
  const partial = components.filter((component) => keys(component).some((key) => key.includes(wanted)));
  if (partial.length === 1) return { component: partial[0] };
  if (partial.length > 1) return { matches: partial };
  const suggestions = components
    .map((component) => ({ component, score: Math.min(...keys(component).map((key) => distance(wanted, key))) }))
    .filter(({ score }) => score <= Math.max(2, Math.floor(wanted.length / 3)))
    .sort((a, b) => a.score - b.score)
    .slice(0, 3)
    .map(({ component }) => component);
  return { suggestions };
}

/** The Storybook URL of a story id: its docs page, on a local port or online. */
export const storyUrl = (base, id) => `${base.replace(/\/?$/, '/')}?path=/docs/${id}--docs`;

/** A path relative to the repository, for display. */
export const rel = (path) => relative(ROOT, path);

/**
 * For the scripts that take a component name: the component, or an explanation and exit 1. Lists the candidates when
 * the name fits several, or the closest names when it fits none.
 */
export async function requireComponent(query, command) {
  const { c, fail } = await import('./cli-utils.mjs');
  const components = loadComponents();
  if (!components.length) {
    fail({ what: 'No components found', why: `${STATUS_FILE} has no component table (or is missing).` });
    process.exit(1);
  }
  const { component, matches, suggestions } = findComponent(query, components);
  if (component) return component;
  if (matches) {
    fail({
      what: `"${query}" fits ${matches.length} components`,
      fix: matches.map((match) => `${command} ${match.slug}`).join('   '),
    });
  } else {
    fail({
      what: `No component called "${query}"`,
      why: suggestions.length ? `Did you mean ${suggestions.map((match) => match.name).join(', ')}?` : undefined,
      fix: suggestions.length ? `${command} ${suggestions[0].slug}` : 'pnpm where --list shows every component',
    });
  }
  console.log(`  ${c.gray}Names come from ${STATUS_FILE}.${c.reset}\n`);
  process.exit(1);
}
