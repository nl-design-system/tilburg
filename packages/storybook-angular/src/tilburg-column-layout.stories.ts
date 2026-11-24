/* @license CC0-1.0 */

import { TilburgColumnLayout } from '@gemeente-tilburg/components-angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description } from '../../storybook-shared/src/tilburg-column-layout.examples';

const meta: Meta<TilburgColumnLayout> = {
  title: 'Tilburg Angular/Column Layout',
  id: 'tilburg-column-layout-angular',
  component: TilburgColumnLayout,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj<TilburgColumnLayout>;

const paragraphs = `
  <tilburg-paragraph>Restafval, gft en papier halen we bij je huis op. Op de afvalkalender zie je op welke dag de containers aan de straat moeten staan. Zet je container voor 7.30 uur buiten, met de handgreep naar de straat.</tilburg-paragraph>
  <tilburg-paragraph>Grof afval, zoals een oude bank of een kapotte wasmachine, breng je naar de milieustraat. Je kunt het ook laten ophalen; maak daarvoor online een afspraak.</tilburg-paragraph>
  <tilburg-paragraph>Glas, textiel en klein chemisch afval breng je naar een verzamelcontainer in de wijk of naar de milieustraat. Lever lege batterijen in bij de supermarkt.</tilburg-paragraph>`;

export const Default: Story = {
  name: 'Default',
  render: () => ({ template: `<tilburg-column-layout>${paragraphs}</tilburg-column-layout>` }),
};

export const WithRule: Story = {
  name: 'With column rule',
  render: () => ({ template: `<tilburg-column-layout [rule]="true">${paragraphs}</tilburg-column-layout>` }),
};
