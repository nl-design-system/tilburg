/* @license CC0-1.0 */

import { TilburgWebcPageFooter } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-page-footer.examples';

/* Stencil `<tilburg-webc-page-footer>` rendered through its generated React proxy.
   The custom elements themselves are registered once in `config/preview.tsx`
   (`defineCustomElements()`). */

const meta = {
  title: 'Tilburg Web Components/Page Footer',
  id: 'tilburg-page-footer-webc',
  component: TilburgWebcPageFooter,
  tags: ['autodocs'],
  parameters: {
    bugs,
    /* Matches the HTML/CSS reference story: rendered edge-to-edge without canvas padding. */
    layout: 'fullscreen',
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWebcPageFooter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPermutations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <TilburgWebcPageFooter
        links={[
          { label: 'Privacy', href: '/privacy' },
          { label: 'Toegankelijkheid', href: '/a11y' },
          { label: 'Contact', href: '/contact' },
        ]}
      />
      <TilburgWebcPageFooter primaryLink={{ label: 'Gemeente Tilburg', href: '/' }} />
      <TilburgWebcPageFooter
        primaryLink={{ label: 'Gemeente Tilburg', href: '/' }}
        links={[
          { label: 'Privacy', href: '/privacy' },
          { label: 'Toegankelijkheid', href: '/a11y' },
          { label: 'Contact', href: '/contact' },
        ]}
      >
        Aanvullende footer-inhoud (default slot).
      </TilburgWebcPageFooter>
    </div>
  ),
};
