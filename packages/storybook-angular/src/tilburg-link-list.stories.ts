/* @license CC0-1.0 */

import { TilburgLinkList } from '@gemeente-tilburg/components-angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description } from '../../storybook-shared/src/tilburg-link-list.examples';

const meta: Meta<TilburgLinkList> = {
  title: 'Tilburg Angular/Link List',
  id: 'tilburg-link-list-angular',
  component: TilburgLinkList,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
  /* An explicit template: without one the built Storybook cannot derive the selector and renders nothing. */
  render: (args) => ({
    props: args,
    template: `<tilburg-link-list [links]="links" [ariaLabel]="ariaLabel"></tilburg-link-list>`,
  }),
};

export default meta;
type Story = StoryObj<TilburgLinkList>;

export const Default: Story = {
  args: {
    ariaLabel: 'Meer over afval',
    links: [
      { label: 'Afvalkalender', href: '/afval/afvalkalender' },
      { label: 'Grofvuil laten ophalen', href: '/afval/grofvuil' },
      { label: 'Afvalscheiding in Nederland', href: 'https://www.milieucentraal.nl', external: true },
    ],
  },
};

export const Current: Story = {
  name: 'With the current page',
  args: {
    ariaLabel: 'Parkeren',
    links: [
      { label: 'Parkeervergunning aanvragen', href: '/parkeren/vergunning', current: 'page' },
      { label: 'Bezoekersparkeren', href: '/parkeren/bezoekers' },
      { label: 'Parkeergarages in het centrum', href: '/parkeren/garages' },
    ],
  },
};
