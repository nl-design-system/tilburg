/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Tilburg/Separator',
  id: 'tilburg-separator',
  tags: ['autodocs'],
  parameters: {
    bugs: 'https://github.com/nl-design-system/tilburg/labels/component%2Fseparator',
    docs: {
      description: {
        component: `Thin horizontal divider between content sections, using \`--tilburg-line-border-color\` and \`--tilburg-line-border-width\`. Pass \`decorative\` for purely visual dividers so the element is hidden from assistive technology.

## Usage

### Angular

\`\`\`html
<tilburg-separator [decorative]="true"></tilburg-separator>
\`\`\`

Inputs: \`decorative\` (when \`true\`, sets \`aria-hidden\` so screen readers skip the divider).

### Plain HTML / CSS

\`\`\`html
<hr class="utrecht-separator" aria-hidden="true" />
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
    <div style={{ maxWidth: '32rem' }}>
      <p className="utrecht-paragraph">Eerste sectie met wat tekst boven de scheidingslijn.</p>
      <hr className="utrecht-separator" />
      <p className="utrecht-paragraph">Tweede sectie onder de scheidingslijn.</p>
    </div>
  ),
};

export const Decorative: Story = {
  name: 'Decorative (aria-hidden)',
  render: () => (
    <div style={{ maxWidth: '32rem' }}>
      <p className="utrecht-paragraph">Aanvraagdetails</p>
      <hr className="utrecht-separator" aria-hidden="true" />
      <p className="utrecht-paragraph">Contactgegevens</p>
    </div>
  ),
};
