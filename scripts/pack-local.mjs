/* Builds the Tilburg packages and packs them as tarballs into `.tarballs/`, so another local repository (for
   example HLTsamen) can install them with `file:../tilburg/.tarballs/<name>.tgz` before anything is published.

   Uses `pnpm pack` (not `npm pack`) so `workspace:*` dependencies become real versions. Every package is packed
   from its root, exactly as CI publishes it, so import paths such as
   `@gemeente-tilburg/design-tokens/dist/tilburg/theme.css` stay the same as after an npm release. The Angular
   package must not be packed from its ng-packagr output (`dist/`): the package.json copied there keeps
   `"files": ["dist/"]`, which matches nothing inside dist/, so the tarball would hold no bundle at all. */
import { execSync } from 'node:child_process';
import { mkdirSync, readdirSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const out = resolve(root, '.tarballs');

const packages = [
  { name: '@gemeente-tilburg/design-tokens', dir: 'proprietary/design-tokens', build: 'build' },
  { name: '@gemeente-tilburg/components-css', dir: 'packages/components-css' },
  { name: '@gemeente-tilburg/components-react', dir: 'packages/components-react', build: 'build' },
  { name: '@gemeente-tilburg/web-components-stencil', dir: 'packages/web-components-stencil', build: 'build' },
  { name: '@gemeente-tilburg/web-components-react', dir: 'packages/web-components-react', build: 'build' },
  {
    name: '@gemeente-tilburg/components-angular',
    dir: 'packages/components-angular',
    build: 'build:components',
  },
  { name: '@gemeente-tilburg/storybook-shared', dir: 'packages/storybook-shared', build: 'build' },
];

const run = (command, cwd = root) => execSync(command, { cwd, stdio: 'inherit' });

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

for (const pkg of packages) {
  if (pkg.build) {
    console.log(`\n▶ build ${pkg.name}`);
    run(`pnpm --filter ${pkg.name} run ${pkg.build}`);
  }
  console.log(`\n▶ pack ${pkg.name}`);
  run(`pnpm pack --pack-destination ${out}`, resolve(root, pkg.dir));
}

console.log(`\nTarballs in ${out}:`);
for (const file of readdirSync(out).sort()) console.log(`  ${file}`);
