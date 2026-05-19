/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Tilburg/HTML Content',
  id: 'tilburg-html-content',
  tags: ['autodocs'],
  parameters: {
    bugs: 'https://github.com/nl-design-system/tilburg/labels/component%2Fhtml-content',
    docs: {
      description: {
        component: `Wraps arbitrary HTML (typically CMS-authored) so Tilburg typography and link styling apply to the rendered tags (\`<p>\`, \`<ul>\`, \`<a>\`, \`<strong>\`, etc.) without requiring per-tag class names.

## Usage

### Angular

\`\`\`html
<tilburg-html-content [lang]="'nl'" [innerHTML]="cmsHtml"></tilburg-html-content>
\`\`\`

Inputs: \`lang\` (BCP-47 language tag for the content).

### Plain HTML / CSS

\`\`\`html
<div class="utrecht-html-content" lang="nl">
  <p>CMS-geleverde HTML krijgt automatisch de Tilburg-typografie.</p>
  <ul><li>Punt één</li><li>Punt twee</li></ul>
</div>
\`\`\`
`,
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Default',
  render: () => (
    <div className="utrecht-html-content" lang="nl" style={{ maxWidth: '32rem' }}>
      <p>CMS-geleverde HTML krijgt automatisch de Tilburg-typografie zonder per tag een class te zetten.</p>
      <ul>
        <li>Eerste item</li>
        <li>Tweede item</li>
      </ul>
      <p>
        Inline <strong>nadruk</strong> en <a href="#">links</a> werken zoals verwacht.
      </p>
    </div>
  ),
};
