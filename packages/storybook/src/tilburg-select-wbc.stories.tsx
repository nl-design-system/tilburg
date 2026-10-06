/* @license CC0-1.0 */

import { TilburgWbcSelect } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import type { ReactNode } from 'react';
import { bugs, descriptionWebComponents, stadsdelen } from '../../storybook-shared/src/tilburg-select.examples';

/* Stencil `<tilburg-wbc-select>` rendered through its generated React proxy. The custom elements themselves are
   registered once in `config/preview.tsx` (`defineCustomElements()`). */

const meta = {
  title: 'Tilburg Web Components/Select',
  id: 'tilburg-select-wbc',
  component: TilburgWbcSelect,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWbcSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

const Field = ({ id, children }: { id: string; children: ReactNode }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', maxWidth: '24rem' }}>
    <label className="utrecht-form-label" htmlFor={id}>
      Stadsdeel
    </label>
    {children}
  </div>
);

export const Default: Story = {
  render: () => (
    <Field id="select-wbc-default">
      <TilburgWbcSelect id="select-wbc-default" name="stadsdeel" placeholder="Maak een keuze" options={stadsdelen} />
    </Field>
  ),
};

export const Selected: Story = {
  name: 'With value',
  render: () => (
    <Field id="select-wbc-selected">
      <TilburgWbcSelect id="select-wbc-selected" name="stadsdeel" value="reeshof" options={stadsdelen} />
    </Field>
  ),
};

export const Invalid: Story = {
  render: () => (
    <Field id="select-wbc-invalid">
      <TilburgWbcSelect
        id="select-wbc-invalid"
        name="stadsdeel"
        placeholder="Maak een keuze"
        required
        invalid
        options={stadsdelen}
      />
    </Field>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Field id="select-wbc-disabled">
      <TilburgWbcSelect id="select-wbc-disabled" name="stadsdeel" value="centrum" disabled options={stadsdelen} />
    </Field>
  ),
};
