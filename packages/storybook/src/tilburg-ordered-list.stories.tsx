/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Tilburg/Ordered List',
  id: 'tilburg-ordered-list',
  tags: ['autodocs'],
  parameters: {
    bugs: 'https://github.com/nl-design-system/tilburg/labels/component%2Fordered-list',
    docs: {
      description: {
        component: `Numbered list built on \`.tilburg-ordered-list\` + \`.utrecht-ordered-list__item\`. The Tilburg layer adds a \`--by-letter\` modifier that switches the marker to lower-case alphabet (\`a, b, c, …\`) and inherits utrecht spacing tokens for the list items.

## Usage

### Angular

\`\`\`html
<tilburg-ordered-list [byLetter]="true">
  <li class="utrecht-ordered-list__item">Eerste stap</li>
  <li class="utrecht-ordered-list__item">Tweede stap</li>
  <li class="utrecht-ordered-list__item">Derde stap</li>
</tilburg-ordered-list>
\`\`\`

Inputs: \`byLetter\` (boolean — switches markers from decimal to lower-alpha).

### Plain HTML / CSS

\`\`\`html
<ol class="tilburg-ordered-list utrecht-ordered-list utrecht-ordered-list--html-ol">
  <li class="utrecht-ordered-list__item">Eerste stap</li>
  <li class="utrecht-ordered-list__item">Tweede stap</li>
</ol>

<!-- Lettered markers -->
<ol class="tilburg-ordered-list tilburg-ordered-list--by-letter utrecht-ordered-list utrecht-ordered-list--html-ol">
  …
</ol>
\`\`\`
`,
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Default (decimal)',
  render: () => (
    <ol className="tilburg-ordered-list utrecht-ordered-list utrecht-ordered-list--html-ol">
      <li className="utrecht-ordered-list__item">Gemeente Tilburg rekenkamer</li>
      <li className="utrecht-ordered-list__item">Gemeente Tilburg college</li>
      <li className="utrecht-ordered-list__item">Gemeente Tilburg contact</li>
    </ol>
  ),
};

export const ByLetter: Story = {
  name: 'By letter (a, b, c, …)',
  render: () => (
    <ol className="tilburg-ordered-list tilburg-ordered-list--by-letter utrecht-ordered-list utrecht-ordered-list--html-ol">
      <li className="utrecht-ordered-list__item">Eerste stap</li>
      <li className="utrecht-ordered-list__item">Tweede stap</li>
      <li className="utrecht-ordered-list__item">Derde stap</li>
    </ol>
  ),
};
