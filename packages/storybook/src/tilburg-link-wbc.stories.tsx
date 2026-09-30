/* @license CC0-1.0 */

import { TilburgWbcLink } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-link.examples';

const meta = {
  title: 'Tilburg Web Components/Link',
  id: 'tilburg-link-wbc',
  component: TilburgWbcLink,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWbcLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPermutations: Story = {
  render: () => (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <li>
        <TilburgWbcLink href="/foo">Standaard interne link</TilburgWbcLink>
      </li>
      <li>
        <TilburgWbcLink href="https://example.com" external>
          Externe link (rel=external noopener noreferrer)
        </TilburgWbcLink>
      </li>
      <li>
        <TilburgWbcLink href="#" current="page">
          Link met aria-current=&quot;page&quot;
        </TilburgWbcLink>
      </li>
      <li>
        <TilburgWbcLink href="#" current="step">
          Link met aria-current=&quot;step&quot;
        </TilburgWbcLink>
      </li>
      <li>
        <TilburgWbcLink href="#" current="location">
          Link met aria-current=&quot;location&quot;
        </TilburgWbcLink>
      </li>
      <li>
        <TilburgWbcLink href="/foo" target="_blank" rel="noopener">
          Link met target=_blank
        </TilburgWbcLink>
      </li>
    </ul>
  ),
};

export const Default: Story = { render: () => <TilburgWbcLink href="/foo">Naar volgende pagina</TilburgWbcLink> };
export const External: Story = {
  render: () => (
    <TilburgWbcLink href="https://example.com" external>
      Externe link
    </TilburgWbcLink>
  ),
};
export const Current: Story = {
  render: () => (
    <TilburgWbcLink href="#" current="page">
      Huidige pagina
    </TilburgWbcLink>
  ),
};
