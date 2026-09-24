/* @license CC0-1.0 */

import { TilburgParagraph } from '@gemeente-tilburg/components-angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description } from '../../storybook-shared/src/tilburg-paragraph.examples';

const meta: Meta<TilburgParagraph> = {
  title: 'Tilburg Angular/Paragraph',
  id: 'tilburg-paragraph-angular',
  component: TilburgParagraph,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj<TilburgParagraph>;

const COPY =
  'Tilburg, gelegen in het zuiden van Nederland, is een bruisende stad met een rijke geschiedenis en een levendige cultuur.';

export const Default: Story = {
  name: 'Default',
  render: () => ({
    props: { copy: COPY },
    template: `<tilburg-paragraph>{{ copy }}</tilburg-paragraph>`,
  }),
};

export const Lead: Story = {
  name: 'Lead',
  render: () => ({
    props: { copy: COPY },
    template: `<tilburg-paragraph [lead]="true">{{ copy }}</tilburg-paragraph>`,
  }),
};

export const Small: Story = {
  name: 'Small',
  render: () => ({
    props: { copy: COPY },
    template: `<tilburg-paragraph [small]="true">{{ copy }}</tilburg-paragraph>`,
  }),
};

export const AllPermutations: Story = {
  render: () => ({
    template: `
      <tilburg-paragraph>Standaard paragraaf. Hier staat normale brood-tekst.</tilburg-paragraph>
      <tilburg-paragraph [lead]="true">Lead paragraaf — opvallende intro.</tilburg-paragraph>
      <tilburg-paragraph [small]="true">Kleine paragraaf — voor voetnoten.</tilburg-paragraph>
    `,
  }),
};
