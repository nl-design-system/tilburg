/* @license CC0-1.0 */

import { ActionGroup, Button, LinkButton } from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionReact } from '../../storybook-shared/src/tilburg-action-group.examples';

const meta = {
  title: 'Tilburg React/Action Group',
  id: 'tilburg-action-group-react',
  component: ActionGroup,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionReact } },
  },
} satisfies Meta<typeof ActionGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Row: Story = {
  render: () => (
    <ActionGroup aria-label="Formulierstappen">
      <Button appearance="primary-action-button" type="submit">
        Volgende stap
      </Button>
      <LinkButton>Vorige stap</LinkButton>
    </ActionGroup>
  ),
};

export const Column: Story = {
  render: () => (
    <ActionGroup direction="column" aria-label="Formulierstappen">
      <Button appearance="primary-action-button" type="submit">
        Volgende stap
      </Button>
      <LinkButton inline>Later verder gaan</LinkButton>
      <LinkButton inline>Stoppen met dit formulier</LinkButton>
    </ActionGroup>
  ),
};

export const ColumnStretch: Story = {
  name: 'Column, equal width',
  render: () => (
    <ActionGroup direction="column-stretch" aria-label="Formulierstappen">
      <Button appearance="primary-action-button" type="submit">
        Aanvraag versturen
      </Button>
      <Button appearance="secondary-action-button">Opslaan als concept</Button>
    </ActionGroup>
  ),
};
