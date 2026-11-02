/* @license CC0-1.0 */

import { LinkList } from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionReact } from '../../storybook-shared/src/tilburg-link-list.examples';

const meta = {
  title: 'Tilburg React/Link List',
  id: 'tilburg-link-list-react',
  component: LinkList,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionReact } },
  },
} satisfies Meta<typeof LinkList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    'aria-label': 'Meer over afval',
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
    'aria-label': 'Parkeren',
    links: [
      { label: 'Parkeervergunning aanvragen', href: '/parkeren/vergunning', current: 'page' },
      { label: 'Bezoekersparkeren', href: '/parkeren/bezoekers' },
      { label: 'Parkeergarages in het centrum', href: '/parkeren/garages' },
    ],
  },
};
