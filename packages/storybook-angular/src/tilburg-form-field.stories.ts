/* @license CC0-1.0 */

import { TilburgFormField } from '@gemeente-tilburg/components-angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description } from '../../storybook-shared/src/tilburg-form-field.examples';

const meta: Meta<TilburgFormField> = {
  title: 'Tilburg Angular/Form Field',
  id: 'tilburg-form-field-angular',
  component: TilburgFormField,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj<TilburgFormField>;

export const Default: Story = {
  name: 'Default',
  render: () => ({
    template: `
      <tilburg-form-field type="text" style="max-width:24rem;display:block">
        <tilburg-form-label for="ff-default">E-mailadres</tilburg-form-label>
        <tilburg-form-field-description>We gebruiken dit alleen om je te bereiken.</tilburg-form-field-description>
        <tilburg-textbox id="ff-default" name="email" type="email" placeholder="naam@voorbeeld.nl"></tilburg-textbox>
      </tilburg-form-field>
    `,
  }),
};

export const Invalid: Story = {
  name: 'Invalid',
  args: { invalid: true },
  render: (args) => ({
    props: args,
    template: `
      <tilburg-form-field type="text" [invalid]="invalid" style="max-width:24rem;display:block">
        <tilburg-form-label for="ff-invalid">E-mailadres</tilburg-form-label>
        <tilburg-textbox id="ff-invalid" name="email" type="email" [invalid]="true"></tilburg-textbox>
        <tilburg-validation-message type="error">Vul een geldig e-mailadres in.</tilburg-validation-message>
      </tilburg-form-field>
    `,
  }),
};

export const Warning: Story = {
  name: 'Warning (Tilburg modifier)',
  args: { warning: true, invalid: true },
  parameters: {
    docs: {
      description: {
        story:
          'Adding the `tilburg-warning` class on top of `utrecht-form-field` swaps the invalid colour set for the warning palette. Use for advisory messages that should not block submission.',
      },
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <tilburg-form-field type="text" [warning]="warning" [invalid]="invalid" style="max-width:24rem;display:block">
        <tilburg-form-label for="ff-warning">Aanvraagdatum</tilburg-form-label>
        <tilburg-textbox id="ff-warning" name="datum" [invalid]="true"></tilburg-textbox>
        <tilburg-validation-message type="warning">De aanvraagperiode sluit binnenkort.</tilburg-validation-message>
      </tilburg-form-field>
    `,
  }),
};

export const Disabled: Story = {
  name: 'Disabled',
  render: () => ({
    template: `
      <tilburg-form-field type="text" style="max-width:24rem;display:block">
        <tilburg-form-label for="ff-disabled" [disabled]="true">Burgerservicenummer</tilburg-form-label>
        <tilburg-textbox id="ff-disabled" name="bsn" [disabled]="true"></tilburg-textbox>
      </tilburg-form-field>
    `,
  }),
};
