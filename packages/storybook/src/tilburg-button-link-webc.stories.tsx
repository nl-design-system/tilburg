/* @license CC0-1.0 */

import { TilburgWebcButtonLink } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import type { ReactNode } from 'react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-button-link.examples';

const meta = {
  title: 'Tilburg Web Components/Button Link',
  id: 'tilburg-button-link-webc',
  component: TilburgWebcButtonLink,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWebcButtonLink>;

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
          <TilburgWebcButtonLink href="#" appearance={a}>
            Klik hier
          </TilburgWebcButtonLink>
        </Row>
      ))}
      <h4>External (auto rel)</h4>
      <Row label="external">
        <TilburgWebcButtonLink href="https://example.com" appearance="primary-action-button" external>
          Open extern
        </TilburgWebcButtonLink>
      </Row>
      <h4>Placeholder (aria-disabled)</h4>
      <Row label="placeholder">
        <TilburgWebcButtonLink href="#" appearance="primary-action-button" placeholder>
          Niet beschikbaar
        </TilburgWebcButtonLink>
      </Row>
    </div>
  ),
};

export const PrimaryAction: Story = {
  render: () => (
    <TilburgWebcButtonLink href="#" appearance="primary-action-button">
      Nieuwe aanvraag starten
    </TilburgWebcButtonLink>
  ),
};

export const SecondaryAction: Story = {
  render: () => (
    <TilburgWebcButtonLink href="#" appearance="secondary-action-button">
      Meer informatie
    </TilburgWebcButtonLink>
  ),
};

export const Subtle: Story = {
  render: () => (
    <TilburgWebcButtonLink href="#" appearance="subtle-button">
      Ga terug
    </TilburgWebcButtonLink>
  ),
};
