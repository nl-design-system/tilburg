/* @license CC0-1.0 */

import { FormControl, Validators } from '@angular/forms';
import { TilburgPasswordInput } from '@gemeente-tilburg/components-angular';
import type { Meta, StoryObj } from '@storybook/angular';
import {
  argDescriptions,
  autocompleteOptions,
  bugs,
  description,
} from '../../storybook-shared/src/tilburg-password-input.examples';

const meta: Meta<TilburgPasswordInput> = {
  title: 'Tilburg Angular/Password Input',
  id: 'tilburg-password-input-angular',
  component: TilburgPasswordInput,
  tags: ['!autodocs', 'tilburg'],
  args: {
    name: 'wachtwoord',
    autocomplete: 'current-password',
    disabled: false,
    invalid: false,
    required: false,
    toggleLabel: 'Wachtwoord tonen',
    statusShown: 'Wachtwoord is zichtbaar.',
    statusHidden: 'Wachtwoord is verborgen.',
  },
  argTypes: {
    name: { control: 'text', description: argDescriptions.name },
    autocomplete: { control: 'select', options: autocompleteOptions, description: argDescriptions.autocomplete },
    placeholder: { control: 'text', description: argDescriptions.placeholder },
    disabled: { control: 'boolean', description: argDescriptions.disabled },
    invalid: { control: 'boolean', description: argDescriptions.invalid },
    required: { control: 'boolean', description: argDescriptions.required },
    toggleLabel: { control: 'text', description: argDescriptions.toggleLabel, table: { category: 'Texts' } },
    statusShown: { control: 'text', description: argDescriptions.statusShown, table: { category: 'Texts' } },
    statusHidden: { control: 'text', description: argDescriptions.statusHidden, table: { category: 'Texts' } },
  },
  parameters: {
    bugs,
    docs: { description: { component: description } },
    controls: {
      include: [
        'name',
        'autocomplete',
        'placeholder',
        'disabled',
        'invalid',
        'required',
        'toggleLabel',
        'statusShown',
        'statusHidden',
      ],
    },
  },
};

export default meta;
type Story = StoryObj<TilburgPasswordInput>;

const field = (id: string, label: string, input: string) => `
  <div style="display:flex; flex-direction:column; gap:0.25rem; max-width:24rem">
    <label class="utrecht-form-label" for="${id}">${label}</label>
    ${input}
  </div>
`;

/* Every input that has a control, bound so the controls change the story. */
const boundInput = (id: string) =>
  `<tilburg-password-input id="${id}" [name]="name" [autocomplete]="autocomplete" [placeholder]="placeholder"
     [disabled]="disabled" [invalid]="invalid" [required]="required" [toggleLabel]="toggleLabel"
     [statusShown]="statusShown" [statusHidden]="statusHidden"></tilburg-password-input>`;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: field('pw-ng-default', 'Wachtwoord', boundInput('pw-ng-default')),
  }),
};

/* Reactive forms: the FormControl owns the value, the validity and the disabled state. */
export const Reactive: Story = {
  name: 'With a FormControl',
  parameters: { controls: { disable: true } },
  render: () => ({
    props: { control: new FormControl('', [Validators.required, Validators.minLength(12)]) },
    template: field(
      'pw-ng-reactive',
      'Nieuw wachtwoord',
      `<tilburg-password-input id="pw-ng-reactive" [control]="control" autocomplete="new-password" [required]="true"
         [invalid]="control.invalid && control.touched"></tilburg-password-input>`,
    ),
  }),
};

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => ({
    props: args,
    template: field('pw-ng-disabled', 'Wachtwoord', boundInput('pw-ng-disabled')),
  }),
};
