/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';
import { Heading } from '@utrecht/component-library-react/dist/css-module';
import readme from './documentation/heading.md?raw';

const meta = {
  title: 'CSS Component/Heading',
  id: 'css-utrecht-heading',
  component: Heading,
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
      url: 'https://www.figma.com/design/ck81CE8SNzePi30jCEu7MK/NLDS---Gemeente-Tilburg---Bibliotheek?node-id=153-1039&t=nrvRAztL0ecku9kp-0',
    },
    docs: {
      description: {
        component: readme,
      },
    },
  },
} satisfies Meta<typeof Heading>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Heading1: Story = {
  name: 'Heading 1',
  args: {
    children: 'Heading 1',
    level: 1,
  },
};

export const Heading2: Story = {
  name: 'Heading 2',
  args: {
    children: 'Heading 2',
    level: 2,
  },
};

export const Heading3: Story = {
  name: 'Heading 3',
  args: {
    children: 'Heading 3',
    level: 3,
  },
};

export const Heading4: Story = {
  name: 'Heading 4',
  args: {
    children: 'Heading 4',
    level: 4,
  },
};

export const Heading5: Story = {
  name: 'Heading 5',
  args: {
    children: 'Heading 5',
    level: 5,
  },
};

export const Heading6: Story = {
  name: 'Heading 6',
  args: {
    children: 'Heading 6',
    level: 6,
  },
};
