/* @license CC0-1.0 */

import { TilburgWbcFigure, TilburgWbcImage } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-figure.examples';

/* Stencil `<tilburg-wbc-figure>` rendered through its generated React proxy.
   The custom elements themselves are registered once in `config/preview.tsx`
   (`defineCustomElements()`). */

const meta = {
  title: 'Tilburg Web Components/Figure',
  id: 'tilburg-figure-wbc',
  component: TilburgWbcFigure,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWbcFigure>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPermutations: Story = {
  render: () => (
    <>
      <TilburgWbcFigure caption="Het logo van Gemeente Tilburg.">
        <TilburgWbcImage src="logo.svg" alt="Logo van Gemeente Tilburg" width={240} />
      </TilburgWbcFigure>
      <TilburgWbcFigure>
        <TilburgWbcImage src="logo.svg" alt="Logo van Gemeente Tilburg" width={240} />
      </TilburgWbcFigure>
    </>
  ),
};
