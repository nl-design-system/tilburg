/* Recognise why a step failed, fix it when that is safe, and otherwise say what broke and what to do.

   classifyFailure() is pure: output in, diagnosis out. The list starts with what is particular to this repository
   (Node 24, pnpm 11 through corepack, the 24-hour release guard, the build-script allowlist, the Jest crash on
   Node 24, libraries the Storybooks load from dist/) before the generic causes. runStepWithRecovery() wraps runStep()
   and applies an automatic fix once (RECOVERIES). Fixes inside the repository (caches, node_modules, a build, the
   retry's environment or command) run by themselves; fixes that change the machine (corepack, nvm, git's global
   config) ask first, and never run without a terminal. Every failure also keeps its manual fix. */
import { spawnSync } from 'node:child_process';
import { readdirSync, readFileSync, rmSync, statSync } from 'node:fs';
import { homedir } from 'node:os';
import { basename, dirname, resolve, sep } from 'node:path';
import { setTimeout as sleep } from 'node:timers/promises';
import { NODE_MAJOR, ROOT } from '../dev-config.mjs';
import {
  c,
  confirm,
  fail,
  interactive,
  printError,
  printFullOutput,
  printToolOutput,
  runStep,
  stepDone,
  stepFail,
  stepStart,
  stripAnsi,
} from './cli-utils.mjs';
import { readDevLock } from './lock.mjs';

/* Ordered: the first match wins, so specific causes come before generic ones. */
export const FAILURES = [
  {
    kind: 'node-version',
    test: /ERR_UNKNOWN_BUILTIN_MODULE|node:sqlite|requires at least Node|ERR_PNPM_UNSUPPORTED_ENGINE|Node\.js version v[\d.]+ detected/i,
    why: 'This is not the Node the repo needs. pnpm 11 needs a newer Node (it uses node:sqlite), and engines (with engineStrict) needs Node 24, 24.15 or newer (Angular 22).',
    fix: 'nvm install   (installs and switches to the newest Node from .nvmrc), then run the command again in that terminal',
  },
  {
    kind: 'pnpm-version',
    test: /ERR_PNPM_BAD_PM_VERSION|This project is configured to use .*pnpm|packageManager.* but/i,
    why: 'Another pnpm than the one in package.json "packageManager" is running.',
    fix: 'corepack enable   (corepack then runs the pinned pnpm in this folder)',
  },
  {
    kind: 'corepack-keys',
    /* corepack 0.14 (Node 18) runs pnpm 11 through a vm without dynamic import, which Node 24 refuses. */
    test: /Cannot find matching keyid|corepack.*signature|ERR_VM_DYNAMIC_IMPORT_CALLBACK_MISSING[\s\S]*corepack/i,
    why: 'Your corepack is too old: older than the signing key of the pnpm it has to download (it refuses the download), or too old for this Node (it crashes with ERR_VM_DYNAMIC_IMPORT_CALLBACK_MISSING).',
    fix: 'npm install -g corepack@latest, then corepack enable',
  },
  {
    kind: 'corepack-missing',
    /* Node 25 and later no longer ship corepack; Homebrew and `pnpm env` Node never did. */
    test: /corepack: (command )?not found|'corepack' is not recognized/i,
    why: 'corepack is not installed. Node 25 and later no longer include it, nor does a Node from Homebrew or pnpm env.',
    fix: 'npm install -g corepack, then corepack enable',
  },
  {
    kind: 'wrong-package-manager',
    test: /This project is configured to use (yarn|npm)\b|please use pnpm/i,
    why: 'The package manager does not fit the folder: npm or yarn in this pnpm repository (.npmrc engine-strict stops npm), or pnpm in a folder whose "packageManager" names yarn or npm.',
    fix: 'here: corepack enable, then pnpm install; in another folder: the package manager its package.json names',
  },
  {
    kind: 'push-rejected',
    test: /\[rejected\]|non-fast-forward|Updates were rejected|\(fetch first\)/i,
    why: 'The branch on origin has commits you do not have (pushed from elsewhere, or rewritten by a rebase).',
    fix: 'git pull --rebase origin <branch>, then run it again (after a rebase of your own: git push --force-with-lease origin HEAD)',
  },
  {
    /* Before git-auth: GitHub answers 403 here too, but the login worked; the account may only not write there. */
    kind: 'git-no-access',
    test: /Permission to \S+ denied to/i,
    why: 'git logged in to origin, but this account may not push to that repository (a fork, or no write access).',
    fix: 'push to your fork (git remote -v), or ask for write access to the repository',
  },
  {
    kind: 'git-auth',
    test: /Permission denied \(publickey\)|Authentication failed|could not read Username|terminal prompts disabled|The requested URL returned error: 40[13]/i,
    why: 'git could not log in to origin.',
    fix: 'over HTTPS: gh auth login (or a credential helper); over SSH: ssh-add, and check ssh -T git@github.com',
  },
  {
    kind: 'git-unsafe',
    test: /dubious ownership|safe\.directory/i,
    why: 'git refuses this repository because another user owns the folder (common in Docker, WSL, or after sudo).',
    fix: 'git config --global --add safe.directory "<the path in the message>" (or chown the folder to yourself)',
  },
  {
    kind: 'git-lock',
    test: /index\.lock'?: File exists|Another git process seems to be running/i,
    why: 'Another git process holds the index lock, or one crashed earlier and left .git/index.lock behind.',
    fix: 'close editors or git tools that may be committing; if none is running: delete the index.lock the message names',
  },
  {
    kind: 'not-a-repo',
    test: /not a git repository/i,
    why: 'This folder is not a git checkout (a downloaded zip, or the command ran in the wrong folder).',
    fix: 'git clone the repository and run the command inside it',
  },
  {
    kind: 'git-remote',
    test: /No configured push destination|does not appear to be a git repository|Could not read from remote repository|has no upstream branch/i,
    why: 'git cannot reach the remote: there is none, its URL is wrong, or the branch has no upstream.',
    fix: 'git remote -v shows the remotes; git push -u origin HEAD sets the upstream for a new branch',
  },
  {
    /* Steps run without a terminal: a passphrase, pinentry or password prompt fails instead of asking. */
    kind: 'needs-terminal',
    test: /\/dev\/tty|Device not configured|No such device or address|\bENXIO\b|Inappropriate ioctl for device/i,
    why: 'The step wanted to ask for something (an ssh passphrase, a gpg pin, a password), and steps run without a terminal to ask in.',
    fix: 'run that command yourself in a terminal once (or load the key first: ssh-add), then run this again',
  },
  {
    kind: 'tls',
    /* Before network: a corporate proxy that intercepts TLS fails every retry the same way. */
    test: /SELF_SIGNED_CERT|UNABLE_TO_GET_ISSUER_CERT|UNABLE_TO_VERIFY_LEAF_SIGNATURE|CERT_HAS_EXPIRED|ERR_TLS_CERT|unable to get local issuer certificate/i,
    why: 'The TLS certificate of the registry could not be verified, usually a company proxy or VPN that inspects HTTPS traffic.',
    fix: 'point NODE_EXTRA_CA_CERTS at your company CA certificate (ask IT for the .pem), then retry. Do not turn off strict-ssl.',
  },
  {
    kind: 'package-not-found',
    test: /ERR_PNPM_FETCH_404|ERR_PNPM_NO_MATCHING_VERSION\b(?!_INSIDE)|\bE404\b/,
    why: 'The registry has no such package or version: a typo, a version that was never published, or a private scope you have no access to.',
    fix: 'check the name and version (pnpm view <package> versions); for a private scope, check the token in ~/.npmrc',
  },
  {
    /* pnpm wants to remove node_modules (another layout or pnpm setting), and asks first: steps have no terminal. */
    kind: 'modules-purge',
    test: /ERR_PNPM_ABORTED_REMOVE_MODULES_DIR_NO_TTY/,
    why: 'pnpm has to remove node_modules and install it again (a pnpm setting or the node_modules layout changed), and it only does that after asking.',
    fix: 'pnpm install in a terminal, and answer yes',
  },
  {
    kind: 'workspace-package',
    test: /ERR_PNPM_WORKSPACE_PKG_NOT_FOUND|ERR_PNPM_NO_MATCHING_VERSION_INSIDE_WORKSPACE/,
    why: 'A "workspace:" dependency names a package that is not (or no longer) in this workspace: renamed, removed, or a typo.',
    fix: 'fix the name in that package.json (the packages are in packages/ and proprietary/), then pnpm install',
  },
  {
    kind: 'offline-cache',
    test: /ERR_PNPM_NO_OFFLINE_META|ERR_PNPM_NO_OFFLINE_TARBALL/,
    why: 'An offline install needs a package that is not in the pnpm store yet.',
    fix: 'run the install once with a connection (without --offline)',
  },
  {
    kind: 'unexpected-store',
    test: /ERR_PNPM_UNEXPECTED_STORE|ERR_PNPM_UNEXPECTED_VIRTUAL_STORE/,
    why: 'node_modules was installed from another pnpm store (the store moved, or another pnpm version installed it).',
    fix: 'pnpm install (it relinks node_modules to the current store)',
  },
  {
    kind: 'registry-auth',
    test: /ERR_PNPM_FETCH_40[13]|\bE40[13]\b|40[13] (Unauthorized|Forbidden)/,
    why: 'The package registry refused the request: a missing or expired token, or no access to that scope.',
    fix: 'check the registry and token in ~/.npmrc (pnpm config get registry), then retry',
  },
  {
    kind: 'merge-conflict',
    test: /^(<{7}|>{7}) |ERR_PNPM_BROKEN_LOCKFILE|Merge conflict marker encountered|error TS1185|^CONFLICT \(|Automatic merge failed/m,
    why: 'A file still has merge-conflict markers in it, or pnpm-lock.yaml is broken by a merge.',
    fix: 'git diff --check shows where; for pnpm-lock.yaml: git checkout origin/main -- pnpm-lock.yaml && pnpm install',
  },
  {
    kind: 'invalid-package-json',
    test: /Invalid package\.json|ERR_PNPM_JSON_PARSE|package\.json[^\n]*(is not valid JSON|Unexpected token)/i,
    why: 'A package.json is not valid JSON (a missing comma or quote, or a half-resolved edit).',
    fix: "the message names the file; node -e \"JSON.parse(require('fs').readFileSync('<file>'))\" shows where it breaks",
  },
  {
    kind: 'command-not-found',
    /* `: not found` only at the end of a line (dash): pnpm's `GET …/pkg: Not Found - 404` is a missing package. */
    test: /command not found|: not found\r?$|is not recognized as an internal or external command|ERR_PNPM_RECURSIVE_EXEC_FIRST_FAIL.*not found|spawn \S+ ENOENT/im,
    why: 'A program the step needs is not installed, or not on your PATH (pnpm itself, or a tool from node_modules/.bin).',
    fix: 'pnpm check (for pnpm: corepack enable; for a tool: pnpm install)',
  },
  {
    kind: 'missing-script',
    test: /ERR_PNPM_NO_SCRIPT|Missing script:|missing script:|ERR_PNPM_RECURSIVE_RUN_NO_SCRIPT|None of the selected packages has a ".*" script/i,
    why: 'The package has no script by that name: an older checkout, or the script was renamed.',
    fix: 'update that repository (git pull), or look up the right name with pnpm run in its folder',
  },
  {
    kind: 'release-age',
    test: /ERR_PNPM_NO_MATURE_MATCHING_VERSION|minimumReleaseAge|published less than/i,
    why: 'That version was published less than 24 hours ago. minimumReleaseAge in pnpm-workspace.yaml holds new releases back on purpose (supply-chain attacks are usually caught within a day).',
    fix: 'wait until it is a day old, or pin the previous version. Do not lower the guard; only the scopes under minimumReleaseAgeExclude are excluded.',
  },
  {
    kind: 'ignored-builds',
    test: /ERR_PNPM_IGNORED_BUILDS|Ignored build scripts|approve-builds/i,
    why: 'A dependency wants to run an install script. pnpm runs none unless the package is listed under allowBuilds in pnpm-workspace.yaml.',
    fix: 'check what the package does, then add it to allowBuilds in pnpm-workspace.yaml and run pnpm install again',
  },
  {
    kind: 'outdated-lockfile',
    test: /ERR_PNPM_OUTDATED_LOCKFILE|lockfile.*not up to date|frozen-lockfile/i,
    why: 'A package.json changed without pnpm-lock.yaml (CI installs with --frozen-lockfile).',
    fix: 'pnpm install, and commit pnpm-lock.yaml together with the package.json change',
  },
  {
    kind: 'audit',
    test: /\d+ vulnerabilit(y|ies) found[\s\S]*critical|│ critical/i,
    why: 'pnpm audit found a critical advisory. CI runs pnpm audit --audit-level critical before installing and stops on it.',
    fix: 'upgrade the package, or add an override in pnpm-workspace.yaml (with a comment saying when it can go), then pnpm install',
  },
  {
    kind: 'stencil-jest',
    test: /Please install supported versions of dev dependencies/,
    why: "Stencil's Jest is missing or an unsupported version (Stencil 4 tests with Jest 29).",
    fix: 'pnpm install (the npm install line Stencil prints does not apply: this repository uses pnpm)',
  },
  {
    kind: 'jest-crash',
    test: /SIGSEGV|Segmentation fault|exit code 139|code 139|Jest worker encountered \d+ child process exceptions/i,
    why: 'A Jest worker crashed. Jest 29 workers crash now and then on Node 24; the Stencil tests run with --runInBand for that reason. It is not your test.',
    fix: 'run it again, or one package on its own: pnpm --filter <package> run test',
  },
  {
    kind: 'library-not-built',
    test: /(Failed to resolve (entry|import)|Cannot find module|Could not resolve|Module not found)[^\n]*@gemeente-tilburg\//i,
    why: 'A Storybook or package imports a Tilburg library from its build output (dist/), and that is missing.',
    fix: 'pnpm dev builds what is missing (or pnpm build for everything)',
  },
  {
    kind: 'dist-collision',
    test: /EEXIST: file already exists, mkdir .*(sb-manager|sb-addons|dist)/i,
    why: 'Two processes wrote the same dist/ folder at once (a second build, or pnpm dev, running at the same time).',
    fix: 'run it again once the other build has finished',
  },
  {
    kind: 'no-tests',
    test: /No tests found, exiting with code 1/,
    why: 'Jest found no test files for that pattern: a typo in the file or component name, or a testMatch that no longer fits.',
    fix: 'check the name; pnpm test <component> resolves names for you',
  },
  {
    kind: 'tests-failed',
    test: /Tests:\s+\d+ failed|Test Suites:\s+\d+ failed|✕ /,
    why: 'Tests failed; the reported lines below name the test and the expectation that did not hold.',
    fix: 'run that package on its own: pnpm --filter <package> run test (add -- -t "<test name>" for one test)',
  },
  {
    kind: 'ts-deprecated',
    /* TypeScript 6 makes options that TypeScript 7 drops (baseUrl, moduleResolution node, target ES5) an error. */
    test: /\bTS510[17]\b/,
    why: 'TypeScript 6 stops on a tsconfig option that is deprecated (TS5101/TS5107); changing the code does not help.',
    fix: 'replace the option the message names in that tsconfig.json, or add "ignoreDeprecations": "6.0" to its compilerOptions',
  },
  {
    kind: 'type-error',
    test: /error TS\d{4}|error NG\d{4}/,
    why: 'TypeScript or the Angular compiler found an error; the lines below give the file, line and message.',
    fix: 'fix the code at that line; pnpm dev shows the same error while you work',
  },
  {
    kind: 'sass-error',
    /* Sass frames the failing line in a ╷ … ╵ box and ends with "<file> <line>:<column>". */
    test: /Can't find stylesheet to import|Undefined (variable|mixin|function)\.|^\s*╷\s*$[\s\S]*?\.s[ac]ss \d+:\d+/m,
    why: 'A stylesheet does not compile; the lines below give the file, line and column.',
    fix: 'fix the SCSS at that line (an @use path is relative to the file, or resolved from node_modules)',
  },
  {
    kind: 'webpack-parse',
    test: /Module parse failed/,
    why: 'webpack (the Angular Storybook) cannot read an imported file: no loader handles that file type, or the file does not parse.',
    fix: 'the message names the file and line: fix the syntax there, or load a stylesheet through the component (styleUrl) or angular.json "styles" instead of importing it',
  },
  {
    kind: 'ng-packagr-dependency',
    test: /must be explicitly allowed using the "allowedNonPeerDependencies" option/,
    why: 'ng-packagr refuses a "dependencies" entry in the Angular library\'s package.json that ng-package.json does not allow (users would install it with the library).',
    fix: 'move it to peerDependencies, or add it to allowedNonPeerDependencies in ng-package.json',
  },
  {
    kind: 'token-reference',
    test: /Reference Errors:\s*\n\s*Some token references \(\d+\) could not be found/,
    why: 'A design token refers to a token that does not exist: a typo in a {…} reference, or a token that was renamed or removed.',
    fix: 'fix the {…} reference in proprietary/design-tokens/src; with log: { verbosity: "verbose" } in the style-dictionary config, the build names each one',
  },
  {
    kind: 'syntax-error',
    test: /^SyntaxError: /m,
    why: 'A JavaScript file does not parse; the first lines of the output give the file and line.',
    fix: 'fix the code at that line',
  },
  {
    kind: 'lint',
    test: /\bMD\d{3}\/|✖ \d+ problems?|\d+ problems? \(\d+ errors?|Code style issues found/,
    why: 'The linters found problems; the lines below give the file, line and rule.',
    fix: 'pnpm lint-fix repairs what it can (formatting, import order, markdown); fix the rest by hand',
  },
  {
    kind: 'permission',
    test: /\bEACCES\b|\bEPERM\b|permission denied/i,
    why: 'A file or folder is not writable for you, usually because something once ran with sudo (root-owned node_modules or ~/.cache).',
    fix: 'ls -l the path in the error; sudo chown -R "$(whoami)" <that folder>, then retry without sudo',
  },
  {
    kind: 'too-many-files',
    test: /\bEMFILE\b|too many open files/i,
    why: 'The process hit the open-file limit (watchers in pnpm dev open many files).',
    fix: 'ulimit -n 10240 in this terminal when ulimit -n shows less, then retry',
  },
  {
    kind: 'heap',
    test: /JavaScript heap out of memory|Reached heap limit|Allocation failed/i,
    why: 'Node ran out of memory during the build.',
    fix: 'export NODE_OPTIONS=--max-old-space-size=8192, then retry',
  },
  {
    kind: 'no-space',
    test: /\bENOSPC\b|no space left on device/i,
    why: 'The disk is full (or, on Linux, the inotify watcher limit: sudo sysctl fs.inotify.max_user_watches=524288).',
    fix: 'free some space (pnpm run clean:pick shows what takes room), then retry',
  },
  /* After the errno causes: an EACCES or ENOSPC on a file in .angular/cache is not a corrupt cache. */
  {
    kind: 'angular-cache',
    /* A truncated JSON file is only the cache's when .angular is named too: a broken package.json is not. */
    test: /\.angular[\\/]cache|Unexpected end of JSON input[\s\S]*\.angular\b|\.angular\b[\s\S]*Unexpected end of JSON input/i,
    why: 'The Angular build cache looks corrupt.',
    fix: 'pnpm run clean:pick and choose the .angular caches (and untick the rest), then retry',
  },
  {
    kind: 'integrity',
    test: /\bEINTEGRITY\b|ERR_PNPM_TARBALL_INTEGRITY|integrity checksum failed/i,
    why: 'A package in the pnpm store does not match its checksum.',
    fix: 'pnpm store prune, then pnpm install',
  },
  {
    kind: 'port-in-use',
    test: /EADDRINUSE|Port \d+ is (already in use|not available)/i,
    why: 'The port is taken by another process.',
    fix: 'pnpm dev picks a free port itself; otherwise stop the other server (lsof -i :<port>)',
  },
  {
    kind: 'network',
    test: /\bECONNRESET\b|\bETIMEDOUT\b|\bEAI_AGAIN\b|\bENOTFOUND\b|\bECONNREFUSED\b|socket hang up|ERR_PNPM_META_FETCH_FAIL/i,
    why: 'A network request failed mid-way.',
    fix: 'retry; if it keeps failing, check your connection',
  },
  {
    kind: 'wrong-arch',
    /* Native binaries installed for another CPU: a Rosetta (x64) terminal on Apple Silicon, or node_modules copied over. */
    test: /installed esbuild for another platform|Cannot find module\s+'?@rollup\/rollup-|@esbuild\/[\w-]+" package|sass-embedded-(darwin|linux|win32)-|lmdb-(darwin|linux|win32)-|was compiled against a different Node\.js version|NODE_MODULE_VERSION/i,
    why: 'node_modules holds native binaries for another CPU or Node version (a Rosetta terminal on an Apple Silicon Mac, a Node switch, or a copied node_modules).',
    fix: 'node -p process.arch should match this machine (uname -m; arm64 on Apple Silicon); then rm -rf node_modules and pnpm install',
  },
  {
    kind: 'missing-file',
    /* A path, not a package name (relative, or absolute: also `node <script>` started from the wrong folder): a typo, a
       deleted file, or the wrong folder. pnpm install does not fix any of those. */
    test: /Could not resolve "\.{1,2}\/|Cannot find module '(\/|\.{1,2}\/|[A-Za-z]:\\)|Failed to resolve import "\.{1,2}\/|Can't resolve '\.{1,2}\//,
    why: 'An import or a script path points at a file that does not exist: a typo, a file that was moved or deleted, or a command started from the wrong folder.',
    fix: 'the message names the missing path; fix it there, or run the command from the repository root',
  },
  {
    kind: 'missing-module',
    test: /Cannot find module|ERR_MODULE_NOT_FOUND|Cannot find package|Can't resolve '/i,
    why: 'A dependency is missing, usually after switching branches without installing.',
    fix: 'pnpm install',
  },
  /* After missing-module: a config that imports a package that is not installed needs pnpm install. */
  {
    kind: 'config-error',
    test: /failed to load config from|MainFileEvaluationError/,
    why: "A build config (vite.config or Storybook's main.ts) does not parse or throws while it loads; the error under it gives the line.",
    fix: 'fix that config file at the line the error names',
  },
  {
    kind: 'stencil-error',
    test: /^\[ ERROR \] /m,
    why: 'The Stencil compiler stopped on a component (a TypeScript error, or a decorator or tag it does not accept); the lines below give the file, line and message.',
    fix: 'fix the component at that line; pnpm dev shows the same error while you work',
  },
];

/* `pnpm --recursive run` puts the package before every line ("packages/x test: …"), which breaks the rules that start
   at ^. At least one slash, and no "(": "error TS2304: …" and "src/a.ts(3,4): error …" are not prefixes. */
const PNPM_PREFIX = /^(?:[\w@.-]+\/)+[\w@.-]+ [\w:-]+: /gm;
/* Passing tests: node:test (✔, TAP "ok 3 - …") and Jest (✓) print every test's name, and a name such as "recognises
   node-version: ERR_UNKNOWN_BUILTIN_MODULE" must not decide the kind. */
const PASSED_LINE = /^\s*(?:✔|✓|ok \d+ ).*$/gm;

/** Diagnose a failed step from its output and the error runStep() rejected with. */
export function classifyFailure(output = '', err = null) {
  /* Colour codes split tokens: stylelint prints `\x1b[31m✖\x1b[39m 2 problems` even with FORCE_COLOR=0. */
  output = stripAnsi(output).replace(PNPM_PREFIX, '').replace(PASSED_LINE, '');
  /* Node sets syscall to `spawn <program>`. With shell: true the program is the shell, so then the cwd is missing. */
  const spawnFailed = err?.code === 'ENOENT' && /^spawn/.test(err?.syscall ?? '') && !output;
  if (spawnFailed && !/(^|[\\/])(sh|cmd\.exe)$/i.test(err.path ?? '')) {
    return {
      kind: 'spawn',
      why: `Could not start \`${err.command ?? 'the command'}\`: ${err.path ?? 'the program'} was not found.`,
      fix: 'is it installed and on your PATH? (pnpm check)',
    };
  }
  if (err?.code === 'ENOENT' && !output) {
    return {
      kind: 'no-folder',
      why: `The folder to run it in does not exist (${err.cwd ?? 'see below'}).`,
      fix: 'check that the folder exists (a sibling repository that is not cloned yet, or a renamed package)',
    };
  }
  /* Ctrl-C or a kill from outside: someone meant it, so no automatic retry, whatever the output says. */
  if (['SIGINT', 'SIGTERM', 'SIGHUP'].includes(err?.signal)) {
    return { kind: 'stopped', why: `The step was stopped (${err.signal}).`, fix: 'run it again when you want to' };
  }
  /* Once Jest's or node:test's summary reports failures, a test's own name or message ("Authentication failed",
     "SIGSEGV handler", "config file: not found") must not decide the kind; only a real worker crash still counts. */
  const tests = FAILURES.find((failure) => failure.kind === 'tests-failed');
  if (
    /^(Tests|Test Suites):\s+\d+ failed|^(ℹ|#) fail [1-9]/m.test(output) &&
    !/terminated by another process|child process exceptions/i.test(output)
  ) {
    return { kind: tests.kind, why: tests.why, fix: tests.fix, auto: RECOVERIES[tests.kind]?.label };
  }
  for (const failure of FAILURES) {
    if (failure.test.test(output)) {
      return { kind: failure.kind, why: failure.why, fix: failure.fix, auto: RECOVERIES[failure.kind]?.label };
    }
  }
  /* The shell's own "not found" (127; cmd.exe: 9009), also when it says so in another language. */
  if (err?.exitCode === 127 || err?.exitCode === 9009) {
    const notFound = FAILURES.find((failure) => failure.kind === 'command-not-found');
    return { kind: notFound.kind, why: notFound.why, fix: notFound.fix };
  }
  if (err?.signal) {
    return {
      kind: 'killed',
      why: `The process was killed by ${err.signal} (usually out of memory).`,
      fix: 'retry',
    };
  }
  if (!output.trim()) {
    return {
      kind: 'silent',
      why: `It stopped with exit code ${err?.exitCode ?? '?'} without printing anything.`,
      fix: `run it yourself to see more: ${err?.command ?? 'the command'}`,
    };
  }
  return {
    kind: 'unknown',
    why: 'Not a failure these scripts recognise. This is what the tool itself said:',
    fix: null,
  };
}

/**
 * Why a fix that installs or builds in this repository must not run now: the step ran in another repository (a
 * consumer: its own install is npm's, in its own folder), or pnpm dev's watchers would see node_modules or dist/
 * change under them. null when it may run.
 */
function installSkip(cwd) {
  const dir = resolve(cwd ?? ROOT);
  if (dir !== ROOT && !dir.startsWith(`${ROOT}${sep}`)) return `it installs in tilburg, and this step ran in ${dir}`;
  /* own: called inside pnpm dev too (its first build), and then its own lock means its watchers are about to run. */
  const dev = readDevLock(undefined, { own: true });
  if (dev?.pid === process.pid)
    return 'pnpm dev itself started this step: stop it with q, run pnpm install, then pnpm dev again';
  if (dev) return `pnpm dev is running (process ${dev.pid}): stop it with q first, then run this again`;
  return null;
}

/**
 * Run a fix's command in the repository root as a step of its own: a spinner, a log, [v], and no time limit (an
 * install killed halfway leaves node_modules half linked). Throws with its last line of output when it fails.
 */
async function sh(command) {
  const step = stepStart(command);
  try {
    stepDone(step, await runStep(command, { cwd: ROOT, onVerbose: () => step.pause() }));
  } catch (err) {
    stepFail(step);
    const last = (err.output ?? '').trim().split('\n').pop();
    throw new Error(`${command} failed${last ? `: ${last}` : ''}${err.log ? ` (full output: ${err.log})` : ''}`);
  }
}

const version = (text) => text.replace(/^v/, '').split('.').map(Number);
const older = (a, b) => {
  const [x, y] = [version(a), version(b)];
  for (let i = 0; i < 3; i++) if ((x[i] ?? 0) !== (y[i] ?? 0)) return (x[i] ?? 0) < (y[i] ?? 0);
  return false;
};
/**
 * Does a git of ours run? true, false, or null when nobody can tell. Only our own user's: another user's git (or a
 * shared box) cannot hold our index.lock. Only pgrep's "no match" (1) proves no git runs.
 */
function gitRunning() {
  if (process.platform === 'win32') {
    const list = spawnSync('tasklist', ['/fi', 'imagename eq git.exe', '/nh'], { encoding: 'utf8' });
    return list.status === 0 ? /git\.exe/i.test(list.stdout) : null;
  }
  const status = spawnSync('pgrep', ['-U', String(process.getuid()), '-x', 'git']).status;
  return status === 0 ? true : status === 1 ? false : null;
}
const NVM_DIR = process.env.NVM_DIR ?? resolve(homedir(), '.nvm');
/** The lowest Node that package.json "engines" accepts, e.g. "24.15.0". */
export function enginesMinimum() {
  let range = '';
  try {
    range = JSON.parse(readFileSync(resolve(ROOT, 'package.json'), 'utf8')).engines?.node ?? '';
  } catch {
    /* a broken package.json is its own failure; here the .nvmrc major is enough */
  }
  return range.match(/>=\s*v?(\d+\.\d+\.\d+)/)?.[1] ?? `${NODE_MAJOR}.0.0`;
}
/** The newest Node of the .nvmrc major that nvm has installed, as a version without "v", or null. */
function newestNvmNode() {
  try {
    const versions = readdirSync(resolve(NVM_DIR, 'versions/node')).filter((v) => v.startsWith(`v${NODE_MAJOR}.`));
    return versions.sort((a, b) => (older(a, b) ? 1 : -1))[0]?.slice(1) ?? null;
  } catch {
    return null;
  }
}
const nodeNeedsInstall = () => {
  const newest = newestNvmNode();
  return !newest || older(newest, enginesMinimum());
};
/** On an Apple Silicon Mac, a terminal under Rosetta runs x64 Node: installs then fetch x64 binaries again. */
const underRosetta = () =>
  process.platform === 'darwin' &&
  spawnSync('sysctl', ['-n', 'sysctl.proc_translated'], { encoding: 'utf8' }).stdout?.trim() === '1';

/**
 * Automatic fixes, by failure kind. `run` returns what the retry changes: { env } and/or { command }.
 * `ask`: the fix changes the machine, so it asks first (and never runs without a terminal or in CI).
 * `skip`: a reason not to fix it here, or null. Each one also has a manual fix in FAILURES.
 */
export const RECOVERIES = {
  'node-version': {
    label: 'running it again with the right Node from nvm (installing it with nvm first if needed)',
    ask: () =>
      nodeNeedsInstall() ? `Install Node ${NODE_MAJOR} (${enginesMinimum()} or newer) with nvm and use it?` : null,
    skip: () => (newestNvmNode() || process.env.NVM_DIR ? null : 'nvm is not installed'),
    run: async ({ env }) => {
      if (nodeNeedsInstall()) await sh(`. "${NVM_DIR}/nvm.sh" && nvm install ${NODE_MAJOR}`);
      const newest = newestNvmNode();
      if (!newest || older(newest, enginesMinimum())) throw new Error(`nvm has no Node ${enginesMinimum()} or newer`);
      return {
        env: {
          ...env,
          PATH: `${resolve(NVM_DIR, 'versions/node', `v${newest}`, 'bin')}${process.platform === 'win32' ? ';' : ':'}${env.PATH ?? ''}`,
        },
      };
    },
  },
  'pnpm-version': {
    label: 'corepack enable (so this folder runs the pnpm that package.json pins)',
    ask: 'Run corepack enable, so this folder uses the pnpm that package.json pins?',
    run: async () => sh('corepack enable'),
  },
  'corepack-keys': {
    label: 'npm install -g corepack@latest, then corepack enable',
    ask: 'Update corepack (npm install -g corepack@latest) and run corepack enable?',
    run: async () => sh('npm install -g corepack@latest && corepack enable'),
  },
  'corepack-missing': {
    label: 'npm install -g corepack, then corepack enable',
    ask: 'Install corepack (npm install -g corepack) and run corepack enable?',
    run: async () => sh('npm install -g corepack && corepack enable'),
  },
  'git-lock': {
    label: 'removing the stale .git/index.lock (only when no git process is running)',
    run: async ({ err }) => {
      /* Only the quoted path: the words around it are translated in a git that speaks another language. */
      const lock = stripAnsi(err.output ?? '').match(/'([^']+index\.lock)'/)?.[1];
      /* <repo>/.git/index.lock, or one under the shared git dir (a worktree's .git/worktrees/x/, a submodule's
         .git/modules/x/). Resolved first: the path comes from tool output, and `…/.git/../../x/index.lock` contains /.git/. */
      /* git prints it relative to where the step ran. */
      const path = lock && resolve(err.cwd ?? ROOT, lock);
      const common = spawnSync('git', ['rev-parse', '--git-common-dir'], { cwd: ROOT, encoding: 'utf8' });
      const commonDir = common.status === 0 && resolve(ROOT, common.stdout.trim());
      const underGit =
        basename(dirname(path ?? '')) === '.git' || (commonDir && (path ?? '').startsWith(`${commonDir}${sep}`));
      if (!path || basename(path) !== 'index.lock' || !underGit)
        throw new Error('the message names no .git/index.lock');
      /* A git that is busy right now (it made the lock a moment ago) is not stale. */
      const age = Date.now() - (statSync(path, { throwIfNoEntry: false })?.mtimeMs ?? 0);
      if (age < 10_000) throw new Error('the index.lock is less than 10 s old: git may still be using it');
      const running = gitRunning();
      if (running !== false)
        throw new Error(running ? 'a git process of yours is still running' : 'cannot tell whether git is running');
      rmSync(path, { force: true });
    },
  },
  'git-unsafe': {
    label: 'git config --global --add safe.directory <this repository>',
    ask: () => `Trust ${ROOT} in git (git config --global --add safe.directory)?`,
    run: async () => {
      /* No shell: the path goes to git as one argument. */
      const result = spawnSync('git', ['config', '--global', '--add', 'safe.directory', ROOT], { encoding: 'utf8' });
      if (result.status !== 0) throw new Error(`git config failed: ${result.stderr.trim()}`);
    },
  },
  'missing-module': { label: 'pnpm install', install: true, run: async () => sh('pnpm install') },
  'stencil-jest': { label: 'pnpm install', install: true, run: async () => sh('pnpm install') },
  'unexpected-store': {
    label: 'pnpm install (relinks node_modules to the current store)',
    install: true,
    run: async () => sh('pnpm install'),
  },
  'outdated-lockfile': {
    label: 'pnpm install (updates pnpm-lock.yaml: commit it with your package.json change)',
    install: true,
    skip: () => (process.env.CI ? 'CI installs with --frozen-lockfile on purpose; update the lockfile locally' : null),
    run: async () => sh('pnpm install'),
  },
  integrity: {
    label: 'pnpm store prune, then pnpm install',
    install: true,
    run: async () => {
      await sh('pnpm store prune');
      await sh('pnpm install');
    },
  },
  'wrong-arch': {
    label: 'pnpm install --force (reinstalls the native binaries for this machine)',
    install: true,
    skip: () =>
      underRosetta() ? 'this terminal runs under Rosetta (x64): open a native (arm64) terminal first' : null,
    run: async () => sh('pnpm install --force'),
  },
  'library-not-built': {
    label: 'building the missing library',
    install: true,
    run: async ({ err }) => {
      /* From the line that failed: pnpm's own header line names the package that ran, not the one that is missing. */
      const line = stripAnsi(err.output ?? '')
        .split('\n')
        .find((text) => FAILURES.find((failure) => failure.kind === 'library-not-built').test.test(text));
      const name = line?.match(/@gemeente-tilburg\/[a-z0-9-]+/)?.[0];
      if (!name) throw new Error('the message names no @gemeente-tilburg package');
      await sh(`pnpm --filter ${name} run build`);
    },
  },
  'offline-cache': {
    label: 'installing again without --offline',
    run: async ({ command }) => {
      if (!/\s--offline\b/.test(command)) throw new Error('the command has no --offline to drop');
      return { command: command.replace(/\s--offline\b/, '') };
    },
  },
  'too-many-files': {
    label: 'retrying with a higher open-file limit (ulimit -n 10240)',
    skip: () => (process.platform === 'win32' ? 'Windows has no ulimit' : null),
    /* Only raise it: a plain ulimit -n 10240 would lower a limit that is already higher. */
    run: async ({ command }) => ({
      command: `l=$(ulimit -n); [ "$l" != unlimited ] && [ "$l" -lt 10240 ] && ulimit -n 10240 2>/dev/null; ${command}`,
    }),
  },
  network: {
    label: 'waiting 3 s and retrying',
    run: async () => sleep(3000),
  },
  'dist-collision': {
    label: 'waiting 5 s and building again',
    run: async () => sleep(5000),
  },
  'jest-crash': {
    label: 'running the tests once more',
    run: async () => {},
  },
  heap: {
    label: 'retrying with 8 GB of memory',
    run: async ({ env }) => {
      const current = env.NODE_OPTIONS ?? '';
      if (current.includes('--max-old-space-size')) throw new Error('the memory limit was already raised');
      return { env: { ...env, NODE_OPTIONS: `${current} --max-old-space-size=8192`.trim() } };
    },
  },
  'angular-cache': {
    label: 'clearing the .angular caches',
    run: async () => {
      for (const dir of readdirSync(resolve(ROOT, 'packages'))) {
        rmSync(resolve(ROOT, 'packages', dir, '.angular', 'cache'), { recursive: true, force: true, maxRetries: 3 });
      }
    },
  },
  killed: {
    label: 'retrying once',
    run: async () => {},
  },
};

/**
 * runStep() with a spinner. On failure: classify, and when a fix exists, apply it and try once more. Otherwise the
 * error is thrown with `.diagnosis` attached (with `autoTried` or `autoSkipped`); pass it to reportStepFailure().
 */
export async function runStepWithRecovery(
  label,
  command,
  /* recoveries: only tests pass their own, so that a fix that asks first can be answered without changing the machine. */
  { env = process.env, cwd, maxAttempts = 2, recoveries = RECOVERIES } = {},
) {
  const tried = new Map();
  let runEnv = env;
  let runCommand = command;
  for (let attempt = 1; ; attempt++) {
    const stepLabel = attempt > 1 ? `${label} (attempt ${attempt})` : label;
    const step = stepStart(stepLabel);
    /* Not where the output streams anyway (TERM=dumb, CI), nor where the hint would wrap and the spinner then stack. */
    if (interactive && (process.stdout.columns || 80) >= stepLabel.length + 30)
      process.stdout.write(`  ${c.gray}[v] show output${c.reset}`);
    try {
      const wasVerbose = await runStep(runCommand, { onVerbose: () => step.pause(), env: runEnv, cwd, label });
      stepDone(step, wasVerbose);
      return;
    } catch (err) {
      stepFail(step);
      if (err.cwd === undefined || err.cwd === null) err.cwd = cwd;
      const diagnosis = classifyFailure(err.output ?? '', err);
      err.diagnosis = diagnosis;
      /* The retry failed (the same way, or another): the report then says what was already tried. */
      if (tried.has(diagnosis.kind)) diagnosis.autoTried = tried.get(diagnosis.kind);
      else if (tried.size) diagnosis.autoTried = [...tried.values()].join(', ');
      const fix = recoveries[diagnosis.kind];
      /* Each fix at most once: a fix that did not help the first time hides the real error the second time. */
      if (fix && !tried.has(diagnosis.kind) && attempt >= maxAttempts) {
        diagnosis.autoSkipped = `it already used its one retry${tried.size ? ` (${[...tried.values()].join(', ')})` : ''}`;
      }
      if (!fix || tried.has(diagnosis.kind) || attempt >= maxAttempts) throw err;
      const skip = fix.skip?.() ?? (fix.install ? installSkip(cwd) : null);
      if (skip) {
        diagnosis.autoSkipped = skip;
        throw err;
      }
      const question = typeof fix.ask === 'function' ? fix.ask() : fix.ask;
      if (question) {
        if (!interactive || !process.stdin.isTTY) {
          diagnosis.autoSkipped = `it changes your machine, so it asks first, and ${process.env.CI ? 'CI is set, so ' : ''}there is no terminal to ask in`;
          throw err;
        }
        console.log(`\n  ${c.yellow}↻${c.reset}  ${diagnosis.why}`);
        if (!(await confirm(question, { default: true, fallback: false }))) {
          diagnosis.autoSkipped = 'you chose not to';
          throw err;
        }
      }
      tried.set(diagnosis.kind, fix.label);
      diagnosis.autoTried = fix.label;
      console.log(
        `\n  ${c.yellow}↻${c.reset}  ${question ? '' : `${diagnosis.why} `}${c.gray}Fixing it automatically: ${fix.label}...${c.reset}`,
      );
      try {
        const change = (await fix.run({ env: runEnv, err, command: runCommand })) ?? {};
        runEnv = change.env ?? runEnv;
        runCommand = change.command ?? runCommand;
      } catch (fixErr) {
        printError(fixErr, { what: `The automatic fix failed (${fix.label})` });
        throw err;
      }
    }
  }
}

/** The "Auto:" line of a report: what the scripts did or could do about it themselves. */
export function autoLine(diagnosis) {
  const label = RECOVERIES[diagnosis.kind]?.label;
  if (diagnosis.autoTried) return `tried ${diagnosis.autoTried}, but that did not fix it`;
  if (!label) return undefined;
  return diagnosis.autoSkipped
    ? `can fix this itself (${label}), but did not: ${diagnosis.autoSkipped}`
    : `can fix this itself: ${label}`;
}

/**
 * The report when a step could not be fixed: first everything the tool printed (the whole log, so nothing is left
 * out), then — last on screen, where it stays visible — what failed, why, what was tried, the manual fix, and the
 * tool's own error lines with the path of the log. When the step could not even start, our own stack trace instead.
 */
export function reportStepFailure(label, err) {
  const diagnosis = err.diagnosis ?? classifyFailure(err.output ?? '', err);
  const ownError =
    diagnosis.kind === 'spawn' || diagnosis.kind === 'no-folder' || !('exitCode' in err || 'signal' in err);
  if (!ownError && !err.streamed) printFullOutput(err);
  fail({ what: `${label} failed`, why: diagnosis.why, auto: autoLine(diagnosis), fix: diagnosis.fix ?? undefined });
  if (ownError) {
    printError(err);
    return;
  }
  printToolOutput(err);
  console.log('');
}
