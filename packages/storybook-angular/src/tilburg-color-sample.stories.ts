/* @license CC0-1.0 */

import { TilburgColorSample } from '@gemeente-tilburg/components-angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description } from '../../storybook-shared/src/tilburg-color-sample.examples';

const meta: Meta<TilburgColorSample> = {
  title: 'Tilburg Angular/Color Sample',
  id: 'tilburg-color-sample-angular',
  component: TilburgColorSample,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj<TilburgColorSample>;

export const Legend: Story = {
  name: 'Legend',
  render: () => ({
    template: `
      <tilburg-paragraph><tilburg-color-sample color="#00a4db"></tilburg-color-sample> Blauw, hoog water</tilburg-paragraph>
      <tilburg-paragraph><tilburg-color-sample color="#ffd800"></tilburg-color-sample> Geel, laag water</tilburg-paragraph>
      <tilburg-paragraph><tilburg-color-sample color="#008a6a"></tilburg-color-sample> Groen, normaal peil</tilburg-paragraph>
    `,
  }),
};
