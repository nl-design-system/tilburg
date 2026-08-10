/* @license CC0-1.0 */

import { LoadingSpinner } from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionReact } from '../../storybook-shared/src/tilburg-loading-spinner.examples';

const meta = {
  title: 'Tilburg React/Loading Spinner',
  id: 'tilburg-loading-spinner-react',
  component: LoadingSpinner,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    bugs,
    docs: { description: { component: descriptionReact } },
  },
} satisfies Meta<typeof LoadingSpinner>;

export default meta;
type Story = StoryObj<typeof meta>;

/* Every story passes `aria-label`, like the canonical HTML reference markup
   does: the overlay has no text of its own that assistive tech can use as its
   accessible name. */
export const ImmediateWithTitleAndMessage: Story = {
  render: () => (
    <LoadingSpinner visible delayMs={0} title="Aan het laden" message="Even geduld..." aria-label="Aan het laden" />
  ),
};

export const ImmediateWithoutMessage: Story = {
  render: () => <LoadingSpinner visible delayMs={0} title="Bezig" aria-label="Bezig" />,
};

export const ImmediateOnlySpinner: Story = {
  render: () => <LoadingSpinner visible delayMs={0} aria-label="Bezig met laden" />,
};

export const Hidden: Story = {
  render: () => <LoadingSpinner visible={false} />,
};
