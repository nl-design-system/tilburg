/* @license CC0-1.0 */

import { TilburgRadioButton } from '@gemeente-tilburg/components-angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description } from '../../storybook-shared/src/tilburg-radio-button.examples';

const meta: Meta<TilburgRadioButton> = {
  title: 'Tilburg Angular/Radio Button',
  id: 'tilburg-radio-button-angular',
  component: TilburgRadioButton,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj<TilburgRadioButton>;

export const Group: Story = {
  name: 'Group (one checked)',
  render: () => ({
    template: `
      <fieldset style="border:0;padding:0">
        <legend class="utrecht-form-label utrecht-form-label--radio">Hoe wil je je aanvraag ontvangen?</legend>
        <div style="display:flex;align-items:center;gap:0.5rem;margin-block-end:0.5rem">
          <tilburg-radio-button id="rb-email" name="delivery" value="email" [checked]="true"></tilburg-radio-button>
          <label class="utrecht-form-label utrecht-form-label--radio" for="rb-email">E-mail</label>
        </div>
        <div style="display:flex;align-items:center;gap:0.5rem;margin-block-end:0.5rem">
          <tilburg-radio-button id="rb-post" name="delivery" value="post"></tilburg-radio-button>
          <label class="utrecht-form-label utrecht-form-label--radio" for="rb-post">Per post</label>
        </div>
        <div style="display:flex;align-items:center;gap:0.5rem;margin-block-end:0.5rem">
          <tilburg-radio-button id="rb-pickup" name="delivery" value="pickup"></tilburg-radio-button>
          <label class="utrecht-form-label utrecht-form-label--radio" for="rb-pickup">Ophalen bij de balie</label>
        </div>
      </fieldset>
    `,
  }),
};

export const Disabled: Story = {
  name: 'Disabled options',
  render: () => ({
    template: `
      <fieldset style="border:0;padding:0">
        <legend class="utrecht-form-label utrecht-form-label--radio">Niet beschikbaar</legend>
        <div style="display:flex;align-items:center;gap:0.5rem;margin-block-end:0.5rem">
          <tilburg-radio-button id="rb-d1" name="disabled" value="a" [disabled]="true"></tilburg-radio-button>
          <label class="utrecht-form-label utrecht-form-label--radio" for="rb-d1">Disabled (unchecked)</label>
        </div>
        <div style="display:flex;align-items:center;gap:0.5rem;margin-block-end:0.5rem">
          <tilburg-radio-button id="rb-d2" name="disabled" value="b" [disabled]="true" [checked]="true"></tilburg-radio-button>
          <label class="utrecht-form-label utrecht-form-label--radio" for="rb-d2">Disabled (checked)</label>
        </div>
      </fieldset>
    `,
  }),
};
