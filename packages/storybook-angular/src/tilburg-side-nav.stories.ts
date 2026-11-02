/* @license CC0-1.0 */

import { TilburgSideNav } from '@gemeente-tilburg/components-angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description } from '../../storybook-shared/src/tilburg-side-nav.examples';

const meta: Meta<TilburgSideNav> = {
  title: 'Tilburg Angular/Side Nav',
  id: 'tilburg-side-nav-angular',
  component: TilburgSideNav,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
  render: (args) => ({
    props: args,
    template: `<tilburg-side-nav [items]="items"></tilburg-side-nav>`,
  }),
};

export default meta;
type Story = StoryObj<TilburgSideNav>;

export const Default: Story = {
  name: 'Default',
  args: {
    items: [
      { label: 'Afval', href: '#' },
      { label: 'Parkeren', href: '#', current: true },
      { label: 'Paspoort en ID-kaart', href: '#' },
      { label: 'Verhuizen', href: '#' },
    ],
  },
};

export const WithChildren: Story = {
  name: 'With children',
  args: {
    items: [
      { label: 'Afval', href: '#' },
      {
        label: 'Parkeren',
        href: '#',
        children: [
          { label: 'Bewonersvergunning', href: '#', current: true },
          { label: 'Bezoekersvergunning', href: '#' },
        ],
      },
      { label: 'Paspoort en ID-kaart', href: '#' },
    ],
  },
};
