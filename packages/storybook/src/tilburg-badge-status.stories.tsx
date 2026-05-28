/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Tilburg/Badge Status',
  id: 'tilburg-badge-status',
  tags: ['autodocs'],
  parameters: {
    bugs: 'https://github.com/nl-design-system/tilburg/labels/component%2Fbadge-status',
    docs: {
      description: {
        component: `Small inline badge that conveys a status (info / success / warning / error). Renders an \`aria-live\` region so screen readers announce the status when it changes.

## Usage

### Angular

\`\`\`html
<tilburg-badge-status status="success">Goedgekeurd</tilburg-badge-status>
\`\`\`

Inputs: \`status\` (\`'info' | 'success' | 'warning' | 'error'\`), \`liveRegion\`, \`ariaLabel\`.

### Plain HTML / CSS

\`\`\`html
<span class="utrecht-badge-status utrecht-badge-status--success" role="status">Goedgekeurd</span>
\`\`\`
`,
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const All: Story = {
  name: 'All four status types',
  render: () => (
    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
      <span className="utrecht-badge-status utrecht-badge-status--info" role="status">
        In behandeling
      </span>
      <span className="utrecht-badge-status utrecht-badge-status--success" role="status">
        Goedgekeurd
      </span>
      <span className="utrecht-badge-status utrecht-badge-status--warning" role="status">
        Aandacht vereist
      </span>
      <span className="utrecht-badge-status utrecht-badge-status--error" role="status">
        Afgewezen
      </span>
    </div>
  ),
};
