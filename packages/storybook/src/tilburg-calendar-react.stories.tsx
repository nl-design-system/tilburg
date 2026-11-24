/* @license CC0-1.0 */

import { Calendar } from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionReact } from '../../storybook-shared/src/tilburg-calendar.examples';

const meta = {
  title: 'Tilburg React/Calendar',
  id: 'tilburg-calendar-react',
  component: Calendar,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionReact } },
  },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Selected: Story = {
  name: 'Selected date',
  args: { value: '2026-11-12' },
};

export const MinMax: Story = {
  name: 'Min and max date',
  args: { value: '2026-11-12', min: '2026-11-09', max: '2026-11-27' },
};
