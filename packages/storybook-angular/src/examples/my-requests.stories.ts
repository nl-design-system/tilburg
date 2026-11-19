/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/angular';
import { MyRequests } from './my-requests.component';
import source from './my-requests.component.ts?raw';

/* The page itself is `my-requests.component.ts`; its source is what "Show code" shows. Same title and id as the React
   Storybook's page, so links to it work in both. */
const meta: Meta<MyRequests> = {
  title: 'Tilburg/Voorbeelden/Mijn aanvragen',
  id: 'tilburg-example-my-requests',
  component: MyRequests,
  tags: ['autodocs', 'example'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      source: { code: source, language: 'ts' },
      description: {
        component: `Een overzichtspagina in een persoonlijke omgeving: \`Breadcrumb\`, een \`Alert\` als er iets van de inwoner nodig is, een \`Table\` met per aanvraag een \`BadgeStatus\` en \`Pagination\` eronder, de persoonsgegevens in een \`DataList\` en veelgestelde vragen in een \`Accordion\`. \`ButtonLink\` voor een nieuwe aanvraag.

De aanvragen zijn voorbeelden. De code staat in \`packages/storybook-angular/src/examples/my-requests.component.ts\` en onder _Show code_.`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<MyRequests>;

export const Default: Story = { name: 'Mijn aanvragen' };
