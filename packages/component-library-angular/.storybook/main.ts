import { dirname, join } from 'path';
import type { StorybookConfig } from '@storybook/angular';
import * as path from 'path';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],

  addons: [getAbsolutePath('@storybook/addon-links'), getAbsolutePath('@storybook/addon-essentials')],

  framework: {
    name: getAbsolutePath('@storybook/angular'),
    options: {},
  },

  core: {
    builder: '@storybook/builder-webpack5',
    disableTelemetry: true,
  },

  staticDirs: ['../../../proprietary/assets/src'],
  webpackFinal: async (config) => {
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
        '~@tilburg': path.resolve(__dirname, '../node_modules/@tilburg'),
      },
    };

    config.module?.rules?.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../node_modules/@tilburg'),
    });

    return {
      ...config,
      performance: {
        // Disable warning for: "asset size exceeds the recommended limit (244 KiB)"
        hints: false,
      },
    };
  },
};

export default config;

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')));
}
