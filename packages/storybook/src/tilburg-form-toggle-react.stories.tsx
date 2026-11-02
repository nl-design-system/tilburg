/* @license CC0-1.0 */

import { FormField, FormLabel, FormToggle } from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { bugs, descriptionReact } from '../../storybook-shared/src/tilburg-form-toggle.examples';

const meta = {
  title: 'Tilburg React/Form Toggle',
  id: 'tilburg-form-toggle-react',
  component: FormToggle,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionReact } },
  },
} satisfies Meta<typeof FormToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

const Controlled = () => {
  const [on, setOn] = useState(false);
  return (
    <FormField>
      <FormLabel htmlFor="toggle-react-controlled">E-mailmeldingen ({on ? 'aan' : 'uit'})</FormLabel>
      <FormToggle id="toggle-react-controlled" checked={on} onChange={(event) => setOn(event.target.checked)} />
    </FormField>
  );
};

export const AllPermutations: Story = {
  render: () => (
    <>
      <Controlled />
      <FormField>
        <FormLabel htmlFor="toggle-react-on">Herinnering per sms</FormLabel>
        <FormToggle id="toggle-react-on" defaultChecked />
      </FormField>
      <FormField>
        <FormLabel htmlFor="toggle-react-disabled">Digitale post (niet beschikbaar)</FormLabel>
        <FormToggle id="toggle-react-disabled" disabled />
      </FormField>
      <FormField>
        <FormLabel htmlFor="toggle-react-disabled-on">Berichtenbox (altijd aan)</FormLabel>
        <FormToggle id="toggle-react-disabled-on" defaultChecked disabled />
      </FormField>
      <FormField>
        <FormLabel htmlFor="toggle-react-invalid">Ik wil meldingen ontvangen</FormLabel>
        <FormToggle id="toggle-react-invalid" invalid required />
      </FormField>
    </>
  ),
};
