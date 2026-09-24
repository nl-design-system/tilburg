/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';
import { MyRequests } from './MyRequests';
import source from './MyRequests.tsx?raw';

/* The page itself is `MyRequests.tsx`; its source is what "Show code" shows. */
const meta = {
  title: 'Tilburg/Voorbeelden/Mijn aanvragen',
  id: 'tilburg-example-my-requests',
  component: MyRequests,
  tags: ['autodocs', 'example'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      source: { code: source, language: 'tsx' },
      description: {
        component: `Een overzichtspagina in een persoonlijke omgeving: \`Breadcrumb\`, een \`Alert\` als er iets van de inwoner nodig is, een \`Table\` met per aanvraag een \`BadgeStatus\` en \`Pagination\` eronder, de persoonsgegevens in een \`DataList\` en veelgestelde vragen in een \`Accordion\`. \`ButtonLink\` voor een nieuwe aanvraag.

De aanvragen zijn voorbeelden. De code staat in \`packages/storybook/src/examples/MyRequests.tsx\` en onder _Show code_.`,
      },
    },
  },
} satisfies Meta<typeof MyRequests>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { name: 'Mijn aanvragen' };
