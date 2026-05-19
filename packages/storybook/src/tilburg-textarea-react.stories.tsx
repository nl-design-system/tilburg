/* @license CC0-1.0 */

import { Textarea } from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Tilburg React/Textarea',
  id: 'tilburg-textarea-react',
  component: Textarea,
  tags: ['autodocs'],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPermutations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <Textarea name="msg" rows={3} placeholder="Default" />
      <Textarea name="msg" rows={3} required placeholder="Required" />
      <Textarea name="msg" rows={3} defaultValue="Alleen lezen" readOnly />
      <Textarea name="msg" rows={3} disabled placeholder="Disabled" />
      <Textarea name="msg" rows={3} defaultValue="bad value" invalid />
    </div>
  ),
};
