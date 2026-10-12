/* Everything the developer scripts need to know about this repository, in one place: Node and pnpm, the Storybook
   ports, the libraries the Storybooks load from their build output, and the repositories that consume our tarballs.
   The scripts in this folder use Node built-ins only, so they also run before `pnpm install`. */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

/* Not import.meta.dirname: `node scripts/setup.mjs` has to work on the old Node it is about to replace. */
export const ROOT = resolve(fileURLToPath(new URL('.', import.meta.url)), '..');

const rootPackage = JSON.parse(readFileSync(resolve(ROOT, 'package.json'), 'utf8'));

/**
 * `.nvmrc` pins the major version; `engines` and pnpm's `engineStrict` refuse anything else at install time. "24",
 * "v24" and "24.19.0" all read as 24; anything else (an alias like lts/*) is NaN, which the checks report.
 */
export const NODE_MAJOR = (() => {
  try {
    return parseInt(readFileSync(resolve(ROOT, '.nvmrc'), 'utf8').trim().replace(/^v/, ''), 10);
  } catch {
    return NaN;
  }
})();

/** `packageManager` is what corepack installs, e.g. `pnpm@11.15.1+sha512…` → `11.15.1`. */
export const PNPM_VERSION = rootPackage.packageManager?.match(/^pnpm@([^+]+)/)?.[1] ?? null;

export const STORYBOOKS = {
  react: {
    name: 'React Storybook',
    port: 6006,
    filter: '@gemeente-tilburg/storybook',
    /* `--ci`: no browser and no "use another port?" question. `--exact-port`: stop instead of quietly moving to
       another port (it once moved onto 6007, the Angular Storybook's port); `pnpm dev` picks the port itself. */
    command: (port) =>
      `pnpm --filter @gemeente-tilburg/storybook exec storybook dev --config-dir config/ --port ${port} --ci --exact-port`,
    note: 'HTML, React and Web Components',
  },
  angular: {
    name: 'Angular Storybook',
    port: 6007,
    filter: '@gemeente-tilburg/storybook-angular',
    command: (port) =>
      `pnpm --filter @gemeente-tilburg/storybook-angular exec ng run storybook-angular:storybook --port ${port}`,
    note: 'Angular and HTML',
  },
};

/**
 * The libraries the Storybooks import from their build output (`dist/`), not from source. `src` is what a change
 * is made in, `built` is the file whose age says how fresh the build is. `for` lists the Storybooks that need it.
 * `done` and `failed` match the watcher's output after a rebuild; `pnpm dev` reports those lines and hides the rest.
 * `components-css` and `storybook-shared` are missing on purpose: the Storybooks read those from source.
 */
export const LIBRARIES = [
  {
    key: 'tokens',
    name: 'design-tokens',
    dir: 'proprietary/design-tokens',
    src: ['src', 'figma', 'high-contrast', 'style-dictionary-build.mjs', 'style-dictionary-config.mjs', 'config.json'],
    built: 'dist/tilburg/theme.css',
    build: 'pnpm --filter @gemeente-tilburg/design-tokens run build',
    /* Without `--initial`: dev.mjs has just built it. Also watches figma/ and high-contrast/, which the package's own
       `watch` script misses. */
    watch:
      "pnpm --filter @gemeente-tilburg/design-tokens exec chokidar --follow-symlinks --command 'pnpm run build' 'src/**/*.json' 'figma/**/*.json' 'high-contrast/**/*'",
    done: /Build process finished/,
    failed: /Error:|ERR!|\[error\]/i,
    for: ['react', 'angular'],
  },
  {
    key: 'react',
    name: 'components-react',
    dir: 'packages/components-react',
    src: ['src'],
    built: 'dist/index.esm.js',
    build: 'pnpm --filter @gemeente-tilburg/components-react run build',
    /* `--emptyOutDir false`, or every rebuild deletes the type declarations `build:types` wrote. */
    watch: 'pnpm --filter @gemeente-tilburg/components-react exec vite build --watch --emptyOutDir false',
    done: /built in \d/,
    failed: /Build failed|error during build|Transform failed|\[vite:[\w-]+\]|RollupError/i,
    for: ['react'],
  },
  {
    key: 'stencil',
    name: 'web-components-stencil',
    dir: 'packages/web-components-stencil',
    src: ['src'],
    built: 'dist/index.js',
    build: 'pnpm --filter @gemeente-tilburg/web-components-stencil run build',
    /* Not the package's `watch`: that one also starts the tests in watch mode. */
    watch: 'pnpm --filter @gemeente-tilburg/web-components-stencil run watch:stencil',
    done: /build finished/,
    failed: /\[ ERROR \]/,
    for: ['react'],
  },
  {
    key: 'wc-react',
    name: 'web-components-react',
    dir: 'packages/web-components-react',
    /* Only src/index.ts is written by hand: the Stencil build regenerates components.ts and react-component-lib/ on
       every build, also when nothing changed (and tsc then writes no new output), so they would always look stale.
       Their freshness is Stencil's row. */
    src: ['src/index.ts'],
    built: 'dist/index.js',
    build: 'pnpm --filter @gemeente-tilburg/web-components-react run build',
    watch: 'pnpm --filter @gemeente-tilburg/web-components-react exec tsc -p . --watch --preserveWatchOutput',
    done: /Found 0 errors/,
    failed: /Found [1-9]\d* errors?|error TS\d+/,
    for: ['react'],
  },
  {
    key: 'angular',
    name: 'components-angular',
    dir: 'packages/components-angular',
    src: ['src'],
    built: 'dist/fesm2022/gemeente-tilburg-components-angular.mjs',
    build: 'pnpm --filter @gemeente-tilburg/components-angular run build:components',
    watch: 'pnpm --filter @gemeente-tilburg/components-angular run watch:build',
    /* Not "Compilation complete" too: in watch mode ng-packagr prints both for one build. */
    done: /Built @gemeente-tilburg\/components-angular/,
    failed: /✖|ERROR|error TS\d+|error NG\d+/,
    for: ['angular'],
  },
];

/**
 * Sibling repositories that install our tarballs, for `pnpm sync` only (not everyone has them, so `pnpm check` does
 * not list them). Each keeps its own sync logic (lockfile hashes, cache wipes); we
 * only pack and then call it.
 */
export const CONSUMERS = [
  {
    key: 'bq-tlb-frontend',
    dir: resolve(ROOT, '..', 'bq-tlb-frontend'),
    /* It copies the `pack:dist` tarballs of these two, always together: components built against newer tokens lose
       their styling. */
    pack: ['components-angular', 'design-tokens'],
    sync: 'npm run sync:tilburg-nlds',
    /* Checked before running, so an older checkout gets "pull it" instead of npm's missing-script error. */
    requires: ['sync:tilburg-nlds'],
  },
  {
    key: 'hltsamen',
    dir: resolve(ROOT, '..', 'hltsamen'),
    /* It installs every tarball from `.tarballs/` (`pnpm run pack:local`) and copies the stories. Its own
       `update:tilburg` would pack again, so only the install and the story sync are run here. */
    pack: ['all'],
    sync: 'pnpm install && pnpm run sync-stories',
    requires: ['sync-stories'],
  },
];
