/* @license CC0-1.0 */

import { ToptaskLink, ToptaskNav } from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { tasks } from '../../storybook-shared/src/tilburg-toptask-link.examples';
import { bugs, descriptionReact } from '../../storybook-shared/src/tilburg-toptask-nav.examples';

const meta = {
  title: 'Tilburg React/Toptask Nav',
  id: 'tilburg-toptask-nav-react',
  component: ToptaskNav,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionReact } },
  },
} satisfies Meta<typeof ToptaskNav>;

export default meta;
type Story = StoryObj<typeof meta>;

/* The shared examples hold the icons as SVG strings. */
const Icon = ({ svg }: { svg: string }) => (
  <span style={{ display: 'contents' }} dangerouslySetInnerHTML={{ __html: svg }} />
);

const links = tasks.map(([href, title, icon]) => (
  <ToptaskLink key={href} href={href} icon={<Icon svg={icon} />}>
    {title}
  </ToptaskLink>
));

export const Grid: Story = {
  render: () => <ToptaskNav grid>{links}</ToptaskNav>,
};

export const Stacked: Story = {
  render: () => (
    <div style={{ maxInlineSize: '20rem' }}>
      <ToptaskNav>{links}</ToptaskNav>
    </div>
  ),
};
