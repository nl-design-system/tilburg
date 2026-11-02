/* @license CC0-1.0 */

import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TilburgForm } from '@gemeente-tilburg/components-angular';
import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';
import { bugs, description } from '../../storybook-shared/src/tilburg-form.examples';

const meta: Meta<TilburgForm> = {
  title: 'Tilburg Angular/Form',
  id: 'tilburg-form-angular',
  component: TilburgForm,
  tags: ['autodocs'],
  /* `[formGroup]` / `formControlName` in the story template. */
  decorators: [moduleMetadata({ imports: [ReactiveFormsModule] })],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj<TilburgForm>;

export const Default: Story = {
  name: 'Default (reactive form)',
  render: () => {
    const form = new FormGroup({ naam: new FormControl(''), email: new FormControl('') });
    return {
      props: { form, verstuurd: '', verstuur: () => JSON.stringify(form.value) },
      template: `
        <tilburg-form ariaLabel="Contact" [formGroup]="form" (ngSubmit)="verstuurd = verstuur()" style="max-inline-size:32rem">
          <tilburg-form-field type="text">
            <tilburg-form-label for="form-ng-naam">Naam</tilburg-form-label>
            <input id="form-ng-naam" class="utrecht-textbox utrecht-textbox--html-input" formControlName="naam" autocomplete="name" />
          </tilburg-form-field>
          <tilburg-form-field type="text">
            <tilburg-form-label for="form-ng-email">E-mailadres</tilburg-form-label>
            <input id="form-ng-email" type="email" class="utrecht-textbox utrecht-textbox--html-input" formControlName="email" autocomplete="email" />
          </tilburg-form-field>
          <button type="submit" class="utrecht-button utrecht-button--primary-action tilburg-medium">Versturen</button>
        </tilburg-form>
        <p class="utrecht-paragraph" aria-live="polite">{{ verstuurd }}</p>
      `,
    };
  },
};
