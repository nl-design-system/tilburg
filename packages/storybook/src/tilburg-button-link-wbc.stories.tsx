/* @license CC0-1.0 */

import { TilburgWbcButtonLink } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import type { ReactNode } from 'react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-button-link.examples';

const meta = {
  title: 'Tilburg Web Components/Button Link',
  id: 'tilburg-button-link-wbc',
  component: TilburgWbcButtonLink,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWbcButtonLink>;

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
          <TilburgWbcButtonLink href="#" appearance={a}>
            Klik hier
          </TilburgWbcButtonLink>
        </Row>
      ))}
      <h4>External (auto rel)</h4>
      <Row label="external">
        <TilburgWbcButtonLink href="https://example.com" appearance="primary-action-button" external>
          Open extern
        </TilburgWbcButtonLink>
      </Row>
      <h4>Placeholder (aria-disabled)</h4>
      <Row label="placeholder">
        <TilburgWbcButtonLink href="#" appearance="primary-action-button" placeholder>
          Niet beschikbaar
        </TilburgWbcButtonLink>
      </Row>
    </div>
  ),
};

export const PrimaryAction: Story = {
  render: () => (
    <TilburgWbcButtonLink href="#" appearance="primary-action-button">
      Nieuwe aanvraag starten
    </TilburgWbcButtonLink>
  ),
};

export const SecondaryAction: Story = {
  render: () => (
    <TilburgWbcButtonLink href="#" appearance="secondary-action-button">
      Meer informatie
    </TilburgWbcButtonLink>
  ),
};

export const Subtle: Story = {
  render: () => (
    <TilburgWbcButtonLink href="#" appearance="subtle-button">
      Ga terug
    </TilburgWbcButtonLink>
  ),
};
