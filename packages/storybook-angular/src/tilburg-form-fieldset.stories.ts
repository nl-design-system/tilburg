/* @license CC0-1.0 */

import { TilburgFieldset } from '@gemeente-tilburg/components-angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description } from '../../storybook-shared/src/tilburg-form-fieldset.examples';

const meta: Meta<TilburgFieldset> = {
  title: 'Tilburg Angular/Fieldset',
  id: 'tilburg-form-fieldset-angular',
  component: TilburgFieldset,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj<TilburgFieldset>;

export const Default: Story = {
  name: 'Default',
  render: () => ({
    template: `
      <tilburg-fieldset ariaLabel="Persoonsgegevens" style="max-width:24rem;display:block">
        <legend class="utrecht-form-label">Persoonsgegevens</legend>
        <tilburg-form-field type="text">
          <tilburg-form-label for="fs-naam">Naam</tilburg-form-label>
          <tilburg-textbox id="fs-naam" name="naam"></tilburg-textbox>
        </tilburg-form-field>
        <tilburg-form-field type="text">
          <tilburg-form-label for="fs-email">E-mailadres</tilburg-form-label>
          <tilburg-textbox id="fs-email" name="email" type="email"></tilburg-textbox>
        </tilburg-form-field>
      </tilburg-fieldset>
    `,
  }),
};

export const Invalid: Story = {
  args: { invalid: true },
  render: (args) => ({
    props: args,
    template: `
      <tilburg-fieldset [invalid]="invalid">
        <legend class="utrecht-form-label">Invalid</legend>
        <tilburg-form-label type="radio"><tilburg-radio-button name="x" value="a" [invalid]="true"></tilburg-radio-button> Optie A</tilburg-form-label>
      </tilburg-fieldset>
    `,
  }),
};

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => ({
    props: args,
    template: `
      <tilburg-fieldset [disabled]="disabled">
        <legend class="utrecht-form-label">Disabled</legend>
        <tilburg-form-label type="checkbox" [disabled]="true"><tilburg-checkbox name="x" [disabled]="true"></tilburg-checkbox> Niet selecteerbaar</tilburg-form-label>
      </tilburg-fieldset>
    `,
  }),
};
