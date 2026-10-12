/* Storybook helpers for `pnpm dev`, after bq-tlb-frontend's start-storybook.mjs: choose a port (or reuse a Storybook
   that is already running), wait until it serves, and print its local and network address. */
import { networkInterfaces } from 'node:os';
import { setTimeout as sleep } from 'node:timers/promises';
import { findFreePort, isStorybookOn, portStatus } from './checks.mjs';
import { c, hyperlink } from './cli-utils.mjs';

/** This machine's LAN address, to open a Storybook on a phone or another computer. */
export function localIp() {
  for (const addresses of Object.values(networkInterfaces())) {
    for (const address of addresses ?? []) {
      if (address.family === 'IPv4' && !address.internal) return address.address;
    }
  }
  return null;
}

/**
 * Where should this Storybook run? `{ port, running }`: `running` when one already serves on its usual port (then
 * nothing has to start), otherwise the usual port or the next free one. `reserved` are ports promised to the other
 * Storybook in this run. `{ error }` when nothing is free.
 */
export async function choosePort(storybook, reserved = []) {
  const status = await portStatus(storybook.port);
  if (status === null && !reserved.includes(storybook.port)) return { port: storybook.port, running: false };
  if (status === 'EADDRINUSE' && (await isStorybookOn(storybook.port))) return { port: storybook.port, running: true };
  const free = await findFreePort(storybook.port + 1, 20, [...reserved, 6006, 6007]);
  if (!free) return { error: `port ${storybook.port} and the 20 after it are all taken` };
  return { port: free, running: false, moved: true };
}

/** Resolves once the Storybook on `port` serves its index, or with false when `stop()` says to give up. */
export async function waitForStorybook(port, stop) {
  while (!stop()) {
    if (await isStorybookOn(port)) return true;
    await sleep(1000);
  }
  return false;
}

/** The box with the addresses of the running Storybooks: [{ name, port, note }]. */
export function printStorybookLinks(storybooks) {
  const ip = localIp();
  const rows = storybooks.flatMap(({ name, port, note }) => [
    { label: name, url: `http://localhost:${port}/`, note },
    ...(ip ? [{ label: '  network', url: `http://${ip}:${port}/`, note: 'other devices on your network' }] : []),
  ]);
  const labelWidth = Math.max(...rows.map((row) => row.label.length));
  const urlWidth = Math.max(...rows.map((row) => row.url.length));
  const inner = labelWidth + urlWidth + 5;
  console.log(`\n  ${c.magenta}┌${'─'.repeat(inner)}┐${c.reset}`);
  for (const { label, url } of rows) {
    console.log(
      `  ${c.magenta}│${c.reset}  ${c.cyan}${label.padEnd(labelWidth)}${c.reset}  ${hyperlink(url, url)}${' '.repeat(urlWidth - url.length)} ${c.magenta}│${c.reset}`,
    );
  }
  console.log(`  ${c.magenta}└${'─'.repeat(inner)}┘${c.reset}`);
  for (const { name, note } of storybooks) if (note) console.log(`  ${c.gray}${name}: ${note}${c.reset}`);
  console.log('');
}
