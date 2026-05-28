/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Tilburg/Document',
  id: 'tilburg-document',
  tags: ['autodocs'],
  parameters: {
    bugs: 'https://github.com/nl-design-system/tilburg/labels/component%2Fdocument',
    docs: {
      description: {
        component: `Top-level document scope: sets the default font family, body text colour, and link colour that everything inside the page inherits. Apply once near the root of the app so child components pick up the Tilburg typography defaults via the \`--tilburg-document-*\` token chain.

## Usage

### Angular

\`\`\`html
<tilburg-document>
  <tilburg-page>…</tilburg-page>
</tilburg-document>
\`\`\`

### Plain HTML / CSS

\`\`\`html
<div class="utrecht-document">
  <!-- everything inside inherits the Tilburg body font + colour -->
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
  name: 'Document scope',
  render: () => (
    <div className="utrecht-document" style={{ padding: '1rem', maxWidth: '32rem' }}>
      <p className="utrecht-paragraph">
        Tekst binnen een <code>utrecht-document</code> erft de Tilburg-typografie en body-kleur via de design tokens.
      </p>
    </div>
  ),
};
