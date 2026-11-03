/* `node --test scripts/`: choosing a port and waiting for a Storybook, against small local servers (no real Storybook). */
import './test-env.mjs';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { realpathSync } from 'node:fs';
import http from 'node:http';
import net from 'node:net';
import { networkInterfaces, tmpdir } from 'node:os';
import { test } from 'node:test';
import { listenerDir } from './checks.mjs';
import { choosePort, localIp, printStorybookLinks, waitForStorybook } from './storybook.mjs';

const REACT = { name: 'React Storybook', storyId: /^tilburg-.+-react--/ };
const STORIES = {
  react: '{"entries":{"tilburg-button-react--default":{}}}',
  angular: '{"entries":{"tilburg-button-angular--default":{}}}',
};

/** A server on `host` and a free port; `index` true (or 'react') answers like our React Storybook, 'angular' like the
 *  Angular one, 'hang' never answers, false is not a Storybook. */
async function serve(host, index = true) {
  const server = http.createServer((request, response) => {
    if (index === 'hang') return;
    response.setHeader('content-type', 'application/json');
    response.end(index ? STORIES[index === true ? 'react' : index] : '{}');
  });
  await new Promise((done) => server.listen(0, host, done));
  return { port: server.address().port, close: () => (server.closeAllConnections(), server.close()) };
}

async function freePort() {
  const server = net.createServer();
  await new Promise((done) => server.listen(0, '127.0.0.1', done));
  const { port } = server.address();
  await new Promise((done) => server.close(done));
  return port;
}

/* The Storybooks run with `--host 0.0.0.0` (IPv4 only), while `localhost` resolves to ::1 first on macOS. */
/* Some containers (Docker, WSL) have no IPv6 loopback: there ::1 cannot be listened on at all. */
const ipv6 = Object.values(networkInterfaces())
  .flat()
  .some((address) => address?.address === '::1');
for (const host of ['0.0.0.0', '127.0.0.1', '::1']) {
  const skip = host === '::1' && !ipv6 && 'no IPv6 loopback on this machine';
  test(`waitForStorybook finds a Storybook listening on ${host} via localhost`, { skip }, async () => {
    const server = await serve(host);
    try {
      assert.equal(await waitForStorybook(server.port, () => false), true);
    } finally {
      server.close();
    }
  });
}

test('waitForStorybook gives up when stop() says so, also on a server that never answers', async () => {
  const server = await serve('0.0.0.0', 'hang');
  const startedAt = Date.now();
  try {
    assert.equal(await waitForStorybook(server.port, () => Date.now() - startedAt > 500), false);
    assert.ok(Date.now() - startedAt < 6000, 'each probe has its own timeout');
  } finally {
    server.close();
  }
});

test('waitForStorybook still looks once when stop() is already true (the limit passed while the laptop slept)', async () => {
  const server = await serve('0.0.0.0');
  try {
    assert.equal(await waitForStorybook(server.port, () => true), true);
  } finally {
    server.close();
  }
});

test('waitForStorybook does not take any server on the port for a Storybook', async () => {
  const server = await serve('0.0.0.0', false);
  let probes = 0;
  try {
    assert.equal(await waitForStorybook(server.port, () => probes++ >= 1), false);
  } finally {
    server.close();
  }
});

test('choosePort: a free usual port is used as is', async () => {
  const port = await freePort();
  assert.deepEqual(await choosePort({ ...REACT, port }), { port, running: false });
});

test('choosePort: our Storybook on the usual port (on 0.0.0.0) is reused', async () => {
  const server = await serve('0.0.0.0');
  try {
    assert.deepEqual(await choosePort({ ...REACT, port: server.port }), { port: server.port, running: true });
  } finally {
    server.close();
  }
});

test('choosePort: something else on the usual port moves the Storybook to a free one', async () => {
  const server = await serve('0.0.0.0', false);
  try {
    const choice = await choosePort({ ...REACT, port: server.port });
    assert.equal(choice.moved, true);
    assert.equal(choice.running, false);
    assert.notEqual(choice.port, server.port);
    assert.equal(choice.taken, 'something else');
  } finally {
    server.close();
  }
});

test('choosePort: the other Tilburg Storybook on the usual port is not reused', async () => {
  const server = await serve('0.0.0.0', 'angular');
  try {
    const choice = await choosePort({ ...REACT, port: server.port });
    assert.equal(choice.running, false);
    assert.notEqual(choice.port, server.port);
    assert.match(choice.taken, /Storybook/);
  } finally {
    server.close();
  }
});

test(
  'choosePort: a Storybook with our stories but from another folder (clone, worktree) is not reused',
  /* timeout: a helper that dies before printing its port would otherwise leave the test waiting forever. */
  { skip: process.platform === 'win32' && 'no lsof', timeout: 15_000 },
  async () => {
    const child = spawn(
      process.execPath,
      [
        '-e',
        `const s=require('http').createServer((q,r)=>r.end(${JSON.stringify(STORIES.react)})).listen(0,'0.0.0.0',()=>console.log(s.address().port))`,
      ],
      /* No NODE_OPTIONS: a --require or --inspect from the user's shell can print before the port does. */
      { cwd: tmpdir(), stdio: ['ignore', 'pipe', 'inherit'], env: { ...process.env, NODE_OPTIONS: '' } },
    );
    try {
      /* The first line that is only a number: anything else the process prints is not the port. */
      let printed = '';
      let port;
      while (!(port = Number(printed.match(/^(\d+)$/m)?.[1]))) printed += (await once(child.stdout, 'data'))[0];
      const choice = await choosePort({ ...REACT, port });
      assert.equal(choice.running, false);
      assert.notEqual(choice.port, port);
      assert.match(choice.taken, /^a Storybook from /);
    } finally {
      child.kill();
    }
  },
);

test(
  'listenerDir names the working directory of the process on the port',
  { skip: process.platform === 'win32' && 'no lsof' },
  async () => {
    const server = await serve('0.0.0.0');
    try {
      assert.equal(listenerDir(server.port), realpathSync(process.cwd()));
    } finally {
      server.close();
    }
  },
);

test('choosePort: a port reserved for the other Storybook is not handed out twice', async () => {
  const port = await freePort();
  const choice = await choosePort({ ...REACT, port }, [port]);
  assert.equal(choice.moved, true);
  assert.notEqual(choice.port, port);
});

test('printStorybookLinks prints every Storybook in one box', () => {
  const lines = [];
  const log = console.log;
  console.log = (...args) => lines.push(args.join(' '));
  try {
    printStorybookLinks([
      { name: 'React Storybook', port: 6006, note: 'HTML' },
      { name: 'Angular Storybook', port: 6107 },
    ]);
  } finally {
    console.log = log;
  }
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
