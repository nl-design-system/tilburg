/* @license CC0-1.0 */

import { TilburgWbcBadgeStatus } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-badge-status.examples';

/* Stencil `<tilburg-wbc-badge-status>` rendered through its generated React proxy. */

const meta = {
  title: 'Tilburg Web Components/Badge Status',
  id: 'tilburg-badge-status-wbc',
  component: TilburgWbcBadgeStatus,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWbcBadgeStatus>;

export default meta;
type Story = StoryObj<typeof meta>;

const statuses = ['info', 'safe', 'warning', 'danger', 'invalid', 'inactive', 'neutral'] as const;

export const AllPermutations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
      {statuses.map((s) => (
        <TilburgWbcBadgeStatus key={s} status={s}>
          {s}
        </TilburgWbcBadgeStatus>
      ))}
    </div>
  ),
};

export const Default: Story = {
  render: () => <TilburgWbcBadgeStatus status="safe">In behandeling</TilburgWbcBadgeStatus>,
};
