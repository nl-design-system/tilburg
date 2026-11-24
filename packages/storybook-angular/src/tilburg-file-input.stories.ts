/* @license CC0-1.0 */

import { TilburgFileInput } from '@gemeente-tilburg/components-angular';
import type { Meta, StoryObj } from '@storybook/angular';
import {
  argDescriptions,
  bugs,
  description,
  storyDescriptions,
} from '../../storybook-shared/src/tilburg-file-input.examples';

const story = (text: string) => ({ docs: { description: { story: text } } });

const INPUTS = `[name]="name" [multiple]="multiple" [accept]="accept" [disabled]="disabled" [invalid]="invalid" [required]="required" [showFiles]="showFiles" [busy]="busy" [dropLabel]="dropLabel" [buttonLabel]="buttonLabel" [busyLabel]="busyLabel" (filesChange)="filesChange($event)"`;

const meta: Meta<TilburgFileInput> = {
  title: 'Tilburg Angular/File Input',
  id: 'tilburg-file-input-angular',
  component: TilburgFileInput,
  tags: ['autodocs', 'tilburg'],
  args: {
    multiple: true,
    accept: 'image/*',
    disabled: false,
    invalid: false,
    required: false,
    showFiles: true,
    busy: false,
    ariaLabel: 'Foto toevoegen',
    busyLabel: 'Bezig met uploaden…',
  },
  argTypes: {
    name: { control: 'text', description: argDescriptions.name },
    multiple: { control: 'boolean', description: argDescriptions.multiple },
    accept: { control: 'text', description: argDescriptions.accept },
    disabled: { control: 'boolean', description: argDescriptions.disabled },
    invalid: { control: 'boolean', description: argDescriptions.invalid },
    required: { control: 'boolean', description: argDescriptions.required },
    showFiles: { control: 'boolean', description: argDescriptions.showFiles },
    busy: { control: 'boolean', description: argDescriptions.busy },
    ariaLabel: { control: 'text', description: argDescriptions.ariaLabel },
    dropLabel: { control: 'text', description: argDescriptions.dropLabel, table: { category: 'Texts' } },
    buttonLabel: { control: 'text', description: argDescriptions.buttonLabel, table: { category: 'Texts' } },
    busyLabel: { control: 'text', description: argDescriptions.busyLabel, table: { category: 'Texts' } },
    filesChange: { action: 'filesChange', description: argDescriptions.filesChange, table: { category: 'Events' } },
  },
  parameters: {
    bugs,
    docs: { description: { component: description } },
    controls: {
      include: [
        'name',
        'multiple',
        'accept',
        'disabled',
        'invalid',
        'required',
        'showFiles',
        'busy',
        'ariaLabel',
        'dropLabel',
        'buttonLabel',
        'busyLabel',
        'filesChange',
      ],
    },
  },
  render: (args) => ({
    props: args,
    template: `<tilburg-file-input ${INPUTS} [ariaLabel]="ariaLabel">JPG of PNG, maximaal 10 MB per bestand</tilburg-file-input>`,
  }),
};

export default meta;
type Story = StoryObj<TilburgFileInput>;

export const Default: Story = { name: 'Default', parameters: story(storyDescriptions.default) };

/* In a form: a label, and the hint as a form field description that the input is described by. */
export const WithLabel: Story = {
  name: 'With a label and a description',
  parameters: story(
    'A `<tilburg-form-label>` names the input through its `id`, and `ariaDescribedBy` points to the description.',
  ),
  render: (args) => ({
    props: args,
    template: `
      <tilburg-form-label for="file-angular-label">Foto van de situatie</tilburg-form-label>
      <tilburg-form-field-description id="file-angular-label-description">JPG of PNG, maximaal 10 MB per bestand.</tilburg-form-field-description>
      <tilburg-file-input id="file-angular-label" ariaDescribedBy="file-angular-label-description" ${INPUTS}></tilburg-file-input>`,
  }),
};

export const Invalid: Story = { args: { invalid: true }, parameters: story(storyDescriptions.invalid) };

export const Busy: Story = { args: { busy: true }, parameters: story(storyDescriptions.busy) };

export const Disabled: Story = { args: { disabled: true }, parameters: story(storyDescriptions.disabled) };

/* Upload right away: no list in the component, busy while the pretend upload runs, the result in the app's own list. */
export const Upload: Story = {
  name: 'Upload right away',
  parameters: { ...story(storyDescriptions.upload), controls: { disable: true } },
  render: () => {
    const props = {
      busy: false,
      uploaded: [] as string[],
      upload(files: File[]) {
        props.busy = true;
        setTimeout(() => {
          props.uploaded = [...props.uploaded, ...files.map((file) => file.name)];
          props.busy = false;
        }, 1500);
      },
    };
    return {
      props,
      template: `
        <tilburg-file-input [multiple]="true" [showFiles]="false" [busy]="busy" ariaLabel="Bijlage toevoegen" (filesChange)="upload($event)"></tilburg-file-input>
        <tilburg-unordered-list *ngIf="uploaded.length">
          <li *ngFor="let name of uploaded">{{ name }} is geüpload</li>
        </tilburg-unordered-list>`,
    };
  },
};
