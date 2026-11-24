/* @license CC0-1.0 */

import { TilburgWbcToptaskLink, TilburgWbcToptaskNav } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { tasks } from '../../storybook-shared/src/tilburg-toptask-link.examples';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-toptask-nav.examples';

/* Stencil `<tilburg-wbc-toptask-nav>` rendered through its generated React proxy.
   The custom elements themselves are registered once in `config/preview.tsx`
   (`defineCustomElements()`). */

const meta = {
  title: 'Tilburg Web Components/Toptask Nav',
  id: 'tilburg-toptask-nav-wbc',
  component: TilburgWbcToptaskNav,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWbcToptaskNav>;

export default meta;
type Story = StoryObj<typeof meta>;

/* The shared examples hold the icons as SVG strings. */
const Icon = ({ svg, slot }: { svg: string; slot?: string }) => (
  <span slot={slot} style={{ display: 'contents' }} dangerouslySetInnerHTML={{ __html: svg }} />
);

const links = tasks.map(([href, title, icon]) => (
  <TilburgWbcToptaskLink key={href} href={href}>
    <Icon slot="icon" svg={icon} />
    {title}
  </TilburgWbcToptaskLink>
));

export const Grid: Story = {
  render: () => <TilburgWbcToptaskNav grid>{links}</TilburgWbcToptaskNav>,
};

export const Stacked: Story = {
  render: () => (
    <div style={{ maxInlineSize: '20rem' }}>
      <TilburgWbcToptaskNav>{links}</TilburgWbcToptaskNav>
    </div>
  ),
};
