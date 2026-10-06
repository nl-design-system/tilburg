/* @license CC0-1.0 */

import { FormControl, Validators } from '@angular/forms';
import { TilburgSelect } from '@gemeente-tilburg/components-angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description, stadsdelen } from '../../storybook-shared/src/tilburg-select.examples';

const meta: Meta<TilburgSelect> = {
  title: 'Tilburg Angular/Select',
  id: 'tilburg-select-angular',
  component: TilburgSelect,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj<TilburgSelect>;

const field = (id: string, select: string) => `
  <div style="display:flex; flex-direction:column; gap:0.25rem; max-width:24rem">
    <label class="utrecht-form-label" for="${id}">Stadsdeel</label>
    ${select}
  </div>
`;

export const Default: Story = {
  render: () => ({
    props: { options: stadsdelen },
    template: field(
      'select-ng-default',
      `<tilburg-select id="select-ng-default" name="stadsdeel" [options]="options" placeholder="Maak een keuze"></tilburg-select>`,
    ),
  }),
};

/* Reactive forms: the FormControl owns the value, the validity and the disabled state. */
export const Reactive: Story = {
  name: 'With a FormControl',
  render: () => ({
    props: { options: stadsdelen, control: new FormControl('', Validators.required) },
    template: field(
      'select-ng-reactive',
      `<tilburg-select id="select-ng-reactive" [control]="control" [options]="options" placeholder="Maak een keuze"
         [required]="true" [invalid]="control.invalid && control.touched"></tilburg-select>
       <p class="utrecht-paragraph">Waarde: {{ control.value || '(niets gekozen)' }}</p>`,
    ),
  }),
};

export const Invalid: Story = {
  render: () => ({
    props: { options: stadsdelen },
    template: field(
      'select-ng-invalid',
      `<tilburg-select id="select-ng-invalid" name="stadsdeel" [options]="options" placeholder="Maak een keuze"
         [required]="true" [invalid]="true"></tilburg-select>`,
    ),
  }),
};

export const Disabled: Story = {
  render: () => ({
    props: { options: stadsdelen },
    template: field(
      'select-ng-disabled',
      `<tilburg-select id="select-ng-disabled" name="stadsdeel" [options]="options" value="centrum" [disabled]="true"></tilburg-select>`,
    ),
  }),
};
