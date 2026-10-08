/* @license CC0-1.0 */

import { TilburgCheckbox } from '@gemeente-tilburg/components-angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description } from '../../storybook-shared/src/tilburg-checkbox.examples';

const meta: Meta<TilburgCheckbox> = {
  title: 'Tilburg Angular/Checkbox',
  id: 'tilburg-checkbox-angular',
  component: TilburgCheckbox,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj<TilburgCheckbox>;

export const Unchecked: Story = {
  name: 'Unchecked',
  render: () => ({
    template: `
      <div style="display:flex;align-items:center;gap:0.5rem;margin-block-end:0.5rem">
        <tilburg-checkbox id="cb-unchecked" name="agree"></tilburg-checkbox>
        <label class="utrecht-form-label" for="cb-unchecked">Ik ga akkoord met de voorwaarden</label>
      </div>
    `,
  }),
};

export const Checked: Story = {
  name: 'Checked',
  args: { checked: true },
  render: (args) => ({
    props: args,
    template: `
      <div style="display:flex;align-items:center;gap:0.5rem;margin-block-end:0.5rem">
        <tilburg-checkbox id="cb-checked" name="agree" [checked]="checked"></tilburg-checkbox>
        <label class="utrecht-form-label" for="cb-checked">Ik ga akkoord met de voorwaarden</label>
      </div>
    `,
  }),
};

export const Invalid: Story = {
  name: 'Invalid',
  args: { invalid: true, required: true },
  render: (args) => ({
    props: args,
    template: `
      <div style="display:flex;align-items:center;gap:0.5rem;margin-block-end:0.5rem">
        <tilburg-checkbox id="cb-invalid" name="agree" [invalid]="invalid" [required]="required"></tilburg-checkbox>
        <label class="utrecht-form-label" for="cb-invalid">Verplicht akkoord</label>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  name: 'Disabled',
  args: { disabled: true },
  render: (args) => ({
    props: args,
    template: `
      <div style="display:flex;align-items:center;gap:0.5rem;margin-block-end:0.5rem">
        <tilburg-checkbox id="cb-disabled" name="agree" [disabled]="disabled"></tilburg-checkbox>
        <label class="utrecht-form-label" for="cb-disabled">Disabled (unchecked)</label>
      </div>
      <div style="display:flex;align-items:center;gap:0.5rem;margin-block-end:0.5rem">
        <tilburg-checkbox id="cb-disabled-checked" name="agree" [disabled]="disabled" [checked]="true"></tilburg-checkbox>
        <label class="utrecht-form-label" for="cb-disabled-checked">Disabled (checked)</label>
      </div>
    `,
  }),
};
