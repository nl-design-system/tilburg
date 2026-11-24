/* @license CC0-1.0 */

import { TilburgToptaskLink } from '@gemeente-tilburg/components-angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description, icons } from '../../storybook-shared/src/tilburg-toptask-link.examples';

const meta: Meta<TilburgToptaskLink> = {
  title: 'Tilburg Angular/Toptask Link',
  id: 'tilburg-toptask-link-angular',
  component: TilburgToptaskLink,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj<TilburgToptaskLink>;

const slotted = (svg: string) => svg.replace('<svg ', '<svg slot="icon" ');

export const Default: Story = {
  render: () => ({
    template: `<tilburg-toptask-link href="/afval">${slotted(icons.afval)}Afval</tilburg-toptask-link>`,
  }),
};

export const WithoutIcon: Story = {
  name: 'Without icon',
  render: () => ({ template: `<tilburg-toptask-link href="/afspraak-maken">Afspraak maken</tilburg-toptask-link>` }),
};
