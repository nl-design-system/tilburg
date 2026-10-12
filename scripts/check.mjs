/* `pnpm check`: is this machine ready to work on Tilburg? Read-only; prints one table and what to run for every row
   that is not green. Exits 1 only for ❌ rows (things that stop you), not for ⚠️ rows (things to do).
   Also works as `node scripts/check.mjs`, which is handy when pnpm itself will not start (wrong Node). */
import { c, installCrashHandler, printBanner, printCheckTable } from './lib/cli-utils.mjs';
import { runAllChecks } from './lib/checks.mjs';
import { readDevLock } from './lib/lock.mjs';

installCrashHandler('pnpm check');
printBanner('Environment check');

const { failed, warned, total } = printCheckTable(await runAllChecks());

if (failed.length) {
  console.log(
    `  ${c.red}${failed.length} of ${total} need fixing first:${c.reset} ${failed.map((row) => row.label).join(', ')}.`,
  );
  console.log(`  ${c.gray}The note next to each ❌ says what to run.${c.reset}\n`);
  process.exit(1);
}
if (warned.length) {
  console.log(
    `  ${c.green}Ready to work.${c.reset} ${c.yellow}${warned.length} to look at:${c.reset} ${warned.map((row) => row.label).join(', ')}.\n`,
  );
} else {
  const next = readDevLock() ? 'pnpm dev is running.' : `Start with ${c.cyan}pnpm dev${c.reset}.`;
  console.log(`  ${c.green}All ${total} checks are green.${c.reset} ${next}\n`);
}
