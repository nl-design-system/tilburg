/* @license CC0-1.0 */

import { FormFieldDescription, FormLabel, PasswordInput, ValidationMessage } from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { type ReactNode, useState } from 'react';
import {
  argDescriptions,
  autocompleteOptions,
  bugs,
  descriptionReact,
} from '../../storybook-shared/src/tilburg-password-input.examples';

const meta = {
  title: 'Tilburg React/Password Input',
  id: 'tilburg-password-input-react',
  component: PasswordInput,
  tags: ['tilburg'],
  args: {
    name: 'wachtwoord',
    autoComplete: 'current-password',
    disabled: false,
    invalid: false,
    required: false,
    toggleLabel: 'Wachtwoord tonen',
    statusShown: 'Wachtwoord is zichtbaar.',
    statusHidden: 'Wachtwoord is verborgen.',
  },
  argTypes: {
    name: { control: 'text', description: argDescriptions.name },
    autoComplete: { control: 'select', options: autocompleteOptions, description: argDescriptions.autocomplete },
    placeholder: { control: 'text', description: argDescriptions.placeholder },
    disabled: { control: 'boolean', description: argDescriptions.disabled },
    invalid: { control: 'boolean', description: argDescriptions.invalid },
    required: { control: 'boolean', description: argDescriptions.required },
    toggleLabel: { control: 'text', description: argDescriptions.toggleLabel, table: { category: 'Texts' } },
    statusShown: { control: 'text', description: argDescriptions.statusShown, table: { category: 'Texts' } },
    statusHidden: { control: 'text', description: argDescriptions.statusHidden, table: { category: 'Texts' } },
  },
  parameters: {
    bugs,
    docs: { description: { component: descriptionReact } },
    controls: {
      include: [
        'name',
        'autoComplete',
        'placeholder',
        'disabled',
        'invalid',
        'required',
        'toggleLabel',
        'statusShown',
        'statusHidden',
      ],
    },
  },
} satisfies Meta<typeof PasswordInput>;

export default meta;
type Story = StoryObj<typeof meta>;

const Field = ({ children }: { children: ReactNode }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', maxWidth: '24rem' }}>{children}</div>
);

export const Default: Story = {
  render: (args) => (
    <Field>
      <FormLabel htmlFor="pw-react-default">Wachtwoord</FormLabel>
      <PasswordInput id="pw-react-default" {...args} />
    </Field>
  ),
};

/* A new password with a requirement, checked when the field is left. */
export const NewPassword: Story = {
  name: 'New password, with validation',
  parameters: { controls: { disable: true } },
  render: function Render() {
    const [value, setValue] = useState('');
    const [touched, setTouched] = useState(false);
    const invalid = touched && value.length < 12;
    return (
      <Field>
        <FormLabel htmlFor="pw-react-new">Nieuw wachtwoord</FormLabel>
        <FormFieldDescription id="pw-react-new-description">Minimaal 12 tekens.</FormFieldDescription>
        <PasswordInput
          id="pw-react-new"
          name="nieuw-wachtwoord"
          autoComplete="new-password"
          required
          value={value}
          invalid={invalid}
          aria-describedby={invalid ? 'pw-react-new-description pw-react-new-error' : 'pw-react-new-description'}
          onChange={(event) => setValue(event.target.value)}
          onBlur={() => setTouched(true)}
        />
        {invalid && (
          <ValidationMessage id="pw-react-new-error" type="error">
            Gebruik minimaal 12 tekens.
          </ValidationMessage>
        )}
      </Field>
    );
  },
};

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => (
    <Field>
      <FormLabel htmlFor="pw-react-disabled">Wachtwoord</FormLabel>
      <PasswordInput id="pw-react-disabled" defaultValue="geheim123" {...args} />
    </Field>
  ),
};
