/* `pnpm commands` (or `pnpm run help`; plain `pnpm help` is pnpm's own help): every command worth knowing, grouped. */
import { c, printBanner } from './lib/cli-utils.mjs';
import { SECTIONS } from './lib/commands.mjs';

printBanner('Commands');
const width = Math.max(...SECTIONS.flatMap((section) => section.items.map((item) => item.script.length))) + 6;
for (const section of SECTIONS) {
  console.log(`  ${section.colour}${c.bold}${section.label}${c.reset}`);
  for (const { script, what } of section.items) {
    console.log(`    ${c.cyan}${`pnpm ${script}`.padEnd(width)}${c.reset} ${c.gray}${what}${c.reset}`);
  }
  console.log('');
}
console.log(
  `  ${c.gray}Pick one from a menu: ${c.reset}${c.cyan}pnpm menu${c.reset}${c.gray}. New here? Start with ${c.reset}${c.cyan}pnpm check${c.reset}${c.gray}.${c.reset}\n`,
);
