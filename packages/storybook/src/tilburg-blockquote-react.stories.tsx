/* @license CC0-1.0 */

import { Blockquote, Paragraph } from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionReact } from '../../storybook-shared/src/tilburg-blockquote.examples';

const meta = {
  title: 'Tilburg React/Blockquote',
  id: 'tilburg-blockquote-react',
  component: Blockquote,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionReact } },
  },
} satisfies Meta<typeof Blockquote>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Blockquote>
      <Paragraph>Samen maken we Tilburg een stad waar iedereen mee kan doen.</Paragraph>
    </Blockquote>
  ),
};

export const WithAttribution: Story = {
  name: 'With attribution',
  render: () => (
    <Blockquote attribution="Inwoner van de Reeshof">
      <Paragraph>Dankzij de wijkregisseur wist ik precies bij wie ik terecht kon met mijn vraag.</Paragraph>
    </Blockquote>
  ),
};
