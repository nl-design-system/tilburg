/* @license CC0-1.0 */

import { TilburgWbcAlert } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-alert.examples';

/* Stencil `<tilburg-wbc-alert>` rendered through its generated React proxy.
   The custom elements themselves are registered once in `config/preview.tsx`
   (`defineCustomElements()`). */

const meta = {
  title: 'Tilburg Web Components/Alert',
  id: 'tilburg-alert-wbc',
  component: TilburgWbcAlert,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWbcAlert>;

export default meta;
type Story = StoryObj<typeof meta>;

const variants = ['info', 'success', 'warning', 'danger'] as const;

export const AllPermutations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <h4>Per variant — met titel (default icon per variant)</h4>
      {variants.map((v) => (
        <TilburgWbcAlert key={v} variant={v} heading={`${v.charAt(0).toUpperCase()}${v.slice(1)}`}>
          Dit is een {v}-melding voor de gebruiker.
        </TilburgWbcAlert>
      ))}
      <h4>Per variant — zonder titel</h4>
      {variants.map((v) => (
        <TilburgWbcAlert key={v} variant={v}>
          Korte melding ({v}).
        </TilburgWbcAlert>
      ))}
      <h4>Closable (default × close icon)</h4>
      <TilburgWbcAlert variant="info" heading="Met sluit-knop" closable>
        Klik op het kruisje om te sluiten.
      </TilburgWbcAlert>
      <h4>Custom icon (icon slot)</h4>
      <TilburgWbcAlert variant="info" heading="Aangepast icoon">
        <span slot="icon" aria-hidden="true">
          🛈
        </span>
        Vul de icon-slot om het default-glyph te vervangen.
      </TilburgWbcAlert>
      <h4>Heading-level varianten</h4>
      {([1, 2, 3, 4, 5, 6] as const).map((l) => (
        <TilburgWbcAlert key={l} variant="info" heading={`Heading level ${l}`} headingLevel={l}>
          Met heading-level={l} wordt de titel als h{l} gerenderd.
        </TilburgWbcAlert>
      ))}
    </div>
  ),
};

export const Info: Story = {
  render: () => (
    <TilburgWbcAlert variant="info" heading="Informatie">
      De openingstijden zijn gewijzigd.
    </TilburgWbcAlert>
  ),
};

export const Success: Story = {
  render: () => (
    <TilburgWbcAlert variant="success" heading="Aanvraag verstuurd">
      U ontvangt binnen 8 weken een beslissing per e-mail.
    </TilburgWbcAlert>
  ),
};

export const Warning: Story = {
  render: () => (
    <TilburgWbcAlert variant="warning" heading="Let op">
      De aanvraagperiode sluit over twee weken.
    </TilburgWbcAlert>
  ),
};

export const Danger: Story = {
  render: () => (
    <TilburgWbcAlert variant="danger" heading="Er ging iets mis" srPrefix="Fout:">
      Probeer het opnieuw of neem contact op met de gemeente.
    </TilburgWbcAlert>
  ),
};

export const Closable: Story = {
  render: () => (
    <TilburgWbcAlert
      variant="info"
      heading="Met sluit-knop"
      closable
      onTilburgClose={(event) => (event.target as HTMLElement).remove()}
    >
      Klik op het kruisje om dit bericht te sluiten.
    </TilburgWbcAlert>
  ),
};
