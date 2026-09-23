/* @license CC0-1.0 */

import { TilburgWbcCombobox } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-combobox.examples';

/* Stencil `<tilburg-wbc-combobox>` rendered through its generated React
   proxy. The proxy sets `items` / `value` as properties; the component keeps
   its own `value` and reports it through `tilburgChange` (`onTilburgChange`).
   The stories mirror it into React state only to show the current value. */

const meta = {
  title: 'Tilburg Web Components/Combobox',
  id: 'tilburg-combobox-wbc',
  component: TilburgWbcCombobox,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWbcCombobox>;

export default meta;
type Story = StoryObj<typeof meta>;

const contactOptions = [
  { value: 'email', label: 'E-mail' },
  { value: 'post', label: 'Per post' },
  { value: 'balie', label: 'Ophalen bij de balie' },
];

const documentOptions = [
  { value: 'paspoort', label: 'Paspoort' },
  { value: 'geboorteakte', label: 'Geboorteakte' },
  { value: 'rijbewijs', label: 'Rijbewijs' },
  { value: 'verblijfsdocument', label: 'Verblijfsdocument' },
];

const column = { display: 'flex', flexDirection: 'column', gap: '0.5rem', maxWidth: '24rem' } as const;

export const Normal: Story = {
  name: 'Normal (single-value)',
  render: () => {
    const [value, setValue] = useState<unknown>('email');
    return (
      <div style={column}>
        <label className="utrecht-form-label" htmlFor="cb-wbc-normal">
          Voorkeurscontact
        </label>
        <TilburgWbcCombobox
          id="cb-wbc-normal"
          items={contactOptions}
          value={value}
          onTilburgChange={(event) => setValue(event.detail)}
        />
      </div>
    );
  },
};

export const Chiplist: Story = {
  name: 'Chiplist (multi-value)',
  render: () => {
    const [values, setValues] = useState<unknown>(['paspoort', 'geboorteakte']);
    return (
      <div style={column}>
        <label className="utrecht-form-label" htmlFor="cb-wbc-multi">
          Aanvraagdocumenten
        </label>
        <TilburgWbcCombobox
          id="cb-wbc-multi"
          multiple
          items={documentOptions}
          value={values}
          onTilburgChange={(event) => setValues(event.detail)}
          clearable
          placeholder="Voeg een document toe"
        />
      </div>
    );
  },
};

export const Invalid: Story = {
  name: 'Invalid',
  render: () => (
    <div style={column}>
      <label className="utrecht-form-label" htmlFor="cb-wbc-invalid">
        Voorkeurscontact
      </label>
      <TilburgWbcCombobox id="cb-wbc-invalid" items={contactOptions} value={null} invalid required />
    </div>
  ),
};

export const Disabled: Story = {
  name: 'Disabled',
  render: () => (
    <div style={column}>
      <label className="utrecht-form-label" htmlFor="cb-wbc-disabled">
        Voorkeurscontact
      </label>
      <TilburgWbcCombobox id="cb-wbc-disabled" items={contactOptions} value="email" disabled />
    </div>
  ),
};

export const Clearable: Story = {
  name: 'Clearable',
  render: () => (
    <div style={column}>
      <label className="utrecht-form-label" htmlFor="cb-wbc-clearable">
        Voorkeurscontact
      </label>
      <TilburgWbcCombobox id="cb-wbc-clearable" items={contactOptions} value="post" clearable />
    </div>
  ),
};
