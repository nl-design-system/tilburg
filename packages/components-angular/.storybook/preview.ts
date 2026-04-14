import { componentWrapperDecorator, Preview } from '@storybook/angular';

const preview: Preview = {
  decorators: [componentWrapperDecorator((story) => `<div class="utrecht-document tilburg-theme">${story}</div>`)],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
