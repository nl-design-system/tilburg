/* @license CC0-1.0 */

import { Button } from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';
import type { ReactNode } from 'react';

const meta = {
  title: 'Tilburg React/Button',
  id: 'tilburg-button-react',
  component: Button,
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

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
      <h4>Default (no appearance)</h4>
      <Row label="default">
        {sizes.map((s) => (
          <Button key={s} size={s}>
            {s}
          </Button>
        ))}
      </Row>
      <h4>By appearance × size</h4>
      {appearances.map((a) => (
        <Row key={a} label={a}>
          {sizes.map((s) => (
            <Button key={s} size={s} appearance={a}>
              {s}
            </Button>
          ))}
        </Row>
      ))}
      <h4>Disabled</h4>
      {appearances.map((a) => (
        <Row key={a} label={a}>
          {sizes.map((s) => (
            <Button key={s} size={s} appearance={a} disabled>
              {s}
            </Button>
          ))}
        </Row>
      ))}
      <h4>Pressed (aria-pressed=true)</h4>
      <Row label="pressed">
        {sizes.map((s) => (
          <Button key={s} size={s} appearance="primary-action-button" pressed>
            {s}
          </Button>
        ))}
      </Row>
      <h4>Busy</h4>
      <Row label="busy">
        {sizes.map((s) => (
          <Button key={s} size={s} appearance="primary-action-button" busy>
            {s}
          </Button>
        ))}
      </Row>
      <h4>type=&quot;submit&quot;</h4>
      <Row label="submit">
        <Button type="submit" appearance="primary-action-button">
          Verstuur
        </Button>
      </Row>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Row>
      <Button size="small">Small</Button>
      <Button size="medium">Medium</Button>
      <Button size="large">Large</Button>
    </Row>
  ),
};

export const PrimaryAction: Story = {
  render: () => (
    <Row>
      <Button size="small" appearance="primary-action-button">
        Small
      </Button>
      <Button size="medium" appearance="primary-action-button">
        Medium
      </Button>
      <Button size="large" appearance="primary-action-button">
        Large
      </Button>
    </Row>
  ),
};

export const SecondaryAction: Story = {
  render: () => (
    <Row>
      <Button size="small" appearance="secondary-action-button">
        Small
      </Button>
      <Button size="medium" appearance="secondary-action-button">
        Medium
      </Button>
      <Button size="large" appearance="secondary-action-button">
        Large
      </Button>
    </Row>
  ),
};

export const Subtle: Story = {
  render: () => (
    <Row>
      <Button size="small" appearance="subtle-button">
        Small
      </Button>
      <Button size="medium" appearance="subtle-button">
        Medium
      </Button>
      <Button size="large" appearance="subtle-button">
        Large
      </Button>
    </Row>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Row>
      <Button size="small" appearance="primary-action-button" disabled>
        Small
      </Button>
      <Button size="medium" appearance="primary-action-button" disabled>
        Medium
      </Button>
      <Button size="large" appearance="primary-action-button" disabled>
        Large
      </Button>
    </Row>
  ),
};
