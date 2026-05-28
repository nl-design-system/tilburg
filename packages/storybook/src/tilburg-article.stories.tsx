/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Tilburg/Article',
  id: 'tilburg-article',
  tags: ['autodocs'],
  parameters: {
    bugs: 'https://github.com/nl-design-system/tilburg/labels/component%2Farticle',
    docs: {
      description: {
        component: `Self-contained content block (a news item, FAQ entry, product description) rendered as an \`<article>\` so assistive tech treats it as a landmark with its own boundaries.

## Usage

### Angular

\`\`\`html
<tilburg-article>
  <tilburg-heading-2>Vergunningen</tilburg-heading-2>
  <tilburg-paragraph>…</tilburg-paragraph>
</tilburg-article>
\`\`\`

### Plain HTML / CSS

\`\`\`html
<article class="utrecht-article">
  <!-- self-contained content -->
</article>
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
    <article className="utrecht-article" style={{ maxWidth: '32rem' }}>
      <h2 className="utrecht-heading-2">Vergunning aanvragen</h2>
      <p className="utrecht-paragraph">
        U kunt een vergunning aanvragen via het online formulier op deze website. Vul alle verplichte velden in en
        upload de benodigde documenten.
      </p>
    </article>
  ),
};
