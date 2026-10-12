/* Shared terminal helpers for the developer scripts (`pnpm check`, `dev`, `sync`, `verify`, `clean`, `help`, `menu`).
   Node built-ins only, so they work before `pnpm install` — which is exactly when `pnpm check` is most useful.
   Ported from the nvwa-angular and bq-tlb-frontend tooling. */
import { spawn } from 'node:child_process';
import { appendFileSync, mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';

/**
 * No colours, spinners or banner art in CI or when the output goes to a file. TILBURG_TTY=1 says the output reaches a
 * terminal by another way (welcome.mjs writes to /dev/tty, because pnpm folds the output of install hooks away).
 */
export const interactive = (Boolean(process.stdout.isTTY) || process.env.TILBURG_TTY === '1') && !process.env.CI;

const colours = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m',
};

/** Colour codes, or empty strings when the output is not a terminal. */
export const c = interactive ? colours : Object.fromEntries(Object.keys(colours).map((key) => [key, '']));

/** OSC 8 hyperlink: clickable in iTerm2, the VS Code and JetBrains terminals, Warp and Windows Terminal. */
export function hyperlink(text, url) {
  return interactive ? `\x1b]8;;${url}\x07${text}\x1b]8;;\x07` : text;
}

/** Remove colour codes and hyperlink markers, to measure or store the visible text. */
export function stripAnsi(text) {
  return String(text)
    .replace(/\x1b\[[0-9;]*[A-Za-z]/g, '')
    .replace(/\x1b\]8;;[^\x07]*\x07/g, '');
}

/** "3 min ago", "2 h ago", "5 days ago". */
export function ago(ms) {
  const minutes = Math.round((Date.now() - ms) / 60_000);
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 48) return `${hours} h ago`;
  return `${Math.round(hours / 24)} days ago`;
}

// ─── Banner ──────────────────────────────────────────────────────────────────

/** The Tilburg ASCII banner, as in bq-tlb-frontend. */
export const bannerLines = [
  '████████╗██╗██╗     ██████╗ ██╗   ██╗██████╗  ██████╗ ',
  '╚══██╔══╝██║██║     ██╔══██╗██║   ██║██╔══██╗██╔════╝ ',
  '   ██║   ██║██║     ██████╔╝██║   ██║██████╔╝██║  ███╗',
  '   ██║   ██║██║     ██╔══██╗██║   ██║██╔══██╗██║   ██║',
  '   ██║   ██║███████╗██████╔╝╚██████╔╝██║  ██║╚██████╔╝',
  '   ╚═╝   ╚═╝╚══════╝╚═════╝  ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ',
];

/* Tilburg's brand colours (design tokens blue-300 → pink-300), as [hue, saturation, lightness]. */
const BRAND_FROM = [197, 100, 43];
const BRAND_TO = [328, 100, 44];

/** How many colours this terminal shows: 'truecolor', '256' or 'basic'. */
function colourDepth() {
  const term = `${process.env.TERM ?? ''} ${process.env.TERM_PROGRAM ?? ''}`.toLowerCase();
  if (
    /truecolor|24bit/i.test(process.env.COLORTERM ?? '') ||
    /iterm|vscode|wezterm|warp|ghostty|kitty|hyper|alacritty/.test(term)
  ) {
    return 'truecolor';
  }
  return /256/.test(term) || process.env.TERM_PROGRAM === 'Apple_Terminal' ? '256' : 'basic';
}

function hslToRgb([h, sPercent, lPercent]) {
  const s = sPercent / 100;
  const l = lPercent / 100;
  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [f(0), f(8), f(4)].map((value) => Math.round(value * 255));
}

/** A foreground colour escape for [r, g, b] in the depth the terminal has. */
function fg([r, g, b], depth) {
  if (depth === 'truecolor') return `\x1b[38;2;${r};${g};${b}m`;
  /* The nearest colour of the 6×6×6 cube in the 256-colour palette. */
  const level = (value) => (value < 48 ? 0 : value < 115 ? 1 : Math.round((value - 35) / 40));
  return `\x1b[38;5;${16 + 36 * level(r) + 6 * level(g) + level(b)}m`;
}

/** Mix two sRGB colours in linear light: a straight mix in sRGB (or a walk round the hue circle) goes muddy or garish. */
function mix(from, to, t) {
  const linear = (value) => (value / 255 <= 0.04045 ? value / 255 / 12.92 : ((value / 255 + 0.055) / 1.055) ** 2.4);
  const srgb = (value) => Math.round(255 * (value <= 0.0031308 ? value * 12.92 : 1.055 * value ** (1 / 2.4) - 0.055));
  return from.map((value, index) => srgb(linear(value) + (linear(to[index]) - linear(value)) * t));
}

/** Raise a colour's saturation to at least `minimum` (0–1) at the same hue and lightness: a mix greys in the middle. */
function saturate([r, g, b], minimum) {
  const max = Math.max(r, g, b) / 255;
  const min = Math.min(r, g, b) / 255;
  const l = (max + min) / 2;
  if (max === min) return [r, g, b];
  const d = max - min;
  const sat = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  const hue =
    max === r / 255
      ? ((g - b) / 255 / d + (g < b ? 6 : 0)) * 60
      : max === g / 255
        ? ((b - r) / 255 / d + 2) * 60
        : ((r - g) / 255 / d + 4) * 60;
  return hslToRgb([hue, Math.max(sat, minimum) * 100, l * 100]);
}

/**
 * The banner in Tilburg blue running into Tilburg pink, column by column: the █ blocks are the letters, the ╔═╗ lines
 * become their drop shadow (the same colour, darker). Same size as the plain version.
 */
function colourBanner(depth) {
  const width = Math.max(...bannerLines.map((line) => line.length));
  const [from, to] = [hslToRgb(BRAND_FROM), hslToRgb(BRAND_TO)];
  return bannerLines.map(
    (line) =>
      [...line]
        .map((char, column) => {
          if (char === ' ') return char;
          if (depth === 'basic') return char === '█' ? `${c.blue}${char}` : `${c.gray}${char}`;
          const face = saturate(mix(from, to, width > 1 ? column / (width - 1) : 0), 0.8);
          const colour = char === '█' ? face : face.map((value) => Math.round(value * 0.45));
          return `${fg(colour, depth)}${char}`;
        })
        .join('') + c.reset,
  );
}

/** The banner with a subtitle such as "Environment check". Only the subtitle in CI or a log file. */
export function printBanner(subtitle) {
  const title = `Tilburg Design System · ${subtitle}`;
  if (!interactive) {
    console.log(`\n${title}\n`);
    return;
  }
  const depth = colourDepth();
  const pink = depth === 'basic' ? c.magenta : fg(hslToRgb(BRAND_TO), depth);
  console.log('');
  for (const line of colourBanner(depth)) console.log(`      ${line}`);
  console.log(`\n      ${c.bold}${pink}Tilburg Design System${c.reset}${c.gray} · ${subtitle}${c.reset}\n`);
}

// ─── Steps: a spinner per step, the output hidden until it matters ───────────

const SPINNER = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];

/** Start a step line with a spinner. Close it with stepDone() or stepFail(); `pause()` stops only the spinner. */
export function stepStart(label) {
  if (!interactive) {
    process.stdout.write(`  •  ${label}...\n`);
    return { label, t: Date.now(), interval: null, pause: () => {} };
  }
  let frame = 0;
  let paused = false;
  const render = () => {
    if (!paused) process.stdout.write(`\r  ${c.cyan}${SPINNER[frame++ % SPINNER.length]}${c.reset}  ${label}...`);
  };
  render();
  const interval = setInterval(render, 80);
  return {
    label,
    t: Date.now(),
    interval,
    pause: () => {
      paused = true;
      clearInterval(interval);
    },
  };
}

export function stepDone({ label, t, interval }, verbose = false) {
  clearInterval(interval);
  const elapsed = ((Date.now() - t) / 1000).toFixed(1);
  const prefix = verbose || !interactive ? '' : '\r\x1b[2K';
  process.stdout.write(`${prefix}  ${c.green}✓${c.reset}  ${label.padEnd(40)} ${c.gray}${elapsed}s${c.reset}\n`);
}

export function stepFail({ label, interval }, verbose = false) {
  clearInterval(interval);
  const prefix = verbose || !interactive ? '' : '\r\x1b[2K';
  process.stdout.write(`${prefix}  ${c.red}✗${c.reset}  ${label}\n`);
}

/** Note that an earlier step was skipped, on its own line. */
export function stepSkip(label, why) {
  process.stdout.write(`  ${c.gray}–  ${label.padEnd(40)} ${why}${c.reset}\n`);
}

// ─── Child processes: tracked, logged, stoppable ─────────────────────────────

/* Every long-running child goes in here, so a crash, Ctrl-C or a plain exit stops them all instead of leaving a
   watcher or a Storybook running in the background. */
const children = new Set();

/** Register a child (spawned with `detached`, so it leads its own process group) to be stopped when we exit. */
export function track(child) {
  children.add(child);
  child.once('close', () => children.delete(child));
  return child;
}

/** Stop every tracked child and its whole tree. Synchronous: it also runs from the 'exit' event. */
export function stopChildren(signal = 'SIGTERM') {
  for (const child of children) killTree(child, signal);
  children.clear();
}
process.on('exit', () => stopChildren());

/** Stop a shell-spawned child together with everything it started (pnpm → node → storybook…). */
export function killTree(child, signal = 'SIGTERM') {
  if (!child?.pid) return;
  try {
    if (process.platform === 'win32') {
      spawn('taskkill', ['/pid', String(child.pid), '/T', '/F'], { stdio: 'ignore' }).on('error', () => {});
    } else {
      /* A negative pid signals the whole process group; that needs the child spawned with `detached`. */
      process.kill(-child.pid, signal);
    }
  } catch {
    try {
      child.kill(signal);
    } catch {
      /* already gone */
    }
  }
}

/* `pnpm check | head` closes the pipe early; writing to it then throws EPIPE. That is the reader's choice, not a crash. */
for (const stream of [process.stdout, process.stderr]) {
  stream.on('error', (err) => {
    if (err.code === 'EPIPE') process.exit(0);
    throw err;
  });
}

// ─── Logs: the full output of every step, kept on disk ───────────────────────

export const LOG_DIR = resolve(tmpdir(), 'tilburg-logs');
const KEEP_LOGS = 40;

/** A new log file for `label` (oldest ones are pruned). Returns its path, or null when the disk will not have it. */
export function newLogFile(label) {
  try {
    mkdirSync(LOG_DIR, { recursive: true });
    const old = readdirSync(LOG_DIR)
      .filter((name) => name.endsWith('.log'))
      .sort();
    for (const name of old.slice(0, Math.max(0, old.length - KEEP_LOGS + 1)))
      rmSync(resolve(LOG_DIR, name), { force: true });
    const slug =
      label
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
        .slice(0, 40) || 'step';
    const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    const path = resolve(LOG_DIR, `${stamp}-${slug}.log`);
    writeFileSync(path, '');
    return path;
  } catch {
    return null;
  }
}

/** Append to a log without ever throwing: losing a log line is better than losing the step. */
export function appendLog(path, text) {
  if (!path) return;
  try {
    appendFileSync(path, text);
  } catch {
    /* disk full or folder gone: carry on without */
  }
}

/** The path as a clickable file link. */
export const logLink = (path) => (path ? hyperlink(path, `file://${path}`) : '(no log could be written)');

// ─── What did the tool say? ──────────────────────────────────────────────────

/* Lines that carry the actual complaint, from pnpm, npm, node, tsc, ng, vite, jest, eslint, stylelint and markdownlint.
   "0 errors" and the like are left out. */
const ERROR_LINE =
  /\b(error|ERR!|failed|failure|cannot|can't|unable to|not found|missing|denied|refused|invalid|unexpected|exception)\b|✖|✗|×|●|\bFAIL\b/i;
/* Case-sensitive on purpose: errno and tool codes (ENOENT, ERR_PNPM_…, TS2304, NG8002, MD041). Case-insensitive,
   "E[A-Z]{3,}" would match every word that starts with an e. */
const ERROR_CODE = /\bE[A-Z]{3,}\b|\bERR_[A-Z_]+|\bTS\d{4}\b|\bNG\d{4}\b|\bMD\d{3}\b/;
/* The command lines pnpm and npm-run-all echo ("$ eslint --report-…"), and passing lines that mention errors. */
const ECHOED_COMMAND = /^\s*[$>] /;
const NOT_AN_ERROR = /\b0 errors?\b|without errors|no errors|error-?(message|styled|state)|\berrors?: 0\b|✓|✔/i;

/**
 * The part of a tool's output a human needs: up to `max` lines that look like errors (in order, without repeats), and
 * the last `tail` lines — the error often sits just above the exit. Colour codes removed.
 */
export function excerpt(output, { max = 12, tail = 10 } = {}) {
  const lines = stripAnsi(output)
    .split(/\r?\n/)
    .map((line) => line.replace(/\s+$/, ''))
    .filter((line) => line.trim());
  const seen = new Set();
  const errors = [];
  for (const line of lines) {
    const key = line.trim();
    if (!(ERROR_LINE.test(line) || ERROR_CODE.test(line)) || ECHOED_COMMAND.test(line) || NOT_AN_ERROR.test(line))
      continue;
    if (seen.has(key)) continue;
    seen.add(key);
    errors.push(line.length > 220 ? `${line.slice(0, 217)}...` : line);
  }
  const last = lines.slice(-tail).map((line) => (line.length > 220 ? `${line.slice(0, 217)}...` : line));
  return {
    errors: errors.length > max ? [...errors.slice(0, max - 1), `… and ${errors.length - max + 1} more`] : errors,
    last,
  };
}

/** Print what a tool said, briefly: its error lines, else its last lines, and where the full log is. */
export function printToolOutput({ output = '', log } = {}) {
  const { errors, last } = excerpt(output);
  const shown = errors.length ? errors : last;
  if (shown.length) {
    console.log(`     ${c.gray}${errors.length ? 'What the tool reported:' : 'Last lines of its output:'}${c.reset}`);
    for (const line of shown) console.log(`     ${c.red}│${c.reset} ${line}`);
  } else {
    console.log(`     ${c.gray}The tool printed nothing before it stopped.${c.reset}`);
  }
  if (log) console.log(`     ${c.gray}Full output:${c.reset} ${logLink(log)}`);
}

// ─── Steps ───────────────────────────────────────────────────────────────────

/** How much of a failed command's output is kept for classifyFailure(). */
const OUTPUT_TAIL_BYTES = 256 * 1024;
/** No output for this long: say that it is still busy, rather than look stuck. */
const QUIET_NOTICE_MS = 2 * 60_000;

/**
 * Run a shell command with its output held back (V shows it) and written to a log file. Without stdin: a tool that
 * stops to ask a question gets end-of-input and fails at once, instead of waiting forever for an answer nobody sees.
 * Rejects on a non-zero exit with `command`, `exitCode`, `signal`, `output` (the last 256 KB, without colours) and
 * `log` (the full output); recovery.mjs reads those. Resolves with whether the output was shown.
 */
export function runStep(command, { onVerbose, env, cwd, label = command } = {}) {
  return new Promise((resolvePromise, reject) => {
    const log = newLogFile(label);
    appendLog(log, `$ ${command}\n# in ${cwd ?? process.cwd()}, ${new Date().toISOString()}\n\n`);
    let child;
    try {
      child = track(
        spawn(command, {
          shell: true,
          cwd,
          detached: process.platform !== 'win32',
          stdio: ['ignore', 'pipe', 'pipe'],
          env: { FORCE_COLOR: '1', ...(env ?? process.env) },
        }),
      );
    } catch (err) {
      /* A missing cwd throws here, synchronously, instead of emitting 'error'. */
      Object.assign(err, { command, output: '', log });
      reject(err);
      return;
    }
    const held = [];
    let tail = '';
    let verbose = !interactive;
    let lastOutput = Date.now();

    const showHeld = () => {
      held.forEach(({ stream, data }) => stream.write(data));
      held.length = 0;
    };
    const onKey = (key) => {
      if (key.includes('\u0003')) {
        stopListening();
        stopChildren('SIGINT');
        process.stdout.write('\n');
        process.exit(130);
      }
      if ((key === 'v' || key === 'V') && !verbose) {
        verbose = true;
        onVerbose?.();
        process.stdout.write('\n');
        showHeld();
      }
    };
    const stopListening = () => {
      clearInterval(quietTimer);
      if (process.stdin.isTTY) {
        process.stdin.removeListener('data', onKey);
        try {
          process.stdin.setRawMode(false);
        } catch {
          /* stdin already closed */
        }
        process.stdin.pause();
      }
    };
    if (process.stdin.isTTY) {
      process.stdin.setRawMode(true);
      process.stdin.resume();
      process.stdin.setEncoding('utf8');
      process.stdin.on('data', onKey);
    }
    const quietTimer = setInterval(() => {
      if (verbose || Date.now() - lastOutput < QUIET_NOTICE_MS) return;
      lastOutput = Date.now();
      onVerbose?.();
      process.stdout.write(
        `\n  ${c.gray}Still busy (no output for 2 minutes). [v] shows what it is doing.${c.reset}\n`,
      );
    }, 15_000);

    const collect = (stream) => (data) => {
      lastOutput = Date.now();
      tail = (tail + data).slice(-OUTPUT_TAIL_BYTES);
      appendLog(log, stripAnsi(data));
      if (verbose) {
        stream.write(data);
        return;
      }
      /* Held for V. Capped: a long build would otherwise grow it without end; the log file has everything. */
      held.push({ stream, data });
      if (held.length > 5000) held.splice(0, held.length - 5000);
    };
    child.stdout.on('data', collect(process.stdout));
    child.stderr.on('data', collect(process.stderr));

    child.on('close', (code, signal) => {
      stopListening();
      appendLog(log, `\n# exit ${signal ?? code}\n`);
      if (code === 0) {
        resolvePromise(verbose);
        return;
      }
      const err = new Error(
        signal ? `\`${command}\` was stopped by ${signal}` : `\`${command}\` exited with code ${code}`,
      );
      Object.assign(err, { command, exitCode: code, signal, output: stripAnsi(tail), log });
      reject(err);
    });
    child.on('error', (err) => {
      stopListening();
      Object.assign(err, { command, output: stripAnsi(tail), log });
      reject(err);
    });
  });
}

/**
 * Run a command and capture its output without showing it. Never rejects: resolves with { code, stdout, stderr,
 * timedOut }. For probes, whose failure is their result. Without stdin, like runStep.
 */
export function capture(command, { timeoutMs = 60_000, cwd } = {}) {
  return new Promise((resolvePromise) => {
    let child;
    try {
      child = track(
        spawn(command, { shell: true, cwd, detached: process.platform !== 'win32', stdio: ['ignore', 'pipe', 'pipe'] }),
      );
    } catch (err) {
      resolvePromise({ code: 1, stdout: '', stderr: String(err.message ?? err), timedOut: false });
      return;
    }
    let stdout = '';
    let stderr = '';
    let settled = false;
    const done = (code, extra = {}) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      resolvePromise({ code, stdout, stderr, timedOut: false, ...extra });
    };
    const timer = setTimeout(() => {
      killTree(child, 'SIGKILL');
      done(1, { timedOut: true });
    }, timeoutMs);
    child.stdout.on('data', (d) => (stdout += d));
    child.stderr.on('data', (d) => (stderr += d));
    child.on('close', (code) => done(code ?? 1));
    child.on('error', (err) => {
      stderr += String(err.message ?? err);
      done(1);
    });
  });
}

// ─── Questions ───────────────────────────────────────────────────────────────

/** One-key [Y/n] question. Without a terminal it answers `fallback` instead of waiting for nobody. */
export function confirm(question, { default: dflt = true, fallback = false } = {}) {
  return new Promise((resolve) => {
    if (!process.stdin.isTTY) {
      resolve(fallback);
      return;
    }
    process.stdout.write(`  ${c.bold}${question}${c.reset} ${c.cyan}${dflt ? '[Y/n]' : '[y/N]'}${c.reset}  `);
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    process.stdin.once('data', (chunk) => {
      process.stdin.setRawMode(false);
      process.stdin.pause();
      if (chunk.includes('\u0003')) {
        process.stdout.write('\n');
        process.exit(130);
      }
      /* One 'data' event can hold several bytes (a paste, an arrow key): look at the first printable one. */
      const printable = [...chunk].filter((ch) => ch >= ' ' && ch !== '\u007f');
      const yes = printable.length === 0 ? dflt : /^y$/i.test(printable[0]);
      process.stdout.write(`\r\x1b[2K  ${c.bold}${question}${c.reset}  ${c.gray}${yes ? 'yes' : 'no'}${c.reset}\n`);
      resolve(yes);
    });
  });
}

// ─── Reporting ───────────────────────────────────────────────────────────────

/**
 * Print groups of { ok, warn, skip, label, detail, note } rows as a ✅/⚠️/❌ table. A `warn` row works but deserves
 * attention (a stale build, a busy port); it does not fail the check. Returns the tally.
 */
export function printCheckTable(groups) {
  const rows = groups.flatMap((group) => group.rows);
  const width = Math.max(...rows.map((row) => row.label.length)) + 2;

  for (const group of groups) {
    console.log(`  ${c.bold}${group.title}${c.reset}`);
    for (const { ok, warn, skip, label, detail, note } of group.rows) {
      const icon = skip ? `${c.gray}➖${c.reset}` : !ok ? '❌' : warn ? '⚠️ ' : '✅';
      console.log(`  ${icon}  ${label.padEnd(width)}  ${detail}${note ? `  ${c.gray}${note}${c.reset}` : ''}`);
    }
    console.log('');
  }

  for (const { label, error } of rows) {
    if (error) printError(error, { what: `${label}: the check itself failed` });
  }

  const counted = rows.filter((row) => !row.skip);
  return {
    failed: counted.filter((row) => !row.ok),
    warned: counted.filter((row) => row.ok && row.warn),
    total: counted.length,
  };
}

/** The one shape for a failure: what broke, why, and what to do about it. */
export function fail({ what, why, fix }) {
  console.log(`\n  ${c.red}✗${c.reset}  ${c.bold}${what}${c.reset}`);
  if (why) console.log(`     ${c.gray}Why:${c.reset}  ${why}`);
  if (fix) console.log(`     ${c.gray}Fix:${c.reset}  ${c.cyan}${fix}${c.reset}`);
  console.log('');
}

/** An exception in full: name, message, errno code, the `cause` chain and the stack. */
export function printError(err, { what, why, fix } = {}) {
  if (what) fail({ what, why, fix });
  let current = err;
  for (let depth = 0; current && depth < 5; depth++) {
    const prefix = depth === 0 ? '' : 'Caused by: ';
    if (current instanceof Error) {
      console.error(
        `  ${c.red}${prefix}${current.name}: ${current.message}${current.code ? ` [${current.code}]` : ''}${c.reset}`,
      );
      for (const line of (current.stack ?? '').split('\n').slice(1))
        console.error(`  ${c.gray}${line.trim()}${c.reset}`);
      current = current.cause;
    } else {
      console.error(`  ${c.red}${prefix}${typeof current === 'string' ? current : JSON.stringify(current)}${c.reset}`);
      current = null;
    }
  }
  console.error('');
}

function restoreTerminal() {
  try {
    if (process.stdin.isTTY && process.stdin.isRaw) process.stdin.setRawMode(false);
    if (process.stdout.isTTY) process.stdout.write('\x1b[?25h');
  } catch {
    /* nothing more we can do */
  }
}

/**
 * The safety net for every script: anything nobody caught is printed in full (with where to go next), and Ctrl-C or
 * a kill stops every child process before exiting, so nothing keeps running in the background. A script with its own
 * shutdown (pnpm dev) passes `signals: false`.
 */
export function installCrashHandler(script, { signals = true } = {}) {
  const onCrash = (err) => {
    restoreTerminal();
    stopChildren();
    printError(err, {
      what: `${script} stopped with an unexpected error`,
      why: 'Nothing recognised this failure, so here is the exception itself. This is a bug in the script, not in your work.',
      fix: 'pnpm check — and if that is all green, share the trace below (scripts/ in the tilburg repo)',
    });
    process.exit(1);
  };
  process.on('uncaughtException', onCrash);
  process.on('unhandledRejection', onCrash);
  if (signals) {
    const onSignal = (signal) => {
      restoreTerminal();
      stopChildren(signal);
      console.log(`\n  ${c.gray}Stopped (${signal === 'SIGINT' ? 'Ctrl-C' : signal}).${c.reset}\n`);
      process.exit(130);
    };
    process.on('SIGINT', onSignal);
    process.on('SIGTERM', onSignal);
    process.on('SIGHUP', onSignal);
  }
}

/** Open a URL in the default browser. Never throws: not opening a browser is cosmetic. */
export function openUrl(url) {
  const [command, args] =
    process.platform === 'darwin'
      ? ['open', [url]]
      : process.platform === 'win32'
        ? ['cmd', ['/c', 'start', '', url]]
        : ['xdg-open', [url]];
  try {
    const child = spawn(command, args, { stdio: 'ignore', detached: true });
    child.on('error', () => console.log(`  Could not open a browser; go to ${url}`));
    child.unref();
  } catch {
    console.log(`  Could not open a browser; go to ${url}`);
  }
}
