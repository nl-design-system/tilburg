/* @license CC0-1.0 */

import { TilburgCodeBlock } from '@gemeente-tilburg/components-angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description } from '../../storybook-shared/src/tilburg-code-block.examples';

const meta: Meta<TilburgCodeBlock> = {
  title: 'Tilburg Angular/Code Block',
  id: 'tilburg-code-block-angular',
  component: TilburgCodeBlock,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj<TilburgCodeBlock>;

export const Default: Story = {
  name: 'Default',
  render: () => ({
    template: `
      <tilburg-code-block>npm install @gemeente-tilburg/components-css</tilburg-code-block>
    `,
  }),
};

export const Multiline: Story = {
  name: 'Multiple lines',
  render: () => ({
    props: {
      snippet: `<html lang="nl" class="tilburg-theme">
  <body class="utrecht-document">
    <h1 class="utrecht-heading-1">Afvalkalender</h1>
  </body>
</html>`,
    },
    template: '<tilburg-code-block>{{ snippet }}</tilburg-code-block>',
  }),
};
