/* @license CC0-1.0 */

import { TilburgWbcPasswordInput } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import type { ReactNode } from 'react';
import {
  argDescriptions,
  autocompleteOptions,
  bugs,
  descriptionWebComponents,
} from '../../storybook-shared/src/tilburg-password-input.examples';

/* Stencil `<tilburg-wbc-password-input>` rendered through its generated React proxy. The custom elements themselves
   are registered once in `config/preview.tsx` (`defineCustomElements()`). */

const meta = {
  title: 'Tilburg Web Components/Password Input',
  id: 'tilburg-password-input-wbc',
  component: TilburgWbcPasswordInput,
  tags: ['tilburg'],
  args: {
    name: 'wachtwoord',
    autocomplete: 'current-password',
    disabled: false,
    invalid: false,
    required: false,
    toggleLabel: 'Wachtwoord tonen',
    statusShown: 'Wachtwoord is zichtbaar.',
    statusHidden: 'Wachtwoord is verborgen.',
  },
  argTypes: {
    name: { control: 'text', description: argDescriptions.name },
    autocomplete: { control: 'select', options: autocompleteOptions, description: argDescriptions.autocomplete },
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
    docs: { description: { component: descriptionWebComponents } },
    controls: {
      include: [
        'name',
        'autocomplete',
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
  render: ({ id, ...args }) => (
    <Field id={id ?? 'pw-wbc'}>
      <TilburgWbcPasswordInput id={id ?? 'pw-wbc'} {...args} />
    </Field>
  ),
} satisfies Meta<typeof TilburgWbcPasswordInput>;

export default meta;
type Story = StoryObj<typeof meta>;

function Field({ id, children }: { id: string; children: ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', maxWidth: '24rem' }}>
      <label className="utrecht-form-label" htmlFor={id}>
        Wachtwoord
      </label>
      {children}
    </div>
  );
}

export const Default: Story = {
  args: { id: 'pw-wbc-default' },
};

export const Invalid: Story = {
  args: { id: 'pw-wbc-invalid', required: true, invalid: true },
};

export const Disabled: Story = {
  args: { id: 'pw-wbc-disabled', value: 'geheim123', disabled: true },
};
