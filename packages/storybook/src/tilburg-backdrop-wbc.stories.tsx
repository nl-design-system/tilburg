/* @license CC0-1.0 */

import { TilburgWbcBackdrop, TilburgWbcParagraph } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-backdrop.examples';

/* Stencil `<tilburg-wbc-backdrop>` rendered through its generated React proxy. */

const meta = {
  title: 'Tilburg Web Components/Backdrop',
  id: 'tilburg-backdrop-wbc',
  component: TilburgWbcBackdrop,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWbcBackdrop>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div style={{ maxInlineSize: '32rem', padding: '1rem', position: 'relative' }}>
      <TilburgWbcParagraph>
        Je aanvraag wordt verstuurd. De inhoud van het formulier is even niet te gebruiken.
      </TilburgWbcParagraph>
      <TilburgWbcParagraph>Sluit dit venster niet.</TilburgWbcParagraph>
      <TilburgWbcBackdrop {...args} />
    </div>
  ),
};
