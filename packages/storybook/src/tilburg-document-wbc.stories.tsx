/* @license CC0-1.0 */

import { TilburgWbcDocument } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-document.examples';

/* Stencil `<tilburg-wbc-document>` rendered through its generated React proxy.
   The custom elements themselves are registered once in `config/preview.tsx`
   (`defineCustomElements()`). */

const meta = {
  title: 'Tilburg Web Components/Document',
  id: 'tilburg-document-wbc',
  component: TilburgWbcDocument,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWbcDocument>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <TilburgWbcDocument>
      <h1 className="utrecht-heading-1">Document titel</h1>
      <p className="utrecht-paragraph">Tekst binnen een document wrapper.</p>
    </TilburgWbcDocument>
  ),
};
