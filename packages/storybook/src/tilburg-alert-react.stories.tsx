/* @license CC0-1.0 */

import { Alert, Paragraph } from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionReact } from '../../storybook-shared/src/tilburg-alert.examples';

const meta = {
  title: 'Tilburg React/Alert',
  id: 'tilburg-alert-react',
  component: Alert,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionReact } },
  },
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
          <Paragraph>Dit is een {v}-melding voor de gebruiker.</Paragraph>
        </Alert>
      ))}
      <h4>Per variant — zonder titel</h4>
      {variants.map((v) => (
        <Alert key={v} variant={v}>
          <Paragraph>Korte melding ({v}).</Paragraph>
        </Alert>
      ))}
      <h4>Closable (default × close icon)</h4>
      <Alert variant="info" title="Met sluit-knop" closable>
        <Paragraph>Klik op het kruisje om te sluiten.</Paragraph>
      </Alert>
      <h4>Custom icon override</h4>
      <Alert variant="info" title="Aangepast icoon" icon={<span aria-hidden="true">🛈</span>}>
        <Paragraph>Pass icon-prop om het default-glyph te vervangen.</Paragraph>
      </Alert>
      <h4>Heading-level varianten</h4>
      {([1, 2, 3, 4, 5, 6] as const).map((l) => (
        <Alert key={l} variant="info" title={`Heading level ${l}`} headingLevel={l}>
          <Paragraph>
            Met headingLevel={l} wordt de titel als h{l} gerenderd.
          </Paragraph>
        </Alert>
      ))}
    </div>
  ),
};

export const Info: Story = {
  render: () => (
    <Alert variant="info" title="Informatie">
      <Paragraph>De openingstijden zijn gewijzigd. Bekijk de actuele tijden op deze pagina.</Paragraph>
    </Alert>
  ),
};

export const Success: Story = {
  render: () => (
    <Alert variant="success" title="Aanvraag verstuurd">
      <Paragraph>Je ontvangt binnen 8 weken een beslissing per e-mail.</Paragraph>
    </Alert>
  ),
};

export const Warning: Story = {
  render: () => (
    <Alert variant="warning" title="Let op">
      <Paragraph>De aanvraagperiode sluit over twee weken.</Paragraph>
    </Alert>
  ),
};

export const Danger: Story = {
  render: () => (
    <Alert variant="danger" title="Er ging iets mis">
      <Paragraph>Probeer het opnieuw of neem contact op met de gemeente.</Paragraph>
    </Alert>
  ),
};

export const Closable: Story = {
  render: () => (
    <Alert variant="info" title="Informatie" closable closeButtonAriaLabel="Sluit alert">
      <Paragraph>Klik op het kruisje om dit bericht te sluiten.</Paragraph>
    </Alert>
  ),
};

export const MessageOnly: Story = {
  name: 'Message only (no title)',
  render: () => (
    <Alert variant="info">
      <Paragraph>Deze melding heeft geen titel — alleen een korte tekst.</Paragraph>
    </Alert>
  ),
};
