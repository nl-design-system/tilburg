/* `node --test scripts/`: `pnpm new` on a copy of the scripts against a bare repo skeleton: the files it writes, the
   lists it registers in (sorted), what it derives from the HTML, and when it refuses. The real generator run (the
   generated component's tests, lint and types) is checked by hand; see scripts/new-component.mjs. */
import './lib/test-env.mjs';
import assert from 'node:assert/strict';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { test } from 'node:test';
import { copyScripts, runScript, tempDir } from './lib/test-fakes.mjs';

const temp = tempDir('tilburg-new-');
let count = 0;

/** A repo with the six files the generator registers in, holding one component (alert) and one later one (table). */
function repo() {
  const root = resolve(temp, `repo-${count++}`);
  copyScripts(root, 'new-component.mjs', 'lib/markup.mjs', 'lib/components.mjs');
  const write = (file, text) => {
    mkdirSync(resolve(root, file, '..'), { recursive: true });
    writeFileSync(resolve(root, file), text);
  };
  write(
    'packages/components-react/src/index.ts',
    `export { Alert } from './Alert';\nexport type { AlertProps } from './Alert';\nexport { Table } from './Table';\nexport type { TableProps } from './Table';\n`,
  );
  write(
    'packages/components-angular/src/components.ts',
    `export * from './alert/component';\nexport * from './table/component';\n`,
  );
  write(
    'packages/components-angular/src/index.module.ts',
    `import { NgModule } from '@angular/core';\nimport { TilburgAlert } from './alert/component';\nimport { TilburgTable } from './table/component';\n\nconst components = [\n  TilburgAlert,\n  TilburgTable,\n];\n\n@NgModule({ declarations: [...components], exports: [...components] })\nexport class TilburgComponentsModule {}\n`,
  );
  write(
    'packages/storybook/config/preview.tsx',
    `import '@gemeente-tilburg/components-css/alert/index.scss';\nimport '@gemeente-tilburg/components-css/table/index.scss';\n`,
  );
  write(
    'packages/storybook-angular/src/styles.scss',
    `@import "@gemeente-tilburg/components-css/alert/index";\n@import "@gemeente-tilburg/components-css/table/index";\n`,
  );
  write(
    'packages/storybook-shared/src/documentation/implementation-status.md',
    `# Status\n\n| Component | HTML/CSS | React | Angular | Web Components |\n| --------- | -------- | ----- | ------- | -------------- |\n| Alert     | ✅       | ✅    | ✅      | ✅             |\n| Table     | ✅       | ✅    | ✅      | ✅             |\n`,
  );
  mkdirSync(resolve(root, '.changeset'));
  return root;
}
const run = (root, args) =>
  runScript(resolve(root, 'scripts/new-component.mjs'), args, {
    cwd: root,
    env: { ...process.env, CI: '1', PATH: process.env.PATH },
  });
const read = (root, file) => readFileSync(resolve(root, file), 'utf8');

test('writes every layer from the HTML, registers it in sorted order, and derives the three templates', () => {
  const root = repo();
  const { status, output } = run(root, [
    'badge-label',
    '--html',
    '<span class="utrecht-badge-label" role="status">Nieuw</span>',
  ]);
  assert.equal(status, 0, output);
  for (const file of [
    'packages/components-css/badge-label/index.scss',
    'packages/storybook-shared/src/tilburg-badge-label.examples.ts',
    'packages/storybook/src/tilburg-badge-label.stories.tsx',
    'packages/storybook/src/tilburg-badge-label-react.stories.tsx',
    'packages/storybook/src/tilburg-badge-label-wbc.stories.tsx',
    'packages/storybook-angular/src/tilburg-badge-label-html.stories.ts',
    'packages/storybook-angular/src/tilburg-badge-label.stories.ts',
    'packages/components-react/src/BadgeLabel.tsx',
    'packages/components-react/src/BadgeLabel.test.tsx',
    'packages/components-angular/src/badge-label/component.ts',
    'packages/components-angular/src/badge-label/component.spec.ts',
    'packages/web-components-stencil/src/badge-label/component.tsx',
    'packages/web-components-stencil/src/badge-label/component.spec.tsx',
    '.changeset/badge-label.md',
  ])
    assert.ok(existsSync(resolve(root, file)), `${file} should be written`);

  /* Between alert and table, in every list. */
  assert.match(
    read(root, 'packages/components-react/src/index.ts'),
    /Alert';\nexport \{ BadgeLabel \} from '\.\/BadgeLabel';\nexport type \{ BadgeLabelProps \}[^\n]*\nexport \{ Table \}/,
  );
  assert.match(
    read(root, 'packages/components-angular/src/components.ts'),
    /alert\/component';\nexport \* from '\.\/badge-label\/component';\nexport \* from '\.\/table/,
  );
  const module = read(root, 'packages/components-angular/src/index.module.ts');
  assert.match(
    module,
    /alert\/component';\nimport \{ TilburgBadgeLabel \} from '\.\/badge-label\/component';\nimport \{ TilburgTable \}/,
  );
  assert.match(module, /TilburgTable,\n  TilburgBadgeLabel,\n\];/);
  assert.match(
    read(root, 'packages/storybook/config/preview.tsx'),
    /alert\/index\.scss';\nimport '@gemeente-tilburg\/components-css\/badge-label\/index\.scss';\nimport .*table/,
  );
  assert.match(
    read(root, 'packages/storybook-angular/src/styles.scss'),
    /alert\/index";\n@import "@gemeente-tilburg\/components-css\/badge-label\/index";\n@import .*table/,
  );
  assert.match(
    read(root, 'packages/storybook-shared/src/documentation/implementation-status.md'),
    /\| Alert[^\n]*\n\| Badge Label \| ✅\s+\| ✅\s+\| ✅\s+\| ✅\s+\|\n\| Table/,
  );

  /* The templates come from the markup; the content is the children slot. */
  assert.match(
    read(root, 'packages/components-react/src/BadgeLabel.tsx'),
    /<span ref=\{ref\} className=\{clsx\('utrecht-badge-label', className\)\} role="status" \{\.\.\.restProps\}>\n\s+\{children\}/,
  );
  assert.equal(
    read(root, 'packages/components-angular/src/badge-label/index.html'),
    '<span class="utrecht-badge-label" role="status"><ng-content></ng-content></span>\n',
  );
  assert.match(
    read(root, 'packages/web-components-stencil/src/badge-label/component.tsx'),
    /<span class="utrecht-badge-label" role="status">\n\s+<slot \/>/,
  );
  const examples = read(root, 'packages/storybook-shared/src/tilburg-badge-label.examples.ts');
  assert.match(examples, /<span class="utrecht-badge-label" role="status">Nieuw<\/span>/);
  assert.match(examples, /### Plain HTML \/ CSS/);
  assert.match(read(root, 'packages/components-css/badge-label/index.scss'), /^\.utrecht-badge-label \{/m);
});

test('without --html it is a div with content; --tlb gives the tilburg class and tag; a file works as --html', () => {
  const root = repo();
  assert.equal(run(root, ['note']).status, 0);
  assert.match(
    read(root, 'packages/components-angular/src/note/index.html'),
    /^<div class="utrecht-note"><ng-content>/,
  );
  assert.equal(run(root, ['own-thing', '--tlb']).status, 0);
  assert.match(read(root, 'packages/components-css/own-thing/index.scss'), /^\.tilburg-own-thing \{/m);
  assert.match(read(root, 'packages/storybook/src/tilburg-own-thing.stories.tsx'), /tags: \['autodocs', 'tilburg'\]/);
  writeFileSync(resolve(root, 'ref.html'), '<hr class="utrecht-rule" />\n');
  assert.equal(run(root, ['rule', '--html', resolve(root, 'ref.html')]).status, 0);
  assert.match(
    read(root, 'packages/components-react/src/Rule.tsx'),
    /<hr ref=\{ref\} className=\{clsx\('utrecht-rule', className\)\} \{\.\.\.restProps\} \/>/,
  );
  assert.doesNotMatch(read(root, 'packages/components-react/src/Rule.tsx'), /children/);
});

test('refuses a bad name, HTML that is not one element, and a component that exists', () => {
  const root = repo();
  let result = run(root, ['Badge Label']);
  assert.equal(result.status, 1);
  assert.match(result.output, /not a component name/);
  result = run(root, ['badge', '--html', '<p>a</p><p>b</p>']);
  assert.equal(result.status, 1);
  assert.match(result.output, /one root element/);
  assert.ok(!existsSync(resolve(root, 'packages/components-css/badge')), 'nothing written on refusal');
  assert.equal(run(root, ['badge']).status, 0);
  result = run(root, ['badge']);
  assert.equal(result.status, 1);
  assert.match(result.output, /Badge exists already/);
  assert.match(result.output, /pnpm parity badge/);
});
