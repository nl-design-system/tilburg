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
import { parseArgs } from 'node:util';
import { fail, installCrashHandler } from './lib/cli-utils.mjs';
import { confirmNoDevRunning, readDevLock, SYNC_LOCK, writeDevLock } from './lib/lock.mjs';

/* The sudo guard. signals: false, so Ctrl-C still stops the synchronous builds below at once. */
installCrashHandler('pnpm pack:local', { signals: false });

/* Strict: `--dry-run` or a typo must not start a full build and pack. */
try {
  if (parseArgs({ options: { help: { type: 'boolean', short: 'h' } } }).values.help) {
    console.log('pnpm pack:local: builds every package and packs it into .tarballs/ (no options).');
    process.exit(0);
  }
} catch (err) {
  fail({ what: err.message, fix: 'pnpm pack:local' });
  process.exit(1);
}

/* Not import.meta.dirname: Node before 20.11 has none. */
const root = resolve(fileURLToPath(new URL('.', import.meta.url)), '..');
const out = resolve(root, '.tarballs');
/* Packed here first and moved up at the end: a run stopped half-way (Ctrl-C, a kill) leaves no half set in
   .tarballs/ for a consumer to install. */
const partial = resolve(out, `.partial-${process.pid}`);

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

/* One build at a time (sync, verify, pack:local share this lock): a second run would wipe the first one's dist/ and
   tarballs. pnpm sync starts this one itself, holding the lock: TILBURG_SYNC_PID says so. */
const other = readDevLock(SYNC_LOCK);
if (other && String(other.pid) !== process.env.TILBURG_SYNC_PID) {
  fail({
    what: `${other.what ?? 'pnpm sync'} is running (process ${other.pid}, since ${other.started})`,
    why: 'it builds the same dist/ folders and tarballs.',
    fix: 'wait for it to finish, then pnpm pack:local again',
  });
  process.exit(1);
}
if (!other && !writeDevLock({ what: 'pnpm pack:local' }, SYNC_LOCK)) {
  fail({
    what: 'Another build took the build lock just now',
    why: 'it started between the check above and this one; two builds at once fail with EEXIST.',
    fix: 'wait for it to finish, then run this again',
  });
  process.exit(1);
}
if (!(await confirmNoDevRunning('pack:local builds every package, and'))) {
  console.log('  Stopped: stop pnpm dev with q, then run this again.');
  process.exit(1);
}

/* The previous set stays in .tarballs/ until this one is complete: a failed build leaves a consumer something to install.
   Under the lock nobody else packs, so any .partial-* left is from a run that was killed. */
mkdirSync(out, { recursive: true });
for (const file of readdirSync(out))
  if (file.startsWith('.partial')) rmSync(resolve(out, file), { recursive: true, force: true });
mkdirSync(partial, { recursive: true });

for (const pkg of packages) {
  try {
    if (pkg.build) {
      /* Not every build cleans first (tsc, style-dictionary): output of another branch would be packed too. Not the
         package's clean script: web-components-react's deletes the sources Stencil generated just before. */
      rmSync(resolve(root, pkg.dir, 'dist'), { recursive: true, force: true });
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
rmSync(partial, { recursive: true, force: true });

console.log(`\nTarballs in ${out}:`);
for (const file of readdirSync(out).sort()) console.log(`  ${file}`);
