/* @license CC0-1.0 */

import { Alert } from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Tilburg React/Alert',
  id: 'tilburg-alert-react',
  component: Alert,
  tags: ['autodocs'],
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

const variants = ['info', 'success', 'warning', 'danger'] as const;

export const AllPermutations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <h4>Per variant — met titel (default icon per variant)</h4>
      {variants.map((v) => (
        <Alert key={v} variant={v} title={`${v.charAt(0).toUpperCase()}${v.slice(1)}`}>
          Dit is een {v}-melding voor de gebruiker.
        </Alert>
      ))}
      <h4>Per variant — zonder titel</h4>
      {variants.map((v) => (
        <Alert key={v} variant={v}>
          Korte melding ({v}).
        </Alert>
      ))}
      <h4>Closable (default × close icon)</h4>
      <Alert variant="info" title="Met sluit-knop" closable>
        Klik op het kruisje om te sluiten.
      </Alert>
      <h4>Custom icon override</h4>
      <Alert variant="info" title="Aangepast icoon" icon={<span aria-hidden="true">🛈</span>}>
        Pass icon-prop om het default-glyph te vervangen.
      </Alert>
      <h4>Heading-level varianten</h4>
      {([1, 2, 3, 4, 5, 6] as const).map((l) => (
        <Alert key={l} variant="info" title={`Heading level ${l}`} headingLevel={l}>
          Met headingLevel={l} wordt de titel als h{l} gerenderd.
        </Alert>
      ))}
    </div>
  ),
};

export const Info: Story = {
  render: () => (
    <Alert variant="info" title="Informatie">
      De openingstijden zijn gewijzigd.
    </Alert>
  ),
};

export const Success: Story = {
  render: () => (
    <Alert variant="success" title="Aanvraag verstuurd">
      U ontvangt binnen 8 weken een beslissing per e-mail.
    </Alert>
  ),
};

export const Warning: Story = {
  render: () => (
    <Alert variant="warning" title="Let op">
      De aanvraagperiode sluit over twee weken.
    </Alert>
  ),
};

export const Danger: Story = {
  render: () => (
    <Alert variant="danger" title="Er ging iets mis">
      Probeer het opnieuw of neem contact op met de gemeente.
    </Alert>
  ),
};

export const Closable: Story = {
  render: () => (
    <Alert variant="info" title="Met sluit-knop" closable>
      Klik op het kruisje om dit bericht te sluiten.
    </Alert>
  ),
};
