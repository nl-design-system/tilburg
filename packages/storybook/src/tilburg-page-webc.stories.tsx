/* @license CC0-1.0 */

import {
  TilburgWebcPage,
  TilburgWebcPageContent,
  TilburgWebcPageFooter,
  TilburgWebcPageHeader,
} from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-page.examples';

/* Stencil `<tilburg-webc-page>` rendered through its generated React proxy.
   The custom elements themselves are registered once in `config/preview.tsx`
   (`defineCustomElements()`). */

const meta = {
  title: 'Tilburg Web Components/Page',
  id: 'tilburg-page-webc',
  component: TilburgWebcPage,
  tags: ['autodocs'],
  parameters: {
    bugs,
    /* Matches the HTML/CSS reference story: rendered edge-to-edge without canvas padding. */
    layout: 'fullscreen',
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWebcPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <TilburgWebcPage>
      <p className="utrecht-paragraph">Pagina-inhoud cascadeert vanuit Page.</p>
    </TilburgWebcPage>
  ),
};

export const FullLayout: Story = {
  render: () => (
    <TilburgWebcPage>
      <TilburgWebcPageHeader heading="Gemeente Tilburg" titleHref="/" />
      <TilburgWebcPageContent>
        <p className="utrecht-paragraph">Hoofdinhoud van de pagina.</p>
      </TilburgWebcPageContent>
      <TilburgWebcPageFooter
        links={[
          { label: 'Privacy', href: '/privacy' },
          { label: 'Toegankelijkheid', href: '/a11y' },
        ]}
      />
    </TilburgWebcPage>
  ),
};
