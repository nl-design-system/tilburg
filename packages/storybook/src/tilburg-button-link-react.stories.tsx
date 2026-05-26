/* @license CC0-1.0 */

import { ButtonLink } from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';
import type { ReactNode } from 'react';
import { bugs, description } from '../../storybook-shared/src/tilburg-button-link.examples';

const meta = {
  title: 'Tilburg React/Button Link',
  id: 'tilburg-button-link-react',
  component: ButtonLink,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
} satisfies Meta<typeof ButtonLink>;

export default meta;
type Story = StoryObj<typeof meta>;

const Row = ({ label, children }: { label?: string; children: ReactNode }) => (
  <div style={{ alignItems: 'center', display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBlockEnd: '0.5rem' }}>
    {label && <span style={{ inlineSize: '14ch', fontFamily: 'monospace', fontSize: '0.85rem' }}>{label}</span>}
    {children}
  </div>
);

const appearances = ['primary-action-button', 'secondary-action-button', 'subtle-button'] as const;

export const AllPermutations: Story = {
  render: () => (
    <div>
      <h4>Per appearance</h4>
      {appearances.map((a) => (
        <Row key={a} label={a}>
          <ButtonLink href="#" appearance={a}>
            Klik hier
          </ButtonLink>
        </Row>
      ))}
      <h4>External (auto rel)</h4>
      <Row label="external">
        <ButtonLink href="https://example.com" appearance="primary-action-button" external>
          Open extern
        </ButtonLink>
      </Row>
      <h4>Placeholder (aria-disabled)</h4>
      <Row label="placeholder">
        <ButtonLink href="#" appearance="primary-action-button" placeholder>
          Niet beschikbaar
        </ButtonLink>
      </Row>
    </div>
  ),
};

export const PrimaryAction: Story = {
  render: () => (
    <ButtonLink href="#" appearance="primary-action-button">
      Nieuwe aanvraag starten
    </ButtonLink>
  ),
};

export const SecondaryAction: Story = {
  render: () => (
    <ButtonLink href="#" appearance="secondary-action-button">
      Meer informatie
    </ButtonLink>
  ),
};

export const Subtle: Story = {
  render: () => (
    <ButtonLink href="#" appearance="subtle-button">
      Ga terug
    </ButtonLink>
  ),
};
