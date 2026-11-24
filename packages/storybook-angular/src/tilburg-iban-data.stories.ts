/* @license CC0-1.0 */

import { TilburgIbanData } from '@gemeente-tilburg/components-angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description } from '../../storybook-shared/src/tilburg-iban-data.examples';

const meta: Meta<TilburgIbanData> = {
  title: 'Tilburg Angular/IBAN Data',
  id: 'tilburg-iban-data-angular',
  component: TilburgIbanData,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj<TilburgIbanData>;

export const AllPermutations: Story = {
  render: () => ({
    template: `
      <div lang="nl">
        <tilburg-paragraph>Maak het bedrag over naar <tilburg-iban-data value="NL91ABNA0417164300"></tilburg-iban-data> onder vermelding van uw aanslagnummer.</tilburg-paragraph>
        <tilburg-paragraph>Genormaliseerd uit " nl91 abna-0417 1643 00 ": <tilburg-iban-data value=" nl91 abna-0417 1643 00 "></tilburg-iban-data></tilburg-paragraph>
        <tilburg-paragraph><tilburg-iban-data value="MU43BOMM0101123456789101000MUR"></tilburg-iban-data></tilburg-paragraph>
      </div>
    `,
  }),
};
