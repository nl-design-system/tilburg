import { Controls, Description, Primary, Stories } from '@storybook/addon-docs';
import type { Preview } from '@storybook/react';
import '@tilburg/design-tokens/dist/theme.css';
import '@tilburg/font/src/index.scss';
import { defineCustomElements } from '@tilburg/web-components-stencil/loader/index.js';
import { ParametersArgsDecorator } from './ParametersArgsDecorator';
import { theme } from './theme';

defineCustomElements();

const preview: Preview = {
  parameters: {
    controls: { expanded: false },
    options: {
      panelPosition: 'right',
      storySort: {
        order: ['Tilburg', 'CSS Component'],
      },
    },
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
      theme: theme,
    },
  },
  decorators: [ParametersArgsDecorator],
};

export default preview;
