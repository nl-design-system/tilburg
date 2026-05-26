/* @license CC0-1.0 */

import { Textbox } from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';
import type { ReactNode } from 'react';
import { bugs, description } from '../../storybook-shared/src/tilburg-textbox.examples';

const meta = {
  title: 'Tilburg React/Textbox',
  id: 'tilburg-textbox-react',
  component: Textbox,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
} satisfies Meta<typeof Textbox>;

export default meta;
type Story = StoryObj<typeof meta>;

const Row = ({ label, children }: { label: string; children: ReactNode }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
    <span style={{ inlineSize: '18ch', fontFamily: 'monospace', fontSize: '0.85rem' }}>{label}</span>
    {children}
  </div>
);

export const AllPermutations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <Row label="default">
        <Textbox name="x" placeholder="Vul iets in..." />
      </Row>
      <Row label="required">
        <Textbox name="x" placeholder="Verplicht" required />
      </Row>
      <Row label="readOnly">
        <Textbox name="x" defaultValue="Alleen lezen" readOnly />
      </Row>
      <Row label="disabled">
        <Textbox name="x" placeholder="Uitgeschakeld" disabled />
      </Row>
      <Row label="invalid">
        <Textbox name="x" defaultValue="bad value" invalid />
      </Row>
      <Row label="type=email">
        <Textbox name="x" type="email" placeholder="naam@voorbeeld.nl" />
      </Row>
      <Row label="type=password">
        <Textbox name="x" type="password" placeholder="••••••" />
      </Row>
      <Row label="type=tel">
        <Textbox name="x" type="tel" placeholder="06-12345678" />
      </Row>
      <Row label="type=number">
        <Textbox name="x" type="number" placeholder="0" />
      </Row>
    </div>
  ),
};
