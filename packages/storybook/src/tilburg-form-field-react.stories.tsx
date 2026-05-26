/* @license CC0-1.0 */

import {
  Checkbox,
  FormField,
  FormFieldDescription,
  FormLabel,
  RadioButton,
  Textbox,
  ValidationMessage,
} from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, description } from '../../storybook-shared/src/tilburg-form-field.examples';

const meta = {
  title: 'Tilburg React/Form Field',
  id: 'tilburg-form-field-react',
  component: FormField,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPermutations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <FormField>
        <FormLabel htmlFor="name1">Naam</FormLabel>
        <Textbox id="name1" name="name" />
      </FormField>
      <FormField warning>
        <FormLabel htmlFor="name2">Naam (warning)</FormLabel>
        <Textbox id="name2" name="name" />
        <FormFieldDescription warning>Let op: dit veld is verplicht na 1 jan.</FormFieldDescription>
      </FormField>
      <FormField invalid>
        <FormLabel htmlFor="name3">Naam (invalid)</FormLabel>
        <Textbox id="name3" name="name" invalid />
        <ValidationMessage type="error">Dit veld is verplicht.</ValidationMessage>
      </FormField>
      <FormField type="checkbox">
        <FormLabel type="checkbox">
          <Checkbox name="news" /> Ja, ik wil de nieuwsbrief
        </FormLabel>
      </FormField>
      <FormField type="radio">
        <FormLabel type="radio">
          <RadioButton name="r" value="a" /> Optie A
        </FormLabel>
        <FormLabel type="radio">
          <RadioButton name="r" value="b" /> Optie B
        </FormLabel>
      </FormField>
    </div>
  ),
};
