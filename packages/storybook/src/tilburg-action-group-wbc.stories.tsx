/* @license CC0-1.0 */

import { TilburgWbcActionGroup, TilburgWbcButton, TilburgWbcLinkButton } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-action-group.examples';

/* Stencil `<tilburg-wbc-action-group>` rendered through its generated React proxy.
   The custom elements themselves are registered once in `config/preview.tsx`
   (`defineCustomElements()`). */

const meta = {
  title: 'Tilburg Web Components/Action Group',
  id: 'tilburg-action-group-wbc',
  component: TilburgWbcActionGroup,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWbcActionGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPermutations: Story = {
  render: () => (
    <>
      <TilburgWbcActionGroup aria-label="Formulierstappen">
        <TilburgWbcButton appearance="primary-action-button" type="submit">
          Volgende stap
        </TilburgWbcButton>
        <TilburgWbcLinkButton>Vorige stap</TilburgWbcLinkButton>
      </TilburgWbcActionGroup>
      <TilburgWbcActionGroup direction="column" aria-label="Formulierstappen">
        <TilburgWbcButton appearance="primary-action-button" type="submit">
          Volgende stap
        </TilburgWbcButton>
        <TilburgWbcLinkButton inline>Later verder gaan</TilburgWbcLinkButton>
        <TilburgWbcLinkButton inline>Stoppen met dit formulier</TilburgWbcLinkButton>
      </TilburgWbcActionGroup>
      <TilburgWbcActionGroup direction="column-stretch" aria-label="Formulierstappen">
        <TilburgWbcButton appearance="primary-action-button" type="submit">
          Aanvraag versturen
        </TilburgWbcButton>
        <TilburgWbcButton appearance="secondary-action-button">Opslaan als concept</TilburgWbcButton>
      </TilburgWbcActionGroup>
    </>
  ),
};
