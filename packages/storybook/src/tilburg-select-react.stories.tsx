/* @license CC0-1.0 */

import { FormLabel, Select, ValidationMessage } from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { type ReactNode, useState } from 'react';
import { bugs, descriptionReact, stadsdelen } from '../../storybook-shared/src/tilburg-select.examples';

const meta = {
  title: 'Tilburg React/Select',
  id: 'tilburg-select-react',
  component: Select,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionReact } },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const Options = () => (
  <>
    <option value="">Maak een keuze</option>
    {stadsdelen.map(({ value, label }) => (
      <option key={value} value={value}>
        {label}
      </option>
    ))}
  </>
);

const Field = ({ id, children }: { id: string; children: ReactNode }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', maxWidth: '24rem' }}>
    <FormLabel htmlFor={id}>Stadsdeel</FormLabel>
    {children}
  </div>
);

export const Default: Story = {
  render: () => (
    <Field id="select-react-default">
      <Select id="select-react-default" name="stadsdeel" defaultValue="">
        <Options />
      </Select>
    </Field>
  ),
};

/* Controlled, with validation: choose nothing and leave the field to see the error. */
export const Controlled: Story = {
  name: 'Controlled, with validation',
  render: function Render() {
    const [value, setValue] = useState('');
    const [touched, setTouched] = useState(false);
    const invalid = touched && value === '';
    return (
      <Field id="select-react-controlled">
        <Select
          id="select-react-controlled"
          name="stadsdeel"
          value={value}
          required
          invalid={invalid}
          aria-describedby={invalid ? 'select-react-controlled-error' : undefined}
          onChange={(event) => setValue(event.target.value)}
          onBlur={() => setTouched(true)}
        >
          <Options />
        </Select>
        {invalid && (
          <ValidationMessage id="select-react-controlled-error" type="error">
            Kies een stadsdeel.
          </ValidationMessage>
        )}
      </Field>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <Field id="select-react-disabled">
      <Select id="select-react-disabled" name="stadsdeel" defaultValue="centrum" disabled>
        <Options />
      </Select>
    </Field>
  ),
};
