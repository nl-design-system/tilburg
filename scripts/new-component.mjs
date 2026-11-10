/* `pnpm new <naam> [--html <markup of bestand>] [--tlb]`: every file a component needs in every layer, with the
   registrations, so `pnpm parity <naam>` is green from the first minute and `pnpm dev <naam>` shows it with the
   "Gebruik" dialog filled. The HTML/CSS layer is leading: give the reference markup (a snippet or a file with one root
   element) and the React, Angular and Web Component templates are derived from it (scripts/lib/markup.mjs); without
   it the component is a `<div class="utrecht-<naam>">` with its content. Everything that is design work is marked
   TODO. `--tlb` makes it a Tilburg-only component (class `tilburg-<naam>`, the TLB badge in the sidebar).

   Generated: components-css/<naam>/index.scss · storybook-shared/src/tilburg-<naam>.examples.ts · the five stories ·
   components-react/src/<Naam>.tsx + test · components-angular/src/<naam>/ (five files) · web-components-stencil/src/
   <naam>/ (three files) · a changeset. Registered in: components-react/src/index.ts, components-angular/src/
   components.ts and index.module.ts, the implementation-status table, storybook/config/preview.tsx and
   storybook-angular/src/styles.scss. */
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { ROOT } from './dev-config.mjs';
import { c, cmd, exitWith, hint, installCrashHandler, parseArgsOrExit, printBanner } from './lib/cli-utils.mjs';
import { P, pascal as pascalCase, rel as show, STATUS_FILE } from './lib/components.mjs';
import { angularTemplate, indent, parseRoot, reactTemplate, stencilTemplate } from './lib/markup.mjs';

installCrashHandler('pnpm new');
const USAGE = 'pnpm new <naam> [--html <markup of bestand>] [--tlb]   (naam in kebab-case: button-group)';
const {
  values: { html: htmlOption, tlb = false },
  positionals,
} = parseArgsOrExit({ allowPositionals: true, options: { html: { type: 'string' }, tlb: { type: 'boolean' } } }, USAGE);

const slug = positionals.join('-').trim().toLowerCase();
if (!/^[a-z][a-z0-9]*(-[a-z0-9]+)*$/.test(slug))
  exitWith({
    what: `"${positionals.join(' ')}" is not a component name`,
    why: 'kebab-case only: button-group',
    fix: USAGE,
  });

const pascal = pascalCase(slug);
const title = slug.replace(/(^|-)(\w)/g, (_all, _dash, letter) => ` ${letter.toUpperCase()}`).trim();
const own = `${tlb ? 'tilburg' : 'utrecht'}-${slug}`;

/* The reference markup: given (a file, or the markup itself), or the plainest element that carries the class. */
const given = htmlOption && (existsSync(htmlOption) ? readFileSync(htmlOption, 'utf8') : htmlOption);
const markup = (given || `<div class="${own}">Inhoud</div>`).trim();
let root;
try {
  root = parseRoot(markup);
} catch (err) {
  exitWith({ what: 'That HTML is not one element', why: err.message, fix: USAGE });
}
const { tag } = root;
/* The class the CSS rule and the tests look for: the root's first class, else the component's own. */
const cls = (root.attrs.find(([name]) => name === 'class')?.[1] ?? own).split(/\s+/)[0];
/* Markup with content of its own is rendered as it is; without, the wrappers take children. */
const slot = !root.void && !root.hasElements;
const usage = {
  react: slot ? `<${pascal}>Inhoud</${pascal}>` : `<${pascal} />`,
  angular: slot ? `<tilburg-${slug}>Inhoud</tilburg-${slug}>` : `<tilburg-${slug}></tilburg-${slug}>`,
  wbc: slot ? `<tilburg-wbc-${slug}>Inhoud</tilburg-wbc-${slug}>` : `<tilburg-wbc-${slug}></tilburg-wbc-${slug}>`,
  wbcReact: slot ? `<TilburgWbc${pascal}>Inhoud</TilburgWbc${pascal}>` : `<TilburgWbc${pascal} />`,
};

/* The DOM type of the element, for React's ref. */
const ELEMENTS = {
  a: 'HTMLAnchorElement',
  button: 'HTMLButtonElement',
  div: 'HTMLDivElement',
  hr: 'HTMLHRElement',
  li: 'HTMLLIElement',
  ol: 'HTMLOListElement',
  p: 'HTMLParagraphElement',
  span: 'HTMLSpanElement',
  table: 'HTMLTableElement',
  ul: 'HTMLUListElement',
};
const element = ELEMENTS[tag] ?? 'HTMLElement';
/* Text that lands inside a template literal of the generated TypeScript. */
const tpl = (text) => text.replace(/[`$\\]/g, (char) => `\\${char}`);
const tags = `['autodocs'${tlb ? ", 'tilburg'" : ''}]`;
/* Spelled through a variable so scripts/wiring.test.mjs does not take the template's import for one of ours. */
const examplesFrom = `../../storybook-shared/src/tilburg-${slug}.examples`;

const files = {
  [P('components-css', slug, 'index.scss')]: `/* ${title}: TODO what it is for. ${
    tlb ? 'A Tilburg component without a Utrecht base.' : `Tilburg layer over Utrecht's \`.${cls}\`.`
  }
   Colours and sizes come from the design tokens (var(--tilburg-…)); see components-css/README.md. */
.${cls} {
  display: block; /* TODO */
}
`,

  [P('storybook-shared/src', `tilburg-${slug}.examples.ts`)]: `/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg ${slug}. Imported by both Storybooks, so the HTML lives in one
   place; the usage sections below feed the docs pages and the "Gebruik" dialog. */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2F${slug}';

const intro = \`TODO: one paragraph on what the ${title} is for and when to use it.\`;

const usageAngular = \`### Angular

\\\`\\\`\\\`html
${usage.angular}
\\\`\\\`\\\`

Inputs: TODO.\`;

const usageReact = \`### React

\\\`\\\`\\\`tsx
import { ${pascal} } from '@gemeente-tilburg/components-react';

export function Voorbeeld() {
  return ${usage.react};
}
\\\`\\\`\\\`

Props: TODO, plus any standard \\\`<${tag}>\\\` attribute (\\\`className\\\` is merged after \\\`${cls}\\\`). The \\\`ref\\\` is forwarded to the \\\`<${tag}>\\\`.\`;

const usagePlainHtml = \`### Plain HTML / CSS

\\\`\\\`\\\`html
${tpl(markup)}
\\\`\\\`\\\`\`;

const usageWebComponents = \`### Web Components (Stencil)

\\\`\\\`\\\`html
${usage.wbc}
\\\`\\\`\\\`

Attributes: TODO.${slot ? ' Slot: the content.' : ''}\`;

export const description = \`\${intro}

## Usage

\${usageAngular}

\${usagePlainHtml}
\`;

export const descriptionReact = \`\${intro}

## Usage

\${usageReact}

\${usagePlainHtml}
\`;

export const descriptionWebComponents = \`\${intro}

## Usage

\${usageWebComponents}

\${usagePlainHtml}
\`;

export const descriptionHtml = \`\${intro}

## Usage

\${usagePlainHtml}
\`;

export interface Example {
  name: string;
  html: string;
}

export const examples = {
  default: {
    name: 'Default',
    html: \`${tpl(markup)}\`,
  },
} satisfies Record<string, Example>;
`,

  [P('storybook/src', `tilburg-${slug}.stories.tsx`)]: `/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionHtml, examples } from '${examplesFrom}';

/* Thin React wrapper around the shared HTML/CSS reference markup (\`storybook-shared/src/tilburg-${slug}.examples.ts\`);
   the Angular Storybook's \`tilburg-${slug}-html.stories.ts\` consumes the same source. */

const meta = {
  title: 'Tilburg HTML/${title}',
  id: 'tilburg-${slug}',
  tags: ${tags},
  parameters: {
    bugs,
    docs: { description: { component: descriptionHtml } },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const HtmlExample = ({ html }: { html: string }) => <div dangerouslySetInnerHTML={{ __html: html }} />;

export const Default: Story = {
  name: examples.default.name,
  render: () => <HtmlExample html={examples.default.html} />,
};
`,

  [P('storybook/src', `tilburg-${slug}-react.stories.tsx`)]: `/* @license CC0-1.0 */

import { ${pascal} } from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionReact } from '${examplesFrom}';

const meta = {
  title: 'Tilburg React/${title}',
  id: 'tilburg-${slug}-react',
  component: ${pascal},
  tags: ${tags},
  parameters: {
    bugs,
    docs: { description: { component: descriptionReact } },
  },
} satisfies Meta<typeof ${pascal}>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => ${usage.react},
};
`,

  [P('storybook/src', `tilburg-${slug}-wbc.stories.tsx`)]: `/* @license CC0-1.0 */

import { TilburgWbc${pascal} } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionWebComponents } from '${examplesFrom}';

/* Stencil \`<tilburg-wbc-${slug}>\` rendered through its generated React proxy (built by web-components-react). */

const meta = {
  title: 'Tilburg Web Components/${title}',
  id: 'tilburg-${slug}-wbc',
  component: TilburgWbc${pascal},
  tags: ${tags},
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWbc${pascal}>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => ${usage.wbcReact},
};
`,

  [P('storybook-angular/src', `tilburg-${slug}-html.stories.ts`)]: `/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, descriptionHtml, examples } from '${examplesFrom}';

/* Thin Angular wrapper around the shared HTML/CSS reference markup (\`storybook-shared/src/tilburg-${slug}.examples.ts\`);
   the React Storybook's \`tilburg-${slug}.stories.tsx\` consumes the same source. */

const meta: Meta = {
  title: 'Tilburg HTML/${title}',
  id: 'tilburg-${slug}',
  tags: ${tags},
  parameters: {
    bugs,
    docs: { description: { component: descriptionHtml } },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  name: examples.default.name,
  render: () => ({ template: examples.default.html }),
};
`,

  [P('storybook-angular/src', `tilburg-${slug}.stories.ts`)]: `/* @license CC0-1.0 */

import { Tilburg${pascal} } from '@gemeente-tilburg/components-angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description } from '${examplesFrom}';

const meta: Meta<Tilburg${pascal}> = {
  title: 'Tilburg Angular/${title}',
  id: 'tilburg-${slug}-angular',
  component: Tilburg${pascal},
  tags: ${tags},
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj<Tilburg${pascal}>;

export const Default: Story = {
  name: 'Default',
  render: () => ({ template: \`${tpl(usage.angular)}\` }),
};
`,

  [P('components-react/src', `${pascal}.tsx`)]: `import '@gemeente-tilburg/components-css/${slug}/index.scss';
import clsx from 'clsx';
import { ForwardedRef, forwardRef, HTMLAttributes${slot ? ', PropsWithChildren' : ''} } from 'react';

export type ${pascal}Props = ${slot ? `PropsWithChildren<HTMLAttributes<${element}>>` : `HTMLAttributes<${element}>`};

export const ${pascal} = forwardRef(
  ({ ${slot ? 'children, ' : ''}className, ...restProps }: ${pascal}Props, ref: ForwardedRef<${element}>) => (
${indent(reactTemplate(root), 4)}
  ),
);

${pascal}.displayName = '${pascal}';
`,

  [P('components-react/src', `${pascal}.test.tsx`)]:
    `import { render${slot ? ', screen' : ''} } from '@testing-library/react';
import { ${pascal} } from './${pascal}';
import '@testing-library/jest-dom';

describe('${pascal}', () => {
  it('renders the ${cls} markup', () => {
    const { container } = render(${usage.react});
    expect(container.querySelector('.${cls}')).not.toBeNull();${
      slot ? "\n    expect(screen.getByText('Inhoud')).toBeInTheDocument();" : ''
    }
  });

  it('merges className and forwards attributes', () => {
    const { container } = render(<${pascal} className="extra" id="een" />);
    expect(container.firstChild).toHaveClass('${cls}', 'extra');
    expect(container.firstChild).toHaveAttribute('id', 'een');
  });
});
`,

  [P('components-angular/src', slug, 'component.ts')]: `import { Component } from '@angular/core';

@Component({
  selector: 'tilburg-${slug}',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  standalone: false,
})
export class Tilburg${pascal} {}
`,
  [P('components-angular/src', slug, 'index.html')]: `${angularTemplate(root)}\n`,
  [P('components-angular/src', slug, 'index.scss')]: `@import "../../../components-css/${slug}/index";

/* The host element (\`<tilburg-${slug}>\`) defaults to \`display: inline\`; give it the block flow of the reference. */
:host {
  display: block;
}
`,
  [P('components-angular/src', slug, 'public-api.ts')]: `export * from './component';\n`,
  [P('components-angular/src', slug, 'component.spec.ts')]: `import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Tilburg${pascal} } from './component';

@Component({
  template: \`${tpl(usage.angular)}\`,
  standalone: false,
})
class HostComponent {}

describe('Tilburg${pascal}', () => {
  it('renders the ${cls} markup', () => {
    TestBed.configureTestingModule({ declarations: [Tilburg${pascal}, HostComponent] });
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('.${cls}') as HTMLElement;
    expect(element).not.toBeNull();${slot ? "\n    expect(element.textContent?.trim()).toBe('Inhoud');" : ''}
  });
});
`,

  [P('web-components-stencil/src', slug, 'component.tsx')]: `/**
 * @license EUPL-1.2
 * Copyright (c) ${new Date().getFullYear()} Gemeente Tilburg
 */

import { Component, h } from '@stencil/core';

@Component({
  tag: 'tilburg-wbc-${slug}',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWbc${pascal} {
  render() {
    return (
${indent(stencilTemplate(root), 6)}
    );
  }
}
`,
  [P('web-components-stencil/src', slug, 'component.spec.tsx')]: `import { newSpecPage } from '@stencil/core/testing';
import { TilburgWbc${pascal} } from './component';

describe('tilburg-wbc-${slug}', () => {
  it('renders the ${cls} markup', async () => {
    const page = await newSpecPage({
      components: [TilburgWbc${pascal}],
      html: '${usage.wbc}',
    });
    const element = page.root!.querySelector('.${cls}')!;
    expect(element).not.toBeNull();${slot ? "\n    expect(element.textContent).toBe('Inhoud');" : ''}
  });
});
`,
  [P('web-components-stencil/src', slug, 'index.scss')]: `@use "../../../components-css/${slug}/index";

/* Light-DOM host defaults to \`display: inline\`; force the block flow of the HTML/CSS reference. */
tilburg-wbc-${slug} {
  display: block;
}
`,
};

/* Refuse to touch anything when any of it exists: the user may be halfway a component of their own. */
const taken = Object.keys(files).filter((file) => existsSync(file));
if (taken.length)
  exitWith({
    what: `${title} exists already`,
    why: `${show(taken[0])}${taken.length > 1 ? ` and ${taken.length - 1} more` : ''}`,
    fix: `pnpm parity ${slug} shows what it still misses`,
  });

/* Registrations: one line in a sorted list each, except the Angular module's array (unsorted: appended). */
const ci = (a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' });
function insertSorted(file, line, pattern, keyOf) {
  const lines = readFileSync(file, 'utf8').split('\n');
  const matches = lines.map((item, i) => (pattern.test(item) ? i : -1)).filter((i) => i >= 0);
  if (!matches.length) exitWith({ what: `No list to add ${title} to in ${show(file)}`, fix: 'add it by hand' });
  const key = keyOf(line);
  const after = matches.find((i) => ci(keyOf(lines[i]), key) > 0);
  lines.splice(after ?? matches.at(-1) + 1, 0, line);
  writeFileSync(file, lines.join('\n'));
}
const registrations = [
  [
    P('components-react/src/index.ts'),
    `export { ${pascal} } from './${pascal}';\nexport type { ${pascal}Props } from './${pascal}';`,
    /^export (type )?\{ \w+/,
    (line) => line.match(/\{ (\w+)/)[1].replace(/Props$/, ''),
  ],
  [
    P('components-angular/src/components.ts'),
    `export * from './${slug}/component';`,
    /^export \* from '\.\/[\w-]+\/component';/,
    (line) => line.match(/'\.\/([\w-]+)\//)[1],
  ],
  [
    P('components-angular/src/index.module.ts'),
    `import { Tilburg${pascal} } from './${slug}/component';`,
    /^import \{[^}]+\} from '\.\/[\w-]+\/component';/,
    (line) => line.match(/'\.\/([\w-]+)\//)[1],
  ],
  [
    P('storybook/config/preview.tsx'),
    `import '@gemeente-tilburg/components-css/${slug}/index.scss';`,
    /^import '@gemeente-tilburg\/components-css\/[\w-]+\/index\.scss';/,
    (line) => line.match(/components-css\/([\w-]+)\//)[1],
  ],
  [
    P('storybook-angular/src/styles.scss'),
    `@import "@gemeente-tilburg/components-css/${slug}/index";`,
    /^@import "@gemeente-tilburg\/components-css\/[\w-]+\/index";/,
    (line) => line.match(/components-css\/([\w-]+)\//)[1],
  ],
];
const status = resolve(ROOT, STATUS_FILE);
const missing = [...registrations.map(([file]) => file), status].filter((file) => !existsSync(file));
if (missing.length)
  exitWith({ what: `${show(missing[0])} is missing`, why: 'the registrations need it', fix: 'git status' });

/* Write everything, now that nothing stands in the way. */
for (const [file, content] of Object.entries(files)) {
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, content);
}
for (const [file, line, pattern, keyOf] of registrations) insertSorted(file, line, pattern, keyOf);

/* The module's `components` array: the entry before its closing bracket. */
{
  const file = P('components-angular/src/index.module.ts');
  const text = readFileSync(file, 'utf8');
  const start = text.indexOf('const components = [');
  const end = text.indexOf('\n];', start);
  if (start < 0 || end < 0) exitWith({ what: `No components array in ${show(file)}`, fix: 'add it by hand' });
  writeFileSync(file, `${text.slice(0, end)}\n  Tilburg${pascal},${text.slice(end)}`);
}

/* The implementation-status table: a row, padded like the others, in alphabetical order. */
{
  const lines = readFileSync(status, 'utf8').split('\n');
  const header = lines.findIndex((line) => /^\| Component\s+\|/.test(line));
  if (header < 0) exitWith({ what: `No component table in ${show(status)}`, fix: 'add the row by hand' });
  const widths = lines[header]
    .split('|')
    .slice(1, -1)
    .map((cell) => cell.length - 2);
  const cells = [title, '✅', '✅', '✅', '✅'];
  const row = `| ${cells.map((cell, i) => cell.padEnd(widths[i] ?? cell.length)).join(' | ')} |`;
  let i = header + 2;
  while (i < lines.length && /^\| /.test(lines[i]) && ci(lines[i].slice(2).split('|')[0].trim(), title) < 0) i++;
  lines.splice(i, 0, row);
  writeFileSync(status, lines.join('\n'));
}

const changeset = resolve(ROOT, '.changeset', `${slug}.md`);
if (existsSync(dirname(changeset)) && !existsSync(changeset))
  writeFileSync(
    changeset,
    `---\n"@gemeente-tilburg/components-react": minor\n"@gemeente-tilburg/components-angular": minor\n---\n\nNieuw component: ${title}.\n`,
  );

/* Prettier settles what the templates leave open (quoting, wrapping, the table's padding). */
spawnSync(
  'pnpm',
  ['exec', 'prettier', '--write', ...Object.keys(files), ...registrations.map(([file]) => file), status],
  {
    cwd: ROOT,
    stdio: 'ignore',
    shell: process.platform === 'win32',
  },
);

printBanner(`Nieuw component: ${title}`);
console.log(
  `  ${c.green}${Object.keys(files).length} bestanden${c.reset} geschreven, ${registrations.length + 2} registraties:\n`,
);
for (const file of Object.keys(files)) console.log(`    ${show(file)}`);
console.log(`
  ${c.bold}Nu jij:${c.reset}
    1. ${cmd(`pnpm dev ${slug}`)}            ${hint('beide Storybooks op dit component; de watchers bouwen de dist')}
    2. De TODO's: de CSS in ${show(P('components-css', slug, 'index.scss'))}, de props/inputs in de drie wrappers,
       de teksten en voorbeelden in ${show(P('storybook-shared/src', `tilburg-${slug}.examples.ts`))}.
    3. ${cmd(`pnpm test ${slug}`)}           ${hint('de drie tests die je er nu bij kreeg')}
    4. ${cmd(`pnpm parity ${slug}`)}         ${hint('alles aanwezig? (het is groen vanaf nu)')}
`);
