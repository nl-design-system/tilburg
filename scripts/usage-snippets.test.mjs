/* `node --test scripts/`: the "Gebruik" panel of both Storybooks has a snippet for every component and finds its
   install and load steps in the documentation pages. The pure helpers (packages/storybook-shared/src/usage.ts) are
   run against the real pages, so a page that is restructured fails here instead of silently emptying the panel. */
import './lib/test-env.mjs';
import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { registerHooks } from 'node:module';
import { join } from 'node:path';
import { test } from 'node:test';
import { ROOT } from './dev-config.mjs';
import { loadComponents } from './lib/components.mjs';
import {
  cleanStoryHtml,
  componentLinks,
  linkStatus,
  RELATED,
  formatHtml,
  fullPage,
  hasFullPage,
  LAYERS,
  allSections,
  bindArgs,
  layerSteps,
  renderedSnippet,
  storyLayer,
  storySnippet,
  usageSections,
} from '../packages/storybook-shared/src/usage.ts';

const SHARED = join(ROOT, 'packages/storybook-shared/src');
const HEADINGS = LAYERS.map((layer) => layer.heading);
const page = (name) => readFileSync(join(SHARED, 'documentation', `${name}.md`), 'utf8');
/* What the previews pass as `parameters.usage`. */
const docs = {
  gettingStarted: page('getting-started'),
  pages: {
    html: page('intro-layer-html-css'),
    react: page('intro-layer-react'),
    angular: page('intro-layer-angular'),
    webComponents: page('intro-layer-web-components'),
  },
};

/* The examples files import each other without the `.ts` extension (the bundlers add it); Node's loader does not. */
registerHooks({
  resolve(specifier, context, next) {
    const bare = specifier.startsWith('./') && !/\.[cm]?[jt]s$/.test(specifier) && context.parentURL?.includes(SHARED);
    return next(bare ? `${specifier}.ts` : specifier, context);
  },
});

test('usageSections reads the layer sections under ## Usage: first fence each, the intro markup for one without', () => {
  const markdown = `Intro text.

\`\`\`html
<button class="utrecht-button">Markup above</button>
\`\`\`

## Usage

### React

\`\`\`tsx
<Button>Go</Button>
\`\`\`

Inputs: \`appearance\`.

\`\`\`tsx
<Button>second fence</Button>
\`\`\`

### Notes only

No fence here.

### Plain HTML / CSS

\`\`\`
<button class="utrecht-button">Go</button>
\`\`\`

## Something else

### Not usage

\`\`\`html
<div>no</div>
\`\`\`
`;
  assert.deepEqual(usageSections(markdown), [
    { title: 'React', language: 'tsx', code: '<Button>Go</Button>' },
    { title: 'Notes only', language: 'html', code: '<button class="utrecht-button">Markup above</button>' },
    { title: 'Plain HTML / CSS', language: 'text', code: '<button class="utrecht-button">Go</button>' },
  ]);
  assert.deepEqual(usageSections(undefined), []);
  assert.deepEqual(usageSections('No usage section'), []);
});

test('every component description gives the panel at least one snippet, under a layer heading, without a TODO', async () => {
  const files = readdirSync(SHARED).filter((file) => /^tilburg-.*\.examples\.ts$/.test(file));
  assert.ok(files.length > 30, 'the examples files should be found');
  const empty = [];
  for (const file of files) {
    const module = await import(join(SHARED, file));
    for (const [name, value] of Object.entries(module)) {
      if (!/^description/.test(name) || typeof value !== 'string') continue;
      const titles = usageSections(value).map((section) => section.title);
      if (!titles.length) empty.push(`${file}: ${name}`);
      if (value.includes('TODO')) empty.push(`${file}: ${name} still has a TODO`);
      /* The panel finds a layer by its exact heading; another one never shows. */
      for (const title of titles) if (!HEADINGS.includes(title)) empty.push(`${file}: ${name} has "### ${title}"`);
    }
  }
  /* The tokens page documents tokens, not a component: no snippet to add. */
  assert.deepEqual(
    empty.filter((entry) => !entry.startsWith('tilburg-tokens.')),
    [],
  );
});

test('storyLayer reads the layer and component from a story id of either Storybook', () => {
  assert.deepEqual(storyLayer('tilburg-button-group-react--sizes'), {
    layer: 'react',
    component: 'button-group',
    base: 'tilburg-button-group',
  });
  assert.deepEqual(storyLayer('tilburg-button--sizes'), { layer: 'html', component: 'button', base: 'tilburg-button' });
  assert.deepEqual(storyLayer('tilburg-button-html--sizes'), {
    layer: 'html',
    component: 'button',
    base: 'tilburg-button',
  });
  assert.equal(storyLayer('tilburg-side-nav-angular--default').layer, 'angular');
  assert.equal(storyLayer('tilburg-side-nav-wbc--default').layer, 'webComponents');
  assert.equal(storyLayer('tilburg-side-nav-wbc--default').component, 'side-nav');
});

test('layerSteps finds an install and a load step on every layer page', () => {
  for (const { id, title } of LAYERS) {
    const steps = layerSteps(docs.pages[id], 'button');
    assert.deepEqual(
      steps.map((step) => step.title),
      ['Installeren', 'Laden'],
      `${title}: Installatie and Setup (or Gebruik) sections with a code block`,
    );
    assert.match(steps[0].code, /^npm install .*design-tokens/s);
    assert.equal(steps[0].language, 'bash');
    assert.match(steps[1].code, /design-tokens\/dist\/tilburg\/theme\.css|TilburgComponentsModule/);
    assert.ok(steps[1].notes[0].text.length > 20, `${title}: the Setup prose becomes the notes`);
  }
  assert.deepEqual(layerSteps(undefined, 'button'), []);
});

test('layerSteps: the HTML layer names this component only, and adds the behaviour step where the docs table has one', () => {
  const [, load] = layerSteps(docs.pages.html, 'button');
  assert.match(load.code, /components-css\/button\/index/);
  assert.doesNotMatch(load.code, /alert\/index|…alleen/);
  assert.equal(load.code.match(/components-css/g).length, 1);
  assert.ok(
    load.notes.every((note) => !/[*_]/.test(note.text.replace(/`[^`]*`/g, ''))),
    'no emphasis marks left',
  );

  const accordion = layerSteps(docs.pages.html, 'accordion');
  assert.deepEqual(
    accordion.map((step) => step.title),
    ['Installeren', 'Laden', 'Gedrag aanzetten'],
  );
  assert.match(accordion[2].code, /components-css\/accordion\/index\.js/);
  assert.match(accordion[2].code, /enhanceAccordion\(document\)/);
  assert.match(accordion[2].notes[0].text, /`data-tilburg-accordion-enhance`/);

  const password = layerSteps(docs.pages.html, 'password-input');
  assert.match(password[2].code, /password-input\/index\.js/);
  assert.match(password[2].code, /enhancePasswordInput/);
  assert.doesNotMatch(password[2].code, /accordion/);
});

test('layerSteps: React lists the three stylesheets, Angular the module, Web Components the loader without the example body', () => {
  const react = layerSteps(docs.pages.react, 'button');
  assert.equal(react[1].code.match(/^import "/gm).length, 3);
  assert.match(react[1].code, /components-react\/dist\/style\.css/);
  /* The notice (a quoted paragraph on the page) is a callout, the explanation is not; code keeps its backticks. */
  assert.deepEqual(
    react[0].notes.map((note) => note.callout),
    [true],
  );
  assert.match(react[0].notes[0].text, /^`@gemeente-tilburg\/components-react` staat nog niet op npm.*tarball/);
  const angular = layerSteps(docs.pages.angular, 'button');
  assert.match(angular[1].code, /TilburgComponentsModule/);
  assert.match(angular[1].code, /@import "@gemeente-tilburg\/design-tokens/);
  const wbc = layerSteps(docs.pages.webComponents, 'button');
  assert.match(wbc[1].code, /defineCustomElements\(\)/);
  assert.doesNotMatch(wbc[1].code, /<body|tilburg-wbc-alert/);
});

test('cleanStoryHtml drops the framework bookkeeping, formatHtml indents one element per line', () => {
  const angular = `<tilburg-button _nghost-ng-c123="" ng-reflect-appearance="primary" ng-version="20.0.0" class="ng-star-inserted"><!--container--><button _ngcontent-ng-c123="" class="utrecht-button hydrated utrecht-button--primary-action" type="button">Opslaan</button></tilburg-button>`;
  assert.equal(
    cleanStoryHtml(angular),
    '<tilburg-button><button class="utrecht-button utrecht-button--primary-action" type="button">Opslaan</button></tilburg-button>',
  );
  /* The decorator's wrappers go; a wrapper of the story's own stays. */
  assert.equal(
    cleanStoryHtml(
      '<div class="tilburg-theme"><div class="utrecht-document"><div class="row"><b>x</b></div></div></div>',
    ),
    '<div class="row"><b>x</b></div>',
  );
  assert.equal(
    formatHtml('<div class="a"><p>Hallo <b>daar</b></p><input type="text"><br/><span>x</span></div>'),
    [
      '<div class="a">',
      '  <p>',
      '    Hallo',
      '    <b>daar</b>',
      '  </p>',
      '  <input type="text">',
      '  <br/>',
      '  <span>x</span>',
      '</div>',
    ].join('\n'),
  );
});

test('fullPage is the "Minimale pagina" of Aan de slag around the body, plus what the layer needs in the head', () => {
  const html = fullPage(docs, 'html', 'accordion', '<div class="utrecht-accordion">…</div>');
  assert.match(html, /^<!doctype html>\n<html lang="nl">/);
  assert.match(html, /<body class="tilburg-theme utrecht-document">/);
  assert.match(html, /design-tokens\/dist\/tilburg\/theme\.css/);
  assert.match(html, /component-library-css\/dist\/index\.css/);
  assert.match(html, /<title>accordion<\/title>/);
  assert.match(
    html,
    /    <link rel="stylesheet" href="\/node_modules\/@gemeente-tilburg\/components-css\/accordion\/index\.css" \/>/,
  );
  assert.match(
    html,
    /<script type="module" src="\/node_modules\/@gemeente-tilburg\/components-css\/accordion\/index\.js"><\/script>/,
  );
  assert.match(html, /\n    <div class="utrecht-accordion">…<\/div>\n/);
  assert.doesNotMatch(html, /je componenten/);
  assert.doesNotMatch(fullPage(docs, 'html', 'button', '<button></button>'), /<script/);
  assert.match(
    fullPage(docs, 'webComponents', 'button', '<tilburg-wbc-button></tilburg-wbc-button>'),
    /defineCustomElements\(\);\n    <\/script>/,
  );
  /* React and Angular get no page: the HTML their component rendered is not how you use it. */
  assert.deepEqual(LAYERS.map((layer) => layer.id).filter(hasFullPage), ['html', 'webComponents']);
  /* Without the pages: still a page, with the body in place. */
  assert.match(
    fullPage(undefined, 'html', 'button', '<button></button>'),
    /<body class="tilburg-theme utrecht-document">\n    <button><\/button>/,
  );
});

test('storySnippet derives the snippet from the story: React JSX, the Angular template, custom elements, or the args', () => {
  const reactSource = `{
  name: 'Primary',
  render: () => (
    <Row>
      <Button size="small" appearance="primary-action-button">
        Small
      </Button>
    </Row>
  )
}`;
  assert.deepEqual(storySnippet('react', 'button', reactSource), {
    title: 'React',
    language: 'tsx',
    code: `import { Button } from '@gemeente-tilburg/components-react';\n\n<Row>\n  <Button size="small" appearance="primary-action-button">\n    Small\n  </Button>\n</Row>`,
  });
  assert.equal(
    storySnippet(
      'react',
      'button',
      "{\n  args: { appearance: 'subtle-button', disabled: true, children: 'Sluiten' }\n}",
      {
        appearance: 'subtle-button',
        disabled: true,
        children: 'Sluiten',
      },
    ).code,
    `import { Button } from '@gemeente-tilburg/components-react';\n\n<Button appearance="subtle-button" disabled={true}>Sluiten</Button>`,
  );
  const angularSource = `{
  name: 'Primary action',
  render: () => ({
    template: \`
      <div style="display:flex">
        <tilburg-button appearance="primary-action-button">Small</tilburg-button>
      </div>
    \`,
  }),
}`;
  assert.deepEqual(storySnippet('angular', 'button', angularSource), {
    title: 'Angular',
    language: 'html',
    code: '<div style="display:flex">\n  <tilburg-button appearance="primary-action-button">Small</tilburg-button>\n</div>',
  });
  assert.equal(
    storySnippet('angular', 'button', "{\n  args: { appearance: 'primary-action-button', disabled: true }\n}", {
      appearance: 'primary-action-button',
      disabled: true,
    }).code,
    `<tilburg-button appearance="primary-action-button" [disabled]="true"></tilburg-button>`,
  );
  const wbcSource = `{
  render: () => (
    <>
      <TilburgWbcAlert variant="info" headingLevel={2} closable className="x">
        Tekst
      </TilburgWbcAlert>
      <TilburgWbcSeparator decorative />
    </>
  )
}`;
  assert.equal(
    storySnippet('webComponents', 'alert', wbcSource).code,
    '<tilburg-wbc-alert variant="info" heading-level="2" closable class="x">\n  Tekst\n</tilburg-wbc-alert>\n<tilburg-wbc-separator decorative></tilburg-wbc-separator>',
  );
  assert.equal(
    storySnippet('webComponents', 'alert', undefined, { variant: 'ok', closable: true }).code,
    '<tilburg-wbc-alert variant="ok" closable></tilburg-wbc-alert>',
  );
  assert.equal(storySnippet('html', 'alert', '{ render: () => <HtmlExample /> }'), undefined);
});

test('the online Storybook addresses in usage.ts equal SITE in scripts/lib/components.mjs', async () => {
  const { SITES } = await import('../packages/storybook-shared/src/usage.ts');
  const { SITE } = await import('./lib/components.mjs');
  assert.deepEqual(SITES, SITE);
});

test('every ?path=/docs/… link in the shared documentation is a page of both Storybooks', () => {
  const docs = join(SHARED, 'documentation');
  /* The READMEs of the packages link to the same pages, on the published Storybooks. */
  const readmes = ['packages', 'proprietary'].flatMap((group) =>
    readdirSync(join(ROOT, group)).map((name) => join(ROOT, group, name, 'README.md')),
  );
  const links = [...readdirSync(docs).map((file) => join(docs, file)), ...readmes]
    .filter((file) => file.endsWith('.md') && existsSync(file))
    .flatMap((file) => [...readFileSync(file, 'utf8').matchAll(/\?path=\/docs\/([\w-]+)--docs/g)])
    .map((match) => match[1]);
  assert.ok(links.length > 10, 'the links should be found');
  for (const storybook of ['storybook', 'storybook-angular']) {
    const pages = join(ROOT, 'packages', storybook, 'src/documentation');
    /* Storybook's id of a docs page: the title in lower case, every run of other characters a dash. */
    const ids = readdirSync(pages)
      .filter((file) => file.endsWith('.mdx'))
      .map((file) => readFileSync(join(pages, file), 'utf8').match(/<Meta title="([^"]+)"/)?.[1] ?? '')
      .map((title) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
    assert.deepEqual(
      [...new Set(links)].filter((id) => !ids.includes(id)),
      [],
      `${storybook}: links without a page`,
    );
  }
});

/* The JSX as Storybook's React renderer sends it (SNIPPET_RENDERED): one attribute per line, values filled in. */
const RENDERED = `<div
  style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  }}
>
  <h4>
    Per variant
  </h4>
  <Row label="Klein">
    <Alert
      closable
      headingLevel={2}
      onClose={() => {}}
      title="Let op"
      variant="warning"
    >
      Tot {'{'}morgen{'}'}.
    </Alert>
  </Row>
  <FormLabel htmlFor="naam">
    Naam
  </FormLabel>
  <Textbox id="naam" />
</div>`;

test('renderedSnippet (React): the rendered JSX without the story helper and the story layout, every library component imported', () => {
  const snippet = renderedSnippet('react', 'alert', RENDERED, ['Alert', 'FormLabel', 'Textbox', 'Button']);
  assert.equal(snippet.language, 'tsx');
  assert.equal(
    snippet.code,
    `import { Alert, FormLabel, Textbox } from '@gemeente-tilburg/components-react';

<Alert closable headingLevel={2} onClose={() => {}} title="Let op" variant="warning">
  Tot {'{'}morgen{'}'}.
</Alert>
<FormLabel htmlFor="naam">
  Naam
</FormLabel>
<Textbox id="naam" />`,
  );
  /* Without the list of exports (the Angular Storybook) nothing is known to be a helper. */
  assert.match(renderedSnippet('react', 'alert', RENDERED).code, /import \{ Alert, FormLabel, Row, Textbox \}/);
});

test('renderedSnippet: a helper that renders the example itself, or sits in a prop, gives no snippet (the written one stays)', () => {
  assert.equal(renderedSnippet('react', 'modal', '<ModalDemo />', ['Modal']), undefined);
  assert.equal(
    renderedSnippet('react', 'progress-bar', '<ProgressBar backIcon={<BackIcon />} />', ['ProgressBar']),
    undefined,
  );
  assert.equal(renderedSnippet('react', 'modal', '<div>alleen HTML</div>', ['Modal']), undefined);
  assert.equal(renderedSnippet('react', 'modal', '', ['Modal']), undefined);
  /* The helper holds the modal and its state; its children are only the modal's content. */
  const demo = '<ModalDemo title="Bevestigen">\n  <Paragraph>\n    Zeker weten?\n  </Paragraph>\n</ModalDemo>';
  assert.equal(renderedSnippet('react', 'modal', demo, ['Modal', 'Paragraph']), undefined);
  assert.match(renderedSnippet('react', 'form-fieldset', '<Fieldset />', ['Fieldset']).code, /<Fieldset \/>/);
  assert.match(
    renderedSnippet('webComponents', 'heading', '<TilburgWbcHeading1 />').code,
    /<tilburg-wbc-heading-1><\/tilburg-wbc-heading-1>/,
  );
  assert.equal(renderedSnippet('angular', 'alert', '<tilburg-alert></tilburg-alert>'), undefined);
  assert.equal(renderedSnippet('html', 'alert', '<div></div>'), undefined);
});

test('renderedSnippet (Web Components): custom elements, attributes in kebab-case, properties and events named apart', () => {
  const jsx = `<Field label="x">
  <label
    className="utrecht-form-label"
    htmlFor="cb"
  >
    Contact
  </label>
  <TilburgWbcCombobox
    disabled
    id="cb"
    items={[
      {
        label: 'E-mail',
        value: 'email'
      }
    ]}
    onTilburgChange={() => {}}
    required={false}
  />
  <TilburgWbcAlert
    heading="Let op"
    headingLevel={2}
    style={{
      marginBlockStart: '1rem'
    }}
  >
    <svg slot="icon" />
    Tekst
  </TilburgWbcAlert>
  <input type="text" />
</Field>`;
  assert.deepEqual(renderedSnippet('webComponents', 'combobox', jsx), {
    title: 'Web Components (Stencil)',
    language: 'html',
    code: `<label class="utrecht-form-label" for="cb">
  Contact
</label>
<!-- JavaScript-property (geen attribuut): element.items = [ { label: 'E-mail', value: 'email' } ] -->
<!-- event: element.addEventListener('tilburgChange', …) -->
<tilburg-wbc-combobox disabled id="cb" required="false"></tilburg-wbc-combobox>
<tilburg-wbc-alert heading="Let op" heading-level="2" style="margin-block-start: 1rem">
  <svg slot="icon"></svg>
  Tekst
</tilburg-wbc-alert>
<input type="text">`,
  });
});

test('bindArgs fills the args of the story into an Angular template, and leaves other bindings alone', () => {
  assert.equal(
    bindArgs(
      '<tilburg-alert [variant]="variant" [title]="title" [closable]="closable" [items]="items" (closed)="done()">{{ text }} {{ other }}</tilburg-alert>',
      { variant: 'info', title: 'Let op', closable: true, items: [1], text: 'Hallo' },
    ),
    '<tilburg-alert variant="info" title="Let op" [closable]="true" [items]="items" (closed)="done()">Hallo {{ other }}</tilburg-alert>',
  );
  assert.equal(bindArgs('<a [x]="x"></a>', undefined), '<a [x]="x"></a>');
});

test("renderedSnippet keeps what is inside a component: a heading or a styled div there is the reader's", () => {
  const jsx = `<Alert title="x">\n  <h4>\n    Kop\n  </h4>\n  <div style={{ color: 'red' }}>\n    Tekst\n  </div>\n</Alert>\n<div className="eigen">\n  buiten\n</div>`;
  assert.match(
    renderedSnippet('react', 'alert', jsx, ['Alert']).code,
    /<h4>\n    Kop\n  <\/h4>\n  <div style=\{\{ color: 'red' \}\}>/,
  );
  assert.match(renderedSnippet('react', 'alert', jsx, ['Alert']).code, /<div className="eigen">/);
});

test('allSections gives every component the usage sections of all layers, as both previews pass them to the panel', async () => {
  const files = readdirSync(SHARED).filter((file) => /^tilburg-.*\.examples\.ts$/.test(file));
  const modules = Object.fromEntries(
    await Promise.all(files.map(async (file) => [`./${file}`, await import(join(SHARED, file))])),
  );
  const sections = allSections(modules);
  assert.deepEqual(sections.alert.map((section) => section.title).sort(), [
    'Angular',
    'Plain HTML / CSS',
    'React',
    'Web Components (Stencil)',
  ]);
  assert.equal(new Set(sections.button.map((section) => section.title)).size, sections.button.length, 'no title twice');
  assert.deepEqual(allSections({ './other.ts': { description: '## Usage\n\n### React\n\n```tsx\n<A />\n```' } }), {});
});

test('the tarballs the documentation names are the ones pnpm pack:local makes: name and version of each package', () => {
  const docs = join(SHARED, 'documentation');
  const named = readdirSync(docs)
    .filter((file) => file.endsWith('.md'))
    .flatMap((file) => [
      ...readFileSync(join(docs, file), 'utf8').matchAll(/gemeente-tilburg-([a-z-]+)-(\d+\.\d+\.\d+)\.tgz/g),
    ])
    .map(([, name, version]) => `${name}@${version}`);
  assert.ok(named.length > 10, 'the tarball names should be found');
  const versions = Object.fromEntries(
    ['packages', 'proprietary'].flatMap((group) =>
      readdirSync(join(ROOT, group), { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .flatMap((entry) => {
          try {
            const { name, version } = JSON.parse(readFileSync(join(ROOT, group, entry.name, 'package.json'), 'utf8'));
            return name?.startsWith('@gemeente-tilburg/') ? [[name.replace('@gemeente-tilburg/', ''), version]] : [];
          } catch {
            return [];
          }
        }),
    ),
  );
  assert.deepEqual(
    [...new Set(named)].filter((entry) => versions[entry.split('@')[0]] !== entry.split('@')[1]),
    [],
    'a tarball name in the documentation with another version than its package.json',
  );
});

test('the files both Storybooks keep a copy of are the same, but for the line that names the other copy', () => {
  for (const file of ['UsagePanel.tsx', 'TlbFilter.tsx', 'sidebarLabel.tsx']) {
    const [react, angular] = ['packages/storybook/config', 'packages/storybook-angular/.storybook'].map((folder) =>
      readFileSync(join(ROOT, folder, file), 'utf8').replace(/packages\/storybook(?:-angular)?\/[\w.]+\//g, '<other>/'),
    );
    assert.equal(react, angular, `${file} differs between the two Storybooks`);
  }
});

/* Story ids per Storybook, as the story files declare them. */
const storyIds = (storybook) =>
  readdirSync(join(ROOT, 'packages', storybook, 'src'))
    .filter((file) => /\.stories\.tsx?$/.test(file))
    .map((file) => readFileSync(join(ROOT, 'packages', storybook, 'src', file), 'utf8').match(/^\s*id:\s*'([^']+)'/m))
    .flatMap((match) => (match ? [match[1]] : []));

test('linkStatus links every component of the status table to its HTML page, which both Storybooks have', () => {
  const linked = linkStatus(page('implementation-status'));
  const ids = [...linked.matchAll(/^\| \[[^\]]+\]\(\?path=\/docs\/([\w-]+)--docs\)/gm)].map((match) => match[1]);
  assert.equal(ids.length, loadComponents().length, 'every row is linked');
  assert.match(linked, /^\| Component +\|/m, 'the header is left alone');
  for (const storybook of ['storybook', 'storybook-angular']) {
    const known = storyIds(storybook);
    assert.deepEqual(
      ids.filter((id) => !known.includes(id)),
      [],
      `${storybook}: rows without a page`,
    );
  }
});

test('componentLinks: related components are real ones, and every link on every component page exists there', async () => {
  const slugs = loadComponents().map((component) => component.slug);
  assert.deepEqual(
    RELATED.flat().filter((slug) => !slugs.includes(slug)),
    [],
    'RELATED names a component the status table does not have',
  );
  const files = readdirSync(SHARED).filter((file) => /^tilburg-.*\.examples\.ts$/.test(file));
  const sections = allSections(
    Object.fromEntries(await Promise.all(files.map(async (file) => [`./${file}`, await import(join(SHARED, file))]))),
  );
  for (const storybook of ['storybook', 'storybook-angular']) {
    const known = storyIds(storybook);
    const missing = known
      .flatMap((id) => [...componentLinks(`${id}--docs`, sections).matchAll(/\/docs\/(tilburg-[\w-]+)--docs/g)])
      .map((match) => match[1])
      .filter((id) => !known.includes(id) && !/^tilburg-(aan-de-slag|implementatiestatus)$/.test(id));
    assert.deepEqual([...new Set(missing)], [], `${storybook}: links to a page it does not have`);
  }
  const links = componentLinks('tilburg-form-label-react--default', sections);
  assert.match(links, /\[Form Field\]\(\?path=\/docs\/tilburg-form-field-react--docs\)/, 'the same layer');
  assert.doesNotMatch(links, /Form Label\]/, 'not itself');
  assert.match(componentLinks('tilburg-badge-status-react--default', sections), /tilburg-badge-counter--docs/);
  assert.equal(componentLinks('tokens-colors--docs', sections), '', 'not a component: no links');
});

test('a section the documentation names ("onder _X_", "_X_ op _Y_") is a heading that exists', () => {
  const folders = ['storybook-shared', 'storybook', 'storybook-angular'].map((name) =>
    join(ROOT, 'packages', name, 'src/documentation'),
  );
  const texts = [
    readFileSync(join(ROOT, 'CONTRIBUTING.md'), 'utf8'),
    ...folders.flatMap((folder) =>
      readdirSync(folder)
        .filter((file) => file.endsWith('.md'))
        .map((file) => readFileSync(join(folder, file), 'utf8')),
    ),
  ];
  const headings = texts.flatMap((text) => [...text.matchAll(/^#+ (.+)$/gm)].map((match) => match[1].trim()));
  /* A name with an arrow is a place in the sidebar, not a section. */
  const named = texts
    .slice(1)
    .flatMap((text) => [...text.matchAll(/onder\s+_([^_]+)_|_([^_]+)_\s+op\s+_[^_]+_/g)])
    .map((match) => (match[1] ?? match[2]).replace(/\s+/g, ' '))
    .filter((name) => !name.includes('→'));
  assert.ok(named.length > 4, 'the references should be found');
  assert.deepEqual(
    [...new Set(named)].filter((name) => !headings.includes(name)),
    [],
    'a section named in the documentation that no page has',
  );
});
