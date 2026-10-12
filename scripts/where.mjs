/* `pnpm where <name>`: where does a component live? Every file per layer (clickable), its tests, its guidance, and the
   Storybook pages that show it, local (pnpm dev) and online. `pnpm where --list` lists every component.
   Accepts any of its names: tooltip, Tooltip, "password input", PasswordInput, tilburg-wbc-tooltip. */
import { existsSync } from 'node:fs';
import { STORYBOOKS } from './dev-config.mjs';
import { c, hyperlink, installCrashHandler, printBanner } from './lib/cli-utils.mjs';
import { isTlb, loadComponents, rel, requireComponent, SITE, STATUS_FILE, storyUrl } from './lib/components.mjs';
import { readDevLock } from './lib/lock.mjs';

installCrashHandler('pnpm where');
const args = process.argv.slice(2);
const query = args.filter((arg) => !arg.startsWith('-')).join(' ');

const link = (path) => hyperlink(rel(path), `file://${path}`);

if (args.includes('--list') || !query) {
  printBanner('Components');
  const components = loadComponents();
  const width = Math.max(...components.map((component) => component.name.length)) + 2;
  for (const component of components) {
    const layers = Object.values(component.layers)
      .filter((layer) => layer.promised || layer.utrecht)
      .map((layer) => layer.label.replace('Web Component', 'WC'))
      .join(', ');
    console.log(
      `  ${component.name.padEnd(width)}${c.gray}${component.slug.padEnd(24)} ${layers}${isTlb(component) ? '  TLB' : ''}${c.reset}`,
    );
  }
  console.log(
    `\n  ${c.gray}${components.length} components (${STATUS_FILE}). Details: ${c.reset}${c.cyan}pnpm where <name>${c.reset}\n`,
  );
  process.exit(0);
}

const component = await requireComponent(query, 'pnpm where');
printBanner(`Where: ${component.name}`);
console.log(
  `  ${isTlb(component) ? `${c.magenta}Tilburg component (TLB)${c.reset}: its own tilburg-* markup and CSS, no Utrecht base.` : `${c.gray}Built on the Utrecht component, with Tilburg styling.${c.reset}`}\n`,
);

// ─── Files ───────────────────────────────────────────────────────────────────

const fileCell = (path, { promised = true } = {}) => {
  if (!promised) return `${c.gray}— no wrapper (on purpose, see implementation-status.md)${c.reset}`;
  return existsSync(path) ? link(path) : `${c.red}missing: ${rel(path)}${c.reset}`;
};
const testCell = (path) =>
  existsSync(path)
    ? `${c.green}✓${c.reset} ${c.gray}${rel(path).split('/').pop()}${c.reset}`
    : `${c.yellow}no test${c.reset}`;

const { html, react, angular, wbc } = component.layers;
const rows = [
  [
    'HTML/CSS',
    html.utrecht ? `${c.gray}utrecht base only (no Tilburg CSS)${c.reset}` : fileCell(html.main),
    existsSync(html.script) ? `${c.gray}+ script ${rel(html.script).split('/').pop()}${c.reset}` : '',
  ],
  ['HTML examples', fileCell(component.examples), `${c.gray}the reference markup every layer renders${c.reset}`],
  ['React', fileCell(react.main, react), react.promised && existsSync(react.main) ? testCell(react.test) : ''],
  [
    'Angular',
    fileCell(angular.main, angular),
    angular.promised && existsSync(angular.main) ? testCell(angular.test) : '',
  ],
  [
    'Web Component',
    fileCell(wbc.main, wbc),
    wbc.promised && existsSync(wbc.main)
      ? `${testCell(wbc.test)}  ${c.gray}<tilburg-wbc-${component.names.wbc}>${c.reset}`
      : '',
  ],
];
if (existsSync(component.guidance))
  rows.push(['Guidance', link(component.guidance), `${c.gray}when to use it, a11y, do's and don'ts${c.reset}`]);

console.log(`  ${c.bold}Files${c.reset}`);
for (const [label, file, extra] of rows) console.log(`  ${label.padEnd(15)}${file}${extra ? `  ${extra}` : ''}`);

// ─── Storybook ───────────────────────────────────────────────────────────────

const running = readDevLock();
const port = (key) => running?.storybooks?.find((storybook) => storybook.name === STORYBOOKS[key].name)?.port;
const local = (key) => `http://localhost:${port(key) ?? STORYBOOKS[key].port}/`;
const pages = [
  ['HTML', 'react', html.stories[0]],
  ['React', 'react', react.stories[0]],
  ['Web Components', 'react', wbc.stories[0]],
  ['Angular', 'angular', angular.stories[0]],
  ['HTML (Angular SB)', 'angular', html.stories[1]],
].filter(([, , story]) => story?.id);

console.log(
  `\n  ${c.bold}Storybook${c.reset}  ${c.gray}${running ? `pnpm dev is running (process ${running.pid})` : 'local links work once pnpm dev runs'}${c.reset}`,
);
for (const [label, key, story] of pages) {
  const localUrl = storyUrl(local(key), story.id);
  const onlineUrl = storyUrl(SITE[key], story.id);
  const live = port(key) ? '' : c.gray;
  console.log(`  ${label.padEnd(18)}${live}${hyperlink(localUrl, localUrl)}${c.reset}`);
  console.log(`  ${''.padEnd(18)}${c.gray}online: ${hyperlink(onlineUrl, onlineUrl)}${c.reset}`);
}

// ─── Next ────────────────────────────────────────────────────────────────────

console.log(`\n  ${c.bold}Next${c.reset}`);
console.log(
  `  ${c.cyan}pnpm dev ${component.slug}${c.reset}     ${c.gray}open it in Storybook, rebuilt as you save${c.reset}`,
);
console.log(
  `  ${c.cyan}pnpm test ${component.slug}${c.reset}    ${c.gray}its tests in React, Angular and Web Components${c.reset}`,
);
console.log(`  ${c.cyan}pnpm parity ${component.slug}${c.reset}  ${c.gray}is it complete in every layer?${c.reset}\n`);
