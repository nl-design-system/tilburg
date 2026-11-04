/* Shared terminal helpers for the developer scripts (`pnpm check`, `dev`, `sync`, `verify`, `clean`, `help`, `menu`).
   Node built-ins only, so they work before `pnpm install` — which is exactly when `pnpm check` is most useful.
   Ported from the nvwa-angular and bq-tlb-frontend tooling. */
import { spawn } from 'node:child_process';
import {
  appendFileSync,
  chmodSync,
  lstatSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { constants, tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import util, { inspect } from 'node:util';

/**
 * No colours, spinners or banner art in CI or when the output goes to a file. TILBURG_TTY=1 says the output reaches a
 * terminal another way (welcome.mjs writes to /dev/tty: pnpm folds the output of install hooks away).
 */
export const interactive =
  (Boolean(process.stdout.isTTY) || process.env.TILBURG_TTY === '1') && !process.env.CI && process.env.TERM !== 'dumb';
/* Read once and dropped: the tools and scripts this process starts must not inherit a terminal they do not have. */
delete process.env.TILBURG_TTY;
/* NO_COLOR (no-color.org) and FORCE_COLOR=0 ask for plain text, also on a terminal. */
const colour = interactive && !process.env.NO_COLOR && process.env.FORCE_COLOR !== '0';
/* 0 or undefined when nobody knows (TILBURG_TTY, some ptys): assume the usual 80. */
const columns = () => process.stdout.columns || 80;

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

/** Colour codes, or empty strings when the output is not a terminal or colour is turned off. */
export const c = colour ? colours : Object.fromEntries(Object.keys(colours).map((key) => [key, '']));

/* The Linux console, and screen or an old tmux, print OSC 8 as garbage instead of ignoring it. */
const links = interactive && !/^(linux|screen)/.test(process.env.TERM ?? '');

/** OSC 8 hyperlink: clickable in iTerm2, the VS Code and JetBrains terminals, Warp and Windows Terminal. */
export function hyperlink(text, url) {
  return links ? `\x1b]8;;${url}\x07${text}\x1b]8;;\x07` : text;
}

/** Strip colour, cursor, charset and OSC (hyperlink, title) sequences, to measure or store the visible text. */
export function stripAnsi(text) {
  return String(text).replace(/\x1b\[[0-?]*[ -/]*[@-~]|\x1b\][^\x07\x1b]*(?:\x07|\x1b\\)|\x1b[()][0-9A-B]/g, '');
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

/** Mix two sRGB colours in linear light: a straight sRGB mix (or a walk round the hue circle) goes muddy or garish. */
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
 * The banner in Tilburg blue running into pink, column by column: the █ blocks are the letters, the ╔═╗ lines their
 * drop shadow (same colour, darker). Same size as the plain version.
 */
function colourBanner(depth) {
  return bannerLines.map(
    (line) =>
      [...line]
        .map((char, column) => {
          if (char === ' ') return char;
          if (depth === 'basic') return char === '█' ? `${c.blue}${char}` : `${c.gray}${char}`;
          return `${fg(bannerColour(char, column), depth)}${char}`;
        })
        .join('') + c.reset,
  );
}

/** [r, g, b] of a banner character in `column`; also used for the README image (scripts/banner.mjs). */
export function bannerColour(char, column) {
  const width = Math.max(...bannerLines.map((line) => line.length));
  const face = saturate(mix(hslToRgb(BRAND_FROM), hslToRgb(BRAND_TO), width > 1 ? column / (width - 1) : 0), 0.8);
  return char === '█' ? face : face.map((value) => Math.round(value * 0.45));
}

/** The banner with a subtitle such as "Environment check". Only the subtitle in CI or a log file. */
export function printBanner(subtitle) {
  const title = `Tilburg Design System · ${subtitle}`;
  /* The art is 60 columns wide: in a narrower terminal every line would wrap into a mess. */
  if (!interactive || columns() < 61) {
    console.log(`\n${title}\n`);
    return;
  }
  /* 'basic' with c empty draws the art without colour. */
  const depth = colour ? colourDepth() : 'basic';
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

/* Every long-running child: a crash, Ctrl-C or a plain exit stops them all, so no watcher or Storybook lingers. */
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
  /* After a SIGINT they stay listed: one that ignores it (a Stencil build) still gets the SIGTERM on exit. */
  if (signal !== 'SIGINT') children.clear();
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

/* `pnpm check | head` closes the pipe early; writing to it then throws EPIPE: the reader's choice, not a crash. Exit
   with the code already set (a failure before the pipe closed), else 0: `pnpm commands | head` is not an error, and
   pnpm would report one for the shell's 141 (128 + SIGPIPE). */
for (const stream of [process.stdout, process.stderr]) {
  stream.on('error', (err) => {
    if (err.code === 'EPIPE') process.exit(process.exitCode ?? 0);
    throw err;
  });
}

// ─── Logs: the full output of every step, kept on disk ───────────────────────

/* One per user: on a temp folder users share (Linux /tmp), someone else's folder would leave us without logs. */
export const LOG_DIR = resolve(tmpdir(), process.getuid ? `tilburg-logs-${process.getuid()}` : 'tilburg-logs');
const KEEP_LOGS = 40;
const MAX_LOG_BYTES = 20 * 1024 * 1024;
const truncatedLogs = new Set();

/** A new log file for `label` (oldest ones are pruned). Returns its path, or null when the disk will not have it. */
export function newLogFile(label) {
  try {
    /* Private: tool output can hold tokens. On a temp folder shared between users (Linux /tmp), a log folder that
       someone else made (or a symlink) is not used: they could read the logs or point them elsewhere. */
    mkdirSync(LOG_DIR, { recursive: true, mode: 0o700 });
    const folder = lstatSync(LOG_DIR);
    if (folder.isSymbolicLink() || (process.getuid && folder.uid !== process.getuid())) return null;
    /* mode above applies only on create: a folder from an older version may still be readable by everyone. */
    chmodSync(LOG_DIR, 0o700);
    const old = readdirSync(LOG_DIR)
      .filter((name) => name.endsWith('.log'))
      .sort();
    /* Never a log still being written: pnpm dev opens its watcher logs at the start, so they are the oldest names, and
       a verify in another terminal would otherwise prune them (and their early errors) away. */
    const busy = Date.now() - 60 * 60 * 1000;
    /* A pnpm dev watcher can stay silent for hours while it runs, so its logs get a week. */
    const busyDev = Date.now() - 7 * 24 * 60 * 60 * 1000;
    for (const name of old.slice(0, Math.max(0, old.length - KEEP_LOGS + 1))) {
      const path = resolve(LOG_DIR, name);
      const since = /^[\dT-]{19}-dev-/.test(name) ? busyDev : busy;
      if (lstatSync(path, { throwIfNoEntry: false })?.mtimeMs < since) rmSync(path, { force: true });
    }
    const slug =
      label
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
        .slice(0, 40) || 'step';
    const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    /* A retry within the same second, or another script starting at the same moment, must not truncate a log: 'wx'
       claims the name in one step (an existsSync() check first would race). */
    for (let n = 1; ; n++) {
      const path = resolve(LOG_DIR, n === 1 ? `${stamp}-${slug}.log` : `${stamp}-${slug}-${n}.log`);
      try {
        writeFileSync(path, '', { flag: 'wx', mode: 0o600 });
        return path;
      } catch (err) {
        if (err.code !== 'EEXIST') throw err;
      }
    }
  } catch {
    return null;
  }
}

/**
 * Append to a log without ever throwing: a lost log line beats a lost step. Past 20 MB (a watcher that loops for
 * days) only one "truncated" line and the closing "# exit" line are still written.
 */
export function appendLog(path, text) {
  if (!path) return;
  try {
    if (!text.startsWith('\n# exit')) {
      if (truncatedLogs.has(path)) return;
      if ((statSync(path, { throwIfNoEntry: false })?.size ?? 0) + text.length > MAX_LOG_BYTES) {
        truncatedLogs.add(path);
        text = `\n# truncated: this log passed ${MAX_LOG_BYTES / 1024 / 1024} MB, the rest was not kept\n`;
      }
    }
    /* mode: a log pruned meanwhile is created again, and must be as private as newLogFile makes it. */
    appendFileSync(path, text, { mode: 0o600 });
  } catch {
    /* disk full or folder gone: carry on without */
  }
}

/** The path as a clickable file link. */
export const logLink = (path) => (path ? hyperlink(path, pathToFileURL(path).href) : '(no log could be written)');

// ─── What did the tool say? ──────────────────────────────────────────────────

/* The complaint lines of pnpm, npm, node, tsc, ng, vite, jest, eslint, stylelint and markdownlint; "0 errors" and the
   like are left out. */
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

/**
 * Everything a failed command printed, between clear start and end lines: from its log file (complete, colours
 * stripped), or the tail runStep() kept when the log could not be written or read.
 */
export function printFullOutput({ command, exitCode, signal, output = '', log } = {}) {
  let text = output;
  let complete = false;
  try {
    /* The log starts with the "$ command" header runStep() wrote; the output follows the first blank line. */
    text = readFileSync(log, 'utf8').split('\n\n').slice(1).join('\n\n');
    complete = true;
  } catch {
    /* no log: show the tail instead */
  }
  /* All of it, also for a long build: the summary comes after it, so it stays the last thing on screen. */
  const lines = text
    .replace(/\n# exit \S+\n?$/, '')
    .replace(/\s+$/, '')
    .split('\n');
  const how = signal ? `stopped by ${signal}` : `exit code ${exitCode ?? '?'}`;
  const rule = (title) =>
    console.log(
      `\n  ${c.gray}──── ${title} ${'─'.repeat(Math.max(4, Math.min(72, columns() - 10) - title.length))}${c.reset}`,
    );
  rule(`Full output of \`${command ?? 'the command'}\` (${how}${complete ? '' : ', last part only'})`);
  if (!text.trim()) console.log(`  ${c.gray}│${c.reset} (it printed nothing)`);
  else for (const line of lines) console.log(`  ${c.gray}│${c.reset} ${line}`);
  rule('end of output');
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
/** No output for this long: say it is still busy rather than look stuck. */
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
          /* Tools print colour into a pipe only when forced: only when it reaches a terminal (not a file, CI or
             NO_COLOR). LANGUAGE: git, the shell and strerror in English, which classifyFailure reads. */
          env: { ...(colour ? { FORCE_COLOR: '1' } : {}), ...(env ?? process.env), LANGUAGE: 'en' },
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
    /* Decode as a stream: a character split over two chunks would otherwise turn into two U+FFFD. */
    child.stdout.setEncoding('utf8').on('data', collect(process.stdout));
    child.stderr.setEncoding('utf8').on('data', collect(process.stderr));

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
      /* streamed: the output was already shown live (no terminal, or V), so the report need not repeat it. */
      Object.assign(err, { command, exitCode: code, signal, output: stripAnsi(tail), log, streamed: verbose });
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
        spawn(command, {
          shell: true,
          cwd,
          detached: process.platform !== 'win32',
          stdio: ['ignore', 'pipe', 'pipe'],
          env: { ...process.env, LANGUAGE: 'en' },
        }),
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
    child.stdout.setEncoding('utf8').on('data', (d) => (stdout += d));
    child.stderr.setEncoding('utf8').on('data', (d) => (stderr += d));
    child.on('close', (code) => done(code ?? 1));
    child.on('error', (err) => {
      stderr += String(err.message ?? err);
      done(1);
    });
  });
}

// ─── Questions ───────────────────────────────────────────────────────────────

/**
 * What a key (one 'data' chunk in raw mode) answers: Enter takes the default, y and n answer, Esc and Ctrl-D answer
 * no; null for anything else (Tab, Backspace, an arrow or F-key sequence, another letter): keep waiting. A paste
 * counts by its first character.
 */
export function confirmAnswer(chunk, dflt) {
  if (chunk[0] === '\r' || chunk[0] === '\n') return dflt;
  if (chunk === '\x1b' || chunk[0] === '\x04' || /^n/i.test(chunk)) return false;
  return /^y/i.test(chunk) ? true : null;
}

/** One-key [Y/n] question (see confirmAnswer). Without a terminal it answers `fallback` rather than wait for nobody. */
export function confirm(question, { default: dflt = true, fallback = false } = {}) {
  return new Promise((resolve) => {
    /* stdout too: with the output redirected (`pnpm verify > out.txt`) nobody sees the question it waits for. */
    if (!process.stdin.isTTY || !process.stdout.isTTY) {
      resolve(fallback);
      return;
    }
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    const onCtrlC = (chunk) => {
      if (!chunk.includes('\u0003')) return false;
      process.stdout.write('\n');
      process.exit(130);
    };
    /* Keys typed before the question (an Enter pressed while a step ran waits in the terminal) must not answer it:
       what arrives in the first moment after resume() was typed earlier, and is dropped. */
    process.stdin.on('data', onCtrlC);
    setTimeout(() => {
      process.stdin.removeListener('data', onCtrlC);
      process.stdout.write(`  ${c.bold}${question}${c.reset} ${c.cyan}${dflt ? '[Y/n]' : '[y/N]'}${c.reset}  `);
      const onKey = (chunk) => {
        onCtrlC(chunk);
        const yes = confirmAnswer(chunk, dflt);
        if (yes === null) return;
        process.stdin.removeListener('data', onKey);
        process.stdin.setRawMode(false);
        process.stdin.pause();
        process.stdout.write(`\r\x1b[2K  ${c.bold}${question}${c.reset}  ${c.gray}${yes ? 'yes' : 'no'}${c.reset}\n`);
        resolve(yes);
      };
      process.stdin.on('data', onKey);
    }, 30);
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
export function fail({ what, why, auto, fix }) {
  console.log(`\n  ${c.red}✗${c.reset}  ${c.bold}${what}${c.reset}`);
  if (why) console.log(`     ${c.gray}Why:${c.reset}  ${why}`);
  /* auto: what the scripts did or can do themselves (recovery.mjs); fix is then the manual way. */
  if (auto) console.log(`     ${c.gray}Auto:${c.reset} ${auto}`);
  if (fix) console.log(`     ${c.gray}${auto ? 'By hand:' : 'Fix:'}${c.reset}  ${c.cyan}${fix}${c.reset}`);
  console.log('');
}

/** A command to type, in cyan; a hint, in gray. Not for text that goes on in another colour (they end with a reset). */
export const cmd = (text) => `${c.cyan}${text}${c.reset}`;
export const hint = (text) => `${c.gray}${text}${c.reset}`;
/** One warning line: "  ⚠  text". */
export const warn = (text) => console.log(`  ${c.yellow}⚠${c.reset}  ${text}`);

/** fail(), then exit 1: a problem the script cannot go on from. */
export function exitWith(problem) {
  fail(problem);
  process.exit(1);
}

/**
 * parseArgs (strict), or exit 1 with `usage` as the fix. Node's hint to "place it after '--'" is dropped: there it
 * would turn a mistyped flag into a component name.
 */
export function parseArgsOrExit(config, usage) {
  try {
    return util.parseArgs(config);
  } catch (err) {
    exitWith({ what: err.message.replace(/\. To specify.*$/s, ''), fix: usage });
  }
}

/** An exception in full: name, message, errno code, the `cause` chain and the stack. */
export function printError(err, { what, why, fix } = {}) {
  if (what) fail({ what, why, fix });
  let current = err;
  for (let depth = 0; current && depth < 5; depth++) {
    const prefix = depth === 0 ? '' : 'Caused by: ';
    if (current instanceof Error) {
      try {
        console.error(
          `  ${c.red}${prefix}${current.name}: ${current.message}${current.code ? ` [${current.code}]` : ''}${c.reset}`,
        );
        const stack = String(current.stack ?? '');
        for (const line of stack.split('\n').slice(1)) console.error(`  ${c.gray}${line.trim()}${c.reset}`);
        current = current.cause;
      } catch {
        /* A getter that throws: inspect() does not call getters. Printing must not throw, or the crash handler dies
           (exit 7) with the original error unseen. */
        console.error(`  ${c.red}${prefix}${inspect(current)}${c.reset}`);
        current = null;
      }
    } else {
      console.error(`  ${c.red}${prefix}${typeof current === 'string' ? current : inspect(current)}${c.reset}`);
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
 * Run as root via sudo: node_modules, dist/ and the logs would belong to root, and every later run without sudo fails
 * with EACCES. SUDO_USER alone is not enough: `sudo -iu dev` sets it too, yet the files belong to the right user.
 */
export const underSudo = (env = process.env, uid = process.getuid?.()) =>
  Boolean(env.SUDO_USER || env.DOAS_USER) && uid === 0;

/**
 * The safety net for every script: anything nobody caught is printed in full (with where to go next), and Ctrl-C or
 * a kill stops every child process before exiting, so nothing keeps running in the background. A script with its own
 * shutdown (pnpm dev) passes `signals: false`.
 */
export function installCrashHandler(script, { signals = true } = {}) {
  if (underSudo())
    exitWith({
      what: `${script} is running under sudo`,
      why: `the files it writes would belong to ${process.env.USER || 'root'}, not to ${process.env.SUDO_USER || process.env.DOAS_USER}; the next run without sudo then fails with EACCES.`,
      fix: `${script} without sudo (after an earlier sudo run: sudo chown -R "$(id -un)" . first)`,
    });
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
      /* The shell's convention, 128 + the signal: 130 for Ctrl-C, 143 for SIGTERM, 129 for SIGHUP. */
      process.exit(128 + constants.signals[signal]);
    };
    process.on('SIGINT', onSignal);
    process.on('SIGTERM', onSignal);
    process.on('SIGHUP', onSignal);
  }
}

/**
 * Open a URL (or a folder) in the default browser (or file manager: `what`). Never throws: not opening it is
 * cosmetic. On Linux $BROWSER first: Codespaces, devcontainers and WSL (wslview) set it, often without xdg-open.
 */
export function openUrl(url, what = 'a browser') {
  const [command, args] =
    process.platform === 'darwin'
      ? ['open', [url]]
      : process.platform === 'win32'
        ? ['cmd', ['/c', 'start', '', url]]
        : [(/^https?:/.test(url) && process.env.BROWSER?.split(':')[0]) || 'xdg-open', [url]];
  try {
    const child = spawn(command, args, { stdio: 'ignore', detached: true });
    child.on('error', () => console.log(`  Could not open ${what}; go to ${url}`));
    child.unref();
  } catch {
    console.log(`  Could not open ${what}; go to ${url}`);
  }
}
