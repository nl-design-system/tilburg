/* @license CC0-1.0 */

import { TilburgWbcFormToggle } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-form-toggle.examples';

/* Stencil `<tilburg-wbc-form-toggle>` rendered through its generated React proxy. The custom elements themselves are
   registered once in `config/preview.tsx` (`defineCustomElements()`). */

const meta = {
  title: 'Tilburg Web Components/Form Toggle',
  id: 'tilburg-form-toggle-wbc',
  component: TilburgWbcFormToggle,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWbcFormToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

const Field = ({
  id,
  label,
  ...props
}: { id: string; label: string } & ComponentProps<typeof TilburgWbcFormToggle>) => (
  <div className="utrecht-form-field">
    <label className="utrecht-form-label" htmlFor={id}>
      {label}
    </label>
    <TilburgWbcFormToggle id={id} {...props} />
  </div>
);

export const AllPermutations: Story = {
  render: () => (
    <>
      <Field id="toggle-wbc-off" label="E-mailmeldingen" name="meldingen" />
      <Field id="toggle-wbc-on" label="Herinnering per sms" checked />
      <Field id="toggle-wbc-disabled" label="Digitale post (niet beschikbaar)" disabled />
      <Field id="toggle-wbc-disabled-on" label="Berichtenbox (altijd aan)" checked disabled />
      <Field id="toggle-wbc-invalid" label="Ik wil meldingen ontvangen" invalid required />
    </>
  ),
};
