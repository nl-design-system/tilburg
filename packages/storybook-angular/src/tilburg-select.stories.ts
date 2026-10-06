/* @license CC0-1.0 */

import { FormControl, Validators } from '@angular/forms';
import { TilburgSelect } from '@gemeente-tilburg/components-angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { argDescriptions, bugs, description, stadsdelen } from '../../storybook-shared/src/tilburg-select.examples';

const meta: Meta<TilburgSelect> = {
  title: 'Tilburg Angular/Select',
  id: 'tilburg-select-angular',
  component: TilburgSelect,
  tags: ['!autodocs'],
  args: { name: 'stadsdeel', placeholder: 'Maak een keuze', disabled: false, invalid: false, required: false },
  argTypes: {
    name: { control: 'text', description: argDescriptions.name },
    placeholder: { control: 'text', description: argDescriptions.placeholder },
    disabled: { control: 'boolean', description: argDescriptions.disabled },
    invalid: { control: 'boolean', description: argDescriptions.invalid },
    required: { control: 'boolean', description: argDescriptions.required },
  },
  parameters: {
    bugs,
    docs: { description: { component: description } },
    controls: { include: ['name', 'placeholder', 'disabled', 'invalid', 'required'] },
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

/* Every input that has a control, bound so the controls change the story. */
const boundSelect = (id: string, extra = '') =>
  `<tilburg-select id="${id}" [name]="name" [options]="options" [placeholder]="placeholder" [disabled]="disabled"
     [invalid]="invalid" [required]="required"${extra}></tilburg-select>`;

export const Default: Story = {
  render: (args) => ({
    props: { ...args, options: stadsdelen },
    template: field('select-ng-default', boundSelect('select-ng-default')),
  }),
};

/* Reactive forms: the FormControl owns the value, the validity and the disabled state. */
export const Reactive: Story = {
  name: 'With a FormControl',
  parameters: { controls: { disable: true } },
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
  args: { required: true, invalid: true },
  render: (args) => ({
    props: { ...args, options: stadsdelen },
    template: field('select-ng-invalid', boundSelect('select-ng-invalid')),
  }),
};

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => ({
    props: { ...args, options: stadsdelen },
    template: field('select-ng-disabled', boundSelect('select-ng-disabled', ' value="centrum"')),
  }),
};
