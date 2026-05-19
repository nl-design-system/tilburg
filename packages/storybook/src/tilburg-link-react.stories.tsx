/* @license CC0-1.0 */

import { Link } from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Tilburg React/Link',
  id: 'tilburg-link-react',
  component: Link,
  tags: ['autodocs'],
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPermutations: Story = {
  render: () => (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <li>
        <Link href="/foo">Standaard interne link</Link>
      </li>
      <li>
        <Link href="https://example.com" external>
          Externe link (rel=external noopener noreferrer)
        </Link>
      </li>
      <li>
        <Link href="#" current="page">
          Link met aria-current=&quot;page&quot;
        </Link>
      </li>
      <li>
        <Link href="#" current="step">
          Link met aria-current=&quot;step&quot;
        </Link>
      </li>
      <li>
        <Link href="#" current="location">
          Link met aria-current=&quot;location&quot;
        </Link>
      </li>
      <li>
        <Link href="/foo" target="_blank" rel="noopener">
          Link met target=_blank
        </Link>
      </li>
    </ul>
  ),
};

export const Default: Story = { render: () => <Link href="/foo">Naar volgende pagina</Link> };
export const External: Story = {
  render: () => (
    <Link href="https://example.com" external>
      Externe link
    </Link>
  ),
};
export const Current: Story = {
  render: () => (
    <Link href="#" current="page">
      Huidige pagina
    </Link>
  ),
};
