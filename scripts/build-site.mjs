/* The second half of `pnpm build:site` (after `pnpm run build`): puts the Angular Storybook inside the React one, at
   angular/, which is the site GitHub Pages serves (.github/workflows/deploy.yml). Node instead of `rm -rf` and
   `cp -R`: pnpm runs package scripts in cmd.exe on Windows, which has neither. It does what those two did: delete
   angular/ first, then copy (links as they are), and fail when either Storybook was not built. */
import { cpSync, existsSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';
import { ROOT } from './dev-config.mjs';

const from = resolve(ROOT, 'packages/storybook-angular/dist');
const site = resolve(ROOT, 'packages/storybook/dist');
const to = resolve(site, 'angular');

rmSync(to, { recursive: true, force: true, maxRetries: 5 });
/* cpSync would create the missing folders itself, where cp -R stops. */
for (const [dir, what] of [
  [from, 'the Angular Storybook'],
  [site, 'the React Storybook'],
]) {
  if (!existsSync(dir)) {
    console.error(`build:site: ${dir} is missing; pnpm run build should have built ${what} there.`);
    process.exit(1);
  }
}
cpSync(from, to, { recursive: true, verbatimSymlinks: true });
