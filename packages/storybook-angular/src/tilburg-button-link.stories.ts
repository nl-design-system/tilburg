/* @license CC0-1.0 */

import { TilburgButtonLink } from '@gemeente-tilburg/components-angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description } from '../../storybook-shared/src/tilburg-button-link.examples';

const meta: Meta<TilburgButtonLink> = {
  title: 'Tilburg Angular/Button Link',
  id: 'tilburg-button-link-angular',
  component: TilburgButtonLink,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
  argTypes: {
    appearance: {
      control: 'select',
      options: ['primary-action-button', 'secondary-action-button', 'subtle-button'],
    },
  },
};

export default meta;
type Story = StoryObj<TilburgButtonLink>;

export const PrimaryAction: Story = {
  name: 'Primary action',
  args: { appearance: 'primary-action-button' },
  render: (args) => ({
    props: args,
    template: `<a tilburg-button-link [appearance]="appearance" href="#">Nieuwe aanvraag starten</a>`,
  }),
};

export const SecondaryAction: Story = {
  name: 'Secondary action',
  args: { appearance: 'secondary-action-button' },
  render: (args) => ({
    props: args,
    template: `<a tilburg-button-link [appearance]="appearance" href="#">Meer informatie</a>`,
  }),
};

export const Subtle: Story = {
  name: 'Subtle',
  args: { appearance: 'subtle-button' },
  render: (args) => ({
    props: args,
    template: `<a tilburg-button-link [appearance]="appearance" href="#">Ga terug</a>`,
  }),
};

export const External: Story = {
  args: { appearance: 'primary-action-button' },
  render: (args) => ({
    props: args,
    template: `<a tilburg-button-link [appearance]="appearance" href="https://example.com" [external]="true">Open extern</a>`,
  }),
};
