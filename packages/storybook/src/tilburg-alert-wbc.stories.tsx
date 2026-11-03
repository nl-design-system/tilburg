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
          <p className="utrecht-paragraph">Dit is een {v}-melding voor de gebruiker.</p>
        </TilburgWbcAlert>
      ))}
      <h4>Per variant — zonder titel</h4>
      {variants.map((v) => (
        <TilburgWbcAlert key={v} variant={v}>
          <p className="utrecht-paragraph">Korte melding ({v}).</p>
        </TilburgWbcAlert>
      ))}
      <h4>Closable (default × close icon)</h4>
      <TilburgWbcAlert variant="info" heading="Met sluit-knop" closable>
        <p className="utrecht-paragraph">Klik op het kruisje om te sluiten.</p>
      </TilburgWbcAlert>
      <h4>Custom icon (icon slot)</h4>
      <TilburgWbcAlert variant="info" heading="Aangepast icoon">
        <span slot="icon" aria-hidden="true">
          🛈
        </span>
        <p className="utrecht-paragraph">Vul de icon-slot om het default-glyph te vervangen.</p>
      </TilburgWbcAlert>
      <h4>Heading-level varianten</h4>
      {([1, 2, 3, 4, 5, 6] as const).map((l) => (
        <TilburgWbcAlert key={l} variant="info" heading={`Heading level ${l}`} headingLevel={l}>
          <p className="utrecht-paragraph">
            Met heading-level={l} wordt de titel als h{l} gerenderd.
          </p>
        </TilburgWbcAlert>
      ))}
    </div>
  ),
};

export const Info: Story = {
  render: () => (
    <TilburgWbcAlert variant="info" heading="Informatie">
      <p className="utrecht-paragraph">De openingstijden zijn gewijzigd. Bekijk de actuele tijden op deze pagina.</p>
    </TilburgWbcAlert>
  ),
};

export const Success: Story = {
  render: () => (
    <TilburgWbcAlert variant="success" heading="Aanvraag verstuurd">
      <p className="utrecht-paragraph">Je ontvangt binnen 8 weken een beslissing per e-mail.</p>
    </TilburgWbcAlert>
  ),
};

export const Warning: Story = {
  render: () => (
    <TilburgWbcAlert variant="warning" heading="Let op">
      <p className="utrecht-paragraph">De aanvraagperiode sluit over twee weken.</p>
    </TilburgWbcAlert>
  ),
};

export const Danger: Story = {
  render: () => (
    <TilburgWbcAlert variant="danger" heading="Er ging iets mis">
      <p className="utrecht-paragraph">Probeer het opnieuw of neem contact op met de gemeente.</p>
    </TilburgWbcAlert>
  ),
};

export const Closable: Story = {
  render: () => (
    <TilburgWbcAlert
      variant="info"
      heading="Informatie"
      closable
      closeButtonAriaLabel="Sluit alert"
      onTilburgClose={(event) => (event.target as HTMLElement).remove()}
    >
      <p className="utrecht-paragraph">Klik op het kruisje om dit bericht te sluiten.</p>
    </TilburgWbcAlert>
  ),
};

export const MessageOnly: Story = {
  name: 'Message only (no title)',
  render: () => (
    <TilburgWbcAlert variant="info">
      <p className="utrecht-paragraph">Deze melding heeft geen titel — alleen een korte tekst.</p>
    </TilburgWbcAlert>
  ),
};
