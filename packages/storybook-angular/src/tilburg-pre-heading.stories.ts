/* @license CC0-1.0 */

import { TilburgPreHeading } from '@gemeente-tilburg/components-angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description } from '../../storybook-shared/src/tilburg-pre-heading.examples';

const meta: Meta<TilburgPreHeading> = {
  title: 'Tilburg Angular/Pre Heading',
  id: 'tilburg-pre-heading-angular',
  component: TilburgPreHeading,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj<TilburgPreHeading>;

export const Default: Story = {
  name: 'Default',
  render: () => ({
    template: `
      <tilburg-pre-heading>Afval en recycling</tilburg-pre-heading>
    `,
  }),
};

export const InHeadingGroup: Story = {
  name: 'In a heading group',
  render: () => ({
    template: `
      <tilburg-heading-group>
        <tilburg-heading-1>Afvalkalender</tilburg-heading-1>
        <tilburg-pre-heading>Afval en recycling</tilburg-pre-heading>
      </tilburg-heading-group>
    `,
  }),
};
