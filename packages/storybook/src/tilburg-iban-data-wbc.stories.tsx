/* @license CC0-1.0 */

import { TilburgWbcIbanData } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-iban-data.examples';

/* Stencil `<tilburg-wbc-iban-data>` rendered through its generated React proxy.
   The custom elements themselves are registered once in `config/preview.tsx`
   (`defineCustomElements()`). */

const meta = {
  title: 'Tilburg Web Components/IBAN Data',
  id: 'tilburg-iban-data-wbc',
  component: TilburgWbcIbanData,
  args: { value: 'NL91ABNA0417164300' },
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWbcIbanData>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPermutations: Story = {
  render: () => (
    <div lang="nl">
      <p className="utrecht-paragraph">
        Maak het bedrag over naar <TilburgWbcIbanData value="NL91ABNA0417164300" /> onder vermelding van uw
        aanslagnummer.
      </p>
      <p className="utrecht-paragraph">
        Genormaliseerd uit &quot; nl91 abna-0417 1643 00 &quot;: <TilburgWbcIbanData value=" nl91 abna-0417 1643 00 " />
      </p>
      <p className="utrecht-paragraph">
        <TilburgWbcIbanData value="MU43BOMM0101123456789101000MUR" />
      </p>
    </div>
  ),
};
