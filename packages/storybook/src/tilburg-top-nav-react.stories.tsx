/* @license CC0-1.0 */

import { TopNav } from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionReact } from '../../storybook-shared/src/tilburg-top-nav.examples';

const meta = {
  title: 'Tilburg React/Top Nav',
  id: 'tilburg-top-nav-react',
  component: TopNav,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionReact } },
  },
} satisfies Meta<typeof TopNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPermutations: Story = {
  render: () => (
    <TopNav
      items={[
        { label: 'Home', href: '#' },
        { label: 'Aanvragen', href: '#', current: true },
        { label: 'Mijn zaken', href: '#' },
        { label: 'Contact', href: '#' },
      ]}
    />
  ),
};
