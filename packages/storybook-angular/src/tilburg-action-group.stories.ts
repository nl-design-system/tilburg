/* @license CC0-1.0 */

import { TilburgActionGroup } from '@gemeente-tilburg/components-angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description } from '../../storybook-shared/src/tilburg-action-group.examples';

const meta: Meta<TilburgActionGroup> = {
  title: 'Tilburg Angular/Action Group',
  id: 'tilburg-action-group-angular',
  component: TilburgActionGroup,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj<TilburgActionGroup>;

export const Row: Story = {
  name: 'Row (default)',
  render: () => ({
    template: `
      <tilburg-action-group ariaLabel="Formulierstappen">
        <tilburg-button appearance="primary-action-button" type="submit">Volgende stap</tilburg-button>
        <tilburg-link-button>Vorige stap</tilburg-link-button>
      </tilburg-action-group>
    `,
  }),
};

export const Column: Story = {
  render: () => ({
    template: `
      <tilburg-action-group direction="column" ariaLabel="Formulierstappen">
        <tilburg-button appearance="primary-action-button" type="submit">Volgende stap</tilburg-button>
        <tilburg-link-button [inline]="true">Later verder gaan</tilburg-link-button>
        <tilburg-link-button [inline]="true">Stoppen met dit formulier</tilburg-link-button>
      </tilburg-action-group>
    `,
  }),
};

export const ColumnStretch: Story = {
  name: 'Column, equal width',
  render: () => ({
    template: `
      <tilburg-action-group direction="column-stretch" ariaLabel="Formulierstappen">
        <tilburg-button appearance="primary-action-button" type="submit">Aanvraag versturen</tilburg-button>
        <tilburg-button appearance="secondary-action-button">Opslaan als concept</tilburg-button>
      </tilburg-action-group>
    `,
  }),
};
