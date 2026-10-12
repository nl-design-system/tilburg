/* The commands worth knowing, grouped. One list for `pnpm commands` and `pnpm menu`, so they cannot drift apart. */
import { c } from './cli-utils.mjs';

export const SECTIONS = [
  {
    label: 'START',
    colour: c.blue,
    items: [
      { script: 'setup', what: 'from a fresh clone to a running Storybook (safe to rerun)' },
      { script: 'setup:reset', what: 'the same, with a clean node_modules' },
      { script: 'check', what: 'Node, pnpm, install, stale builds, ports' },
    ],
  },
  {
    label: 'DEVELOP',
    colour: c.green,
    items: [
      {
        script: 'where',
        what: 'where a component lives: files per layer, tests, Storybook links (pnpm where tooltip)',
      },
      { script: 'dev', what: 'both Storybooks; every library rebuilds as you save (pnpm dev tooltip opens it)' },
      { script: 'dev:react', what: 'React Storybook only (HTML, React, Web Components)' },
      { script: 'dev:angular', what: 'Angular Storybook only (Angular, HTML)' },
      { script: 'test', what: 'every test; pnpm test tooltip runs one component in all layers' },
    ],
  },
  {
    label: 'CHECK',
    colour: c.cyan,
    items: [
      { script: 'parity', what: 'is every component complete in every layer?' },
      { script: 'verify', what: 'everything CI checks on a pull request' },
      { script: 'lint', what: 'eslint, stylelint, markdownlint' },
      { script: 'lint-fix', what: 'fix what the linters can, then prettier' },
    ],
  },
  {
    label: 'SHARE',
    colour: c.magenta,
    items: [
      { script: 'sync', what: 'pack and install into bq-tlb-frontend and hltsamen' },
      { script: 'pack:local', what: 'every package as a tarball in .tarballs/' },
      { script: 'build', what: 'build every package' },
      { script: 'build:site', what: 'both Storybooks as the GitHub Pages site' },
    ],
  },
  {
    label: 'TIDY',
    colour: c.yellow,
    items: [
      { script: 'clean:pick', what: 'delete build output, caches or node_modules' },
      { script: 'commands', what: 'this list (also: pnpm run help); pnpm start opens it as a menu' },
      { script: 'serve', what: 'serve the built React Storybook (after pnpm build)' },
    ],
  },
];
