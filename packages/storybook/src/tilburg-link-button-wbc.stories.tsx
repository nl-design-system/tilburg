/* @license CC0-1.0 */

import { TilburgWbcLinkButton } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-link-button.examples';

/* Stencil `<tilburg-wbc-link-button>` rendered through its generated React proxy.
   The custom elements themselves are registered once in `config/preview.tsx`
   (`defineCustomElements()`). */

const meta = {
  title: 'Tilburg Web Components/Link Button',
  id: 'tilburg-link-button-wbc',
  component: TilburgWbcLinkButton,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWbcLinkButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPermutations: Story = {
  render: () => (
    <>
      <p className="utrecht-paragraph">
        <TilburgWbcLinkButton>Vorige stap</TilburgWbcLinkButton>
      </p>
      <p className="utrecht-paragraph">
        Klopt uw adres niet? <TilburgWbcLinkButton inline>Wijzig uw adres</TilburgWbcLinkButton> voordat u verdergaat.
      </p>
      <p className="utrecht-paragraph">
        <TilburgWbcLinkButton inline pressed={false}>
          Toon details
        </TilburgWbcLinkButton>{' '}
        <TilburgWbcLinkButton inline pressed>
          Verberg details
        </TilburgWbcLinkButton>
      </p>
      <p className="utrecht-paragraph">
        <TilburgWbcLinkButton disabled>Vorige stap (disabled)</TilburgWbcLinkButton>
      </p>
    </>
  ),
};
