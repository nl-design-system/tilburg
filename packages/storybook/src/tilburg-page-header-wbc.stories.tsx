/* @license CC0-1.0 */

import { TilburgWbcButton, TilburgWbcPageHeader } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-page-header.examples';

/* Stencil `<tilburg-wbc-page-header>` rendered through its generated React proxy.
   The custom elements themselves are registered once in `config/preview.tsx`
   (`defineCustomElements()`). */

const meta = {
  title: 'Tilburg Web Components/Page Header',
  id: 'tilburg-page-header-wbc',
  component: TilburgWbcPageHeader,
  tags: ['autodocs', 'tilburg'],
  parameters: {
    bugs,
    /* Matches the HTML/CSS reference story: rendered edge-to-edge without canvas padding. */
    layout: 'fullscreen',
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWbcPageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPermutations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <TilburgWbcPageHeader heading="Alleen titel" titleHref="/" />
      <TilburgWbcPageHeader heading="Met logo" logoSrc="/logo-on-dark.svg" logoAlt="" titleHref="/" />
      <TilburgWbcPageHeader heading="Met acties" titleHref="/">
        <TilburgWbcButton appearance="subtle-button">Inloggen</TilburgWbcButton>
      </TilburgWbcPageHeader>
      <TilburgWbcPageHeader heading="Met logo en acties" logoSrc="/logo-on-dark.svg" logoAlt="" titleHref="/">
        <TilburgWbcButton appearance="subtle-button">Inloggen</TilburgWbcButton>
        <TilburgWbcButton appearance="primary-action-button">Account</TilburgWbcButton>
      </TilburgWbcPageHeader>
    </div>
  ),
};
