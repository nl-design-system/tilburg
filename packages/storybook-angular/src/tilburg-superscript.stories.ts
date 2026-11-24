/* @license CC0-1.0 */

import { TilburgSuperscript } from '@gemeente-tilburg/components-angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description } from '../../storybook-shared/src/tilburg-superscript.examples';

const meta: Meta<TilburgSuperscript> = {
  title: 'Tilburg Angular/Superscript',
  id: 'tilburg-superscript-angular',
  component: TilburgSuperscript,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj<TilburgSuperscript>;

export const Default: Story = {
  name: 'Default',
  render: () => ({
    template: `
      <tilburg-paragraph>
        Een dakkapel aan de achterkant tot 4 m<tilburg-superscript>2</tilburg-superscript> is meestal vergunningvrij.
      </tilburg-paragraph>
    `,
  }),
};
