/* `node --test scripts/`: running tools, reading their output, and never hanging on them. */
import './test-env.mjs';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import {
  appendFileSync,
  existsSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  statSync,
  utimesSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import {
  appendLog,
  capture,
  confirmAnswer,
  excerpt,
  LOG_DIR,
  newLogFile,
  printError,
  printFullOutput,
  runStep,
  stripAnsi,
  underSudo,
} from './cli-utils.mjs';
import { nodeCommand } from './test-fakes.mjs';

test('excerpt keeps the error lines, in order and once, and leaves passing lines out', () => {
  const output = [
    'building module 1',
    '\x1b[31msrc/a.ts(1,1): error TS2304: Cannot find name x.\x1b[39m',
    'Found 0 errors.',
    '✓ renders an error-styled message',
    'src/a.ts(1,1): error TS2304: Cannot find name x.',
    'ERR_PNPM_RECURSIVE_RUN_FIRST_FAIL  build failed',
  ].join('\n');
  const { errors, last } = excerpt(output);
  assert.deepEqual(errors, [
    'src/a.ts(1,1): error TS2304: Cannot find name x.',
    'ERR_PNPM_RECURSIVE_RUN_FIRST_FAIL  build failed',
  ]);
  assert.equal(last.at(-1), 'ERR_PNPM_RECURSIVE_RUN_FIRST_FAIL  build failed');
});

test('excerpt caps a flood of errors and says how many more there are', () => {
  const output = Array.from({ length: 40 }, (_, index) => `error ${index}: broken`).join('\n');
  const { errors } = excerpt(output, { max: 5 });
  assert.equal(errors.length, 5);
  assert.match(errors.at(-1), /and 36 more/);
});

test('stripAnsi removes colours and hyperlinks', () => {
  assert.equal(stripAnsi('\x1b[1m\x1b]8;;https://x\x07link\x1b]8;;\x07\x1b[0m'), 'link');
  /* cursor hide/show, an OSC title ended by ST, a charset switch */
  assert.equal(stripAnsi('\x1b[?25la\x1b]0;title\x1b\\b\x1b(Bc\x1b[?25h'), 'abc');
});

test('confirm keys: Enter takes the default, y/n answer, Esc and Ctrl-D say no, anything else waits', () => {
  for (const dflt of [true, false]) {
    assert.equal(confirmAnswer('\r', dflt), dflt);
    assert.equal(confirmAnswer('\n', dflt), dflt);
  }
  assert.equal(confirmAnswer('Y', false), true);
  assert.equal(confirmAnswer('yes\r', false), true);
  assert.equal(confirmAnswer('n', true), false);
  assert.equal(confirmAnswer('\x1b', true), false);
  assert.equal(confirmAnswer('\x04', true), false);
  for (const key of ['\t', '\x7f', '\b', '\x1b[A', '\x1bOQ', 'q'])
    assert.equal(confirmAnswer(key, true), null, JSON.stringify(key));
});

test('runStep resolves on exit 0 and logs the output', async () => {
  await runStep('echo hello-from-step', { label: 'test ok' });
});

test('runStep rejects with the exit code, the output and a log file that holds everything', async () => {
  const command = nodeCommand("process.stderr.write('error: it broke'); process.exitCode = 4");
  await assert.rejects(runStep(command, { label: 'test fail' }), (err) => {
    assert.equal(err.exitCode, 4);
    assert.match(err.output, /it broke/);
    assert.ok(err.log && existsSync(err.log));
    assert.match(readFileSync(err.log, 'utf8'), /it broke[\s\S]*# exit 4/);
    return true;
  });
});

test('runStep gives the tool no stdin: a question fails at once instead of waiting forever', async () => {
  const started = Date.now();
  /* Exits 7 at end of input, as `read -r answer || exit 7` would; a waiting tool would hit the 5 s below. */
  const question = nodeCommand("process.stdin.on('end', () => process.exit(7)).resume()");
  await assert.rejects(runStep(question, { label: 'test prompt' }), (err) => err.exitCode === 7);
  assert.ok(Date.now() - started < 5000);
});

test('runStep reports a folder that does not exist instead of throwing', async () => {
  await assert.rejects(runStep('true', { cwd: '/definitely/not/here', label: 'test cwd' }));
});

test('capture never rejects, and a timeout stops the whole command', async () => {
  const started = Date.now();
  const result = await capture(nodeCommand('setTimeout(() => {}, 10000)'), { timeoutMs: 300 });
  assert.equal(result.timedOut, true);
  assert.ok(Date.now() - started < 3000);
  assert.equal((await capture('exit 2')).code, 2);
});

test('newLogFile writes to the log folder', () => {
  const path = newLogFile('a label: with / odd characters!');
  assert.ok(path && existsSync(path));
  /* -2, -3 when another test run made the same log in the same second. */
  assert.match(path, /a-label-with-odd-characters(-\d+)?\.log$/);
});

test('excerpt skips echoed commands and words that merely start with an e', () => {
  const output = [
    '$ npm-run-all --continue-on-error lint:** lint-workspaces',
    "$ stylelint --allow-empty-input '**/*.{css,scss}'",
    'Warning: React version was set to "detect" in eslint-plugin-react settings.',
    'PULL_REQUEST.md:1 error MD041/first-line-heading',
    'Error: spawn pnpm ENOENT',
  ].join('\n');
  assert.deepEqual(excerpt(output).errors, [
    'PULL_REQUEST.md:1 error MD041/first-line-heading',
    'Error: spawn pnpm ENOENT',
  ]);
});

/* '✖' (e2 9c 96) written in two chunks: decoded per chunk it would come out as U+FFFD. */
const splitChar = (stream, exit) =>
  nodeCommand(
    `process.${stream}.write(Buffer.from([0xe2])); setTimeout(() => { process.${stream}.write(Buffer.from([0x9c, 0x96])); process.exitCode = ${exit} }, 200)`,
  );

test('capture keeps a character that arrives split over two chunks', async () => {
  assert.equal((await capture(splitChar('stdout', 0))).stdout, '✖');
});

test('runStep keeps a character that arrives split over two chunks', async () => {
  /* On stderr: runStep echoes the tool's stdout to ours, and a bare "✖" there is text node:test's report parser
     (Node 24) can misread as a message size. */
  await assert.rejects(runStep(splitChar('stderr', 1), { label: 'test split' }), (err) => {
    assert.equal(err.output, '✖');
    return true;
  });
});

test('capture reports a folder that does not exist as a failure, not a crash or a timeout', async () => {
  const result = await capture('true', { cwd: '/definitely/not/here', timeoutMs: 5000 });
  assert.equal(result.code, 1);
  assert.equal(result.timedOut, false);
  assert.match(result.stderr, /ENOENT/);
});

test('newLogFile twice in the same second does not truncate the first log', () => {
  const first = newLogFile('test same label');
  appendLog(first, 'first attempt');
  const second = newLogFile('test same label');
  assert.notEqual(first, second);
  assert.equal(readFileSync(first, 'utf8'), 'first attempt');
});

test('the log folder is per user and private, also when it already existed with an open mode', () => {
  if (!process.getuid) return;
  assert.match(LOG_DIR, new RegExp(`tilburg-logs-${process.getuid()}$`));
  newLogFile('test mode');
  assert.equal(statSync(LOG_DIR).mode & 0o777, 0o700);
});

test('a log past 20 MB gets one truncated line, and still its exit line', () => {
  const log = newLogFile('test big');
  appendLog(log, 'x'.repeat(20 * 1024 * 1024 - 10));
  appendLog(log, 'y'.repeat(100));
  appendLog(log, 'z'.repeat(100));
  appendLog(log, '\n# exit 1\n');
  const tail = readFileSync(log, 'utf8').slice(-200);
  assert.equal(tail.match(/# truncated/g).length, 1);
  assert.doesNotMatch(tail, /[yz]/);
  assert.match(tail, /# exit 1\n$/);
  rmSync(log);
});

test('pruning skips an idle pnpm dev log for a week, not only an hour', () => {
  const twoHours = (Date.now() - 2 * 60 * 60 * 1000) / 1000;
  const dev = join(LOG_DIR, '2000-01-01T00-00-00-dev-react.log');
  const step = join(LOG_DIR, '2000-01-01T00-00-01-lint.log');
  for (const path of [dev, step]) {
    writeFileSync(path, '');
    utimesSync(path, twoHours, twoHours);
  }
  for (let n = 0; n < 41; n++) newLogFile(`test prune ${n}`);
  assert.ok(existsSync(dev), 'the dev log stays');
  assert.ok(!existsSync(step), 'an old step log goes');
});

test('underSudo: only root with SUDO_USER, not `sudo -iu dev` or a plain root shell', () => {
  assert.equal(underSudo({ SUDO_USER: 'roel' }, 0), true);
  assert.equal(underSudo({ DOAS_USER: 'roel' }, 0), true);
  assert.equal(underSudo({ SUDO_USER: 'roel' }, 501), false);
  assert.equal(underSudo({}, 0), false);
  assert.equal(underSudo({ SUDO_USER: 'roel' }, undefined), false);
});

test('printError prints a circular object instead of throwing', (t) => {
  const printed = [];
  t.mock.method(console, 'error', (line) => printed.push(line));
  const reason = { kind: 'odd' };
  reason.self = reason;
  printError(new Error('outer', { cause: reason }));
  assert.ok(printed.some((line) => /Caused by: .*kind: 'odd'/.test(line)));
});

test('installCrashHandler exits 1 with its report, also for a circular rejection reason', () => {
  const dir = mkdtempSync(join(tmpdir(), 'tilburg-crash-test-'));
  const script = join(dir, 'crash.mjs');
  const lib = new URL('./cli-utils.mjs', import.meta.url).href;
  appendFileSync(
    script,
    `import { installCrashHandler } from '${lib}';\ninstallCrashHandler('crash-test');\n` +
      'const reason = {}; reason.self = reason; Promise.reject(reason);\n',
  );
  const run = spawnSync(process.execPath, [script], { cwd: dir, encoding: 'utf8', timeout: 10_000 });
  assert.equal(run.status, 1);
  assert.match(run.stdout, /crash-test stopped with an unexpected error/);
  assert.match(run.stderr, /<ref \*1>/);
});

test('printFullOutput prints the whole log between clear markers, and the kept tail when there is no log', (t) => {
  const printed = [];
  t.mock.method(console, 'log', (line = '') => printed.push(stripAnsi(line)));
  const log = newLogFile('full output test');
  appendLog(log, '$ make\n# in /x, now\n\nline 1\nline 2\nerror: line 3\n\n# exit 2\n');
  printFullOutput({ command: 'make', exitCode: 2, output: 'error: line 3', log });
  const text = printed.join('\n');
  assert.match(text, /Full output of `make` \(exit code 2\)/);
  assert.match(text, /│ line 1\n.*│ line 2\n.*│ error: line 3/);
  assert.doesNotMatch(text, /# exit/);
  assert.match(text, /end of output/);
  printed.length = 0;
  printFullOutput({ command: 'make', signal: 'SIGKILL', output: 'only the tail', log: '/nonexistent/x.log' });
  assert.match(printed.join('\n'), /stopped by SIGKILL, last part only[\s\S]*│ only the tail/);
});

test('printError prints an error whose getters throw or whose stack is not a string, instead of throwing', (t) => {
  const printed = [];
  t.mock.method(console, 'error', (line) => printed.push(line));
  const odd = new Error('odd');
  odd.stack = 42;
  const trap = new Error('trap');
  Object.defineProperty(trap, 'message', {
    get() {
      throw new Error('boom');
    },
  });
  printError(odd);
  printError(new Error('outer', { cause: trap }));
  assert.ok(printed.some((line) => /Error: odd/.test(line)));
  assert.ok(printed.some((line) => /Caused by: \[object Error\]/.test(line)));
});

test('installCrashHandler still exits 1 with its report when the stack is not a string (not 7)', () => {
  const lib = new URL('./cli-utils.mjs', import.meta.url).href;
  const code = `const { installCrashHandler } = await import('${lib}'); installCrashHandler('crash-test');
    const err = new Error('the real problem'); err.stack = 42; throw err;`;
  const run = spawnSync(process.execPath, ['--input-type=module', '-e', code], { encoding: 'utf8', timeout: 10_000 });
  assert.equal(run.status, 1, run.stderr);
  assert.match(run.stderr, /Error: the real problem/);
});

test('printFullOutput shows all of a runaway log, quickly, with the end marker after the last line', (t) => {
  const printed = [];
  t.mock.method(console, 'log', (line = '') => printed.push(stripAnsi(line)));
  const log = newLogFile('full output flood test');
  const body = Array.from({ length: 20_000 }, (_, index) => `line ${index}`).join('\n');
  appendLog(log, `$ make\n# in /x, now\n\n${body}\n\n# exit 2\n`);
  const started = Date.now();
  printFullOutput({ command: 'make', exitCode: 2, log });
  /* Generous: it is about not hanging, and CI machines run several test files at once. */
  assert.ok(Date.now() - started < 30_000, 'does not hang');
  assert.ok(printed.length >= 20_000, `${printed.length} lines`);
  assert.match(printed.join('\n'), /│ line 0\n/);
  assert.match(printed.join('\n'), /│ line 19999\n[\s\S]*end of output/);
  rmSync(log, { force: true });
});

/* The banner in a child that believes it has a terminal (TILBURG_TTY), `columns` wide. */
const banner = (env, columns = 100) =>
  spawnSync(
    process.execPath,
    [
      '--input-type=module',
      '-e',
      `Object.defineProperty(process.stdout, 'columns', { value: ${columns} });
       const { printBanner } = await import('${new URL('./cli-utils.mjs', import.meta.url).href}'); printBanner('Test');`,
    ],
    {
      env: { ...process.env, CI: '', TILBURG_TTY: '1', NO_COLOR: '', FORCE_COLOR: '', TERM: 'xterm', ...env },
      encoding: 'utf8',
    },
  ).stdout;

test('NO_COLOR and FORCE_COLOR=0 give the banner without colour codes; TERM=dumb gives only its title', () => {
  assert.match(banner({}), /\x1b\[/);
  for (const env of [{ NO_COLOR: '1' }, { FORCE_COLOR: '0' }]) {
    const out = banner(env);
    assert.doesNotMatch(out, /\x1b/, JSON.stringify(env));
    assert.match(out, /█/);
  }
  const dumb = banner({ TERM: 'dumb' });
  assert.doesNotMatch(dumb, /\x1b|█/);
  assert.match(dumb, /Tilburg Design System · Test/);
});

test('a terminal too narrow for the banner art gets only its title', () => {
  const out = banner({}, 40);
  assert.doesNotMatch(out, /█/);
  assert.match(out, /Tilburg Design System · Test/);
});
