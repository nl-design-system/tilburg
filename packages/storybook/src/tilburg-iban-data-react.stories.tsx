/* @license CC0-1.0 */

import { IbanData, Paragraph } from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionReact } from '../../storybook-shared/src/tilburg-iban-data.examples';

const meta = {
  title: 'Tilburg React/IBAN Data',
  id: 'tilburg-iban-data-react',
  component: IbanData,
  args: { value: 'NL91ABNA0417164300' },
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionReact } },
  },
} satisfies Meta<typeof IbanData>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPermutations: Story = {
  render: () => (
    <div lang="nl">
      <Paragraph>
        Maak het bedrag over naar <IbanData value="NL91ABNA0417164300" /> onder vermelding van uw aanslagnummer.
      </Paragraph>
      <Paragraph>
        Genormaliseerd uit &quot; nl91 abna-0417 1643 00 &quot;: <IbanData value=" nl91 abna-0417 1643 00 " />
      </Paragraph>
      <Paragraph>
        <IbanData value="MU43BOMM0101123456789101000MUR" />
      </Paragraph>
    </div>
  ),
};
