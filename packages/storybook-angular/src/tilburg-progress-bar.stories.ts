/* @license CC0-1.0 */

import { TilburgProgressBar } from '@gemeente-tilburg/components-angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description } from '../../storybook-shared/src/tilburg-progress-bar.examples';

const meta: Meta<TilburgProgressBar> = {
  title: 'Tilburg Angular/Progress Bar',
  id: 'tilburg-progress-bar-angular',
  component: TilburgProgressBar,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj<TilburgProgressBar>;

export const Quarter: Story = {
  name: '25% complete',
  args: { value: 1, total: 4, title: 'Persoonlijke gegevens', label: 'Stap 1 van 4' },
  render: (args) => ({
    props: args,
    template: `<tilburg-progress-bar [value]="value" [total]="total" [title]="title" [label]="label"></tilburg-progress-bar>`,
  }),
};

export const Half: Story = {
  name: '50% complete',
  args: { value: 2, total: 4, title: 'Adresgegevens', label: 'Stap 2 van 4' },
  render: (args) => ({
    props: args,
    template: `<tilburg-progress-bar [value]="value" [total]="total" [title]="title" [label]="label"></tilburg-progress-bar>`,
  }),
};

export const ThreeQuarter: Story = {
  name: '75% complete',
  args: { value: 3, total: 4, title: 'Bevestiging', label: 'Stap 3 van 4' },
  render: (args) => ({
    props: args,
    template: `<tilburg-progress-bar [value]="value" [total]="total" [title]="title" [label]="label"></tilburg-progress-bar>`,
  }),
};

export const Complete: Story = {
  name: '100% complete',
  args: { value: 4, total: 4, title: 'Klaar', label: 'Stap 4 van 4' },
  render: (args) => ({
    props: args,
    template: `<tilburg-progress-bar [value]="value" [total]="total" [title]="title" [label]="label"></tilburg-progress-bar>`,
  }),
};

export const WithBackLink: Story = {
  name: 'With back link',
  args: {
    value: 2,
    total: 4,
    title: 'Adresgegevens',
    label: 'Stap 2 van 4',
    showBack: true,
    backLabel: 'Vorige stap',
  },
  render: (args) => ({
    props: args,
    template: `<tilburg-progress-bar [value]="value" [total]="total" [title]="title" [label]="label" [showBack]="showBack" [backLabel]="backLabel"><span slot="back-icon" aria-hidden="true">&larr;</span></tilburg-progress-bar>`,
  }),
};

export const Default: Story = {
  args: { value: 2, total: 5, title: 'Stap 2 van 5', label: 'Persoonlijke gegevens' },
  render: (args) => ({
    props: args,
    template: `<tilburg-progress-bar [value]="value" [total]="total" [title]="title" [label]="label"></tilburg-progress-bar>`,
  }),
};
