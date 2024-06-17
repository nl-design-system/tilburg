/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';
import {
  Checkbox,
  FormField,
  FormFieldDescription,
  FormFieldErrorMessage,
  FormLabel,
  Paragraph,
  Select,
  SelectOption,
  Textbox,
} from '@utrecht/component-library-react/dist/css-module';
import readme from './documentation/form-field.md?raw';

const meta = {
  title: 'CSS Component/Forms',
  id: 'css-utrecht-form-field',
  component: FormField,
  argTypes: {
    children: {
      name: 'Content',
      type: {
        name: 'string',
        required: true,
      },
      defaultValue: '',
    },
  },
  args: {
    children: '',
  },
  tags: ['autodocs'],
  parameters: {
    bugs: 'https://github.com/nl-design-system/rotterdam/labels/component%2Fbreadcrumb-nav',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/ZWSC4gCrOXRUR9UX3aoZ8x/?node-id=501-18760',
    },
    docs: {
      description: {
        component: readme,
      },
    },
  },
} satisfies Meta<typeof FormField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Form Field',
  args: {
    type: 'text',
    children: [
      <FormLabel key="label">Label</FormLabel>,
      <FormFieldDescription key="description">Description</FormFieldDescription>,
      <Textbox key="textbox" />,
    ],
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/ZWSC4gCrOXRUR9UX3aoZ8x/Gemeente-Rotterdam-Design-System?type=design&node-id=507-20062&mode=design&t=yvzUSkFQYQmWSHsQ-4',
    },
  },
};

export const Error: Story = {
  name: 'Form Field with error',
  args: {
    type: 'text',
    children: [
      <FormLabel key="label">Label</FormLabel>,
      <FormFieldDescription key="description">Description</FormFieldDescription>,
      <FormFieldErrorMessage key="error">Error message</FormFieldErrorMessage>,
      <Textbox key="textbox" />,
    ],
  },
};

export const CheckboxField: Story = {
  name: 'Checkbox',
  args: {
    type: 'checkbox',
    children: [
      <Paragraph className="utrecht-form-field__label utrecht-form-field__label--checkbox">
        <FormLabel key="label" type="checkbox">
          <Checkbox className="utrecht-form-field__input" key="checkbox" name="consent" value="consent" />
          Label
        </FormLabel>
      </Paragraph>,
    ],
  },
};

export const SelectField: Story = {
  name: 'Select',
  args: {
    type: 'select',
    children: [
      <Select>
        <SelectOption disabled value="">
          Select an option
        </SelectOption>
        <SelectOption value="1">Option #1</SelectOption>
        <SelectOption value="2">Option #2</SelectOption>
        <SelectOption value="3">Option #3</SelectOption>
        <SelectOption value="4">Option #4</SelectOption>
      </Select>,
    ],
  },
};
