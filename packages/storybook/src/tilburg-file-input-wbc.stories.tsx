/* @license CC0-1.0 */

import { TilburgWbcFileInput } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  argDescriptions,
  bugs,
  descriptionWebComponents,
  storyDescriptions,
} from '../../storybook-shared/src/tilburg-file-input.examples';

/* Stencil `<tilburg-wbc-file-input>` rendered through its generated React proxy (built by web-components-react). */

const story = (text: string) => ({ docs: { description: { story: text } } });

const meta = {
  title: 'Tilburg Web Components/File Input',
  id: 'tilburg-file-input-wbc',
  component: TilburgWbcFileInput,
  tags: ['autodocs', 'tilburg'],
  args: {
    multiple: true,
    accept: 'image/*',
    disabled: false,
    invalid: false,
    required: false,
    showFiles: true,
    busy: false,
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
    dropLabel: { control: 'text', description: argDescriptions.dropLabel, table: { category: 'Texts' } },
    buttonLabel: { control: 'text', description: argDescriptions.buttonLabel, table: { category: 'Texts' } },
    busyLabel: { control: 'text', description: argDescriptions.busyLabel, table: { category: 'Texts' } },
    onTilburgFilesChange: {
      action: 'tilburgFilesChange',
      description: `${argDescriptions.filesChange} In \`event.detail\`.`,
      table: { category: 'Events' },
    },
  },
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
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
        'dropLabel',
        'buttonLabel',
        'busyLabel',
        'onTilburgFilesChange',
      ],
    },
  },
  render: (args) => <TilburgWbcFileInput {...args}>JPG of PNG, maximaal 10 MB per bestand</TilburgWbcFileInput>,
} satisfies Meta<typeof TilburgWbcFileInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { parameters: story(storyDescriptions.default) };

export const Invalid: Story = { args: { invalid: true }, parameters: story(storyDescriptions.invalid) };

export const Busy: Story = { args: { busy: true }, parameters: story(storyDescriptions.busy) };

export const Disabled: Story = { args: { disabled: true }, parameters: story(storyDescriptions.disabled) };
