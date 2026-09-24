/* @license CC0-1.0 */

import { TilburgTextbox } from '@gemeente-tilburg/components-angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description } from '../../storybook-shared/src/tilburg-textbox.examples';

const meta: Meta<TilburgTextbox> = {
  title: 'Tilburg Angular/Textbox',
  id: 'tilburg-textbox-angular',
  component: TilburgTextbox,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj<TilburgTextbox>;

export const Default: Story = {
  name: 'Default',
  render: () => ({
    template: `
      <div style="display:flex; flex-direction:column; gap:1rem; max-width:24rem">
        <label class="utrecht-form-label" style="display:block;font-weight:700;margin-bottom:0.25rem" for="tb-default">E-mailadres</label>
        <tilburg-textbox id="tb-default" name="email" type="text" placeholder="naam@voorbeeld.nl"></tilburg-textbox>
      </div>
    `,
  }),
};

export const Filled: Story = {
  name: 'With value',
  render: () => ({
    template: `
      <div style="display:flex; flex-direction:column; gap:1rem; max-width:24rem">
        <label class="utrecht-form-label" style="display:block;font-weight:700;margin-bottom:0.25rem" for="tb-filled">Voornaam</label>
        <input id="tb-filled" type="text" class="utrecht-textbox utrecht-textbox--html-input" value="Jan" />
      </div>
    `,
  }),
};

export const Invalid: Story = {
  name: 'Invalid',
  args: { invalid: true },
  render: (args) => ({
    props: args,
    template: `
      <div style="display:flex; flex-direction:column; gap:1rem; max-width:24rem">
        <label class="utrecht-form-label" style="display:block;font-weight:700;margin-bottom:0.25rem" for="tb-invalid">E-mailadres</label>
        <tilburg-textbox id="tb-invalid" name="email" type="email" [invalid]="invalid"></tilburg-textbox>
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
      <div style="display:flex; flex-direction:column; gap:1rem; max-width:24rem">
        <label class="utrecht-form-label" style="display:block;font-weight:700;margin-bottom:0.25rem" for="tb-disabled">Burgerservicenummer</label>
        <tilburg-textbox id="tb-disabled" name="bsn" [disabled]="disabled"></tilburg-textbox>
      </div>
    `,
  }),
};
