/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';
import { StatusBadge } from '@utrecht/component-library-react/dist/css-module';
import readme from './documentation/status-badge.md?raw';

const meta = {
  title: 'CSS Component/Status badge',
  id: 'css-utrecht-status-badge',
  component: StatusBadge,
  argTypes: {
    children: {
      description: 'Text content',
      control: 'text',
    },
    status: {
      control: { type: 'select' },
      description: 'Status',
      options: ['danger', 'success', 'warning'],
    },
  },
  args: {
    status: 'neutral',
    children: '',
  },
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/ck81CE8SNzePi30jCEu7MK/NLDS---Gemeente-Tilburg---Bibliotheek?node-id=1354-6672&t=iKkbTeLsUISfA7KG-0',
    },
    docs: {
      description: {
        component: readme,
      },
    },
  },
} satisfies Meta<typeof StatusBadge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    status: 'neutral',
    children: 'normaal',
  },
};

export const Success: Story = {
  args: {
    status: 'success',
    children: 'success',
  },
  name: 'Success',
};

export const Warning: Story = {
  args: {
    status: 'warning',
    children: 'warning',
  },
  name: 'Warning',
};

export const Error: Story = {
  args: {
    status: 'error',
    children: 'error',
  },
  name: 'Error',
};
