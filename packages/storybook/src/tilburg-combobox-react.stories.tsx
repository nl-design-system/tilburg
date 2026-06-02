/* @license CC0-1.0 */

import { Combobox, type ComboboxItem } from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { bugs, description } from '../../storybook-shared/src/tilburg-combobox.examples';

const meta = {
  title: 'Tilburg React/Combobox',
  id: 'tilburg-combobox-react',
  component: Combobox,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

const contactOptions: ComboboxItem<string>[] = [
  { value: 'email', label: 'E-mail' },
  { value: 'post', label: 'Per post' },
  { value: 'balie', label: 'Ophalen bij de balie' },
];

const documentOptions: ComboboxItem<string>[] = [
  { value: 'paspoort', label: 'Paspoort' },
  { value: 'geboorteakte', label: 'Geboorteakte' },
  { value: 'rijbewijs', label: 'Rijbewijs' },
  { value: 'verblijfsdocument', label: 'Verblijfsdocument' },
];

export const Normal: Story = {
  name: 'Normal (single-value)',
  render: () => {
    const [value, setValue] = useState<string | null | undefined>('email');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxWidth: '24rem' }}>
        <label className="utrecht-form-label" style={{ display: 'block', fontWeight: 700 }} htmlFor="cb-react-normal">
          Voorkeurscontact
        </label>
        <Combobox id="cb-react-normal" items={contactOptions} value={value} onChange={setValue} />
      </div>
    );
  },
};

export const Chiplist: Story = {
  name: 'Chiplist (multi-value)',
  render: () => {
    const [values, setValues] = useState<string[]>(['paspoort', 'geboorteakte']);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxWidth: '24rem' }}>
        <label className="utrecht-form-label" style={{ display: 'block', fontWeight: 700 }} htmlFor="cb-react-multi">
          Aanvraagdocumenten
        </label>
        <Combobox
          id="cb-react-multi"
          multiple
          items={documentOptions}
          value={values}
          onChange={setValues}
          clearable
          placeholder="Voeg een document toe"
        />
      </div>
    );
  },
};

export const Invalid: Story = {
  name: 'Invalid',
  render: () => {
    const [value, setValue] = useState<string | null | undefined>(null);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxWidth: '24rem' }}>
        <label className="utrecht-form-label" style={{ display: 'block', fontWeight: 700 }} htmlFor="cb-react-invalid">
          Voorkeurscontact
        </label>
        <Combobox id="cb-react-invalid" items={contactOptions} value={value} onChange={setValue} invalid required />
      </div>
    );
  },
};

export const Disabled: Story = {
  name: 'Disabled',
  render: () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxWidth: '24rem' }}>
        <label className="utrecht-form-label" style={{ display: 'block', fontWeight: 700 }} htmlFor="cb-react-disabled">
          Voorkeurscontact
        </label>
        <Combobox id="cb-react-disabled" items={contactOptions} value="email" onChange={() => undefined} disabled />
      </div>
    );
  },
};

export const Clearable: Story = {
  name: 'Clearable',
  render: () => {
    const [value, setValue] = useState<string | null | undefined>('post');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxWidth: '24rem' }}>
        <label
          className="utrecht-form-label"
          style={{ display: 'block', fontWeight: 700 }}
          htmlFor="cb-react-clearable"
        >
          Voorkeurscontact
        </label>
        <Combobox id="cb-react-clearable" items={contactOptions} value={value} onChange={setValue} clearable />
      </div>
    );
  },
};
