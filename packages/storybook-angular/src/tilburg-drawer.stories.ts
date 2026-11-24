/* @license CC0-1.0 */

import { TilburgDrawer } from '@gemeente-tilburg/components-angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description } from '../../storybook-shared/src/tilburg-drawer.examples';

const meta: Meta<TilburgDrawer> = {
  title: 'Tilburg Angular/Drawer',
  id: 'tilburg-drawer-angular',
  component: TilburgDrawer,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj<TilburgDrawer>;

/* Same content as the HTML/CSS reference examples, behind a trigger button:
   a drawer that opens by itself would cover the autodocs page. */
const demo = (align: string) => ({
  props: { open: false },
  template: `
    <tilburg-button appearance="secondary-action-button" (click)="open = true">Menu</tilburg-button>
    <tilburg-drawer align="${align}" ariaLabelledBy="drawer-angular-${align}-title" [(open)]="open">
      <h2 class="utrecht-heading-2" id="drawer-angular-${align}-title">Menu</h2>
      <ul class="utrecht-unordered-list">
        <li class="utrecht-unordered-list__item"><tilburg-link href="#">Afval</tilburg-link></li>
        <li class="utrecht-unordered-list__item"><tilburg-link href="#">Parkeren</tilburg-link></li>
        <li class="utrecht-unordered-list__item"><tilburg-link href="#">Paspoort en ID-kaart</tilburg-link></li>
      </ul>
      <tilburg-button appearance="secondary-action-button" (click)="open = false">Sluiten</tilburg-button>
    </tilburg-drawer>`,
});

export const Default: Story = {
  name: 'Inline start (default)',
  render: () => demo('inline-start'),
};

export const InlineEnd: Story = {
  name: 'Inline end',
  render: () => demo('inline-end'),
};

export const BlockStart: Story = {
  name: 'Block start',
  render: () => demo('block-start'),
};

export const BlockEnd: Story = {
  name: 'Block end',
  render: () => demo('block-end'),
};
