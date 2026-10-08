/* @license CC0-1.0 */

import { TilburgWbcButton, TilburgWbcButtonGroup } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-button-group.examples';

const meta = {
  title: 'Tilburg Web Components/Button Group',
  id: 'tilburg-button-group-wbc',
  component: TilburgWbcButtonGroup,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWbcButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPermutations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <TilburgWbcButtonGroup aria-label="Twee acties">
        <TilburgWbcButton appearance="primary-action-button">Opslaan</TilburgWbcButton>
        <TilburgWbcButton appearance="secondary-action-button">Annuleren</TilburgWbcButton>
      </TilburgWbcButtonGroup>
      <TilburgWbcButtonGroup role="toolbar" aria-label="Toolbar">
        <TilburgWbcButton appearance="subtle-button">Bold</TilburgWbcButton>
        <TilburgWbcButton appearance="subtle-button">Italic</TilburgWbcButton>
        <TilburgWbcButton appearance="subtle-button">Underline</TilburgWbcButton>
      </TilburgWbcButtonGroup>
      <TilburgWbcButtonGroup aria-label="Drie acties met submit">
        <TilburgWbcButton type="submit" appearance="primary-action-button">
          Verstuur
        </TilburgWbcButton>
        <TilburgWbcButton appearance="secondary-action-button">Opslaan</TilburgWbcButton>
        <TilburgWbcButton appearance="subtle-button">Annuleren</TilburgWbcButton>
      </TilburgWbcButtonGroup>
    </div>
  ),
};
