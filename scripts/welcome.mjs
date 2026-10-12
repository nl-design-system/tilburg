/* `postinstall`: after `pnpm install`, show the banner and where to go next. Never fails the install, and stays quiet
   in CI and inside the other scripts (they set TILBURG_QUIET).

   pnpm folds the output of install hooks into one "postinstall$ … Done" line, so this writes straight to the terminal
   (/dev/tty) instead. Without a terminal (CI, a pipe) there is nothing to open and nothing is shown. pnpm only runs
   the hook when the install changes something, unless optimisticRepeatInstall is off in pnpm-workspace.yaml. */
import { closeSync, openSync, writeSync } from 'node:fs';

let tty = null;
try {
  if (!process.env.CI && !process.env.TILBURG_QUIET && process.platform !== 'win32') {
    tty = openSync('/dev/tty', 'w');
    process.env.TILBURG_TTY = '1';
    console.log = (...parts) => writeSync(tty, `${parts.join(' ')}\n`);
    const { c, printBanner } = await import('./lib/cli-utils.mjs');
    printBanner('Ready');
    const rows = [
      ['pnpm setup', 'first time here? from clone to a running Storybook'],
      ['pnpm dev', 'both Storybooks, with every library rebuilt as you save'],
      ['pnpm where', 'where a component lives (pnpm where tooltip)'],
      ['pnpm check', 'is anything stale or missing? (Node, build output, ports)'],
      ['pnpm start', 'every command in a menu'],
    ];
    for (const [command, what] of rows)
      console.log(`    ${c.cyan}${command.padEnd(12)}${c.reset} ${c.gray}${what}${c.reset}`);
    console.log('');
  }
} catch {
  /* No terminal, or no welcome: never worth a failed install. */
} finally {
  if (tty !== null) closeSync(tty);
}
