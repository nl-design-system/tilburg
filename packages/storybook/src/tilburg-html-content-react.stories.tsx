/* @license CC0-1.0 */

import { HtmlContent } from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Tilburg React/HTML Content',
  id: 'tilburg-html-content-react',
  component: HtmlContent,
  tags: ['autodocs'],
} satisfies Meta<typeof HtmlContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPermutations: Story = {
  render: () => (
    <HtmlContent lang="nl">
      <h2>Voorbeeld</h2>
      <p>
        Een blok met <strong>rijke tekst</strong> die de Tilburg-typografie toepast op standaard HTML-tags zoals
        <em> em</em>, <strong>strong</strong> en <a href="#">links</a>.
      </p>
      <h3>Ongeordende lijst</h3>
      <ul>
        <li>Eerste</li>
        <li>Tweede</li>
        <li>Derde</li>
      </ul>
      <h3>Geordende lijst</h3>
      <ol>
        <li>Stap 1</li>
        <li>Stap 2</li>
      </ol>
    </HtmlContent>
  ),
};
