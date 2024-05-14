/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';
import { Paragraph } from '@utrecht/component-library-react/dist/css-module';
import readme from './documentation/paragraph.md?raw';

const meta = {
  title: 'CSS Component/Paragraph',
  id: 'css-utrecht-paragraph',
  component: Paragraph,
  argTypes: {
    children: {
      name: 'Content',
      type: {
        name: 'string',
        required: true,
      },
      defaultValue: '',
    },
  },
  args: {
    children: '',
  },
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/ck81CE8SNzePi30jCEu7MK/NLDS---Gemeente-Tilburg---Bibliotheek?node-id=150-734&t=nrvRAztL0ecku9kp-0',
    },
    docs: {
      description: {
        component: readme,
      },
    },
  },
} satisfies Meta<typeof Paragraph>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Paragraph',
  args: {
    children:
      '"Tilburg, gelegen in het zuiden van Nederland, is een levendige stad met een rijke geschiedenis en een bruisende cultuur. Bekend om zijn textielindustrie in het verleden, heeft Tilburg zich ontwikkeld tot een moderne stad vol met kunst, muziek, en culinaire hoogstandjes. Wandel door de sfeervolle straten van de binnenstad en ontdek de vele boetiekjes, gezellige cafés en restaurants. Breng een bezoek aan de indrukwekkende musea, zoals het Textielmuseum of het De Pont Museum voor hedendaagse kunst, waar je kunt genieten van inspirerende tentoonstellingen. Verken het groene landschap rondom Tilburg, met prachtige parken en natuurgebieden zoals de Oude Warande en de Loonse en Drunense Duinen. Of geniet van een avondje uit in een van de vele theaters of concertzalen die de stad te bieden heeft. Met zijn diverse aanbod aan activiteiten en bezienswaardigheden is Tilburg een stad die voor ieder wat wils biedt',
  },
};
export const LeadParagraph: Story = {
  name: 'Lead paragraph',
  args: {
    ...Default.args,
    lead: true,
  },
};

export const SmallPrintParagraph: Story = {
  name: 'Small print',
  args: {
    ...Default.args,
    small: true,
  },
};
