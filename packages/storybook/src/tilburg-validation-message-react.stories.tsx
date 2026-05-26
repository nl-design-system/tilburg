/* @license CC0-1.0 */

import { ValidationMessage } from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, description } from '../../storybook-shared/src/tilburg-validation-message.examples';

const meta = {
  title: 'Tilburg React/Validation Message',
  id: 'tilburg-validation-message-react',
  component: ValidationMessage,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
} satisfies Meta<typeof ValidationMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

const Bang = () => <span aria-hidden="true">!</span>;

export const AllPermutations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <ValidationMessage type="error">Error — dit veld is verplicht.</ValidationMessage>
      <ValidationMessage type="error" icon={<Bang />}>
        Error met icoon — vul een geldig e-mailadres in.
      </ValidationMessage>
      <ValidationMessage type="warning">Warning — deze waarde is ongebruikelijk.</ValidationMessage>
      <ValidationMessage type="warning" icon={<Bang />}>
        Warning met icoon — controleer je invoer.
      </ValidationMessage>
    </div>
  ),
};
