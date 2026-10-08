/* @license CC0-1.0 */

import { TilburgFormLabel } from '@gemeente-tilburg/components-angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description } from '../../storybook-shared/src/tilburg-form-label.examples';

const meta: Meta<TilburgFormLabel> = {
  title: 'Tilburg Angular/Form Label',
  id: 'tilburg-form-label-angular',
  component: TilburgFormLabel,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj<TilburgFormLabel>;

export const Default: Story = {
  name: 'Default',
  render: () => ({
    template: `<tilburg-form-label for="ex-default">Naam</tilburg-form-label>`,
  }),
};

export const WithOptional: Story = {
  name: 'With optional addon',
  render: () => ({
    template: `<tilburg-form-label for="ex-optional">Telefoonnummer <span class="tilburg-form-label__optional">(optioneel)</span></tilburg-form-label>`,
  }),
};

export const RadioLabel: Story = {
  name: 'Radio label (--radio modifier)',
  render: () => ({
    template: `<tilburg-form-label type="radio" for="ex-radio">E-mail</tilburg-form-label>`,
  }),
};

export const CheckboxLabel: Story = {
  name: 'Checkbox label (--checkbox modifier)',
  render: () => ({
    template: `<tilburg-form-label type="checkbox" for="ex-checkbox">Ik ga akkoord met de voorwaarden</tilburg-form-label>`,
  }),
};

export const Disabled: Story = {
  name: 'Disabled',
  args: { disabled: true },
  render: (args) => ({
    props: args,
    template: `<tilburg-form-label for="ex-disabled" [disabled]="disabled">Burgerservicenummer</tilburg-form-label>`,
  }),
};

export const Checkbox: Story = {
  render: () => ({
    template: `<tilburg-form-label type="checkbox"><tilburg-checkbox name="agree"></tilburg-checkbox> Ik ga akkoord</tilburg-form-label>`,
  }),
};

export const Radio: Story = {
  render: () => ({
    template: `<tilburg-form-label type="radio"><tilburg-radio-button name="x" value="a"></tilburg-radio-button> Optie A</tilburg-form-label>`,
  }),
};
