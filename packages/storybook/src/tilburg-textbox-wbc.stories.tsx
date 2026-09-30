/* @license CC0-1.0 */

import { TilburgWbcTextbox } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import type { ReactNode } from 'react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-textbox.examples';

/* Stencil `<tilburg-wbc-textbox>` rendered through its generated React proxy.
   The custom elements themselves are registered once in `config/preview.tsx`
   (`defineCustomElements()`). */

const meta = {
  title: 'Tilburg Web Components/Textbox',
  id: 'tilburg-textbox-wbc',
  component: TilburgWbcTextbox,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWbcTextbox>;

export default meta;
type Story = StoryObj<typeof meta>;

const Row = ({ label, children }: { label: string; children: ReactNode }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
    <span style={{ inlineSize: '18ch', fontFamily: 'monospace', fontSize: '0.85rem' }}>{label}</span>
    <div style={{ flex: 1 }}>{children}</div>
  </div>
);

export const AllPermutations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <Row label="default">
        <TilburgWbcTextbox name="x" placeholder="Vul iets in..." />
      </Row>
      <Row label="required">
        <TilburgWbcTextbox name="x" placeholder="Verplicht" required />
      </Row>
      <Row label="readonly">
        <TilburgWbcTextbox name="x" value="Alleen lezen" readonly />
      </Row>
      <Row label="disabled">
        <TilburgWbcTextbox name="x" placeholder="Uitgeschakeld" disabled />
      </Row>
      <Row label="invalid">
        <TilburgWbcTextbox name="x" value="bad value" invalid />
      </Row>
      <Row label="type=email">
        <TilburgWbcTextbox name="x" type="email" placeholder="naam@voorbeeld.nl" />
      </Row>
      <Row label="type=password">
        <TilburgWbcTextbox name="x" type="password" placeholder="••••••" />
      </Row>
      <Row label="type=tel">
        <TilburgWbcTextbox name="x" type="tel" placeholder="06-12345678" />
      </Row>
      <Row label="type=number">
        <TilburgWbcTextbox name="x" type="number" placeholder="0" />
      </Row>
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div style={{ maxWidth: '24rem' }}>
      <label className="utrecht-form-label" htmlFor="wbc-email">
        E-mailadres
      </label>
      <TilburgWbcTextbox id="wbc-email" name="email" type="email" placeholder="naam@voorbeeld.nl" required />
    </div>
  ),
};
