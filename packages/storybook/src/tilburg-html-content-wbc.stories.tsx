/* @license CC0-1.0 */

import { TilburgWbcHtmlContent } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-html-content.examples';

/* Stencil `<tilburg-wbc-html-content>` rendered through its generated React proxy. */

const meta = {
  title: 'Tilburg Web Components/HTML Content',
  id: 'tilburg-html-content-wbc',
  component: TilburgWbcHtmlContent,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWbcHtmlContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPermutations: Story = {
  render: () => (
    <TilburgWbcHtmlContent lang="nl">
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
    </TilburgWbcHtmlContent>
  ),
};

/* CMS string through the `html` prop. The `<script>` and the `onclick`
   handler are stripped by the built-in sanitizer. */
const cmsHtml = `<h2>Uit het CMS</h2>
<p onclick="alert('xss')">CMS-geleverde HTML krijgt automatisch de Tilburg-typografie.</p>
<script>alert('xss')</script>
<ul><li>Punt één</li><li>Punt twee</li></ul>
<p>Met <a href="https://www.tilburg.nl">een link</a>.</p>`;

export const HtmlProp: Story = {
  name: 'HTML string (html prop)',
  render: () => <TilburgWbcHtmlContent lang="nl" html={cmsHtml} />,
};
