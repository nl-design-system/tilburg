/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';
import { BadgeCounter } from '@utrecht/component-library-react/dist/css-module';
import readme from './documentation/counter-badge.md?raw';

const meta = {
  title: 'CSS Component/Counter badge',
  id: 'css-utrecht-badge-counter',
  component: BadgeCounter,
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
      url: 'https://www.figma.com/file/ZWSC4gCrOXRUR9UX3aoZ8x/?node-id=7927-10549',
    },
    docs: {
      description: {
        component: readme,
      },
    },
  },
} satisfies Meta<typeof BadgeCounter>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Single: Story = {
  name: 'Single',
  args: {
    children: '9',
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/ck81CE8SNzePi30jCEu7MK/NLDS---Gemeente-Tilburg---Bibliotheek?node-id=1235%3A4364&t=VEgVZGuEwb18Kx3g-1',
    },
  },
};

export const Double: Story = {
  name: 'Double',
  args: {
    children: '99',
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/ck81CE8SNzePi30jCEu7MK/NLDS---Gemeente-Tilburg---Bibliotheek?node-id=1235%3A4364&t=VEgVZGuEwb18Kx3g-1',
    },
  },
};

export const Triple: Story = {
  name: 'Triple',
  args: {
    children: '999',
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/ck81CE8SNzePi30jCEu7MK/NLDS---Gemeente-Tilburg---Bibliotheek?node-id=1235%3A4364&t=VEgVZGuEwb18Kx3g-1',
    },
  },
};

export const Quadruple: Story = {
  name: 'Quadruple',
  args: {
    children: '9.999',
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/ck81CE8SNzePi30jCEu7MK/NLDS---Gemeente-Tilburg---Bibliotheek?node-id=1235%3A4364&t=VEgVZGuEwb18Kx3g-1',
    },
  },
};
