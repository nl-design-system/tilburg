/* @license CC0-1.0 */

import { TilburgWbcSelect } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import type { ReactNode } from 'react';
import {
  argDescriptions,
  bugs,
  descriptionWebComponents,
  stadsdelen,
} from '../../storybook-shared/src/tilburg-select.examples';

/* Stencil `<tilburg-wbc-select>` rendered through its generated React proxy. The custom elements themselves are
   registered once in `config/preview.tsx` (`defineCustomElements()`). */

const meta = {
  title: 'Tilburg Web Components/Select',
  id: 'tilburg-select-wbc',
  component: TilburgWbcSelect,
  args: {
    name: 'stadsdeel',
    disabled: false,
    invalid: false,
    required: false,
    options: stadsdelen,
  },
  argTypes: {
    name: { control: 'text', description: argDescriptions.name },
    placeholder: { control: 'text', description: argDescriptions.placeholder },
    value: {
      control: 'select',
      options: ['', ...stadsdelen.map(({ value }) => value)],
      description: 'The `value` of the selected option; kept in sync when the user chooses another one.',
    },
    disabled: { control: 'boolean', description: argDescriptions.disabled },
    invalid: { control: 'boolean', description: argDescriptions.invalid },
    required: { control: 'boolean', description: argDescriptions.required },
    options: { control: 'object', description: `${argDescriptions.options} Also accepted as a JSON string attribute.` },
  },
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
    controls: { include: ['name', 'placeholder', 'value', 'disabled', 'invalid', 'required', 'options'] },
  },
  render: ({ id, ...args }) => (
    <Field id={id ?? 'select-wbc'}>
      <TilburgWbcSelect id={id ?? 'select-wbc'} {...args} />
    </Field>
  ),
} satisfies Meta<typeof TilburgWbcSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

function Field({ id, children }: { id: string; children: ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', maxWidth: '24rem' }}>
      <label className="utrecht-form-label" htmlFor={id}>
        Stadsdeel
      </label>
      {children}
    </div>
  );
}

export const Default: Story = {
  args: { id: 'select-wbc-default', placeholder: 'Maak een keuze', value: '' },
};

export const Selected: Story = {
  name: 'With value',
  args: { id: 'select-wbc-selected', value: 'reeshof' },
};

export const Invalid: Story = {
  args: { id: 'select-wbc-invalid', placeholder: 'Maak een keuze', value: '', required: true, invalid: true },
};

export const Disabled: Story = {
  args: { id: 'select-wbc-disabled', value: 'centrum', disabled: true },
};
