import type { StorybookConfig } from '@storybook/angular';
import { resolve, sep } from 'node:path';

const HERE = resolve(import.meta.dirname, '..');
const LIBRARY = resolve(HERE, '../components-angular') + sep;

const config: StorybookConfig = {
  /* components-angular builds with Angular 20 (the oldest Angular it supports) and this Storybook runs Angular 22.
     Without this, the library's `dist/` would pick up `@angular/*` and `@utrecht/*` from its own node_modules, and
     `@utrecht/component-library-angular` (no Angular peer dependency) the hoisted copy: a second, older Angular in the
     bundle. So every `@angular/*` import, and the library's `@utrecht/*` imports, resolve from this package. */
  webpackFinal: (webpackConfig) => {
    webpackConfig.plugins ??= [];
    webpackConfig.plugins.push({
      apply: (compiler) =>
        new compiler.webpack.NormalModuleReplacementPlugin(/^@(angular|utrecht)\//, (resource) => {
          if (resource.request.startsWith('@angular/') || resource.context?.startsWith(LIBRARY))
            resource.context = HERE;
        }).apply(compiler),
    });
    return webpackConfig;
  },
  stories: ['../src/**/*.stories.@(ts|js|mdx)', '../src/**/*.mdx'],
  addons: ['@storybook/addon-a11y', '@storybook/addon-docs'],
  framework: {
    name: '@storybook/angular',
    options: {},
  },
  core: {
    disableTelemetry: true,
    disableWhatsNewNotifications: true,
  },
  /* Since Storybook 9 the `docs.autodocs` setting moved to the `tags` config in
     `preview.ts` (or per-story `tags: ['autodocs']`). */
  staticDirs: ['../../../proprietary/assets/src'],
};

export default config;
