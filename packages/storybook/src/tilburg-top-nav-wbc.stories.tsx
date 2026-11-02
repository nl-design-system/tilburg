/* @license CC0-1.0 */

import { TilburgWbcTopNav } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-top-nav.examples';

/* Stencil `<tilburg-wbc-top-nav>` rendered through its generated React proxy.
   The custom elements themselves are registered once in `config/preview.tsx`
   (`defineCustomElements()`). */

const meta = {
  title: 'Tilburg Web Components/Top Nav',
  id: 'tilburg-top-nav-wbc',
  component: TilburgWbcTopNav,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWbcTopNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPermutations: Story = {
  render: () => (
    <TilburgWbcTopNav
      items={[
        { label: 'Home', href: '#' },
        { label: 'Aanvragen', href: '#', current: true },
        { label: 'Mijn zaken', href: '#' },
        { label: 'Contact', href: '#' },
      ]}
    />
  ),
};
