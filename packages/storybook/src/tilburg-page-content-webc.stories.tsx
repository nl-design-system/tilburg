/* @license CC0-1.0 */

import { TilburgWebcPageContent } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-page-content.examples';

/* Stencil `<tilburg-webc-page-content>` rendered through its generated React proxy.
   The custom elements themselves are registered once in `config/preview.tsx`
   (`defineCustomElements()`). */

const meta = {
  title: 'Tilburg Web Components/Page Content',
  id: 'tilburg-page-content-webc',
  component: TilburgWebcPageContent,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWebcPageContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <TilburgWebcPageContent>
      <h2 className="utrecht-heading-2">Sectie titel</h2>
      <p className="utrecht-paragraph">Hoofdinhoud van de pagina, geplaatst binnen Page Content.</p>
    </TilburgWebcPageContent>
  ),
};
