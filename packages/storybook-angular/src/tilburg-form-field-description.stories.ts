/* @license CC0-1.0 */

import { TilburgFormFieldDescription } from '@gemeente-tilburg/components-angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description } from '../../storybook-shared/src/tilburg-form-field-description.examples';

const meta: Meta<TilburgFormFieldDescription> = {
  title: 'Tilburg Angular/Form Field Description',
  id: 'tilburg-form-field-description-angular',
  component: TilburgFormFieldDescription,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj<TilburgFormFieldDescription>;

export const Default: Story = {
  name: 'Default',
  render: () => ({
    template: `<tilburg-form-field-description>We gebruiken dit alleen om je te bereiken.</tilburg-form-field-description>`,
  }),
};

export const Invalid: Story = {
  name: 'Invalid (error)',
  args: { invalid: true },
  render: (args) => ({
    props: args,
    template: `<tilburg-form-field-description [invalid]="invalid">Vul een geldig e-mailadres in.</tilburg-form-field-description>`,
  }),
};

export const Warning: Story = {
  name: 'Warning',
  args: { warning: true },
  render: (args) => ({
    props: args,
    template: `<tilburg-form-field-description [warning]="warning">De aanvraagperiode sluit binnenkort.</tilburg-form-field-description>`,
  }),
};
