/* @license CC0-1.0 */

import { Button, ButtonGroup } from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Tilburg React/Button Group',
  id: 'tilburg-button-group-react',
  component: ButtonGroup,
  tags: ['autodocs'],
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPermutations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <ButtonGroup aria-label="Twee acties">
        <Button appearance="primary-action-button">Opslaan</Button>
        <Button appearance="secondary-action-button">Annuleren</Button>
      </ButtonGroup>
      <ButtonGroup role="toolbar" aria-label="Toolbar">
        <Button appearance="subtle-button">Bold</Button>
        <Button appearance="subtle-button">Italic</Button>
        <Button appearance="subtle-button">Underline</Button>
      </ButtonGroup>
      <ButtonGroup aria-label="Drie acties met submit">
        <Button type="submit" appearance="primary-action-button">
          Verstuur
        </Button>
        <Button appearance="secondary-action-button">Opslaan</Button>
        <Button appearance="subtle-button">Annuleren</Button>
      </ButtonGroup>
    </div>
  ),
};
