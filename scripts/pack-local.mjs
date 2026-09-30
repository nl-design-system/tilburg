/* Builds the Tilburg packages and packs them as tarballs into `.tarballs/`, so another local repository (for
   example HLTsamen) can install them with `file:../tilburg/.tarballs/<name>.tgz` before anything is published.

   Uses `pnpm pack` (not `npm pack`) so `workspace:*` dependencies become real versions. The Angular package is
   packed from its ng-packagr output (`dist/`); the others from the package root, so import paths such as
   `@gemeente-tilburg/design-tokens/dist/tilburg/theme.css` stay the same as after an npm release. */
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
    packDir: 'dist',
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
  run(`pnpm pack --pack-destination ${out}`, resolve(root, pkg.dir, pkg.packDir ?? '.'));
}

console.log(`\nTarballs in ${out}:`);
for (const file of readdirSync(out).sort()) console.log(`  ${file}`);
