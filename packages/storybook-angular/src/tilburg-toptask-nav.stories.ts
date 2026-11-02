/* @license CC0-1.0 */

import { TilburgToptaskNav } from '@gemeente-tilburg/components-angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { tasks } from '../../storybook-shared/src/tilburg-toptask-link.examples';
import { bugs, description } from '../../storybook-shared/src/tilburg-toptask-nav.examples';

const meta: Meta<TilburgToptaskNav> = {
  title: 'Tilburg Angular/Toptask Nav',
  id: 'tilburg-toptask-nav-angular',
  component: TilburgToptaskNav,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj<TilburgToptaskNav>;

const links = tasks
  .map(
    ([href, title, icon]) =>
      `<tilburg-toptask-link href="${href}">${icon.replace('<svg ', '<svg slot="icon" ')}${title}</tilburg-toptask-link>`,
  )
  .join('\n');

export const Grid: Story = {
  render: () => ({ template: `<tilburg-toptask-nav [grid]="true">${links}</tilburg-toptask-nav>` }),
};

export const Stacked: Story = {
  render: () => ({
    template: `<div style="max-inline-size:20rem"><tilburg-toptask-nav>${links}</tilburg-toptask-nav></div>`,
  }),
};
