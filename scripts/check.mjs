/* `pnpm check`: is this machine ready to work on Tilburg? Read-only; prints one table and what to run for every row
   that is not green. Exits 1 only for ❌ rows (things that stop you), not for ⚠️ rows (things to do).
   `pnpm check --fix` then offers each row's fix one by one (Y/n), checks those rows again and prints the table anew.
   Also works as `node scripts/check.mjs`, which is handy when pnpm itself will not start (wrong Node). */
import { c, confirm, installCrashHandler, printBanner, printCheckTable } from './lib/cli-utils.mjs';
import { runAllChecks, safely } from './lib/checks.mjs';
import { readDevLock } from './lib/lock.mjs';

installCrashHandler('pnpm check');
printBanner('Environment check');

const wantsFix = process.argv.includes('--fix');
const groups = await runAllChecks();
let { failed, warned, total } = printCheckTable(groups);

/* One fix per command: `pnpm install` heals two rows at once. */
const fixes = [];
for (const row of groups.flatMap((group) => group.rows).filter((row) => row.fix && !row.skip)) {
  const same = fixes.find((fix) => fix.command === row.fix.command);
  if (same) same.rows.push(row);
  else fixes.push({ ...row.fix, rows: [row] });
}
fixes.sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
const runnable = fixes.filter((fix) => fix.run).length;
const fixHint =
  runnable && !wantsFix
    ? `\n  ${c.gray}${runnable} can be fixed for you:${c.reset} ${c.cyan}pnpm check --fix${c.reset}`
    : '';

if (wantsFix && (await offerFixes())) ({ failed, warned, total } = printCheckTable(groups));

if (failed.length) {
  console.log(
    `  ${c.red}${failed.length} of ${total} need fixing first:${c.reset} ${failed.map((row) => row.label).join(', ')}.`,
  );
  console.log(`  ${c.gray}The note next to each ❌ says what to run.${c.reset}${fixHint}\n`);
  process.exit(1);
}
if (warned.length) {
  console.log(
    `  ${c.green}Ready to work.${c.reset} ${c.yellow}${warned.length} to look at:${c.reset} ${warned.map((row) => row.label).join(', ')}.${fixHint}\n`,
  );
} else {
  const next = readDevLock() ? 'pnpm dev is running.' : `Start with ${c.cyan}pnpm dev${c.reset}.`;
  console.log(`  ${c.green}All ${total} checks are green.${c.reset} ${next}\n`);
}

/** Offer each fix; returns whether any ran (then the table is printed again). */
async function offerFixes() {
  if (!fixes.length) {
    console.log(`  ${c.gray}Nothing to fix.${c.reset}\n`);
    return false;
  }
  if (!process.stdin.isTTY) {
    console.log(`  ${c.yellow}No terminal to ask in — nothing changed.${c.reset} --fix would offer:`);
    for (const fix of fixes)
      console.log(`    ${c.cyan}${fix.command}${c.reset}${fix.run ? '' : `  ${c.gray}(you run this one)${c.reset}`}`);
    console.log('');
    return false;
  }
  let ran = false;
  for (const fix of fixes) {
    console.log(`  ${c.bold}${fix.rows.map((row) => row.label).join(', ')}${c.reset}`);
    if (!fix.run) {
      /* nvm is a shell function: from a child process it cannot change your shell's Node. */
      console.log(`    Run this yourself: ${c.cyan}${fix.command}${c.reset}\n`);
      continue;
    }
    console.log(`    ${c.gray}${fix.command}${c.reset}`);
    if (!(await confirm(fix.label))) {
      console.log('');
      continue;
    }
    ran = true;
    try {
      fix.run();
    } catch (err) {
      console.log(`    ${c.red}Failed: ${err?.message ?? err}${c.reset}`);
    }
    for (const row of fix.rows) {
      const { label, recheck } = row;
      for (const key of Object.keys(row)) delete row[key];
      Object.assign(row, await safely(label, recheck));
    }
    console.log('');
  }
  return ran;
}
