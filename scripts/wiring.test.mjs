/* `node --test scripts/`: the wiring between the scripts and everything that calls them, checked without running them.
   Each script has its own tests; these catch what falls between them: a renamed file, an export that moved, a package
   that was renamed, or a dependency in a script that has to run before `pnpm install`. */
import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { test } from 'node:test';
import { promisify } from 'node:util';
import { ROOT } from './dev-config.mjs';

const SCRIPTS = join(ROOT, 'scripts');
const files = readdirSync(SCRIPTS, { recursive: true })
  .filter((file) => file.endsWith('.mjs'))
  .map((file) => join(SCRIPTS, file));
const read = (file) => readFileSync(file, 'utf8');

/** `{ specifier, names }` for every static and dynamic import; names is null for `import x` / `import * as x` / a bare import(). */
export function importsOf(source) {
  const named = (list) =>
    list
      .split(',')
      .map((part) => part.trim().split(/\s+as\s+|\s*:\s*/)[0])
      .filter(Boolean);
  return [
    ...[...source.matchAll(/^import\s+(?:\{([^{}]*)\}\s+from\s+|[\w*\s]+from\s+)?'([^']+)'/gm)].map(
      ([, list, spec]) => ({
        specifier: spec,
        names: list === undefined ? null : named(list),
      }),
    ),
    ...[...source.matchAll(/^\s*(?:const\s*\{([^{}]*)\}\s*=\s*)?await\s+import\('([^']+)'\)/gm)].map(
      ([, list, spec]) => ({
        specifier: spec,
        names: list === undefined ? null : named(list),
      }),
    ),
  ];
}

/** Names a module exports: `export function|const|let|class x` and `export { a, b as c }`. */
export function exportsOf(source) {
  return new Set([
    ...[...source.matchAll(/^export\s+(?:async\s+)?(?:function\*?|const|let|var|class)\s+([\w$]+)/gm)].map((m) => m[1]),
    ...[...source.matchAll(/^export\s*\{([^}]*)\}/gm)].flatMap((m) =>
      m[1].split(',').map((part) =>
        part
          .trim()
          .split(/\s+as\s+/)
          .pop(),
      ),
    ),
  ]);
}

test('importsOf reads named, default, multi-line and dynamic imports', () => {
  const source = [
    "import { a, b as c } from './x.mjs';",
    "import {\n  d,\n  e,\n} from '../y.mjs';",
    "import fs from 'node:fs';",
    "import './side.mjs';",
    "  const { f, g } = await import('./z.mjs');",
    "  await import('./help.mjs');",
  ].join('\n');
  assert.deepEqual(importsOf(source), [
    { specifier: './x.mjs', names: ['a', 'b'] },
    { specifier: '../y.mjs', names: ['d', 'e'] },
    { specifier: 'node:fs', names: null },
    { specifier: './side.mjs', names: null },
    { specifier: './z.mjs', names: ['f', 'g'] },
    { specifier: './help.mjs', names: null },
  ]);
});

test('exportsOf reads declarations and export lists', () => {
  const source = 'export async function a() {}\nexport const B = 1;\nexport { c, d as e };\nconst f = 2;';
  assert.deepEqual([...exportsOf(source)], ['a', 'B', 'c', 'e']);
});

test('every `node scripts/<file>` in package.json, .husky and the workflows exists', () => {
  const callers = [
    join(ROOT, 'package.json'),
    ...readdirSync(join(ROOT, '.husky')).map((file) => join(ROOT, '.husky', file)),
    ...readdirSync(join(ROOT, '.github/workflows')).map((file) => join(ROOT, '.github/workflows', file)),
  ].filter((file) => existsSync(file) && !file.endsWith('/_'));
  const missing = callers.flatMap((file) =>
    [...read(file).matchAll(/\bnode\s+(scripts\/[\w./-]+)/g)]
      .map((m) => m[1])
      .filter((path) => !existsSync(join(ROOT, path)))
      .map((path) => `${relative(ROOT, file)}: ${path}`),
  );
  assert.deepEqual(missing, []);
});

test('every script parses (node --check, nothing runs)', async () => {
  const run = promisify(execFile);
  const broken = (
    await Promise.all(
      files.map((file) =>
        run(process.execPath, ['--check', file], { timeout: 5000 }).then(
          () => null,
          (error) => `${relative(ROOT, file)}: ${error.stderr || error.message}`,
        ),
      ),
    )
  ).filter(Boolean);
  assert.deepEqual(broken, []);
});

test('every relative import resolves, and every imported name is exported', () => {
  const problems = files.flatMap((file) =>
    importsOf(read(file))
      .filter(({ specifier }) => specifier.startsWith('.'))
      .flatMap(({ specifier, names }) => {
        const target = resolve(dirname(file), specifier);
        const where = `${relative(ROOT, file)} → ${specifier}`;
        if (!existsSync(target)) return [`${where}: no such file`];
        const exported = exportsOf(read(target));
        return (names ?? []).filter((name) => !exported.has(name)).map((name) => `${where}: no export "${name}"`);
      }),
  );
  assert.deepEqual(problems, []);
});

test('setup, preflight and welcome import only node: built-ins, all the way down (they run before node_modules)', () => {
  const seen = new Set();
  const outside = [];
  const visit = (file) => {
    if (seen.has(file)) return;
    seen.add(file);
    for (const { specifier } of importsOf(read(file))) {
      if (specifier.startsWith('.')) visit(resolve(dirname(file), specifier));
      else if (!specifier.startsWith('node:')) outside.push(`${relative(ROOT, file)}: ${specifier}`);
    }
  };
  for (const entry of ['setup.mjs', 'preflight.mjs', 'welcome.mjs']) visit(join(SCRIPTS, entry));
  assert.ok(seen.size > 3, 'the walk should reach the helpers in scripts/lib');
  assert.deepEqual(outside, []);
});

test('every `pnpm --filter <name>` in scripts/ is a workspace package', () => {
  const packages = new Set(
    ['packages', 'proprietary'].flatMap((folder) =>
      readdirSync(join(ROOT, folder))
        .map((name) => join(ROOT, folder, name, 'package.json'))
        .filter(existsSync)
        .map((file) => JSON.parse(read(file)).name),
    ),
  );
  /* `${pkg.name}` and the `<package>` placeholder in advice are not literal names. */
  const unknown = files
    .filter((file) => !file.endsWith('.test.mjs'))
    .flatMap((file) =>
      [...read(file).matchAll(/pnpm\s+--filter[\s=]+([@\w][\w@/.-]*)/g)]
        .map((m) => m[1])
        .filter((name) => !packages.has(name))
        .map((name) => `${relative(ROOT, file)}: ${name}`),
    );
  assert.ok(packages.size > 5, 'the workspace packages should be found');
  assert.deepEqual(unknown, []);
});
