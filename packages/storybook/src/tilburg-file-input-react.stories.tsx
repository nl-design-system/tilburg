/* @license CC0-1.0 */

import { FileInput, FormFieldDescription, FormLabel, UnorderedList } from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  argDescriptions,
  bugs,
  descriptionReact,
  storyDescriptions,
} from '../../storybook-shared/src/tilburg-file-input.examples';

const story = (text: string) => ({ docs: { description: { story: text } } });

const meta = {
  title: 'Tilburg React/File Input',
  id: 'tilburg-file-input-react',
  component: FileInput,
  tags: ['autodocs', 'tilburg'],
  args: {
    multiple: true,
    accept: 'image/*',
    disabled: false,
    invalid: false,
    required: false,
    showFiles: true,
    busy: false,
    'aria-label': 'Foto toevoegen',
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
    'aria-label': { control: 'text', description: argDescriptions.ariaLabel },
    dropLabel: { control: 'text', description: argDescriptions.dropLabel, table: { category: 'Texts' } },
    buttonLabel: { control: 'text', description: argDescriptions.buttonLabel, table: { category: 'Texts' } },
    busyLabel: { control: 'text', description: argDescriptions.busyLabel, table: { category: 'Texts' } },
    onFilesChange: { action: 'filesChange', description: argDescriptions.filesChange, table: { category: 'Events' } },
  },
  parameters: {
    bugs,
    docs: { description: { component: descriptionReact } },
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
        'aria-label',
        'dropLabel',
        'buttonLabel',
        'busyLabel',
        'onFilesChange',
      ],
    },
  },
  render: (args) => <FileInput {...args}>JPG of PNG, maximaal 10 MB per bestand</FileInput>,
} satisfies Meta<typeof FileInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { parameters: story(storyDescriptions.default) };

/* In a form: a label, and the hint as a form field description that the input is described by. */
export const WithLabel: Story = {
  name: 'With a label and a description',
  parameters: story('A `<label>` names the input through its `id`, and `aria-describedby` points to the description.'),
  render: (args) => (
    <>
      <FormLabel htmlFor="file-react-label">Foto van de situatie</FormLabel>
      <FormFieldDescription id="file-react-label-description">
        JPG of PNG, maximaal 10 MB per bestand.
      </FormFieldDescription>
      {/* The label names it: no aria-label on top of that. */}
      <FileInput
        id="file-react-label"
        aria-describedby="file-react-label-description"
        {...args}
        aria-label={undefined}
      />
    </>
  ),
};

export const Invalid: Story = { args: { invalid: true }, parameters: story(storyDescriptions.invalid) };

export const Busy: Story = { args: { busy: true }, parameters: story(storyDescriptions.busy) };

export const Disabled: Story = { args: { disabled: true }, parameters: story(storyDescriptions.disabled) };

/* Upload right away: no list in the component, busy while the pretend upload runs, the result in the app's own list. */
export const Upload: Story = {
  name: 'Upload right away',
  parameters: { ...story(storyDescriptions.upload), controls: { disable: true } },
  render: function Render() {
    const [busy, setBusy] = useState(false);
    const [uploaded, setUploaded] = useState<string[]>([]);
    const upload = (files: File[]) => {
      setBusy(true);
      setTimeout(() => {
        setUploaded((names) => [...names, ...files.map((file) => file.name)]);
        setBusy(false);
      }, 1500);
    };
    return (
      <>
        <FileInput multiple showFiles={false} busy={busy} aria-label="Bijlage toevoegen" onFilesChange={upload} />
        {uploaded.length > 0 && (
          <UnorderedList>
            {uploaded.map((name, index) => (
              <li key={index}>{name} is geüpload</li>
            ))}
          </UnorderedList>
        )}
      </>
    );
  },
};
