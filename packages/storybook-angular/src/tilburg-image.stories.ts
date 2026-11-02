/* @license CC0-1.0 */

import { TilburgImage } from '@gemeente-tilburg/components-angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description } from '../../storybook-shared/src/tilburg-image.examples';

const meta: Meta<TilburgImage> = {
  title: 'Tilburg Angular/Image',
  id: 'tilburg-image-angular',
  component: TilburgImage,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj<TilburgImage>;

export const Default: Story = {
  name: 'Default',
  render: () => ({
    template: `
      <tilburg-image src="logo.svg" alt="Logo van Gemeente Tilburg" width="240"></tilburg-image>
    `,
  }),
};

export const Photo: Story = {
  name: 'Photo (scales down to its container)',
  render: () => ({
    template: `
      <div style="max-width:12rem">
        <tilburg-image src="logo.svg" alt="Logo van Gemeente Tilburg" width="480" [photo]="true"></tilburg-image>
      </div>
    `,
  }),
};

export const Decorative: Story = {
  name: 'Decorative (empty alt)',
  render: () => ({
    template: `
      <tilburg-image src="favicon.svg" alt="" width="48" height="48"></tilburg-image>
    `,
  }),
};
