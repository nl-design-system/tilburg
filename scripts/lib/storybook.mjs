/* Storybook helpers for `pnpm dev`, after bq-tlb-frontend's start-storybook.mjs: choose a port (or reuse a Storybook
   that is already running), wait until it serves, and print its local and network address. */
import { networkInterfaces } from 'node:os';
import { setTimeout as sleep } from 'node:timers/promises';
import { findFreePort, identifyStorybook, isStorybookOn, portStatus } from './checks.mjs';
import { c, hyperlink } from './cli-utils.mjs';

/**
 * This machine's LAN address, to open a Storybook on a phone or another computer. Wi-Fi or Ethernet first; never a
 * VPN tunnel, Docker or VM bridge (172.17/16, 100.64/10 carrier-grade NAT), which another device cannot reach.
 */
export function localIp(interfaces = networkInterfaces()) {
  const candidates = Object.entries(interfaces).flatMap(([name, addresses]) =>
    (addresses ?? [])
      .filter(
        (address) =>
          address.family === 'IPv4' &&
          !address.internal &&
          !/^(docker|br-|veth|utun|tun|tap|vboxnet|vmnet)/.test(name) &&
          !/^(172\.17|100\.(6[4-9]|[7-9]\d|1[01]\d|12[0-7]))\./.test(address.address),
      )
      .map((address) => ({ name, address: address.address })),
  );
  return (candidates.find(({ name }) => /^(en|eth|wlan)/.test(name)) ?? candidates[0])?.address ?? null;
}

/**
 * Where should this Storybook run? `{ port, running }`: `running` when this Storybook, from this working copy, already
 * serves on its usual port (then nothing has to start), otherwise the usual port or the next free one, with `taken`
 * saying what holds the usual port. `reserved` are ports promised to the other Storybook in this run. `{ error }` when
 * nothing is free.
 */
export async function choosePort(storybook, reserved = []) {
  const status = await portStatus(storybook.port);
  if (status === null && !reserved.includes(storybook.port)) return { port: storybook.port, running: false };
  /* Not taken but refused (security software, a sandbox): another port will not fare better. */
  if (status && status !== 'EADDRINUSE')
    return { error: `listening on port ${storybook.port} is not allowed (${status})` };
  const found = status === 'EADDRINUSE' ? await identifyStorybook(storybook, storybook.port) : null;
  if (found?.ours) return { port: storybook.port, running: true };
  const free = await findFreePort(storybook.port + 1, 20, [...reserved, 6006, 6007]);
  if (!free) return { error: `port ${storybook.port} and the 20 after it are all taken` };
  return { port: free, running: false, moved: true, taken: found?.what ?? 'something else' };
}

/** Resolves once the Storybook on `port` serves its index, or with false when `stop()` says to give up. */
export async function waitForStorybook(port, stop) {
  /* Look before giving up: after the laptop slept, the wall-clock limit has passed although the Storybook is up. */
  while (!(await isStorybookOn(port))) {
    if (stop()) return false;
    await sleep(1000);
  }
  return true;
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
