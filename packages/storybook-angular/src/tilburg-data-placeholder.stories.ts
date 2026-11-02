/* @license CC0-1.0 */

import { TilburgDataPlaceholder } from '@gemeente-tilburg/components-angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description } from '../../storybook-shared/src/tilburg-data-placeholder.examples';

const meta: Meta<TilburgDataPlaceholder> = {
  title: 'Tilburg Angular/Data Placeholder',
  id: 'tilburg-data-placeholder-angular',
  component: TilburgDataPlaceholder,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj<TilburgDataPlaceholder>;

export const Default: Story = {
  name: 'Default',
  render: () => ({
    template: `
      <tilburg-paragraph>Naam: <tilburg-data-placeholder></tilburg-data-placeholder></tilburg-paragraph>
    `,
  }),
};

export const Loading: Story = {
  name: 'Loading',
  render: () => ({
    template: `
      <div aria-busy="true">
        <tilburg-paragraph>Naam: <tilburg-data-placeholder [loading]="true"></tilburg-data-placeholder></tilburg-paragraph>
        <tilburg-paragraph>Adres: <tilburg-data-placeholder [loading]="true"></tilburg-data-placeholder></tilburg-paragraph>
      </div>
    `,
  }),
};
