import { Controls, Description, Primary, Stories } from '@storybook/addon-docs';
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
    docs: {
      page: () => {
        // Exclude `<Title>` because the title comes from the Markdown file
        return (
          <>
            <Description />
            <Primary />
            <Controls />
            <Stories />
          </>
        );
      },
    },
  },
  decorators: [ParametersArgsDecorator],
};

export default preview;
