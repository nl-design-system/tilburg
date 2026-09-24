/* @license CC0-1.0 */

import { TilburgWbcArticle } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-article.examples';

/* Stencil `<tilburg-wbc-article>` rendered through its generated React proxy.
   The custom elements themselves are registered once in `config/preview.tsx`
   (`defineCustomElements()`). */

const meta = {
  title: 'Tilburg Web Components/Article',
  id: 'tilburg-article-wbc',
  component: TilburgWbcArticle,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWbcArticle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <TilburgWbcArticle>
      <h2 className="utrecht-heading-2">Een artikel</h2>
      <p className="utrecht-paragraph">Inhoud van het artikel.</p>
      <p className="utrecht-paragraph utrecht-paragraph--small">Geplaatst op 19 mei 2026.</p>
    </TilburgWbcArticle>
  ),
};
