/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, examples } from '../../storybook-shared/src/tilburg-tokens.examples';

const meta: Meta = {
  title: 'Tokens/Colors',
  id: 'tokens-colors',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    bugs,
  },
};

export default meta;
type Story = StoryObj;

export const Reference: Story = {
  name: 'Reference',
  render: () => ({ template: examples.colors.html }),
};
