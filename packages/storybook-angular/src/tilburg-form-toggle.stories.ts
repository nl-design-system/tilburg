/* @license CC0-1.0 */

import { FormControl } from '@angular/forms';
import { TilburgFormToggle } from '@gemeente-tilburg/components-angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description } from '../../storybook-shared/src/tilburg-form-toggle.examples';

const meta: Meta<TilburgFormToggle> = {
  title: 'Tilburg Angular/Form Toggle',
  id: 'tilburg-form-toggle-angular',
  component: TilburgFormToggle,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj<TilburgFormToggle>;

export const Default: Story = {
  name: 'All states',
  render: () => ({
    props: { control: new FormControl(true) },
    template: `
      <tilburg-form-field>
        <tilburg-form-label for="toggle-ng-reactive">E-mailmeldingen ({{ control.value ? 'aan' : 'uit' }})</tilburg-form-label>
        <tilburg-form-toggle id="toggle-ng-reactive" name="meldingen" [control]="control"></tilburg-form-toggle>
      </tilburg-form-field>
      <tilburg-form-field>
        <tilburg-form-label for="toggle-ng-off">Herinnering per sms</tilburg-form-label>
        <tilburg-form-toggle id="toggle-ng-off"></tilburg-form-toggle>
      </tilburg-form-field>
      <tilburg-form-field>
        <tilburg-form-label for="toggle-ng-disabled">Digitale post (niet beschikbaar)</tilburg-form-label>
        <tilburg-form-toggle id="toggle-ng-disabled" [disabled]="true"></tilburg-form-toggle>
      </tilburg-form-field>
      <tilburg-form-field>
        <tilburg-form-label for="toggle-ng-disabled-on">Berichtenbox (altijd aan)</tilburg-form-label>
        <tilburg-form-toggle id="toggle-ng-disabled-on" [checked]="true" [disabled]="true"></tilburg-form-toggle>
      </tilburg-form-field>
      <tilburg-form-field>
        <tilburg-form-label for="toggle-ng-invalid">Ik wil meldingen ontvangen</tilburg-form-label>
        <tilburg-form-toggle id="toggle-ng-invalid" [invalid]="true" [required]="true" ariaDescribedBy="toggle-ng-invalid-error"></tilburg-form-toggle>
        <tilburg-validation-message id="toggle-ng-invalid-error">Zet meldingen aan om verder te gaan.</tilburg-validation-message>
      </tilburg-form-field>
    `,
  }),
};
