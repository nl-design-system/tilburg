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

const Close = () => <span aria-hidden="true">×</span>;
const Info = () => <span aria-hidden="true">ℹ</span>;
const Check = () => <span aria-hidden="true">✓</span>;
const Bang = () => <span aria-hidden="true">!</span>;
const Cross = () => <span aria-hidden="true">✕</span>;

const variants = ['info', 'success', 'warning', 'danger'] as const;
const ICONS = { info: <Info />, success: <Check />, warning: <Bang />, danger: <Cross /> } as const;

export const AllPermutations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <h4>Per variant — met titel</h4>
      {variants.map((v) => (
        <Alert key={v} variant={v} title={`${v.charAt(0).toUpperCase()}${v.slice(1)}`} icon={ICONS[v]}>
          Dit is een {v}-melding voor de gebruiker.
        </Alert>
      ))}
      <h4>Per variant — zonder titel</h4>
      {variants.map((v) => (
        <Alert key={v} variant={v} icon={ICONS[v]}>
          Korte melding ({v}).
        </Alert>
      ))}
      <h4>Closable</h4>
      <Alert variant="info" title="Met sluit-knop" closable closeIcon={<Close />} icon={<Info />}>
        Klik op het kruisje om te sluiten.
      </Alert>
      <h4>Heading-level varianten</h4>
      {([1, 2, 3, 4, 5, 6] as const).map((l) => (
        <Alert key={l} variant="info" title={`Heading level ${l}`} headingLevel={l} icon={<Info />}>
          Met headingLevel={l} wordt de titel als h{l} gerenderd.
        </Alert>
      ))}
    </div>
  ),
};

export const Info_: Story = {
  name: 'Info',
  render: () => (
    <Alert variant="info" title="Informatie" icon={<Info />}>
      Een informatief bericht.
    </Alert>
  ),
};
export const Success: Story = {
  render: () => (
    <Alert variant="success" title="Gelukt" icon={<Check />}>
      Het is gelukt.
    </Alert>
  ),
};
export const Warning: Story = {
  render: () => (
    <Alert variant="warning" title="Let op" icon={<Bang />}>
      Een waarschuwing.
    </Alert>
  ),
};
export const Danger: Story = {
  render: () => (
    <Alert variant="danger" title="Fout" icon={<Cross />}>
      Er ging iets mis.
    </Alert>
  ),
};
