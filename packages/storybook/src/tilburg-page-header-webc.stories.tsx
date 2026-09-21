/* @license CC0-1.0 */

import { TilburgWebcButton, TilburgWebcPageHeader } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-page-header.examples';

/* Stencil `<tilburg-webc-page-header>` rendered through its generated React proxy.
   The custom elements themselves are registered once in `config/preview.tsx`
   (`defineCustomElements()`). */

const meta = {
  title: 'Tilburg Web Components/Page Header',
  id: 'tilburg-page-header-webc',
  component: TilburgWebcPageHeader,
  tags: ['autodocs'],
  parameters: {
    bugs,
    /* Matches the HTML/CSS reference story: rendered edge-to-edge without canvas padding. */
    layout: 'fullscreen',
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWebcPageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPermutations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <TilburgWebcPageHeader heading="Alleen titel" titleHref="/" />
      <TilburgWebcPageHeader heading="Met logo" logoSrc="/logo-on-dark.svg" logoAlt="" titleHref="/" />
      <TilburgWebcPageHeader heading="Met acties" titleHref="/">
        <TilburgWebcButton appearance="subtle-button">Inloggen</TilburgWebcButton>
      </TilburgWebcPageHeader>
      <TilburgWebcPageHeader heading="Met logo en acties" logoSrc="/logo-on-dark.svg" logoAlt="" titleHref="/">
        <TilburgWebcButton appearance="subtle-button">Inloggen</TilburgWebcButton>
        <TilburgWebcButton appearance="primary-action-button">Account</TilburgWebcButton>
      </TilburgWebcPageHeader>
    </div>
  ),
};
