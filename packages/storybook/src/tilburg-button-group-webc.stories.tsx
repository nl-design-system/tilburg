/* @license CC0-1.0 */

import { TilburgWebcButton, TilburgWebcButtonGroup } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-button-group.examples';

const meta = {
  title: 'Tilburg Web Components/Button Group',
  id: 'tilburg-button-group-webc',
  component: TilburgWebcButtonGroup,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWebcButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPermutations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <TilburgWebcButtonGroup aria-label="Twee acties">
        <TilburgWebcButton appearance="primary-action-button">Opslaan</TilburgWebcButton>
        <TilburgWebcButton appearance="secondary-action-button">Annuleren</TilburgWebcButton>
      </TilburgWebcButtonGroup>
      <TilburgWebcButtonGroup role="toolbar" aria-label="Toolbar">
        <TilburgWebcButton appearance="subtle-button">Bold</TilburgWebcButton>
        <TilburgWebcButton appearance="subtle-button">Italic</TilburgWebcButton>
        <TilburgWebcButton appearance="subtle-button">Underline</TilburgWebcButton>
      </TilburgWebcButtonGroup>
      <TilburgWebcButtonGroup aria-label="Drie acties met submit">
        <TilburgWebcButton type="submit" appearance="primary-action-button">
          Verstuur
        </TilburgWebcButton>
        <TilburgWebcButton appearance="secondary-action-button">Opslaan</TilburgWebcButton>
        <TilburgWebcButton appearance="subtle-button">Annuleren</TilburgWebcButton>
      </TilburgWebcButtonGroup>
    </div>
  ),
};
