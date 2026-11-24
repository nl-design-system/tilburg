/* @license CC0-1.0 */

import { TilburgCalendar } from '@gemeente-tilburg/components-angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description } from '../../storybook-shared/src/tilburg-calendar.examples';

const meta: Meta<TilburgCalendar> = {
  title: 'Tilburg Angular/Calendar',
  id: 'tilburg-calendar-angular',
  component: TilburgCalendar,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj<TilburgCalendar>;

export const Default: Story = {
  name: 'Default',
  render: () => ({ template: `<tilburg-calendar></tilburg-calendar>` }),
};

export const Selected: Story = {
  name: 'Selected date',
  render: () => ({ template: `<tilburg-calendar value="2026-11-12"></tilburg-calendar>` }),
};

export const MinMax: Story = {
  name: 'Min and max date',
  render: () => ({
    template: `<tilburg-calendar value="2026-11-12" min="2026-11-09" max="2026-11-27"></tilburg-calendar>`,
  }),
};
