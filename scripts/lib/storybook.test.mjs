/* `node --test scripts/`: choosing a port and waiting for a Storybook, against small local servers (no real Storybook). */
import './test-env.mjs';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { realpathSync } from 'node:fs';
import http from 'node:http';
import { networkInterfaces, tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import { listenerDir } from './checks.mjs';
import { choosePort, localIp, printStorybookLinks, waitForStorybook } from './storybook.mjs';
import { freePort, tempDir, writeFile } from './test-fakes.mjs';

const REACT = { name: 'React Storybook', storyId: /^tilburg-.+-react--/ };
/* Windows tells the folder of the process on a port from its command line (…\node_modules\…), not from its working
   directory: a server in this test process, run as node --test, has no folder there. */
const noCwd = process.platform === 'win32' && 'Windows reads the folder from the command line';
const STORIES = {
  react: '{"entries":{"tilburg-button-react--default":{}}}',
  angular: '{"entries":{"tilburg-button-angular--default":{}}}',
};

/** A server on `host` and a free port, closed after test `t`; `index` true (or 'react') answers like our React
 *  Storybook, 'angular' like the Angular one, 'hang' never answers, false is not a Storybook. Resolves with the port. */
async function serve(t, host, index = true) {
  const server = http.createServer((request, response) => {
    if (index === 'hang') return;
    response.setHeader('content-type', 'application/json');
    response.end(index ? STORIES[index === true ? 'react' : index] : '{}');
  });
  await new Promise((done) => server.listen(0, host, done));
  t.after(() => (server.closeAllConnections(), server.close()));
  return server.address().port;
}

/* The Storybooks run with `--host 0.0.0.0` (IPv4 only), while `localhost` resolves to ::1 first on macOS. */
/* Some containers (Docker, WSL) have no IPv6 loopback: there ::1 cannot be listened on at all. */
const ipv6 = Object.values(networkInterfaces())
  .flat()
  .some((address) => address?.address === '::1');
for (const host of ['0.0.0.0', '127.0.0.1', '::1']) {
  const skip = host === '::1' && !ipv6 && 'no IPv6 loopback on this machine';
  test(`waitForStorybook finds a Storybook listening on ${host} via localhost`, { skip }, async (t) => {
    const port = await serve(t, host);
    assert.equal(await waitForStorybook(port, () => false), true);
  });
}

test('waitForStorybook gives up when stop() says so, also on a server that never answers', async (t) => {
  const port = await serve(t, '0.0.0.0', 'hang');
  const startedAt = Date.now();
  assert.equal(await waitForStorybook(port, () => Date.now() - startedAt > 500), false);
  assert.ok(Date.now() - startedAt < 6000, 'each probe has its own timeout');
});

test('waitForStorybook still looks once when stop() is already true (the limit passed while the laptop slept)', async (t) => {
  const port = await serve(t, '0.0.0.0');
  assert.equal(await waitForStorybook(port, () => true), true);
});

test('waitForStorybook does not take any server on the port for a Storybook', async (t) => {
  const port = await serve(t, '0.0.0.0', false);
  let probes = 0;
  assert.equal(await waitForStorybook(port, () => probes++ >= 1), false);
});

test('choosePort: a free usual port is used as is', async () => {
  const port = await freePort();
  assert.deepEqual(await choosePort({ ...REACT, port }), { port, running: false });
});

test('choosePort: our Storybook on the usual port (on 0.0.0.0) is reused', { skip: noCwd }, async (t) => {
  const port = await serve(t, '0.0.0.0');
  assert.deepEqual(await choosePort({ ...REACT, port }), { port, running: true });
});

test('choosePort: something else on the usual port moves the Storybook to a free one', async (t) => {
  const port = await serve(t, '0.0.0.0', false);
  const choice = await choosePort({ ...REACT, port });
  assert.equal(choice.moved, true);
  assert.equal(choice.running, false);
  assert.notEqual(choice.port, port);
  assert.equal(choice.taken, 'something else');
});

test('choosePort: the other Tilburg Storybook on the usual port is not reused', async (t) => {
  const port = await serve(t, '0.0.0.0', 'angular');
  const choice = await choosePort({ ...REACT, port });
  assert.equal(choice.running, false);
  assert.notEqual(choice.port, port);
  assert.match(choice.taken, /Storybook/);
});

test(
  'choosePort: a Storybook with our stories but from another folder (clone, worktree) is not reused',
  /* timeout: a helper that dies before printing its port would otherwise leave the test waiting forever. */
  { skip: noCwd, timeout: 15_000 },
  async (t) => {
    const child = spawn(
      process.execPath,
      [
        '-e',
        `const s=require('http').createServer((q,r)=>r.end(${JSON.stringify(STORIES.react)})).listen(0,'0.0.0.0',()=>process.stdout.write(s.address().port+'\\n'))`,
      ],
      /* No NODE_OPTIONS: a --require or --inspect from the user's shell can print before the port does. A plain
         write, not console.log: under FORCE_COLOR (pnpm test from the menu) console.log colours a number. */
      { cwd: tmpdir(), stdio: ['ignore', 'pipe', 'inherit'], env: { ...process.env, NODE_OPTIONS: '' } },
    );
    /* t.after, not finally: it also runs when the test times out, so the helper never keeps the run alive. */
    t.after(() => child.kill());
    {
      /* The first line that is only a number: anything else the process prints is not the port. */
      let printed = '';
      let port;
      while (!(port = Number(printed.match(/^(\d+)$/m)?.[1]))) printed += (await once(child.stdout, 'data'))[0];
      const choice = await choosePort({ ...REACT, port });
      assert.equal(choice.running, false);
      assert.notEqual(choice.port, port);
      assert.match(choice.taken, /^a Storybook from /);
    }
  },
);

test('listenerDir names the working directory of the process on the port', { skip: noCwd }, async (t) => {
  const port = await serve(t, '0.0.0.0');
  assert.equal(listenerDir(port), realpathSync(process.cwd()));
});

test('choosePort: a port reserved for the other Storybook is not handed out twice', async () => {
  const port = await freePort();
  const choice = await choosePort({ ...REACT, port }, [port]);
  assert.equal(choice.moved, true);
  assert.notEqual(choice.port, port);
});

test('printStorybookLinks prints every Storybook in one box', (t) => {
  const lines = [];
  t.mock.method(console, 'log', (...args) => lines.push(args.join(' ')));
  printStorybookLinks([
    { name: 'React Storybook', port: 6006, note: 'HTML' },
    { name: 'Angular Storybook', port: 6107 },
  ]);
  const output = lines.join('\n');
  assert.match(output, /http:\/\/localhost:6006\//);
  assert.match(output, /http:\/\/localhost:6107\//);
  assert.match(output, /React Storybook: HTML/);
});

test('localIp prefers Wi-Fi or Ethernet and skips VPN, Docker and carrier-grade NAT addresses', () => {
  const v4 = (address) => [{ family: 'IPv4', internal: false, address }];
  assert.equal(
    localIp({
      lo0: [{ family: 'IPv4', internal: true, address: '127.0.0.1' }],
      utun3: v4('10.8.0.2'),
      en0: v4('192.168.1.20'),
    }),
    '192.168.1.20',
  );
  assert.equal(localIp({ docker0: v4('172.17.0.1'), tailscale0: v4('100.101.1.2'), bridge0: v4('172.17.0.5') }), null);
  assert.equal(localIp({ bridge100: v4('192.168.64.1') }), '192.168.64.1');
  /* Windows with WSL2, Linux with libvirt and WireGuard: the Wi-Fi, not the VM bridge or the tunnel */
  assert.equal(localIp({ 'vEthernet (WSL)': v4('172.29.80.1'), 'Wi-Fi': v4('192.168.1.7') }), '192.168.1.7');
  assert.equal(localIp({ 'vEthernet (WSL)': v4('172.29.80.1'), 'Ethernet 2': v4('10.0.0.4') }), '10.0.0.4');
  assert.equal(localIp({ virbr0: v4('192.168.122.1'), wg0: v4('10.8.0.2'), wlp2s0: v4('192.168.1.9') }), '192.168.1.9');
  assert.equal(localIp({ virbr0: v4('192.168.122.1'), lxcbr0: v4('10.0.3.1'), zt0: v4('10.147.1.2') }), null);
});

test(
  'listenerDir on Windows: the folder before node_modules in the command line of the process on the port',
  {
    skip: process.platform !== 'win32' && 'Windows only (elsewhere lsof names the working directory)',
    timeout: 30_000,
  },
  async (t) => {
    /* A space in the path, as in "My Documents": the command line quotes it. */
    const clone = realpathSync(tempDir('tilburg clone-'));
    writeFile(
      join(clone, 'node_modules', 'server.js'),
      "const s=require('http').createServer((q,r)=>r.end('{}')).listen(0,'0.0.0.0',()=>process.stdout.write(s.address().port+'\\n'))",
    );
    const child = spawn(process.execPath, [join(clone, 'node_modules', 'server.js')], {
      stdio: ['ignore', 'pipe', 'inherit'],
      env: { ...process.env, NODE_OPTIONS: '' },
    });
    t.after(() => child.kill());
    let printed = '';
    let port;
    while (!(port = Number(printed.match(/^(\d+)$/m)?.[1]))) printed += (await once(child.stdout, 'data'))[0];
    assert.equal(listenerDir(port)?.toLowerCase(), clone.toLowerCase());
  },
);
