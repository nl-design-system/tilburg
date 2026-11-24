/* @license CC0-1.0 */

import { TilburgWbcCalendar } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-calendar.examples';

/* Stencil `<tilburg-wbc-calendar>` rendered through its generated React proxy.
   The custom elements themselves are registered once in `config/preview.tsx`
   (`defineCustomElements()`). */

const meta = {
  title: 'Tilburg Web Components/Calendar',
  id: 'tilburg-calendar-wbc',
  component: TilburgWbcCalendar,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWbcCalendar>;

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
