/* @license CC0-1.0 */

import { FormControl } from '@angular/forms';
import { TilburgCombobox } from '@gemeente-tilburg/components-angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description } from '../../storybook-shared/src/tilburg-combobox.examples';

const meta: Meta<TilburgCombobox<{ value: string; displayValue: string }>> = {
  title: 'Tilburg Angular/Combobox',
  id: 'tilburg-combobox-angular',
  component: TilburgCombobox,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;

type Item = { value: string; displayValue: string };
type Story = StoryObj<TilburgCombobox<Item>>;

const documents: Item[] = [
  { value: 'paspoort', displayValue: 'Paspoort' },
  { value: 'geboorteakte', displayValue: 'Geboorteakte' },
  { value: 'rijbewijs', displayValue: 'Rijbewijs' },
  { value: 'verblijfsdocument', displayValue: 'Verblijfsdocument' },
];

const contactOptions: Item[] = [
  { value: 'email', displayValue: 'E-mail' },
  { value: 'post', displayValue: 'Per post' },
  { value: 'balie', displayValue: 'Ophalen bij de balie' },
];

export const Normal: Story = {
  name: 'Normal (single-value)',
  render: () => ({
    props: {
      control: new FormControl('email'),
      items: contactOptions,
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:0.5rem;max-width:24rem">
        <label class="utrecht-form-label" style="display:block;font-weight:700" for="cb-ng-normal">Voorkeurscontact</label>
        <tilburg-combobox id="cb-ng-normal" [control]="control" [items]="items"></tilburg-combobox>
      </div>
    `,
  }),
};

export const Chiplist: Story = {
  name: 'Chiplist (multi-value)',
  render: () => ({
    props: {
      control: new FormControl(['paspoort', 'geboorteakte']),
      items: documents,
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:0.5rem;max-width:24rem">
        <label class="utrecht-form-label" style="display:block;font-weight:700" for="cb-ng-multi">Aanvraagdocumenten</label>
        <tilburg-combobox id="cb-ng-multi" [control]="control" [items]="items" [multiple]="true" [clearable]="true" placeholder="Voeg een document toe"></tilburg-combobox>
      </div>
    `,
  }),
};

export const Invalid: Story = {
  name: 'Invalid',
  render: () => {
    const control = new FormControl('');
    control.markAsTouched();
    control.setErrors({ required: true });
    return {
      props: { control, items: contactOptions },
      template: `
        <div style="display:flex;flex-direction:column;gap:0.5rem;max-width:24rem">
          <label class="utrecht-form-label" style="display:block;font-weight:700" for="cb-ng-invalid">Voorkeurscontact</label>
          <tilburg-combobox id="cb-ng-invalid" [control]="control" [items]="items" [invalid]="true" [required]="true"></tilburg-combobox>
        </div>
      `,
    };
  },
};

export const Disabled: Story = {
  name: 'Disabled',
  render: () => ({
    props: {
      control: new FormControl({ value: 'email', disabled: true }),
      items: contactOptions,
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:0.5rem;max-width:24rem">
        <label class="utrecht-form-label" style="display:block;font-weight:700" for="cb-ng-disabled">Voorkeurscontact</label>
        <tilburg-combobox id="cb-ng-disabled" [control]="control" [items]="items"></tilburg-combobox>
      </div>
    `,
  }),
};
