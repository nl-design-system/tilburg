/* @license CC0-1.0 */

import { TilburgWebcLink } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-link.examples';

const meta = {
  title: 'Tilburg Web Components/Link',
  id: 'tilburg-link-webc',
  component: TilburgWebcLink,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWebcLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPermutations: Story = {
  render: () => (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <li>
        <TilburgWebcLink href="/foo">Standaard interne link</TilburgWebcLink>
      </li>
      <li>
        <TilburgWebcLink href="https://example.com" external>
          Externe link (rel=external noopener noreferrer)
        </TilburgWebcLink>
      </li>
      <li>
        <TilburgWebcLink href="#" current="page">
          Link met aria-current=&quot;page&quot;
        </TilburgWebcLink>
      </li>
      <li>
        <TilburgWebcLink href="#" current="step">
          Link met aria-current=&quot;step&quot;
        </TilburgWebcLink>
      </li>
      <li>
        <TilburgWebcLink href="#" current="location">
          Link met aria-current=&quot;location&quot;
        </TilburgWebcLink>
      </li>
      <li>
        <TilburgWebcLink href="/foo" target="_blank" rel="noopener">
          Link met target=_blank
        </TilburgWebcLink>
      </li>
    </ul>
  ),
};

export const Default: Story = { render: () => <TilburgWebcLink href="/foo">Naar volgende pagina</TilburgWebcLink> };
export const External: Story = {
  render: () => (
    <TilburgWebcLink href="https://example.com" external>
      Externe link
    </TilburgWebcLink>
  ),
};
export const Current: Story = {
  render: () => (
    <TilburgWebcLink href="#" current="page">
      Huidige pagina
    </TilburgWebcLink>
  ),
};
