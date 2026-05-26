/* @license CC0-1.0 */

import { TilburgValidationMessage } from '@gemeente-tilburg/components-angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description } from '../../storybook-shared/src/tilburg-validation-message.examples';

const meta: Meta<TilburgValidationMessage> = {
  title: 'Tilburg Angular/Validation Message',
  id: 'tilburg-validation-message-angular',
  component: TilburgValidationMessage,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj<TilburgValidationMessage>;

export const Error: Story = {
  name: 'Error',
  args: { type: 'error' },
  render: (args) => ({
    props: args,
    template: `<tilburg-validation-message [type]="type">Vul een geldig e-mailadres in.</tilburg-validation-message>`,
  }),
};

export const Warning: Story = {
  name: 'Warning',
  args: { type: 'warning' },
  render: (args) => ({
    props: args,
    template: `<tilburg-validation-message [type]="type">De aanvraagperiode sluit binnenkort.</tilburg-validation-message>`,
  }),
};
