/* @license CC0-1.0 */

import { TilburgTopNav } from '@gemeente-tilburg/components-angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description } from '../../storybook-shared/src/tilburg-top-nav.examples';

const meta: Meta<TilburgTopNav> = {
  title: 'Tilburg Angular/Top Nav',
  id: 'tilburg-top-nav-angular',
  component: TilburgTopNav,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj<TilburgTopNav>;

export const Default: Story = {
  name: 'Default',
  args: {
    items: [
      { label: 'Home', href: '#' },
      { label: 'Aanvragen', href: '#', current: true },
      { label: 'Mijn zaken', href: '#' },
      { label: 'Contact', href: '#' },
    ],
  },
  render: (args) => ({
    props: args,
    template: `<tilburg-top-nav [items]="items"></tilburg-top-nav>`,
  }),
};
