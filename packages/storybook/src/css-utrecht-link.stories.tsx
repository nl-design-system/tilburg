/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';
import { Link, Paragraph } from '@utrecht/component-library-react/dist/css-module';
import readme from './documentation/link.md?raw';

const meta = {
  title: 'CSS Component/Link',
  id: 'css-utrecht-link',
  component: Link,
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
      url: 'https://www.figma.com/design/ck81CE8SNzePi30jCEu7MK/NLDS---Gemeente-Tilburg---Bibliotheek?node-id=153-1056&t=nrvRAztL0ecku9kp-0',
    },
    docs: {
      description: {
        component: readme,
      },
    },
  },
} satisfies Meta<typeof Link>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Link',
  args: {
    children: 'Website van Tilburg',
    href: '#',
  },
};
export const LinkInParagraph: Story = {
  name: 'Link in paragraph',
  args: {
    children: 'website van Tilburg',
    href: '#',
  },
  decorators: [
    (Story) => (
      <Paragraph>
        Tilburg, gelegen in het zuiden van Nederland, is een bruisende stad met een rijke geschiedenis en een levendige
        cultuur. Bekijk de {Story()}. Ooit bekend als een centrum van de textielindustrie, heeft Tilburg zich ontwikkeld
        tot een moderne en dynamische stad met een bloeiende economie en een levendige gemeenschap.
      </Paragraph>
    ),
  ],
};

export const LinkInLeadParagraph: Story = {
  name: 'Link in lead paragraph',
  args: {
    children: 'Website van Tilburg',
    href: '#',
  },
  decorators: [
    (Story) => (
      <Paragraph lead>
        Tilburg, gelegen in het zuiden van Nederland, is een bruisende stad met een rijke geschiedenis en een levendige
        cultuur. Bekijk de {Story()}. Ooit bekend als een centrum van de textielindustrie, heeft Tilburg zich ontwikkeld
        tot een moderne en dynamische stad met een bloeiende economie en een levendige gemeenschap.
      </Paragraph>
    ),
  ],
};

export const LinkInSmallPrint: Story = {
  name: 'Link in small print',
  args: {
    children: 'Website van Tilburg',
    href: '#',
  },
  decorators: [
    (Story) => (
      <Paragraph small>
        Tilburg, gelegen in het zuiden van Nederland, is een bruisende stad met een rijke geschiedenis en een levendige
        cultuur. Bekijk de {Story()}. Ooit bekend als een centrum van de textielindustrie, heeft Tilburg zich ontwikkeld
        tot een moderne en dynamische stad met een bloeiende economie en een levendige gemeenschap.
      </Paragraph>
    ),
  ],
};
