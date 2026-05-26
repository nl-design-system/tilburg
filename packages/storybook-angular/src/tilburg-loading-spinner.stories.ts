/* @license CC0-1.0 */

import { TilburgLoadingSpinner } from '@gemeente-tilburg/components-angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description } from '../../storybook-shared/src/tilburg-loading-spinner.examples';

const meta: Meta<TilburgLoadingSpinner> = {
  title: 'Tilburg Angular/Loading Spinner',
  id: 'tilburg-loading-spinner-angular',
  component: TilburgLoadingSpinner,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj<TilburgLoadingSpinner>;

export const Visible: Story = {
  name: 'Visible overlay (title + message)',
  args: { visible: true, delayMs: 0, title: 'Bezig met laden', message: 'Een momentje alstublieft...' },
  render: (args) => ({
    props: args,
    template: `<tilburg-loading-spinner [visible]="visible" [delayMs]="delayMs" [title]="title" [message]="message"></tilburg-loading-spinner>`,
  }),
};

export const Immediate: Story = {
  args: { visible: true, delayMs: 0, title: 'Aan het laden', message: 'Even geduld...' },
  render: (args) => ({
    props: args,
    template: `<tilburg-loading-spinner [visible]="visible" [delayMs]="delayMs" [title]="title" [message]="message"></tilburg-loading-spinner>`,
  }),
};

export const Hidden: Story = {
  args: { visible: false },
  render: (args) => ({
    props: args,
    template: `<tilburg-loading-spinner [visible]="visible"></tilburg-loading-spinner>`,
  }),
};
