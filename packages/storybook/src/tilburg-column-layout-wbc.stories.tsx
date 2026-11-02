/* @license CC0-1.0 */

import { TilburgWbcColumnLayout, TilburgWbcParagraph } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-column-layout.examples';

/* Stencil `<tilburg-wbc-column-layout>` rendered through its generated React proxy. */

const meta = {
  title: 'Tilburg Web Components/Column Layout',
  id: 'tilburg-column-layout-wbc',
  component: TilburgWbcColumnLayout,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWbcColumnLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

const paragraphs = (
  <>
    <TilburgWbcParagraph>
      Restafval, gft en papier halen we bij je huis op. Op de afvalkalender zie je op welke dag de containers aan de
      straat moeten staan. Zet je container voor 7.30 uur buiten, met de handgreep naar de straat.
    </TilburgWbcParagraph>
    <TilburgWbcParagraph>
      Grof afval, zoals een oude bank of een kapotte wasmachine, breng je naar de milieustraat. Je kunt het ook laten
      ophalen; maak daarvoor online een afspraak.
    </TilburgWbcParagraph>
    <TilburgWbcParagraph>
      Glas, textiel en klein chemisch afval breng je naar een verzamelcontainer in de wijk of naar de milieustraat.
      Lever lege batterijen in bij de supermarkt.
    </TilburgWbcParagraph>
  </>
);

export const Default: Story = {
  render: (args) => <TilburgWbcColumnLayout {...args}>{paragraphs}</TilburgWbcColumnLayout>,
};

export const WithRule: Story = {
  name: 'With column rule',
  args: { rule: true },
  render: (args) => <TilburgWbcColumnLayout {...args}>{paragraphs}</TilburgWbcColumnLayout>,
};
