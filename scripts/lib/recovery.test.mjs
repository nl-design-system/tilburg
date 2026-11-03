/* `node --test scripts/`: the failure messages people actually hit, and what the scripts should make of them. */
import './test-env.mjs';
import assert from 'node:assert/strict';
import { spawn, spawnSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import { autoLine, classifyFailure, FAILURES, RECOVERIES, runStepWithRecovery } from './recovery.mjs';

const cases = [
  ['node-version', 'Error [ERR_UNKNOWN_BUILTIN_MODULE]: No such built-in module: node:sqlite'],
  ['node-version', 'warn: This version of pnpm requires at least Node.js v22.13'],
  [
    'pnpm-version',
    'ERR_PNPM_BAD_PM_VERSION  This project is configured to use v11.15.1 of pnpm. Your current pnpm is v10.2.0',
  ],
  ['command-not-found', '/bin/sh: chokidar: command not found'],
  ['missing-script', '[ERR_PNPM_NO_SCRIPT] Missing script: sync-stories'],
  ['release-age', 'ERR_PNPM_NO_MATURE_MATCHING_VERSION  No matching version found for @angular/cli@20.3.38'],
  ['ignored-builds', '[ERR_PNPM_IGNORED_BUILDS] Ignored build scripts: esbuild'],
  ['outdated-lockfile', 'ERR_PNPM_OUTDATED_LOCKFILE  Cannot install with "frozen-lockfile"'],
  ['audit', '21 vulnerabilities found\nSeverity: 4 low | 10 moderate | 6 high | 1 critical'],
  [
    'jest-crash',
    'Test suite failed to run\n  A jest worker process (pid=123) was terminated by another process: signal=SIGSEGV',
  ],
  ['library-not-built', 'Failed to resolve entry for package "@gemeente-tilburg/components-react".'],
  ['dist-collision', "Error: EEXIST: file already exists, mkdir './dist/sb-manager'"],
  ['tests-failed', 'Tests:       1 failed, 155 passed, 156 total'],
  ['type-error', "src/Tooltip.tsx(3,1): error TS2304: Cannot find name 'foo'."],
  ['lint', 'PULL_REQUEST.md:1 error MD041/first-line-heading/first-line-h1'],
  ['heap', 'FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory'],
  ['port-in-use', 'Error: listen EADDRINUSE: address already in use :::6006'],
  ['integrity', 'ERR_PNPM_TARBALL_INTEGRITY  Got unexpected checksum'],
  ['corepack-keys', 'Internal Error: Cannot find matching keyid: {"signatures":[...]}'],
  ['push-rejected', ' ! [rejected]        feat/x -> feat/x (fetch first)\nerror: failed to push some refs'],
  ['git-auth', 'git@github.com: Permission denied (publickey).\nfatal: Could not read from remote repository.'],
  ['git-auth', "fatal: could not read Username for 'https://github.com': terminal prompts disabled"],
  ['registry-auth', 'ERR_PNPM_FETCH_401  GET https://npm.pkg.github.com/@x%2Fy: Unauthorized - 401'],
  ['merge-conflict', 'ERR_PNPM_BROKEN_LOCKFILE  The lockfile at "pnpm-lock.yaml" is broken'],
  ['merge-conflict', 'src/a.ts(4,1): error TS1185: Merge conflict marker encountered.'],
  ['permission', "Error: EACCES: permission denied, mkdir '/Users/x/.cache/storybook'"],
  ['too-many-files', 'Error: EMFILE: too many open files, watch'],
  ['network', 'request to https://registry.npmjs.org/x failed, reason: getaddrinfo ENOTFOUND registry.npmjs.org'],
  ['command-not-found', 'sh: 1: chokidar: not found'],
  ['angular-cache', 'Error: Unexpected end of JSON input in packages/storybook-angular/.angular/cache/20.3/x.json'],
  /* A harmless line next to the real cause must not win just because its pattern comes first. */
  [
    'network',
    ' WARN  Unsupported engine: wanted: {"node":"^20"} (current: {"node":"v24.11.0"})\nERR_PNPM_META_FETCH_FAIL  GET https://registry.npmjs.org/x: request failed',
  ],
  [
    'tests-failed',
    'Tests:       2 failed, 40 passed, 42 total\nA worker process has failed to exit gracefully and has been force exited.',
  ],
  ['permission', "Error: EACCES: permission denied, mkdir '/r/packages/storybook-angular/.angular/cache/20.3'"],
  ['no-space', "Error: ENOSPC: no space left on device, write '/r/packages/storybook-angular/.angular/cache/x'"],
];

for (const [kind, output] of cases) {
  test(`recognises ${kind}: ${output.split('\n')[0].slice(0, 60)}`, () => {
    const diagnosis = classifyFailure(output, { exitCode: 1 });
    assert.equal(diagnosis.kind, kind);
    assert.ok(diagnosis.why, 'says why');
  });
}

test('a truncated JSON file is only the Angular cache when .angular is named too', () => {
  assert.notEqual(
    classifyFailure('Error: package.json: Unexpected end of JSON input', { exitCode: 1 }).kind,
    'angular-cache',
  );
  assert.equal(
    classifyFailure('Error: Unexpected end of JSON input\n  at read (/r/.angular/x.json)', { exitCode: 1 }).kind,
    'angular-cache',
  );
});

test('the git-lock fix refuses an index.lock outside the git folder, also through ..', async () => {
  for (const path of ['/tmp/x/index.lock', `${process.cwd()}/.git/../../x/index.lock`]) {
    const err = { output: `fatal: Unable to create '${path}': File exists.` };
    await assert.rejects(RECOVERIES['git-lock'].run({ err }), /names no \.git\/index\.lock/);
  }
});

test('node:test output: passing test names do not decide the kind, its fail summary does', () => {
  const output = [
    '✔ recognises node-version: Error [ERR_UNKNOWN_BUILTIN_MODULE]: node:sqlite (0.1ms)',
    'ok 3 - recognises git-auth: Authentication failed',
    '✖ something else (2ms)',
    'ℹ tests 3',
    'ℹ pass 2',
    'ℹ fail 1',
  ].join('\n');
  assert.equal(classifyFailure(output, { exitCode: 1 }).kind, 'tests-failed');
  assert.equal(classifyFailure('# fail 2', { exitCode: 1 }).kind, 'tests-failed');
  assert.notEqual(classifyFailure('ℹ fail 0', { exitCode: 1 }).kind, 'tests-failed');
});

test('pnpm --recursive line prefixes do not hide what the line says', () => {
  const jest =
    'packages/components-react test: ✕ says Authentication failed\npackages/components-react test: Tests:       1 failed, 3 passed';
  assert.equal(classifyFailure(jest, { exitCode: 1 }).kind, 'tests-failed');
  assert.equal(
    classifyFailure('packages/x build: SyntaxError: Unexpected token', { exitCode: 1 }).kind,
    'syntax-error',
  );
  assert.equal(classifyFailure('packages/x build: [ ERROR ]  TypeScript: bad', { exitCode: 1 }).kind, 'stencil-error');
  /* Not a prefix: a type error keeps its "error TS…: " */
  assert.equal(classifyFailure('error TS2304: Cannot find name x.', { exitCode: 1 }).kind, 'type-error');
});

test('a shell exit 127 or 9009 is a missing command, also in another language', () => {
  assert.equal(classifyFailure('sh: chokidar: Kommando nicht gefunden.', { exitCode: 127 }).kind, 'command-not-found');
  assert.equal(classifyFailure("'x' wordt niet herkend", { exitCode: 9009 }).kind, 'command-not-found');
});

test('no write access, a terminal prompt and a purge question each get their own diagnosis', () => {
  const denied = 'remote: Permission to org/repo.git denied to someone.\nfatal: The requested URL returned error: 403';
  assert.equal(classifyFailure(denied, { exitCode: 128 }).kind, 'git-no-access');
  assert.equal(
    classifyFailure('gpg: signing failed: Inappropriate ioctl for device', { exitCode: 1 }).kind,
    'needs-terminal',
  );
  assert.equal(
    classifyFailure('ERR_PNPM_ABORTED_REMOVE_MODULES_DIR_NO_TTY  Aborted removal of modules directory', { exitCode: 1 })
      .kind,
    'modules-purge',
  );
});

test('a step that fails without saying anything is called out as such, with the command to rerun', () => {
  const diagnosis = classifyFailure('', { exitCode: 3, command: 'exit 3' });
  assert.equal(diagnosis.kind, 'silent');
  assert.match(diagnosis.fix, /exit 3/);
});

test('a program that cannot start is a spawn failure, not an unknown one', () => {
  /* What Node really sets: syscall is `spawn <program>` (or `spawnSync <program>`). */
  const err = Object.assign(new Error('spawn pnpm ENOENT'), { code: 'ENOENT', syscall: 'spawn pnpm', path: 'pnpm' });
  assert.equal(classifyFailure('', err).kind, 'spawn');
  const git = Object.assign(new Error('spawnSync git ENOENT'), {
    code: 'ENOENT',
    syscall: 'spawnSync git',
    path: 'git',
  });
  assert.equal(classifyFailure('', git).kind, 'spawn');
});

test('a shell that cannot start means the folder is missing, and the report names the folder, not /bin/sh', () => {
  const err = Object.assign(new Error('spawn /bin/sh ENOENT'), {
    code: 'ENOENT',
    syscall: 'spawn /bin/sh',
    path: '/bin/sh',
    cwd: '/nowhere/repo',
  });
  const diagnosis = classifyFailure('', err);
  assert.equal(diagnosis.kind, 'no-folder');
  assert.match(diagnosis.why, /\/nowhere\/repo/);
  assert.doesNotMatch(diagnosis.why, /bin\/sh/);
});

test('a package the registry does not have is not a missing program', () => {
  const output = 'ERR_PNPM_FETCH_404  GET https://registry.npmjs.org/@x%2Fnope: Not Found - 404';
  assert.notEqual(classifyFailure(output, { exitCode: 1 }).kind, 'command-not-found');
});

test('anything else is unknown, and the report then shows what the tool said', () => {
  assert.equal(classifyFailure('something went sideways', { exitCode: 1 }).kind, 'unknown');
});

test('"0 errors" in passing output is not mistaken for a type error', () => {
  assert.notEqual(classifyFailure('Found 0 errors. Watching for file changes.', { exitCode: 1 }).kind, 'type-error');
});

test('a step someone stopped (Ctrl-C, kill) is not retried as if it crashed', () => {
  assert.equal(classifyFailure('', { signal: 'SIGINT' }).kind, 'stopped');
  assert.equal(classifyFailure('partial output', { signal: 'SIGKILL' }).kind, 'killed');
});

/* runStepWithRecovery() for real, with tiny node scripts in a temp folder (it writes its log under the OS temp dir).
   Each run happens in a child process: run here, its lines ("  ✗  heap step") would share stdout with node:test's own
   report, and Node 24's parser misreads text whose third byte is ≥ 0x80 when it lands right after a report in the same
   pipe read (it reads that text as a negative message size) — "Unable to deserialize cloned data", now and then. */
const withTemp = async (run) => {
  const dir = mkdtempSync(join(tmpdir(), 'tilburg-recovery-'));
  try {
    await run(dir);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
};
const RECOVERY = new URL('./recovery.mjs', import.meta.url).href;
/**
 * Run runStepWithRecovery() in a child; resolves to { ok, exitCode, diagnosis, output }. `recoveries`: source text of
 * extra entries for its recoveries map. `answer`: give the child a terminal (TILBURG_TTY, and a stdin that says it is
 * one) and type this once the question shows; the terminal driver itself is not part of the test.
 */
function runInChild(dir, { label = 'step', command, cwd = dir, env = process.env, recoveries = '', answer }) {
  const file = join(dir, 'child.mjs');
  writeFileSync(
    file,
    `${answer === undefined ? '' : 'process.stdin.isTTY = true; process.stdout.isTTY = true; process.stdin.setRawMode = () => process.stdin;\n'}const { RECOVERIES, runStepWithRecovery } = await import(${JSON.stringify(RECOVERY)});
const recoveries = { ...RECOVERIES, ${recoveries} };
try {
  await runStepWithRecovery(${JSON.stringify(label)}, ${JSON.stringify(command)}, { cwd: ${JSON.stringify(cwd)}, recoveries });
  console.log('\\n@@' + JSON.stringify({ ok: true }));
} catch (err) {
  console.log('\\n@@' + JSON.stringify({ ok: false, exitCode: err.exitCode, diagnosis: err.diagnosis }));
}
process.exit(0);`,
  );
  const child = spawn(process.execPath, [file], {
    env: answer === undefined ? env : { ...env, TILBURG_TTY: '1' },
    stdio: [answer === undefined ? 'ignore' : 'pipe', 'pipe', 'pipe'],
  });
  return new Promise((resolvePromise, reject) => {
    let output = '';
    let answered = false;
    const timer = setTimeout(() => {
      child.kill('SIGKILL');
      reject(new Error(`no result in 15 s:\n${output}`));
    }, 15_000);
    const read = (data) => {
      output += data;
      if (answer !== undefined && !answered && /\[Y\/n\]/.test(output)) {
        answered = true;
        child.stdin.write(answer);
      }
    };
    child.stdout.setEncoding('utf8').on('data', read);
    child.stderr.setEncoding('utf8').on('data', read);
    child.on('close', () => {
      clearTimeout(timer);
      const line = output.split(/\r?\n/).findLast((text) => text.startsWith('@@'));
      if (!line) reject(new Error(`the child printed no result:\n${output}`));
      else resolvePromise({ ...JSON.parse(line.slice(2)), output });
    });
  });
}
const heapScript = (dir) => {
  const script = join(dir, 'heap.mjs');
  writeFileSync(
    script,
    "if (!(process.env.NODE_OPTIONS ?? '').includes('8192')) { console.error('JavaScript heap out of memory'); process.exit(1); }",
  );
  return `node "${script}"`;
};

test('a recognised failure with a safe fix is fixed and retried once', { timeout: 20_000 }, () =>
  withTemp(async (dir) => {
    const { NODE_OPTIONS: _, ...env } = process.env;
    const result = await runInChild(dir, { label: 'heap step', command: heapScript(dir), env });
    assert.equal(result.ok, true, result.output);
  }),
);

test(
  'when the automatic fix itself fails, the original failure is thrown with its diagnosis',
  { timeout: 20_000 },
  () =>
    withTemp(async (dir) => {
      const env = { ...process.env, NODE_OPTIONS: '--max-old-space-size=4096' };
      const result = await runInChild(dir, { label: 'heap step', command: heapScript(dir), env });
      assert.equal(result.diagnosis.kind, 'heap');
      assert.equal(result.exitCode, 1);
    }),
);

test('when a fix ran but the retry fails the same way, the report says it was tried', { timeout: 20_000 }, () =>
  withTemp(async (dir) => {
    const script = join(dir, 'heap.mjs');
    writeFileSync(script, "console.error('JavaScript heap out of memory'); process.exit(1);");
    const { NODE_OPTIONS: _, ...env } = process.env;
    const result = await runInChild(dir, { label: 'heap step', command: `node "${script}"`, env });
    assert.equal(result.diagnosis.kind, 'heap');
    assert.equal(result.diagnosis.autoTried, 'retrying with 8 GB of memory');
    assert.match(autoLine(result.diagnosis), /tried retrying with 8 GB of memory, but that did not fix it/);
  }),
);

test('a failure without a safe fix is not retried', { timeout: 20_000 }, () =>
  withTemp(async (dir) => {
    const counter = join(dir, 'runs');
    const script = join(dir, 'fail.mjs');
    writeFileSync(
      script,
      `import { appendFileSync } from 'node:fs'; appendFileSync(${JSON.stringify(counter)}, 'x'); console.error('error TS2304: nope'); process.exit(2);`,
    );
    const result = await runInChild(dir, { label: 'ts step', command: `node "${script}"` });
    assert.equal(result.diagnosis.kind, 'type-error');
    assert.equal(readFileSync(counter, 'utf8'), 'x', 'ran once');
  }),
);

test('a folder that does not exist is reported as such, naming the folder', { timeout: 20_000 }, () =>
  withTemp(async (dir) => {
    const missing = join(dir, 'gone');
    const result = await runInChild(dir, { label: 'no folder', command: 'echo hi', cwd: missing });
    assert.equal(result.diagnosis.kind, 'no-folder');
    assert.ok(result.diagnosis.why.includes(missing), result.diagnosis.why);
  }),
);

/* Real output, captured from the tools themselves in temp sandboxes (pnpm 11.15.1, git, Sass, Jest, Vite, Node 24),
   and from the environment mistakes people hit most: no corepack (Node 25+), a TLS-inspecting proxy, wrong CPU. */
const realOutput = [
  [
    'node-version',
    'warn: This version of pnpm requires at least Node.js v22.13\nwarn: The current version of Node.js is v20.18.1\nError [ERR_UNKNOWN_BUILTIN_MODULE]: No such built-in module: node:sqlite',
  ],
  [
    'node-version',
    '[ERR_PNPM_UNSUPPORTED_ENGINE] Unsupported environment (bad pnpm and/or Node.js version)\n\nExpected version: >=24.15.0 <=25\nGot: v24.13.0',
  ],
  ['invalid-package-json', 'Invalid package.json in package.json'],
  [
    'workspace-package',
    '[ERR_PNPM_WORKSPACE_PKG_NOT_FOUND] In : "@x/missing@workspace:*" is in the dependencies but no package named "@x/missing" is present in the workspace',
  ],
  [
    'offline-cache',
    '[ERR_PNPM_NO_OFFLINE_META] Failed to resolve left-pad@1.0.0 in package mirror /Users/x/Library/Caches/pnpm/v11/metadata/registry.npmjs.org/left-pad.jsonl',
  ],
  [
    'package-not-found',
    '[ERR_PNPM_FETCH_404] GET https://registry.npmjs.org/tlb-no-such-package: Not Found - 404\ntlb-no-such-package is not in the npm registry, or you have no permission to fetch it.',
  ],
  [
    'package-not-found',
    '[ERR_PNPM_NO_MATCHING_VERSION] No matching version found for left-pad@99.0.0 while fetching it from https://registry.npmjs.org/',
  ],
  [
    'sass-error',
    'Error: Undefined variable.\n  ╷\n1 │ .a { color: $nope; }\n  │             ^^^^^\n  ╵\n  a.scss 1:13  root stylesheet',
  ],
  [
    'sass-error',
    'Error: Can\'t find stylesheet to import.\n  ╷\n1 │ @use "does-not-exist";\n  ╵\n  a.scss 1:1  root stylesheet',
  ],
  [
    'syntax-error',
    "file:///tmp/a.mjs:1\nconst = 1;\n      ^\n\nSyntaxError: Unexpected token '='\n    at compileSourceTextModule (node:internal/modules/esm/utils:318:16)",
  ],
  ['missing-file', "Error [ERR_MODULE_NOT_FOUND]: Cannot find module '/tmp/x/nope.mjs' imported from /tmp/x/a.mjs"],
  [
    'missing-file',
    '\x1b[31mx\x1b[39m Build failed in 26ms\n\x1b[31merror during build:\n\x1b[31mCould not resolve "./missing.js" from "main.js"\x1b[31m',
  ],
  [
    'missing-module',
    "Error [ERR_MODULE_NOT_FOUND]: Cannot find package 'chalk-not-installed' imported from /tmp/x/a.mjs",
  ],
  [
    'lint',
    'Checking formatting...\n[warn] a.js\n[warn] Code style issues found in the above file. Run Prettier with --write to fix.',
  ],
  /* Coloured even with FORCE_COLOR=0: the colour codes must not split "✖ 2 problems". */
  [
    'lint',
    'x.scss\n  \x1b[2m1:6\x1b[22m  \x1b[31m✖\x1b[39m  Unexpected unknown property "colr"\n\x1b[31m✖\x1b[39m 2 problems (\x1b[31m2 errors\x1b[39m, \x1b[33m0 warnings\x1b[39m)',
  ],
  ['no-tests', 'No tests found, exiting with code 1\nRun with `--passWithNoTests` to exit with code 0'],
  [
    'git-remote',
    'fatal: No configured push destination.\nEither specify the URL from the command-line or configure a remote repository using',
  ],
  [
    'git-remote',
    "fatal: '/tmp/x/nope.git' does not appear to be a git repository\nfatal: Could not read from remote repository.",
  ],
  [
    'git-lock',
    "fatal: Unable to create '/tmp/x/.git/index.lock': File exists.\n\nAnother git process seems to be running in this repository",
  ],
  ['not-a-repo', 'fatal: not a git repository (or any of the parent directories): .git'],
  [
    'git-unsafe',
    "fatal: detected dubious ownership in repository at '/work/tilburg'\nTo add an exception for this directory, call:\n\n\tgit config --global --add safe.directory /work/tilburg",
  ],
  [
    'merge-conflict',
    'Auto-merging f\nCONFLICT (content): Merge conflict in f\nAutomatic merge failed; fix conflicts and then commit the result.',
  ],
  [
    'wrong-package-manager',
    'This project is configured to use yarn because /tmp/x/package.json has a "packageManager" field',
  ],
  ['corepack-missing', '/bin/sh: corepack: command not found'],
  [
    'tls',
    ' WARN  GET https://self-signed.badssl.com/left-pad error (DEPTH_ZERO_SELF_SIGNED_CERT). Will retry in 1 minute. 1 retries left.\n[ERR_PNPM_META_FETCH_FAIL] GET https://self-signed.badssl.com/left-pad: fetch failed',
  ],
  [
    'tls',
    ' WARN  GET https://expired.badssl.com/left-pad error (CERT_HAS_EXPIRED). Will retry in 1 minute.\n[ERR_PNPM_META_FETCH_FAIL] GET https://expired.badssl.com/left-pad: fetch failed',
  ],
  ['wrong-arch', "Error: You installed esbuild for another platform than the one you're currently using."],
  ['permission', "Error: EACCES: permission denied, open 'out/x'"],
  ['port-in-use', 'Error: listen EADDRINUSE: address already in use :::6098'],
  /* Build tools, captured in sandboxes: TypeScript 6.0, corepack 0.14 on Node 24, ng-packagr (Angular 20), Storybook
     10 (React with Vite 5), webpack 5, Stencil 4, style-dictionary 4. */
  [
    'ts-deprecated',
    'tsconfig.json(1,47): error TS5101: Option \'baseUrl\' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption \'"ignoreDeprecations": "6.0"\' to silence this error.\n  Visit https://aka.ms/ts6 for migration information.',
  ],
  [
    'ts-deprecated',
    "tsconfig.json(1,40): error TS5107: Option 'moduleResolution=node10' is deprecated and will stop functioning in TypeScript 7.0.",
  ],
  [
    'corepack-keys',
    'TypeError [ERR_VM_DYNAMIC_IMPORT_CALLBACK_MISSING]: A dynamic import callback was not specified.\n    at importModuleDynamicallyCallback (node:internal/modules/esm/utils:279:9)\n    at Object.<anonymous> (/Users/x/.cache/node/corepack/pnpm/11.15.1/bin/pnpm.cjs:3:1)\n    at Module._compile (/usr/local/lib/node_modules/corepack/dist/vcc.js:203:30)',
  ],
  [
    'type-error',
    "✖ Compiling with Angular sources in partial compilation mode.\nsrc/a.component.ts:2:65 - error NG8002: Can't bind to 'nope' since it isn't a known property of 'div'.",
  ],
  [
    'ng-packagr-dependency',
    '⚠ Distributing npm packages with \'dependencies\' is not recommended.\n✖ Writing package manifest\nDependency left-pad must be explicitly allowed using the "allowedNonPeerDependencies" option.',
  ],
  [
    'missing-file',
    '■  Vite x Build failed in 353ms\n│\n■  Failed to build the preview\n│\n■  Could not resolve "./nope" from "src/a.stories.tsx"\n│  file: ./src/a.stories.tsx',
  ],
  [
    'config-error',
    '■  \x1b[38;2;241;97;97mSB_CORE-SERVER_0007 (MainFileEvaluationError): Storybook couldn\'t\n│  evaluate your config/main.ts file.\n\n│  Original error:\n│  Error: Transform failed with 1 error:\n│  <stdin>:8:10: ERROR: Unexpected ";"',
  ],
  /* A missing package in main.ts or vite.config is still a missing package: pnpm install fixes it. */
  [
    'missing-module',
    "■  SB_CORE-SERVER_0007 (MainFileEvaluationError): Storybook couldn't\n│  evaluate your config/main.ts file.\n\n│  Original error:\n│  Error [ERR_MODULE_NOT_FOUND]: Cannot find package 'tlb-not-installed'\n│  imported from /config/main.ts",
  ],
  [
    'config-error',
    '✘ [ERROR] Unexpected "}"\n\n    vite.config.js:1:425:\n\nfailed to load config from /tmp/x/vite.config.js\nerror during build:\nError: Build failed with 1 error:\nvite.config.js:1:425: ERROR: Unexpected "}"',
  ],
  [
    'config-error',
    'failed to load config from /tmp/x/vite.config.js\nerror during build:\nReferenceError: nope is not defined\n    at file:///tmp/x/vite.config.js.timestamp-1-a.mjs:2:38',
  ],
  [
    'webpack-parse',
    "ERROR in ./src/x.scss 2:0\nModule parse failed: Unexpected token (2:0)\nFile was parsed as module type 'javascript/auto'.\nYou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file.",
  ],
  ['missing-file', "ERROR in ./src/index.js 1:0-16\nModule not found: Error: Can't resolve './nope' in '/tmp/x/src'"],
  [
    'missing-module',
    "ERROR in ./src/index.js 1:0-27\nModule not found: Error: Can't resolve 'tlb-not-installed' in '/tmp/x/src'",
  ],
  [
    'library-not-built',
    "ERROR in ./src/index.js 1:45-91\nModule not found: Error: Can't resolve '@gemeente-tilburg/components-angular' in '/tmp/x/src'",
  ],
  [
    'stencil-error',
    "\x1b[1m\x1b[31m[ ERROR ]\x1b[39m\x1b[22m  TypeScript: src/components/x-a/x-a.tsx:5:32\n           Property 'nope' does not exist on type 'XA'.\n\n      L5:    render() { return <div>{this.nope}</div>; }\n\n[19:51.4]  build failed in 216 ms",
  ],
  [
    'stencil-error',
    '[ ERROR ]  src/components/x-a/x-a.tsx:2:19\n           "xa" tag must contain a dash (-) to work as a valid web component.',
  ],
  [
    'missing-file',
    '[ ERROR ]  Rollup: Unresolved Import\n           Could not resolve "./nope" from "src/components/x-a/x-a.tsx"\n\n[20:01.5]  build failed in 405 ms',
  ],
  /* Stencil wraps its lines, so the package name lands on the line after "Cannot find module". */
  [
    'wrong-arch',
    '[ ERROR ]  uncaught cli error: Error: Cannot find module\n           @rollup/rollup-darwin-arm64. npm has a bug related to optional\n           dependencies (https://github.com/npm/cli/issues/4828).',
  ],
  [
    'stencil-jest',
    '[ ERROR ]  Please install supported versions of dev dependencies with either npm or yarn.\n           npm install --save-dev jest@29 jest-cli@29',
  ],
  [
    'token-reference',
    'Error: \nReference Errors:\nSome token references (2) could not be found.\nUse log.verbosity "verbose" or use CLI option --verbose for more details.',
  ],
];
for (const [kind, output] of realOutput) {
  test(`real output: ${kind}: ${output.split('\n')[0].slice(0, 60)}`, () => {
    const diagnosis = classifyFailure(output, { exitCode: 1 });
    assert.equal(diagnosis.kind, kind);
    assert.ok(diagnosis.fix, 'every recognised failure has a manual fix');
  });
}

test('every recognised failure has a manual fix, and every automatic fix belongs to a failure that exists', () => {
  for (const { kind, fix } of FAILURES) assert.ok(fix, `${kind} has no manual fix`);
  const kinds = new Set([...FAILURES.map(({ kind }) => kind), 'killed']);
  for (const kind of Object.keys(RECOVERIES)) assert.ok(kinds.has(kind), `RECOVERIES.${kind} matches no failure`);
});

test('the report says what the scripts can fix themselves, and still gives the manual fix', () => {
  assert.match(autoLine({ kind: 'missing-module' }), /can fix this itself: pnpm install/);
  assert.match(
    autoLine({ kind: 'missing-module', autoTried: 'pnpm install' }),
    /tried pnpm install, but that did not fix it/,
  );
  assert.match(autoLine({ kind: 'pnpm-version', autoSkipped: 'you chose not to' }), /but did not: you chose not to/);
  assert.equal(autoLine({ kind: 'type-error' }), undefined);
});

/* A stand-in for a fix that changes the machine (corepack enable and the like): it asks first, and only leaves a
   marker. The step fails until the marker is there, like a wrong pnpm until corepack is enabled. */
const askingFix = (marker) => `'pnpm-version': {
  label: 'leaving a marker',
  ask: 'Leave the marker?',
  run: async () => (await import('node:fs')).writeFileSync(${JSON.stringify(marker)}, 'x'),
},`;
const wrongPnpmUntil = (marker) =>
  `node -e "if (!require('fs').existsSync('${marker}')) { console.error('ERR_PNPM_BAD_PM_VERSION  configured to use v11.15.1 of pnpm'); process.exit(1) }"`;
const { CI: _ci, ...noCI } = process.env;

test('a fix that changes the machine never runs without a terminal: it is reported, not run', { timeout: 20_000 }, () =>
  withTemp(async (dir) => {
    const marker = join(dir, 'fixed');
    const result = await runInChild(dir, { command: wrongPnpmUntil(marker), recoveries: askingFix(marker) });
    assert.equal(result.diagnosis.kind, 'pnpm-version');
    assert.equal(result.diagnosis.autoTried, undefined);
    assert.match(result.diagnosis.autoSkipped, /no terminal/);
    assert.equal(existsSync(marker), false, 'the fix did not run');
  }),
);

test('in a terminal, a fix that asks first runs on "y", and the step is retried', { timeout: 30_000 }, () =>
  withTemp(async (dir) => {
    const marker = join(dir, 'fixed');
    const result = await runInChild(dir, {
      command: wrongPnpmUntil(marker),
      recoveries: askingFix(marker),
      env: noCI,
      answer: 'y',
    });
    assert.match(result.output, /Leave the marker\?/, 'it asked');
    assert.equal(result.ok, true, result.output);
    assert.equal(existsSync(marker), true, 'the fix ran');
  }),
);

test('in a terminal, "n" leaves the machine alone and the report says so', { timeout: 30_000 }, () =>
  withTemp(async (dir) => {
    const marker = join(dir, 'fixed');
    const result = await runInChild(dir, {
      command: wrongPnpmUntil(marker),
      recoveries: askingFix(marker),
      env: noCI,
      answer: 'n',
    });
    assert.equal(result.ok, false);
    assert.equal(result.diagnosis.autoSkipped, 'you chose not to');
    assert.equal(existsSync(marker), false, 'the fix did not run');
  }),
);

test('the fixes that change the machine are exactly the ones that ask first', () => {
  const asking = Object.entries(RECOVERIES)
    .filter(([, fix]) => fix.ask)
    .map(([kind]) => kind)
    .sort();
  assert.deepEqual(asking, ['corepack-keys', 'corepack-missing', 'git-unsafe', 'node-version', 'pnpm-version']);
  for (const kind of ['corepack-keys', 'corepack-missing', 'git-unsafe', 'pnpm-version']) {
    const question = typeof RECOVERIES[kind].ask === 'function' ? RECOVERIES[kind].ask() : RECOVERIES[kind].ask;
    assert.match(question, /\?$/, `${kind} asks a question`);
  }
});

test('an offline install that misses a package is retried with the network', { timeout: 20_000 }, () =>
  withTemp(async (dir) => {
    const script = join(dir, 'install.mjs');
    writeFileSync(
      script,
      "if (process.argv.includes('--offline')) { console.error('[ERR_PNPM_NO_OFFLINE_META] Failed to resolve x@1'); process.exit(1); }",
    );
    const result = await runInChild(dir, { label: 'install', command: `node "${script}" --offline` });
    assert.equal(result.ok, true, result.output);
  }),
);

test(
  'the open-file fix raises a low limit to 10240 and leaves a higher one alone',
  { skip: process.platform === 'win32' && 'Windows has no ulimit' },
  async () => {
    const { command } = await RECOVERIES['too-many-files'].run({ command: 'ulimit -n' });
    /* The soft limit can go up to the hard limit; read that first so the test does not depend on this machine. */
    const hard = spawnSync('sh', ['-c', 'ulimit -Hn'], { encoding: 'utf8' }).stdout.trim();
    const high = hard === 'unlimited' ? 20000 : Math.min(Number(hard), 20000);
    const limitAfter = (start) =>
      spawnSync('sh', ['-c', `ulimit -Sn ${start}; ${command}`], { encoding: 'utf8' }).stdout.trim();
    assert.equal(limitAfter(256), '10240');
    if (high > 10240) assert.equal(limitAfter(high), String(high));
  },
);

test(
  'CI keeps its frozen lockfile: the lockfile is not updated there, and the report says why',
  { timeout: 20_000 },
  () =>
    withTemp(async (dir) => {
      const script = join(dir, 'lock.mjs');
      writeFileSync(
        script,
        'console.error(\'ERR_PNPM_OUTDATED_LOCKFILE  Cannot install with "frozen-lockfile"\'); process.exit(1);',
      );
      const result = await runInChild(dir, {
        label: 'install',
        command: `node "${script}"`,
        env: { ...process.env, CI: '1' },
      });
      assert.match(result.diagnosis.autoSkipped, /frozen-lockfile/);
    }),
);

test('a missing script path is a missing file, not a missing package (no pnpm install for it)', () => {
  /* node scripts/parity.mjs started in another folder: real output of Node 24. */
  const wrongFolder =
    "node:internal/modules/cjs/loader:1520\n  throw err;\n  ^\n\nError: Cannot find module '/tmp/elsewhere/scripts/parity.mjs'\n    at Module._resolveFilename (node:internal/modules/cjs/loader:1517:15) {\n  code: 'MODULE_NOT_FOUND'";
  assert.equal(classifyFailure(wrongFolder, { exitCode: 1 }).kind, 'missing-file');
  assert.equal(
    classifyFailure("Error: Cannot find module 'chalk'\nRequire stack:\n- /tmp/x/a.cjs", { exitCode: 1 }).kind,
    'missing-module',
  );
});

/* Found by review: a failing test's text, a stop from outside, and the "Auto:" line after the one retry. */
test('a failing test is a test failure, whatever its name or message says', () => {
  for (const line of [
    '✕ shows an error when Authentication failed (12 ms)',
    '✕ handles the (fetch first) case',
    '✕ SIGSEGV handler',
    '    config file: not found',
  ]) {
    const output = `${line}\n\nTests:       1 failed, 3 passed, 4 total`;
    assert.equal(classifyFailure(output, { exitCode: 1 }).kind, 'tests-failed', line);
  }
  const crash =
    'A jest worker process (pid=1) was terminated by another process: signal=SIGSEGV\nTest Suites: 1 failed';
  assert.equal(classifyFailure(crash, { exitCode: 1 }).kind, 'jest-crash');
});

test('a step stopped from outside is never retried, even when its output looks retryable', () => {
  const output = ' WARN  GET https://registry.npmjs.org/x error (ECONNRESET). Will retry in 10 seconds.';
  for (const signal of ['SIGINT', 'SIGTERM', 'SIGHUP']) {
    assert.equal(classifyFailure(output, { signal }).kind, 'stopped', signal);
  }
});

test('after the one retry, the report says the fix was not tried because the retry was used', { timeout: 20_000 }, () =>
  withTemp(async (dir) => {
    const counter = join(dir, 'runs');
    const script = join(dir, 'two.mjs');
    writeFileSync(
      script,
      `import { appendFileSync, existsSync } from 'node:fs';
const first = !existsSync(${JSON.stringify(counter)}); appendFileSync(${JSON.stringify(counter)}, 'x');
console.error(first ? 'socket hang up' : "Error: Cannot find module 'left-pad'"); process.exit(1);`,
    );
    const result = await runInChild(dir, {
      label: 'two',
      command: `node "${script}"`,
      recoveries: "network: { label: 'retrying', run: async () => {} },",
    });
    assert.equal(result.diagnosis.kind, 'missing-module');
    assert.match(result.diagnosis.autoSkipped, /already used its one retry \(retrying\)/);
    assert.equal(readFileSync(counter, 'utf8'), 'xx', 'ran twice, not three times');
  }),
);
