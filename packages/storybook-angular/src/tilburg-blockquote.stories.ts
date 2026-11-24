/* @license CC0-1.0 */

import { TilburgBlockquote } from '@gemeente-tilburg/components-angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description } from '../../storybook-shared/src/tilburg-blockquote.examples';

const meta: Meta<TilburgBlockquote> = {
  title: 'Tilburg Angular/Blockquote',
  id: 'tilburg-blockquote-angular',
  component: TilburgBlockquote,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj<TilburgBlockquote>;

export const Default: Story = {
  name: 'Default',
  render: () => ({
    template: `
      <tilburg-blockquote>
        <tilburg-paragraph>Samen maken we Tilburg een stad waar iedereen mee kan doen.</tilburg-paragraph>
      </tilburg-blockquote>
    `,
  }),
};

export const WithAttribution: Story = {
  name: 'With attribution',
  render: () => ({
    template: `
      <tilburg-blockquote attribution="Inwoner van de Reeshof">
        <tilburg-paragraph>Dankzij de wijkregisseur wist ik precies bij wie ik terecht kon met mijn vraag.</tilburg-paragraph>
      </tilburg-blockquote>
    `,
  }),
};
