/* @license CC0-1.0 */

import { TilburgMark } from '@gemeente-tilburg/components-angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description } from '../../storybook-shared/src/tilburg-mark.examples';

const meta: Meta<TilburgMark> = {
  title: 'Tilburg Angular/Mark',
  id: 'tilburg-mark-angular',
  component: TilburgMark,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj<TilburgMark>;

export const Default: Story = {
  name: 'Default',
  render: () => ({
    template: `
      <tilburg-paragraph>
        Openingstijden <tilburg-mark>Stadswinkel</tilburg-mark> Stadhuisplein: maandag tot en met vrijdag van 9.00 tot
        17.00 uur.
      </tilburg-paragraph>
    `,
  }),
};
