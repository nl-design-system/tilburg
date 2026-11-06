/* `node --test scripts/`: splitting raw key input for the menu and clean:pick. */
import './test-env.mjs';
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { splitKeys } from './keys.mjs';

test('splitKeys reads arrows (both modes), Enter, Esc and letters, several in one chunk', () => {
  assert.deepEqual(splitKeys('\x1b[A'), ['\x1b[A']);
  assert.deepEqual(splitKeys('\x1bOB'), ['\x1b[B']);
  assert.deepEqual(splitKeys('\x1b[B\x1b[B '), ['\x1b[B', '\x1b[B', ' ']);
  assert.deepEqual(splitKeys('\r'), ['\r']);
  assert.deepEqual(splitKeys('\x1b'), ['\x1b']);
  assert.deepEqual(splitKeys('q'), ['q']);
});

test('splitKeys drops other escape sequences whole: Home is not H, F2 is not Q, Alt-q is not q', () => {
  for (const sequence of ['\x1b[H', '\x1bOH', '\x1bOQ', '\x1b[15~', '\x1b[1;5A', '\x1bq'])
    assert.deepEqual(splitKeys(sequence), [], JSON.stringify(sequence));
  assert.deepEqual(splitKeys('\x1b[H\x1b[A'), ['\x1b[A']);
});

test('splitKeys ignores a paste with a newline in it, but not Ctrl-C', () => {
  assert.deepEqual(splitKeys('pnpm dev\r'), []);
  assert.deepEqual(splitKeys('x\ny'), []);
  assert.deepEqual(splitKeys('\x1b[200~setup\r\x1b[201~'), []);
  assert.deepEqual(splitKeys('ab\r\u0003'), ['\u0003']);
});
