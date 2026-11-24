/* @license CC0-1.0 */

import { TilburgNumberData } from '@gemeente-tilburg/components-angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description } from '../../storybook-shared/src/tilburg-number-data.examples';

const meta: Meta<TilburgNumberData> = {
  title: 'Tilburg Angular/Number Data',
  id: 'tilburg-number-data-angular',
  component: TilburgNumberData,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj<TilburgNumberData>;

export const AllPermutations: Story = {
  render: () => ({
    template: `
      <div lang="nl">
        <tilburg-paragraph>Aantal inwoners van Tilburg: <tilburg-number-data [value]="226000">226.000</tilburg-number-data></tilburg-paragraph>
        <tilburg-paragraph>Groei ten opzichte van vorig jaar: <tilburg-number-data value="1.8" variant="positive">+1,8%</tilburg-number-data></tilburg-paragraph>
        <tilburg-paragraph>Verandering in restafval per inwoner: <tilburg-number-data value="-12.4" variant="negative">−12,4 kg</tilburg-number-data></tilburg-paragraph>
      </div>
    `,
  }),
};
