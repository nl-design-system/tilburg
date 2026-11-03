/* Builds the Tilburg packages and packs them as tarballs into `.tarballs/`, so another local repository (for
   example HLTsamen) can install them with `file:../tilburg/.tarballs/<name>.tgz` before anything is published.

   Uses `pnpm pack` (not `npm pack`) so `workspace:*` dependencies become real versions. Every package is packed
   from its root, exactly as CI publishes it, so import paths such as
   `@gemeente-tilburg/design-tokens/dist/tilburg/theme.css` stay the same as after an npm release. The Angular
   package must not be packed from its ng-packagr output (`dist/`): the package.json copied there keeps
   `"files": ["dist/"]`, which matches nothing inside dist/, so the tarball would hold no bundle at all. */
import { execSync } from 'node:child_process';
import { mkdirSync, readdirSync, renameSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { confirmNoDevRunning } from './lib/lock.mjs';

/* Not import.meta.dirname: Node before 20.11 has none. */
const root = resolve(fileURLToPath(new URL('.', import.meta.url)), '..');
const out = resolve(root, '.tarballs');
/* Packed here first and moved up at the end: a run stopped half-way (Ctrl-C, a kill) leaves no half set in
   .tarballs/ for a consumer to install. */
const partial = resolve(out, '.partial');

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

if (!(await confirmNoDevRunning('pack:local builds every package, and'))) process.exit(1);

/* The previous set stays in .tarballs/ until this one is complete: a failed build leaves a consumer something to install. */
rmSync(partial, { recursive: true, force: true });
mkdirSync(partial, { recursive: true });

for (const pkg of packages) {
  try {
    if (pkg.build) {
      console.log(`\n▶ build ${pkg.name}`);
      run(`pnpm --filter ${pkg.name} run ${pkg.build}`);
    }
    console.log(`\n▶ pack ${pkg.name}`);
    run(`pnpm pack --pack-destination "${partial}"`, resolve(root, pkg.dir));
  } catch (err) {
    rmSync(partial, { recursive: true, force: true });
    console.error(
      `\n✗ ${pkg.name} failed (${err.message.split('\n')[0]}); see the output above. .tarballs/ still has the previous set.`,
    );
    process.exit(1);
  }
}

for (const file of readdirSync(out)) if (file.endsWith('.tgz')) rmSync(resolve(out, file));
for (const file of readdirSync(partial)) renameSync(resolve(partial, file), resolve(out, file));
rmSync(partial, { recursive: true });

console.log(`\nTarballs in ${out}:`);
for (const file of readdirSync(out).sort()) console.log(`  ${file}`);
