/* @license CC0-1.0 */

import { TilburgFigure } from '@gemeente-tilburg/components-angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description } from '../../storybook-shared/src/tilburg-figure.examples';

const meta: Meta<TilburgFigure> = {
  title: 'Tilburg Angular/Figure',
  id: 'tilburg-figure-angular',
  component: TilburgFigure,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj<TilburgFigure>;

export const Default: Story = {
  name: 'Default',
  render: () => ({
    template: `
      <tilburg-figure caption="Het logo van Gemeente Tilburg.">
        <tilburg-image src="logo.svg" alt="Logo van Gemeente Tilburg" width="240"></tilburg-image>
      </tilburg-figure>
    `,
  }),
};

export const WithoutCaption: Story = {
  name: 'Without caption',
  render: () => ({
    template: `
      <tilburg-figure>
        <tilburg-image src="logo.svg" alt="Logo van Gemeente Tilburg" width="240"></tilburg-image>
      </tilburg-figure>
    `,
  }),
};
