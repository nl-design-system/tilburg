/* @license CC0-1.0 */

import { TilburgBackdrop } from '@gemeente-tilburg/components-angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description } from '../../storybook-shared/src/tilburg-backdrop.examples';

const meta: Meta<TilburgBackdrop> = {
  title: 'Tilburg Angular/Backdrop',
  id: 'tilburg-backdrop-angular',
  component: TilburgBackdrop,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj<TilburgBackdrop>;

export const Default: Story = {
  name: 'Default',
  render: () => ({
    template: `
      <div style="position:relative;max-inline-size:32rem;padding:1rem">
        <tilburg-paragraph>Je aanvraag wordt verstuurd. De inhoud van het formulier is even niet te gebruiken.</tilburg-paragraph>
        <tilburg-paragraph>Sluit dit venster niet.</tilburg-paragraph>
        <tilburg-backdrop></tilburg-backdrop>
      </div>
    `,
  }),
};
