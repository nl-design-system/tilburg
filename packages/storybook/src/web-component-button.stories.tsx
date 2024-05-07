/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';
import readme from '@tilburg/components-css/button/README.md?raw';
import { TilburgButton } from '@tilburg/web-components-react/src';
import { PropsWithChildren } from 'react';

const Button = ({ children }: PropsWithChildren<{}>) => <TilburgButton>{children}</TilburgButton>;

const meta = {
  title: 'Web Component/Button',
  id: 'web-component-button',
  component: Button,
  argTypes: {
    children: {
      name: 'Content',
      description: 'Button text',
      type: {
        name: 'string',
        required: true,
      },
      defaultValue: '',
    },
  },
  args: {
    children: 'Opslaan en verder',
  },
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: readme,
      },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Example button',
};
