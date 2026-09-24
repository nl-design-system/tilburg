/* @license CC0-1.0 */

import { TilburgSeparator } from '@gemeente-tilburg/components-angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description } from '../../storybook-shared/src/tilburg-separator.examples';

const meta: Meta<TilburgSeparator> = {
  title: 'Tilburg Angular/Separator',
  id: 'tilburg-separator-angular',
  component: TilburgSeparator,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj<TilburgSeparator>;

export const Default: Story = {
  name: 'Default',
  render: () => ({
    template: `
      <div style="max-inline-size:32rem">
        <tilburg-paragraph>Eerste sectie met wat tekst boven de scheidingslijn.</tilburg-paragraph>
        <tilburg-separator></tilburg-separator>
        <tilburg-paragraph>Tweede sectie onder de scheidingslijn.</tilburg-paragraph>
      </div>
    `,
  }),
};

export const Decorative: Story = {
  name: 'Decorative (aria-hidden)',
  render: () => ({
    template: `
      <div style="max-inline-size:32rem">
        <tilburg-paragraph>Aanvraagdetails</tilburg-paragraph>
        <tilburg-separator [decorative]="true"></tilburg-separator>
        <tilburg-paragraph>Contactgegevens</tilburg-paragraph>
      </div>
    `,
  }),
};
