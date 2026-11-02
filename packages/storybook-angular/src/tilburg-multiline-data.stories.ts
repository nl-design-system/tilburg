/* @license CC0-1.0 */

import { TilburgMultilineData } from '@gemeente-tilburg/components-angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description } from '../../storybook-shared/src/tilburg-multiline-data.examples';

const meta: Meta<TilburgMultilineData> = {
  title: 'Tilburg Angular/Multiline Data',
  id: 'tilburg-multiline-data-angular',
  component: TilburgMultilineData,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj<TilburgMultilineData>;

export const AllPermutations: Story = {
  render: () => ({
    props: { adres: 'Gemeente Tilburg\nStadhuisplein 130\n5038 TC Tilburg' },
    template: `
      <tilburg-multiline-data>{{ adres }}</tilburg-multiline-data>
    `,
  }),
};
