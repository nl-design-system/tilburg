/* @license CC0-1.0 */

import { TilburgTextarea } from '@gemeente-tilburg/components-angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description } from '../../storybook-shared/src/tilburg-textarea.examples';

const meta: Meta<TilburgTextarea> = {
  title: 'Tilburg Angular/Textarea',
  id: 'tilburg-textarea-angular',
  component: TilburgTextarea,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj<TilburgTextarea>;

export const Default: Story = {
  name: 'Default',
  args: { rows: 4 },
  render: (args) => ({
    props: args,
    template: `
      <div style="display:flex; flex-direction:column; gap:1rem; max-width:32rem">
        <label class="utrecht-form-label" style="display:block;font-weight:700;margin-bottom:0.25rem" for="ta-default">Toelichting</label>
        <tilburg-textarea id="ta-default" name="explanation" placeholder="Schrijf hier je toelichting…" [rows]="rows"></tilburg-textarea>
      </div>
    `,
  }),
};

export const Filled: Story = {
  name: 'With value',
  render: () => ({
    template: `
      <div style="display:flex; flex-direction:column; gap:1rem; max-width:32rem">
        <label class="utrecht-form-label" style="display:block;font-weight:700;margin-bottom:0.25rem" for="ta-filled">Toelichting</label>
        <textarea id="ta-filled" class="utrecht-textarea">Ik wil graag een afspraak maken voor de aanvraag van een nieuwe vergunning.</textarea>
      </div>
    `,
  }),
};

export const Invalid: Story = {
  name: 'Invalid',
  args: { rows: 4, invalid: true },
  render: (args) => ({
    props: args,
    template: `
      <div style="display:flex; flex-direction:column; gap:1rem; max-width:32rem">
        <label class="utrecht-form-label" style="display:block;font-weight:700;margin-bottom:0.25rem" for="ta-invalid">Toelichting</label>
        <tilburg-textarea id="ta-invalid" name="explanation" [rows]="rows" [invalid]="invalid"></tilburg-textarea>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  name: 'Disabled',
  args: { rows: 4, disabled: true },
  render: (args) => ({
    props: args,
    template: `
      <div style="display:flex; flex-direction:column; gap:1rem; max-width:32rem">
        <label class="utrecht-form-label" style="display:block;font-weight:700;margin-bottom:0.25rem" for="ta-disabled">Toelichting</label>
        <tilburg-textarea id="ta-disabled" name="explanation" [rows]="rows" [disabled]="disabled"></tilburg-textarea>
      </div>
    `,
  }),
};
