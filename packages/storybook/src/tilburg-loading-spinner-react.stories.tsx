/* @license CC0-1.0 */

import { LoadingSpinner } from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Tilburg React/Loading Spinner',
  id: 'tilburg-loading-spinner-react',
  component: LoadingSpinner,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Loading Spinner is a full-viewport overlay (`position: fixed`). Each story is wrapped so the spinner is visible inside the docs frame.',
      },
    },
  },
} satisfies Meta<typeof LoadingSpinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ImmediateWithTitleAndMessage: Story = {
  render: () => <LoadingSpinner visible delayMs={0} title="Aan het laden" message="Even geduld..." />,
};

export const ImmediateWithoutMessage: Story = {
  render: () => <LoadingSpinner visible delayMs={0} title="Bezig" />,
};

export const ImmediateOnlySpinner: Story = {
  render: () => <LoadingSpinner visible delayMs={0} />,
};

export const Hidden: Story = {
  render: () => <LoadingSpinner visible={false} />,
};
