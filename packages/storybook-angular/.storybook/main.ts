import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
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
  /* In Storybook 9 the `docs.autodocs` setting moved to the `tags` config in
     `preview.ts` (or per-story `tags: ['autodocs']`). */
  staticDirs: ['../../../proprietary/assets/src'],
};

export default config;
