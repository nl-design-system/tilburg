/* @license CC0-1.0 */

import { TilburgNavBar } from '@gemeente-tilburg/components-angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description } from '../../storybook-shared/src/tilburg-nav-bar.examples';

const meta: Meta<TilburgNavBar> = {
  title: 'Tilburg Angular/Nav Bar',
  id: 'tilburg-nav-bar-angular',
  component: TilburgNavBar,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj<TilburgNavBar>;

export const Default: Story = {
  name: 'Default',
  render: () => ({
    props: {
      items: [
        { label: 'Home', href: '#' },
        { label: 'Wonen', href: '#', current: true },
        { label: 'Parkeren', href: '#' },
        { label: 'Afval', href: '#' },
        { label: 'Werk en inkomen', href: '#' },
      ],
    },
    template: `<tilburg-nav-bar><tilburg-nav-list [items]="items"></tilburg-nav-list></tilburg-nav-bar>`,
  }),
};

export const Center: Story = {
  name: 'Center',
  render: () => ({
    props: {
      items: [
        { label: 'Inwoners', href: '#', current: true },
        { label: 'Ondernemers', href: '#' },
        { label: 'Bestuur', href: '#' },
      ],
    },
    template: `<tilburg-nav-bar><tilburg-nav-list [items]="items" [center]="true"></tilburg-nav-list></tilburg-nav-bar>`,
  }),
};
