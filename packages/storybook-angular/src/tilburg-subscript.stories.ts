/* @license CC0-1.0 */

import { TilburgSubscript } from '@gemeente-tilburg/components-angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description } from '../../storybook-shared/src/tilburg-subscript.examples';

const meta: Meta<TilburgSubscript> = {
  title: 'Tilburg Angular/Subscript',
  id: 'tilburg-subscript-angular',
  component: TilburgSubscript,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj<TilburgSubscript>;

export const Default: Story = {
  name: 'Default',
  render: () => ({
    template: `
      <tilburg-paragraph>
        Tilburg wil de uitstoot van CO<tilburg-subscript>2</tilburg-subscript> in 2030 met de helft verminderen.
      </tilburg-paragraph>
    `,
  }),
};

export const OpenType: Story = {
  name: 'OpenType glyphs',
  render: () => ({
    template: `
      <tilburg-paragraph>
        Tilburg wil de uitstoot van CO<tilburg-subscript [openType]="true">2</tilburg-subscript> in 2030 met de helft
        verminderen.
      </tilburg-paragraph>
    `,
  }),
};
