/* @license CC0-1.0 */

import { TilburgWebcButton } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import type { ReactNode } from 'react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-button.examples';

const meta = {
  title: 'Tilburg Web Components/Button',
  id: 'tilburg-button-webc',
  component: TilburgWebcButton,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWebcButton>;

export default meta;
type Story = StoryObj<typeof meta>;

const Row = ({ label, children }: { label?: string; children: ReactNode }) => (
  <div style={{ alignItems: 'center', display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBlockEnd: '0.5rem' }}>
    {label && <span style={{ inlineSize: '14ch', fontFamily: 'monospace', fontSize: '0.85rem' }}>{label}</span>}
    {children}
  </div>
);

const sizes = ['small', 'medium', 'large'] as const;
const appearances = ['primary-action-button', 'secondary-action-button', 'subtle-button'] as const;

export const AllPermutations: Story = {
  render: () => (
    <div>
      <h4>By appearance × size</h4>
      {appearances.map((a) => (
        <Row key={a} label={a}>
          {sizes.map((s) => (
            <TilburgWebcButton key={s} size={s} appearance={a}>
              {s}
            </TilburgWebcButton>
          ))}
        </Row>
      ))}
      <h4>Disabled</h4>
      {appearances.map((a) => (
        <Row key={a} label={a}>
          {sizes.map((s) => (
            <TilburgWebcButton key={s} size={s} appearance={a} disabled>
              {s}
            </TilburgWebcButton>
          ))}
        </Row>
      ))}
      <h4>Pressed (aria-pressed=true)</h4>
      <Row label="pressed">
        {sizes.map((s) => (
          <TilburgWebcButton key={s} size={s} pressed>
            {s}
          </TilburgWebcButton>
        ))}
      </Row>
      <h4>Busy</h4>
      <Row label="busy">
        {sizes.map((s) => (
          <TilburgWebcButton key={s} size={s} busy>
            {s}
          </TilburgWebcButton>
        ))}
      </Row>
      <h4>type=&quot;submit&quot;</h4>
      <Row label="submit">
        <TilburgWebcButton type="submit">Verstuur</TilburgWebcButton>
      </Row>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Row>
      <TilburgWebcButton size="small">Small</TilburgWebcButton>
      <TilburgWebcButton size="medium">Medium</TilburgWebcButton>
      <TilburgWebcButton size="large">Large</TilburgWebcButton>
    </Row>
  ),
};

export const PrimaryAction: Story = {
  render: () => (
    <Row>
      {sizes.map((s) => (
        <TilburgWebcButton key={s} size={s} appearance="primary-action-button">
          {s}
        </TilburgWebcButton>
      ))}
    </Row>
  ),
};

export const SecondaryAction: Story = {
  render: () => (
    <Row>
      {sizes.map((s) => (
        <TilburgWebcButton key={s} size={s} appearance="secondary-action-button">
          {s}
        </TilburgWebcButton>
      ))}
    </Row>
  ),
};

export const Subtle: Story = {
  render: () => (
    <Row>
      {sizes.map((s) => (
        <TilburgWebcButton key={s} size={s} appearance="subtle-button">
          {s}
        </TilburgWebcButton>
      ))}
    </Row>
  ),
};

export const IconOnly: Story = {
  name: 'Icon only (title → aria-label)',
  render: () => (
    <TilburgWebcButton appearance="subtle-button" title="Sluiten">
      ×
    </TilburgWebcButton>
  ),
};
