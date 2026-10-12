/* Recognise why a step failed, fix it when that is safe, and otherwise say what broke and what to do.

   classifyFailure() is pure: output in, diagnosis out. The list starts with what is particular to this repository
   (Node 24, pnpm 11 through corepack, the 24-hour release guard, the build-script allowlist, the Jest crash on
   Node 24, libraries the Storybooks load from dist/) before the generic causes. runStepWithRecovery() wraps runStep()
   and applies an automatic fix once, but only fixes that touch caches or the retry's environment. */
import { readdirSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';
import { setTimeout as sleep } from 'node:timers/promises';
import { ROOT } from '../dev-config.mjs';
import { c, fail, printError, printToolOutput, runStep, stepDone, stepFail, stepStart } from './cli-utils.mjs';

/* Ordered: the first match wins, so specific causes come before generic ones. */
const FAILURES = [
  {
    kind: 'node-version',
    test: /ERR_UNKNOWN_BUILTIN_MODULE|node:sqlite|requires at least Node|ERR_PNPM_UNSUPPORTED_ENGINE|Unsupported engine|Node\.js version v[\d.]+ detected/i,
    why: 'This is not Node 24. pnpm 11 needs a newer Node (it uses node:sqlite), and engineStrict refuses anything but the version in .nvmrc.',
    fix: 'nvm use   (then run the command again in the same terminal)',
  },
  {
    kind: 'pnpm-version',
    test: /ERR_PNPM_BAD_PM_VERSION|This project is configured to use .*pnpm|packageManager.* but/i,
    why: 'Another pnpm than the one in package.json "packageManager" is running.',
    fix: 'corepack enable   (corepack then runs the pinned pnpm in this folder)',
  },
  {
    kind: 'command-not-found',
    test: /command not found|: not found\b|is not recognized as an internal or external command|ERR_PNPM_RECURSIVE_EXEC_FIRST_FAIL.*not found|spawn \S+ ENOENT/i,
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
    fix: 'wait until it is a day old, or pin the previous version. Do not lower the guard; only NL Design System scopes are excluded.',
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
    kind: 'jest-crash',
    test: /SIGSEGV|Segmentation fault|exit code 139|code 139|Jest worker encountered \d+ child process exceptions|A worker process has failed to exit/i,
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
    kind: 'tests-failed',
    test: /Tests:\s+\d+ failed|Test Suites:\s+\d+ failed|✕ /,
    why: 'Tests failed; the reported lines below name the test and the expectation that did not hold.',
    fix: 'run that package on its own: pnpm --filter <package> run test (add -- -t "<test name>" for one test)',
  },
  {
    kind: 'type-error',
    test: /error TS\d{4}|error NG\d{4}/,
    why: 'TypeScript or the Angular compiler found an error; the lines below give the file, line and message.',
    fix: 'fix the code at that line; pnpm dev shows the same error while you work',
  },
  {
    kind: 'angular-cache',
    test: /\.angular[\\/]cache|Unexpected end of JSON input/i,
    why: 'The Angular build cache looks corrupt.',
    fix: 'pnpm run clean:pick and choose the .angular caches, then retry',
  },
  {
    kind: 'lint',
    test: /\bMD\d{3}\/|✖ \d+ problems?|\d+ problems? \(\d+ errors?/,
    why: 'The linters found problems; the lines below give the file, line and rule.',
    fix: 'pnpm lint-fix repairs what it can (formatting, import order, markdown); fix the rest by hand',
  },
  {
    kind: 'heap',
    test: /JavaScript heap out of memory|Reached heap limit|Allocation failed/i,
    why: 'Node ran out of memory during the build.',
    fix: 'NODE_OPTIONS=--max-old-space-size=8192, then retry',
  },
  {
    kind: 'no-space',
    test: /\bENOSPC\b|no space left on device/i,
    why: 'The disk is full (or macOS ran out of file watchers).',
    fix: 'free some space (pnpm run clean:pick shows what takes room), then retry',
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
    kind: 'missing-module',
    test: /Cannot find module|ERR_MODULE_NOT_FOUND|Cannot find package/i,
    why: 'A dependency is missing, usually after switching branches without installing.',
    fix: 'pnpm install',
  },
];

/** Diagnose a failed step from its output and the error runStep() rejected with. */
export function classifyFailure(output = '', err = null) {
  if (err?.code === 'ENOENT' && err?.syscall === 'spawn' && !output) {
    return {
      kind: 'spawn',
      why: `Could not start \`${err.command ?? 'the command'}\`: ${err.path ?? 'the program'} was not found.`,
      fix: 'is it installed and on your PATH? (pnpm check)',
    };
  }
  if (err?.code === 'ENOENT' && !output) {
    return {
      kind: 'no-folder',
      why: `The folder to run it in does not exist (${err.path ?? 'see below'}).`,
      fix: null,
    };
  }
  for (const failure of FAILURES) {
    if (failure.test.test(output)) return { kind: failure.kind, why: failure.why, fix: failure.fix };
  }
  if (err?.signal) {
    return {
      kind: 'killed',
      why: `The process was stopped by ${err.signal} (out of memory, or from outside).`,
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

/** Automatic fixes that are safe anywhere: they only delete caches or change the retry's environment. */
const DEFAULT_RECOVERIES = {
  network: {
    label: 'waiting 3 s and retrying',
    run: async ({ env }) => {
      await sleep(3000);
      return env;
    },
  },
  'dist-collision': {
    label: 'waiting 5 s and building again',
    run: async ({ env }) => {
      await sleep(5000);
      return env;
    },
  },
  'jest-crash': {
    label: 'running the tests once more',
    run: async ({ env }) => env,
  },
  heap: {
    label: 'retrying with 8 GB of memory',
    run: async ({ env }) => {
      const current = env.NODE_OPTIONS ?? '';
      if (current.includes('--max-old-space-size')) throw new Error('the memory limit was already raised');
      return { ...env, NODE_OPTIONS: `${current} --max-old-space-size=8192`.trim() };
    },
  },
  'angular-cache': {
    label: 'clearing the .angular caches',
    run: async ({ env }) => {
      for (const dir of readdirSync(resolve(ROOT, 'packages'))) {
        rmSync(resolve(ROOT, 'packages', dir, '.angular', 'cache'), { recursive: true, force: true, maxRetries: 3 });
      }
      return env;
    },
  },
  killed: {
    label: 'retrying once',
    run: async ({ env }) => env,
  },
};

/**
 * runStep() with a spinner. On failure: classify, and when a safe fix exists, apply it and try once more. Otherwise
 * the error is thrown with `.diagnosis` attached; pass it to reportStepFailure().
 */
export async function runStepWithRecovery(label, command, { env = process.env, cwd, maxAttempts = 2 } = {}) {
  const tried = new Set();
  let runEnv = env;
  for (let attempt = 1; ; attempt++) {
    const step = stepStart(attempt > 1 ? `${label} (attempt ${attempt})` : label);
    if (process.stdout.isTTY && !process.env.CI) process.stdout.write(`  ${c.gray}[v] show output${c.reset}`);
    try {
      const wasVerbose = await runStep(command, { onVerbose: () => step.pause(), env: runEnv, cwd, label });
      stepDone(step, wasVerbose);
      return;
    } catch (err) {
      stepFail(step);
      const diagnosis = classifyFailure(err.output ?? '', err);
      err.diagnosis = diagnosis;
      const fix = DEFAULT_RECOVERIES[diagnosis.kind];
      /* Each fix at most once: a fix that did not help the first time hides the real error the second time. */
      if (!fix || tried.has(diagnosis.kind) || attempt >= maxAttempts) throw err;
      tried.add(diagnosis.kind);
      console.log(`\n  ${c.yellow}↻${c.reset}  ${diagnosis.why} ${c.gray}Fixing: ${fix.label}...${c.reset}`);
      try {
        runEnv = (await fix.run({ env: runEnv, err })) ?? runEnv;
      } catch (fixErr) {
        printError(fixErr, { what: `The automatic fix failed (${fix.label})` });
        throw err;
      }
    }
  }
}

/**
 * The standard report when a step could not be fixed: what failed, why, what to do, and what the tool itself said
 * (its error lines, or its last lines), with the path of the full log. Only a failure to start shows our own stack.
 */
export function reportStepFailure(label, err) {
  const diagnosis = err.diagnosis ?? classifyFailure(err.output ?? '', err);
  fail({ what: `${label} failed`, why: diagnosis.why, fix: diagnosis.fix ?? undefined });
  if (diagnosis.kind === 'spawn' || diagnosis.kind === 'no-folder' || !('exitCode' in err || 'signal' in err)) {
    printError(err);
    return;
  }
  printToolOutput(err);
  console.log('');
}
