/* @license CC0-1.0 */

import { TilburgHeadingGroup } from '@gemeente-tilburg/components-angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description } from '../../storybook-shared/src/tilburg-heading-group.examples';

const meta: Meta<TilburgHeadingGroup> = {
  title: 'Tilburg Angular/Heading Group',
  id: 'tilburg-heading-group-angular',
  component: TilburgHeadingGroup,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj<TilburgHeadingGroup>;

export const Default: Story = {
  name: 'Default',
  render: () => ({
    template: `
      <tilburg-heading-group>
        <tilburg-heading-1>Afvalkalender</tilburg-heading-1>
        <tilburg-pre-heading>Afval en recycling</tilburg-pre-heading>
      </tilburg-heading-group>
    `,
  }),
};

export const Level2: Story = {
  name: 'Heading 2',
  render: () => ({
    template: `
      <tilburg-heading-group>
        <tilburg-heading-2>Parkeervergunning aanvragen</tilburg-heading-2>
        <tilburg-pre-heading>Parkeren</tilburg-pre-heading>
      </tilburg-heading-group>
    `,
  }),
};

export const Subtitle: Story = {
  name: 'With subtitle paragraph',
  render: () => ({
    template: `
      <tilburg-heading-group>
        <tilburg-heading-1>Spoorpark</tilburg-heading-1>
        <tilburg-paragraph>Het stadspark dat Tilburgers samen hebben gemaakt</tilburg-paragraph>
      </tilburg-heading-group>
    `,
  }),
};
