import type { Preview } from '@storybook/react';
import '@tilburg/design-tokens/dist/index.css';
import '@tilburg/font/src/index.scss';
import { defineCustomElements } from '@tilburg/web-components-stencil/loader/index.js';
import { ParametersArgsDecorator } from './ParametersArgsDecorator';

defineCustomElements();

const preview: Preview = {
  parameters: {
    controls: { expanded: false },
    options: { panelPosition: 'right' },
  },
  decorators: [ParametersArgsDecorator],
};

export default preview;
