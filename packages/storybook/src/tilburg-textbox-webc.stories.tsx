/* @license CC0-1.0 */

import { TilburgWebcTextbox } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import type { ReactNode } from 'react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-textbox.examples';

/* Stencil `<tilburg-webc-textbox>` rendered through its generated React proxy.
   The custom elements themselves are registered once in `config/preview.tsx`
   (`defineCustomElements()`). */

const meta = {
  title: 'Tilburg Web Components/Textbox',
  id: 'tilburg-textbox-webc',
  component: TilburgWebcTextbox,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWebcTextbox>;

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
        <TilburgWebcTextbox name="x" placeholder="Vul iets in..." />
      </Row>
      <Row label="required">
        <TilburgWebcTextbox name="x" placeholder="Verplicht" required />
      </Row>
      <Row label="readonly">
        <TilburgWebcTextbox name="x" value="Alleen lezen" readonly />
      </Row>
      <Row label="disabled">
        <TilburgWebcTextbox name="x" placeholder="Uitgeschakeld" disabled />
      </Row>
      <Row label="invalid">
        <TilburgWebcTextbox name="x" value="bad value" invalid />
      </Row>
      <Row label="type=email">
        <TilburgWebcTextbox name="x" type="email" placeholder="naam@voorbeeld.nl" />
      </Row>
      <Row label="type=password">
        <TilburgWebcTextbox name="x" type="password" placeholder="••••••" />
      </Row>
      <Row label="type=tel">
        <TilburgWebcTextbox name="x" type="tel" placeholder="06-12345678" />
      </Row>
      <Row label="type=number">
        <TilburgWebcTextbox name="x" type="number" placeholder="0" />
      </Row>
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div style={{ maxWidth: '24rem' }}>
      <label className="utrecht-form-label" htmlFor="webc-email">
        E-mailadres
      </label>
      <TilburgWebcTextbox id="webc-email" name="email" type="email" placeholder="naam@voorbeeld.nl" required />
    </div>
  ),
};
