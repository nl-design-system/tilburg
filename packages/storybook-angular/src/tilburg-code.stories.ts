/* @license CC0-1.0 */

import { TilburgCode } from '@gemeente-tilburg/components-angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description } from '../../storybook-shared/src/tilburg-code.examples';

const meta: Meta<TilburgCode> = {
  title: 'Tilburg Angular/Code',
  id: 'tilburg-code-angular',
  component: TilburgCode,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj<TilburgCode>;

export const Default: Story = {
  name: 'Default',
  render: () => ({
    template: `
      <tilburg-paragraph>
        Upload je bestand als <tilburg-code>.pdf</tilburg-code> of <tilburg-code>.jpg</tilburg-code>, maximaal 10 MB.
      </tilburg-paragraph>
    `,
  }),
};
