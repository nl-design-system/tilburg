/* @license CC0-1.0 */

import { TilburgWbcToptaskLink } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionWebComponents, tasks } from '../../storybook-shared/src/tilburg-toptask-link.examples';

/* Stencil `<tilburg-wbc-toptask-link>` rendered through its generated React proxy.
   The custom elements themselves are registered once in `config/preview.tsx`
   (`defineCustomElements()`). */

const meta = {
  title: 'Tilburg Web Components/Toptask Link',
  id: 'tilburg-toptask-link-wbc',
  component: TilburgWbcToptaskLink,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWbcToptaskLink>;

export default meta;
type Story = StoryObj<typeof meta>;

/* The shared examples hold the icons as SVG strings. */
const Icon = ({ svg, slot }: { svg: string; slot?: string }) => (
  <span slot={slot} style={{ display: 'contents' }} dangerouslySetInnerHTML={{ __html: svg }} />
);

export const AllPermutations: Story = {
  render: () => {
    const [href, title, icon] = tasks[0];
    return (
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <TilburgWbcToptaskLink href={href}>
          <Icon slot="icon" svg={icon} />
          {title}
        </TilburgWbcToptaskLink>
        <TilburgWbcToptaskLink href="/afspraak-maken">Afspraak maken</TilburgWbcToptaskLink>
      </div>
    );
  },
};
