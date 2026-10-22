/* `pnpm logs`: the newest step logs (the full output of every step the scripts ran, see runStep in lib/cli-utils.mjs).
   `pnpm logs --last` prints the end of the last failing one, `pnpm logs --open` opens the folder. */
import { parseArgs } from 'node:util';
import { c, fail, LOG_DIR, logLink, openUrl } from './lib/cli-utils.mjs';
import { pickLast, readLogs, tailLines } from './lib/logs.mjs';

const SHOW = 15;
const TAIL_LINES = 80;

let args;
try {
  ({ values: args } = parseArgs({ options: { last: { type: 'boolean' }, open: { type: 'boolean' } } }));
} catch (err) {
  fail({ what: err.message, fix: 'pnpm logs   or   pnpm logs --last   or   pnpm logs --open' });
  process.exit(1);
}

const kb = (bytes) => (bytes < 1024 ? `${bytes} B` : `${(bytes / 1024).toFixed(bytes < 10240 ? 1 : 0)} KB`);

/** ok / exit 1 / —, padded to `width` before colouring so the columns line up. */
function status(exit, width = 0) {
  const text = (exit === null ? '—' : exit === '0' ? 'ok' : `exit ${exit}`).padEnd(width);
  return `${exit === null ? c.gray : exit === '0' ? c.green : c.red}${text}${c.reset}`;
}

const logs = readLogs();
if (!logs.length) {
  console.log(`\n  No step logs yet ${c.gray}(${LOG_DIR})${c.reset}.`);
  console.log('  They appear once pnpm setup, verify, test or dev has run a step.\n');
} else if (args.open) {
  openUrl(LOG_DIR);
  console.log(`\n  Opened ${logLink(LOG_DIR)}\n`);
} else if (args.last) {
  const log = pickLast(logs);
  console.log(`\n  ${log.step}  ${status(log.exit)}  ${c.gray}${log.time.toLocaleString()}${c.reset}`);
  console.log(`  ${logLink(log.path)}\n`);
  for (const line of tailLines(log.path, TAIL_LINES)) console.log(`  ${c.gray}│${c.reset} ${line}`);
  console.log(`\n  ${c.gray}Last ${TAIL_LINES} lines. Full log:${c.reset} ${logLink(log.path)}\n`);
} else {
  console.log(`\n  Newest step logs in ${logLink(LOG_DIR)}\n`);
  for (const log of logs.slice(0, SHOW)) {
    const time = log.time.toLocaleString(undefined, { dateStyle: 'short', timeStyle: 'medium' });
    console.log(`  ${time.padEnd(20)} ${status(log.exit, 12)} ${kb(log.size).padStart(8)}  ${log.step}`);
  }
  if (logs.length > SHOW) console.log(`  ${c.gray}… and ${logs.length - SHOW} older${c.reset}`);
  console.log(`\n  ${c.gray}pnpm logs --last   the end of the last failing log${c.reset}`);
  console.log(`  ${c.gray}pnpm logs --open   open the folder${c.reset}\n`);
}
