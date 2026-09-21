/* @license CC0-1.0 */

import { TilburgWebcAlert } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-alert.examples';

/* Stencil `<tilburg-webc-alert>` rendered through its generated React proxy.
   The custom elements themselves are registered once in `config/preview.tsx`
   (`defineCustomElements()`). */

const meta = {
  title: 'Tilburg Web Components/Alert',
  id: 'tilburg-alert-webc',
  component: TilburgWebcAlert,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWebcAlert>;

export default meta;
type Story = StoryObj<typeof meta>;

const variants = ['info', 'success', 'warning', 'danger'] as const;

export const AllPermutations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <h4>Per variant — met titel (default icon per variant)</h4>
      {variants.map((v) => (
        <TilburgWebcAlert key={v} variant={v} heading={`${v.charAt(0).toUpperCase()}${v.slice(1)}`}>
          Dit is een {v}-melding voor de gebruiker.
        </TilburgWebcAlert>
      ))}
      <h4>Per variant — zonder titel</h4>
      {variants.map((v) => (
        <TilburgWebcAlert key={v} variant={v}>
          Korte melding ({v}).
        </TilburgWebcAlert>
      ))}
      <h4>Closable (default × close icon)</h4>
      <TilburgWebcAlert variant="info" heading="Met sluit-knop" closable>
        Klik op het kruisje om te sluiten.
      </TilburgWebcAlert>
      <h4>Custom icon (icon slot)</h4>
      <TilburgWebcAlert variant="info" heading="Aangepast icoon">
        <span slot="icon" aria-hidden="true">
          🛈
        </span>
        Vul de icon-slot om het default-glyph te vervangen.
      </TilburgWebcAlert>
      <h4>Heading-level varianten</h4>
      {([1, 2, 3, 4, 5, 6] as const).map((l) => (
        <TilburgWebcAlert key={l} variant="info" heading={`Heading level ${l}`} headingLevel={l}>
          Met heading-level={l} wordt de titel als h{l} gerenderd.
        </TilburgWebcAlert>
      ))}
    </div>
  ),
};

export const Info: Story = {
  render: () => (
    <TilburgWebcAlert variant="info" heading="Informatie">
      De openingstijden zijn gewijzigd.
    </TilburgWebcAlert>
  ),
};

export const Success: Story = {
  render: () => (
    <TilburgWebcAlert variant="success" heading="Aanvraag verstuurd">
      U ontvangt binnen 8 weken een beslissing per e-mail.
    </TilburgWebcAlert>
  ),
};

export const Warning: Story = {
  render: () => (
    <TilburgWebcAlert variant="warning" heading="Let op">
      De aanvraagperiode sluit over twee weken.
    </TilburgWebcAlert>
  ),
};

export const Danger: Story = {
  render: () => (
    <TilburgWebcAlert variant="danger" heading="Er ging iets mis" srPrefix="Fout:">
      Probeer het opnieuw of neem contact op met de gemeente.
    </TilburgWebcAlert>
  ),
};

export const Closable: Story = {
  render: () => (
    <TilburgWebcAlert
      variant="info"
      heading="Met sluit-knop"
      closable
      onTilburgClose={(event) => (event.target as HTMLElement).remove()}
    >
      Klik op het kruisje om dit bericht te sluiten.
    </TilburgWebcAlert>
  ),
};
