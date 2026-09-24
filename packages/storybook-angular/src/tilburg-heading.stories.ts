/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description } from '../../storybook-shared/src/tilburg-heading.examples';

const meta: Meta = {
  title: 'Tilburg Angular/Heading',
  id: 'tilburg-heading-angular',
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj;

export const AllLevels: Story = {
  name: 'All six levels',
  render: () => ({
    template: `
      <div style="display:flex; flex-direction:column; gap:0.5rem">
        <tilburg-heading-1>Heading 1 — Tilburg</tilburg-heading-1>
        <tilburg-heading-2>Heading 2 — Tilburg</tilburg-heading-2>
        <tilburg-heading-3>Heading 3 — Tilburg</tilburg-heading-3>
        <tilburg-heading-4>Heading 4 — Tilburg</tilburg-heading-4>
        <tilburg-heading-5>Heading 5 — Tilburg</tilburg-heading-5>
        <tilburg-heading-6>Heading 6 — Tilburg</tilburg-heading-6>
      </div>
    `,
  }),
};
