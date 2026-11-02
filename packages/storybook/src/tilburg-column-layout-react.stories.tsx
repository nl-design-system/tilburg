/* @license CC0-1.0 */

import { ColumnLayout, Paragraph } from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionReact } from '../../storybook-shared/src/tilburg-column-layout.examples';

const meta = {
  title: 'Tilburg React/Column Layout',
  id: 'tilburg-column-layout-react',
  component: ColumnLayout,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionReact } },
  },
} satisfies Meta<typeof ColumnLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

const paragraphs = (
  <>
    <Paragraph>
      Restafval, gft en papier halen we bij je huis op. Op de afvalkalender zie je op welke dag de containers aan de
      straat moeten staan. Zet je container voor 7.30 uur buiten, met de handgreep naar de straat.
    </Paragraph>
    <Paragraph>
      Grof afval, zoals een oude bank of een kapotte wasmachine, breng je naar de milieustraat. Je kunt het ook laten
      ophalen; maak daarvoor online een afspraak.
    </Paragraph>
    <Paragraph>
      Glas, textiel en klein chemisch afval breng je naar een verzamelcontainer in de wijk of naar de milieustraat.
      Lever lege batterijen in bij de supermarkt.
    </Paragraph>
  </>
);

export const Default: Story = {
  render: (args) => <ColumnLayout {...args}>{paragraphs}</ColumnLayout>,
};

export const WithRule: Story = {
  name: 'With column rule',
  args: { rule: true },
  render: (args) => <ColumnLayout {...args}>{paragraphs}</ColumnLayout>,
};
