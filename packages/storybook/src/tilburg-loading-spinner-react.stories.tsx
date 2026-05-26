/* @license CC0-1.0 */

import { LoadingSpinner } from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, description } from '../../storybook-shared/src/tilburg-loading-spinner.examples';

const meta = {
  title: 'Tilburg React/Loading Spinner',
  id: 'tilburg-loading-spinner-react',
  component: LoadingSpinner,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    bugs,
    docs: { description: { component: description } },
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
