/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Tilburg/Counter Badge',
  id: 'tilburg-badge-counter',
  tags: ['autodocs'],
  parameters: {
    bugs: 'https://github.com/nl-design-system/tilburg/labels/component%2Fbadge-counter',
    docs: {
      description: {
        component: `Small inline counter for unread notifications, message counts, or cart items. Tilburg theme paints it in the brand pink accent (\`--tilburg-color-pink-300\`) with white text for a vibrant notification dot.

## Usage

### Plain HTML / CSS

\`\`\`html
<a class="utrecht-link" href="/berichten">
  Berichten
  <span class="utrecht-badge-counter" aria-label="9 ongelezen berichten">9</span>
</a>
\`\`\`

Pair the badge with an \`aria-label\` so screen readers announce what the number means. The badge itself is just visual decoration on top of a link / button / nav-item.
`,
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {
  name: 'Single digit',
  render: () => <span className="utrecht-badge-counter">9</span>,
};

export const Double: Story = {
  name: 'Double digits',
  render: () => <span className="utrecht-badge-counter">42</span>,
};

export const Triple: Story = {
  name: 'Triple digits',
  render: () => <span className="utrecht-badge-counter">128</span>,
};

export const Overflow: Story = {
  name: 'Overflow (99+)',
  render: () => <span className="utrecht-badge-counter">99+</span>,
};

export const InContext: Story = {
  name: 'On a link (with aria-label)',
  render: () => (
    <a className="utrecht-link utrecht-link--html-a" href="#">
      Berichten{' '}
      <span className="utrecht-badge-counter" aria-label="9 ongelezen berichten">
        9
      </span>
    </a>
  ),
};
