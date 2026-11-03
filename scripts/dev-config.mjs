/* Everything the developer scripts need to know about this repository, in one place: Node and pnpm, the Storybook
   ports, the libraries the Storybooks load from their build output, and the repositories that consume our tarballs.
   The scripts in this folder use Node built-ins only, so they also run before `pnpm install`. */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

/* Not import.meta.dirname: `node scripts/setup.mjs` has to work on the old Node it is about to replace. */
export const ROOT = resolve(fileURLToPath(new URL('.', import.meta.url)), '..');

/* A package.json that does not parse (merge conflict markers, a half-saved edit) must not crash every script before
   it can say so: `pnpm check` reports it (checkPackageJson). */
let rootPackage = {};
try {
  rootPackage = JSON.parse(readFileSync(resolve(ROOT, 'package.json'), 'utf8'));
} catch {
  /* reported by pnpm check (checkPackageJson) */
}

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
       another port (it once moved onto 6007, the Angular Storybook's port); `pnpm dev` picks the port itself.
       `--host 0.0.0.0`: Storybook 10 listens on localhost only by default; this keeps the "network" link working. */
    command: (port) =>
      `pnpm --filter @gemeente-tilburg/storybook exec storybook dev --config-dir config/ --port ${port} --ci --exact-port --host 0.0.0.0`,
    note: 'HTML, React and Web Components',
    /* A story only this Storybook has: tells it apart from the Angular one (and from other Storybooks) on a port. */
    storyId: /^tilburg-.+-react--/,
  },
  angular: {
    name: 'Angular Storybook',
    port: 6007,
    filter: '@gemeente-tilburg/storybook-angular',
    /* `--ci` here too: without it the builder opens its own browser tab and, on a taken port, asks a question nobody
       can answer (stdin is closed). It has no `--exact-port`. */
    command: (port) =>
      `pnpm --filter @gemeente-tilburg/storybook-angular exec ng run storybook-angular:storybook --port ${port} --host 0.0.0.0 --ci`,
    note: 'Angular and HTML',
    storyId: /^tilburg-.+-angular--/,
  },
};

/**
 * The libraries the Storybooks import from their build output (`dist/`), not from source. `src` is what a change
 * is made in, `built` is the file whose age says how fresh the build is. `for` lists the Storybooks that need it.
 * `done` and `failed` match the watcher's output after a rebuild; `pnpm dev` reports those lines and hides the rest.
 * `keepsDist`: its watcher writes over dist/ instead of emptying it first (ng-packagr and Stencil empty it), so pnpm dev
 * need not wait for it when the build is up to date.
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
      /* Double quotes: cmd.exe on Windows does not know single ones (and they keep the globs from the shell too). */
      'pnpm --filter @gemeente-tilburg/design-tokens exec chokidar --follow-symlinks --command "pnpm run build" "src/**/*.json" "figma/**/*.json" "high-contrast/**/*"',
    done: /Build process finished/,
    failed: /Error:|ERR!|\[error\]/i,
    for: ['react', 'angular'],
  },
  {
    key: 'react',
    name: 'components-react',
    dir: 'packages/components-react',
    /* Its build config and the SCSS it imports from components-css change the build too (a branch switch, say). */
    src: ['src', '../components-css', 'package.json', 'vite.config.ts', 'tsconfig.json', 'tsconfig.build.json'],
    built: 'dist/index.esm.js',
    build: 'pnpm --filter @gemeente-tilburg/components-react run build',
    /* `--emptyOutDir false`, or every rebuild deletes the type declarations `build:types` wrote. */
    watch: 'pnpm --filter @gemeente-tilburg/components-react exec vite build --watch --emptyOutDir false',
    keepsDist: true,
    done: /built in \d/,
    /* `[vite:css] …` is how a watch-mode error starts (no "error" in it); a line that says "warn" is not one. */
    failed: /Build failed|error during build|Transform failed|\[vite:[\w-]+\](?!.*warn)|RollupError/i,
    for: ['react'],
  },
  {
    key: 'stencil',
    name: 'web-components-stencil',
    dir: 'packages/web-components-stencil',
    src: ['src'],
    /* ponytail: Stencil rewrites only files whose content changed, and this one never does, so after a dev-time
       rebuild it reads as stale until a full build. Needs libraryState to take the newest file below dist/. */
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
    /* pnpm dev starts its watcher after Stencil's first build: before it, src/components.ts may not exist yet. */
    after: 'stencil',
    build: 'pnpm --filter @gemeente-tilburg/web-components-react run build',
    watch: 'pnpm --filter @gemeente-tilburg/web-components-react exec tsc -p . --watch --preserveWatchOutput',
    keepsDist: true,
    done: /Found 0 errors/,
    failed: /Found [1-9]\d* errors?|error TS\d+/,
    for: ['react'],
  },
  {
    key: 'angular',
    name: 'components-angular',
    dir: 'packages/components-angular',
    src: [
      'src',
      '../components-css',
      'package.json',
      'angular.json',
      'ng-package.json',
      'tsconfig.json',
      'tsconfig.prod.json',
    ],
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
    /* Its sync looks for the 0.0.0 / 0.0.1 file names unless told where the tarballs are. */
    tarballEnv: { 'components-angular': 'TILBURG_NLDS_TARBALL', 'design-tokens': 'TILBURG_NLDS_TOKENS_TARBALL' },
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
