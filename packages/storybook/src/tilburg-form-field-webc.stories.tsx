/* @license CC0-1.0 */

import {
  TilburgWebcCheckbox,
  TilburgWebcFormField,
  TilburgWebcFormFieldDescription,
  TilburgWebcFormLabel,
  TilburgWebcRadioButton,
  TilburgWebcTextbox,
  TilburgWebcValidationMessage,
} from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-form-field.examples';

/* Stencil `<tilburg-webc-form-field>` rendered through its generated React
   proxy, composed with the other form web components — same composition as
   the React story. */

const meta = {
  title: 'Tilburg Web Components/Form Field',
  id: 'tilburg-form-field-webc',
  component: TilburgWebcFormField,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWebcFormField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPermutations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <TilburgWebcFormField>
        <TilburgWebcFormLabel for="ff-webc-name1">Naam</TilburgWebcFormLabel>
        <TilburgWebcTextbox id="ff-webc-name1" name="name" />
      </TilburgWebcFormField>
      <TilburgWebcFormField warning>
        <TilburgWebcFormLabel for="ff-webc-name2">Naam (warning)</TilburgWebcFormLabel>
        <TilburgWebcTextbox id="ff-webc-name2" name="name" />
        <TilburgWebcFormFieldDescription warning>
          Let op: dit veld is verplicht na 1 jan.
        </TilburgWebcFormFieldDescription>
      </TilburgWebcFormField>
      <TilburgWebcFormField invalid>
        <TilburgWebcFormLabel for="ff-webc-name3">Naam (invalid)</TilburgWebcFormLabel>
        <TilburgWebcTextbox id="ff-webc-name3" name="name" invalid />
        <TilburgWebcValidationMessage type="error">Dit veld is verplicht.</TilburgWebcValidationMessage>
      </TilburgWebcFormField>
      <TilburgWebcFormField type="checkbox">
        <TilburgWebcFormLabel type="checkbox">
          <TilburgWebcCheckbox name="news" /> Ja, ik wil de nieuwsbrief
        </TilburgWebcFormLabel>
      </TilburgWebcFormField>
      <TilburgWebcFormField type="radio">
        <TilburgWebcFormLabel type="radio">
          <TilburgWebcRadioButton name="ff-webc-r" value="a" /> Optie A
        </TilburgWebcFormLabel>
        <TilburgWebcFormLabel type="radio">
          <TilburgWebcRadioButton name="ff-webc-r" value="b" /> Optie B
        </TilburgWebcFormLabel>
      </TilburgWebcFormField>
    </div>
  ),
};
