/* @license CC0-1.0 */

import { TilburgWbcCodeBlock } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-code-block.examples';

/* Stencil `<tilburg-wbc-code-block>` rendered through its generated React proxy.
   The custom elements themselves are registered once in `config/preview.tsx`
   (`defineCustomElements()`). */

const meta = {
  title: 'Tilburg Web Components/Code Block',
  id: 'tilburg-code-block-wbc',
  component: TilburgWbcCodeBlock,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWbcCodeBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <TilburgWbcCodeBlock>npm install @gemeente-tilburg/components-css</TilburgWbcCodeBlock>,
};

export const Multiline: Story = {
  name: 'Multiple lines',
  render: () => (
    <TilburgWbcCodeBlock>
      {`<html lang="nl" class="tilburg-theme">
  <body class="utrecht-document">
    <h1 class="utrecht-heading-1">Afvalkalender</h1>
  </body>
</html>`}
    </TilburgWbcCodeBlock>
  ),
};
