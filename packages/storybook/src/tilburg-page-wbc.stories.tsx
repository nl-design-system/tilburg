/* @license CC0-1.0 */

import {
  TilburgWbcPage,
  TilburgWbcPageContent,
  TilburgWbcPageFooter,
  TilburgWbcPageHeader,
} from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-page.examples';

/* Stencil `<tilburg-wbc-page>` rendered through its generated React proxy.
   The custom elements themselves are registered once in `config/preview.tsx`
   (`defineCustomElements()`). */

const meta = {
  title: 'Tilburg Web Components/Page',
  id: 'tilburg-page-wbc',
  component: TilburgWbcPage,
  tags: ['autodocs'],
  parameters: {
    bugs,
    /* Matches the HTML/CSS reference story: rendered edge-to-edge without canvas padding. */
    layout: 'fullscreen',
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWbcPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <TilburgWbcPage>
      <p className="utrecht-paragraph">Pagina-inhoud cascadeert vanuit Page.</p>
    </TilburgWbcPage>
  ),
};

export const FullLayout: Story = {
  render: () => (
    <TilburgWbcPage>
      <TilburgWbcPageHeader heading="Gemeente Tilburg" titleHref="/" />
      <TilburgWbcPageContent>
        <p className="utrecht-paragraph">Hoofdinhoud van de pagina.</p>
      </TilburgWbcPageContent>
      <TilburgWbcPageFooter
        links={[
          { label: 'Privacy', href: '/privacy' },
          { label: 'Toegankelijkheid', href: '/a11y' },
        ]}
      />
    </TilburgWbcPage>
  ),
};
