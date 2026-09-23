/* @license CC0-1.0 */

import {
  TilburgWbcCheckbox,
  TilburgWbcFormField,
  TilburgWbcFormFieldDescription,
  TilburgWbcFormLabel,
  TilburgWbcRadioButton,
  TilburgWbcTextbox,
  TilburgWbcValidationMessage,
} from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-form-field.examples';

/* Stencil `<tilburg-wbc-form-field>` rendered through its generated React
   proxy, composed with the other form web components — same composition as
   the React story. */

const meta = {
  title: 'Tilburg Web Components/Form Field',
  id: 'tilburg-form-field-wbc',
  component: TilburgWbcFormField,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWbcFormField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPermutations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <TilburgWbcFormField>
        <TilburgWbcFormLabel for="ff-wbc-name1">Naam</TilburgWbcFormLabel>
        <TilburgWbcTextbox id="ff-wbc-name1" name="name" />
      </TilburgWbcFormField>
      <TilburgWbcFormField warning>
        <TilburgWbcFormLabel for="ff-wbc-name2">Naam (warning)</TilburgWbcFormLabel>
        <TilburgWbcTextbox id="ff-wbc-name2" name="name" />
        <TilburgWbcFormFieldDescription warning>Let op: dit veld is verplicht na 1 jan.</TilburgWbcFormFieldDescription>
      </TilburgWbcFormField>
      <TilburgWbcFormField invalid>
        <TilburgWbcFormLabel for="ff-wbc-name3">Naam (invalid)</TilburgWbcFormLabel>
        <TilburgWbcTextbox id="ff-wbc-name3" name="name" invalid />
        <TilburgWbcValidationMessage type="error">Dit veld is verplicht.</TilburgWbcValidationMessage>
      </TilburgWbcFormField>
      <TilburgWbcFormField type="checkbox">
        <TilburgWbcFormLabel type="checkbox">
          <TilburgWbcCheckbox name="news" /> Ja, ik wil de nieuwsbrief
        </TilburgWbcFormLabel>
      </TilburgWbcFormField>
      <TilburgWbcFormField type="radio">
        <TilburgWbcFormLabel type="radio">
          <TilburgWbcRadioButton name="ff-wbc-r" value="a" /> Optie A
        </TilburgWbcFormLabel>
        <TilburgWbcFormLabel type="radio">
          <TilburgWbcRadioButton name="ff-wbc-r" value="b" /> Optie B
        </TilburgWbcFormLabel>
      </TilburgWbcFormField>
    </div>
  ),
};
