/* @license CC0-1.0 */

import { BadgeStatus } from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Tilburg React/Badge Status',
  id: 'tilburg-badge-status-react',
  component: BadgeStatus,
  tags: ['autodocs'],
} satisfies Meta<typeof BadgeStatus>;

export default meta;
type Story = StoryObj<typeof meta>;

const statuses = ['info', 'safe', 'warning', 'danger', 'invalid', 'inactive', 'neutral'] as const;

export const AllPermutations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
      {statuses.map((s) => (
        <BadgeStatus key={s} status={s}>
          {s}
        </BadgeStatus>
      ))}
    </div>
  ),
};

export const Default: Story = {
  render: () => <BadgeStatus status="safe">In behandeling</BadgeStatus>,
};
