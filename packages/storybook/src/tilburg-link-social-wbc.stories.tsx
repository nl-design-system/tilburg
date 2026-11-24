/* @license CC0-1.0 */

import { TilburgWbcLinkSocial, TilburgWbcListSocial } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { accounts, bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-link-social.examples';

/* Stencil `<tilburg-wbc-link-social>` rendered through its generated React proxy.
   The custom elements themselves are registered once in `config/preview.tsx`
   (`defineCustomElements()`). */

const meta = {
  title: 'Tilburg Web Components/Link Social',
  id: 'tilburg-link-social-wbc',
  component: TilburgWbcLinkSocial,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWbcLinkSocial>;

export default meta;
type Story = StoryObj<typeof meta>;

/* The shared examples hold the icons as SVG strings. */
const Icon = ({ svg, slot }: { svg: string; slot?: string }) => (
  <span slot={slot} style={{ display: 'contents' }} dangerouslySetInnerHTML={{ __html: svg }} />
);

export const AllPermutations: Story = {
  render: () => (
    <TilburgWbcListSocial aria-label="Gemeente Tilburg op sociale media">
      {accounts.map(([href, label, icon]) => (
        <li key={href} className="utrecht-list-social__item">
          <TilburgWbcLinkSocial href={href} aria-label={label}>
            <Icon svg={icon} />
          </TilburgWbcLinkSocial>
        </li>
      ))}
    </TilburgWbcListSocial>
  ),
};
