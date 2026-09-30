/* @license CC0-1.0 */

import { TilburgBadgeStatus } from '@gemeente-tilburg/components-angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description } from '../../storybook-shared/src/tilburg-badge-status.examples';

const meta: Meta<TilburgBadgeStatus> = {
  title: 'Tilburg Angular/Badge Status',
  id: 'tilburg-badge-status-angular',
  component: TilburgBadgeStatus,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj<TilburgBadgeStatus>;

export const All: Story = {
  name: 'All four status types',
  render: () => ({
    template: `
      <div style="display:flex; gap:0.75rem; flex-wrap:wrap">
        <tilburg-badge-status status="info">In behandeling</tilburg-badge-status>
        <tilburg-badge-status status="success">Goedgekeurd</tilburg-badge-status>
        <tilburg-badge-status status="warning">Aandacht vereist</tilburg-badge-status>
        <tilburg-badge-status status="error">Afgewezen</tilburg-badge-status>
      </div>
    `,
  }),
};

export const AllStatuses: Story = {
  render: () => ({
    template: `
      <div style="display:flex; gap:0.5rem; flex-wrap:wrap">
        <tilburg-badge-status status="info">info</tilburg-badge-status>
        <tilburg-badge-status status="safe">safe</tilburg-badge-status>
        <tilburg-badge-status status="warning">warning</tilburg-badge-status>
        <tilburg-badge-status status="danger">danger</tilburg-badge-status>
        <tilburg-badge-status status="invalid">invalid</tilburg-badge-status>
        <tilburg-badge-status status="inactive">inactive</tilburg-badge-status>
        <tilburg-badge-status status="neutral">neutral</tilburg-badge-status>
      </div>
    `,
  }),
};
