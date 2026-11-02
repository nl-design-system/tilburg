/* @license CC0-1.0 */

import { TilburgNavList } from '@gemeente-tilburg/components-angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description } from '../../storybook-shared/src/tilburg-nav-list.examples';

const meta: Meta<TilburgNavList> = {
  title: 'Tilburg Angular/Nav List',
  id: 'tilburg-nav-list-angular',
  component: TilburgNavList,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
  args: {
    items: [
      { label: 'Home', href: '#' },
      { label: 'Wonen', href: '#', current: true },
      { label: 'Parkeren', href: '#' },
      { label: 'Afval', href: '#' },
    ],
  },
  render: (args) => ({
    props: args,
    template: `<nav aria-label="Onderwerpen"><tilburg-nav-list [items]="items" [center]="center"></tilburg-nav-list></nav>`,
  }),
};

export default meta;
type Story = StoryObj<TilburgNavList>;

export const Default: Story = { name: 'Default', args: { center: false } };

export const Center: Story = { name: 'Center', args: { center: true } };
