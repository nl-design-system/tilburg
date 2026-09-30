/* @license CC0-1.0 */

import { TilburgButtonGroup } from '@gemeente-tilburg/components-angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description } from '../../storybook-shared/src/tilburg-button-group.examples';

const meta: Meta<TilburgButtonGroup> = {
  title: 'Tilburg Angular/Button Group',
  id: 'tilburg-button-group-angular',
  component: TilburgButtonGroup,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj<TilburgButtonGroup>;

export const Default: Story = {
  name: 'Primary + secondary',
  render: () => ({
    template: `
      <tilburg-button-group ariaLabel="Aanvraag verzenden">
        <tilburg-button appearance="primary-action-button">Bevestigen</tilburg-button>
        <tilburg-button appearance="secondary-action-button">Annuleren</tilburg-button>
      </tilburg-button-group>
    `,
  }),
};

export const Three: Story = {
  name: 'Three buttons',
  render: () => ({
    template: `
      <tilburg-button-group ariaLabel="Bestand">
        <tilburg-button appearance="primary-action-button">Opslaan</tilburg-button>
        <tilburg-button appearance="secondary-action-button">Concept</tilburg-button>
        <tilburg-button appearance="subtle-button">Annuleren</tilburg-button>
      </tilburg-button-group>
    `,
  }),
};

export const Toolbar: Story = {
  render: () => ({
    template: `
      <tilburg-button-group role="toolbar" ariaLabel="Tekst-opmaak">
        <tilburg-button appearance="subtle-button">Bold</tilburg-button>
        <tilburg-button appearance="subtle-button">Italic</tilburg-button>
        <tilburg-button appearance="subtle-button">Underline</tilburg-button>
      </tilburg-button-group>
    `,
  }),
};
