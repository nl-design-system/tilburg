/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';
import { createElement, type ReactNode } from 'react';

const meta = {
  title: 'Tilburg/Heading',
  id: 'tilburg-heading',
  tags: ['autodocs'],
  parameters: {
    bugs: 'https://github.com/nl-design-system/tilburg/labels/component%2Fheading',
    docs: {
      description: {
        component: `Headings 1–6 use Tilburg responsive font-size tokens: a large-viewport size by default and a small-viewport size below 768px. The outer \`<utrecht-heading-N>\` custom element triggers the Tilburg \`--utrecht-heading-N-font-size\` override; the inner \`<hN class="utrecht-heading-N">\` is what utrecht-css's font-size rule reads.

## Usage

### Angular

\`\`\`html
<tilburg-heading-1>Page title</tilburg-heading-1>
<tilburg-heading-2>Section title</tilburg-heading-2>
<tilburg-heading-3>Subsection title</tilburg-heading-3>
\`\`\`

The Tilburg wrapper renders \`<utrecht-heading-N>\` and projects the text into an inner \`<hN class="utrecht-heading-N">\` so both the Tilburg responsive sizing and utrecht-css typography apply.

### Plain HTML / CSS

\`\`\`html
<utrecht-heading-1>
  <h1 class="utrecht-heading-1">Page title</h1>
</utrecht-heading-1>
\`\`\`

The custom element is required: \`utrecht-heading-N { --utrecht-heading-N-font-size: var(--tilburg-heading-N-…) }\` only matches when the element is present.
`,
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const Heading = ({ level, children }: { level: 1 | 2 | 3 | 4 | 5 | 6; children: ReactNode }) =>
  createElement(
    `utrecht-heading-${level}`,
    null,
    createElement(`h${level}`, { className: `utrecht-heading-${level}` }, children),
  );

export const AllLevels: Story = {
  name: 'All six levels',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Heading level={1}>Heading 1 — Tilburg</Heading>
      <Heading level={2}>Heading 2 — Tilburg</Heading>
      <Heading level={3}>Heading 3 — Tilburg</Heading>
      <Heading level={4}>Heading 4 — Tilburg</Heading>
      <Heading level={5}>Heading 5 — Tilburg</Heading>
      <Heading level={6}>Heading 6 — Tilburg</Heading>
    </div>
  ),
};
