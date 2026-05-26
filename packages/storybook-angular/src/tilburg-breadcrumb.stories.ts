/* @license CC0-1.0 */

import { TilburgBreadcrumb } from '@gemeente-tilburg/components-angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description } from '../../storybook-shared/src/tilburg-breadcrumb.examples';

const meta: Meta<TilburgBreadcrumb> = {
  title: 'Tilburg Angular/Breadcrumb',
  id: 'tilburg-breadcrumb-angular',
  component: TilburgBreadcrumb,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj<TilburgBreadcrumb>;

export const Default: Story = {
  name: 'Default trail',
  args: {
    items: [
      { label: 'Home', href: '#' },
      { label: 'Parkeren', href: '#' },
      { label: 'Vergunning aanvragen', href: '#' },
      { label: 'Bewonersvergunning', current: true },
    ],
  },
  render: (args) => ({
    props: args,
    template: `<tilburg-breadcrumb [items]="items"></tilburg-breadcrumb>`,
  }),
};

export const TwoLevels: Story = {
  name: 'Two levels',
  args: {
    items: [
      { label: 'Home', href: '#' },
      { label: 'Aanvragen', current: true },
    ],
  },
  render: (args) => ({
    props: args,
    template: `<tilburg-breadcrumb [items]="items"></tilburg-breadcrumb>`,
  }),
};

export const Deep: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Inwoners', href: '/inwoners' },
      { label: 'Diensten', href: '/inwoners/diensten' },
      { label: 'Reisdocumenten', href: '/inwoners/diensten/reisdocumenten' },
      { label: 'Paspoort aanvragen', current: true },
    ],
  },
  render: (args) => ({
    props: args,
    template: `<tilburg-breadcrumb [items]="items"></tilburg-breadcrumb>`,
  }),
};
