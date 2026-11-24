/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/angular';
import { ReportForm } from './report-form.component';
import source from './report-form.component.ts?raw';

/* The page itself is `report-form.component.ts`; its source is what "Show code" shows. Same title and id as the React
   Storybook's page, so links to it work in both. */
const meta: Meta<ReportForm> = {
  title: 'Tilburg/Voorbeelden/Melding openbare ruimte',
  id: 'tilburg-example-report-form',
  component: ReportForm,
  tags: ['autodocs', 'example'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      source: { code: source, language: 'ts' },
      description: {
        component: `Een formulier in drie stappen: wat wilt u melden, uw gegevens, controleren. Het laat de formulierpatronen zien die bij _Afspraak maken_ ontbreken:

- **Tekstvelden met uitleg**: \`FormField\`, \`FormLabel\`, \`FormFieldDescription\`, \`Textbox\` en \`Textarea\`, gekoppeld met \`aria-describedby\`.
- **Validatie**: klik op _Volgende_ zonder iets in te vullen. Elk veld krijgt een \`ValidationMessage\`, en bovenaan staat een foutoverzicht (\`Alert\`) dat de focus krijgt en naar de velden linkt.
- **Controleren**: de antwoorden in een \`DataList\`, met links om terug te gaan en een verplicht \`Checkbox\`.
- **Versturen**: een \`Modal\` om te bevestigen, een \`LoadingSpinner\` tijdens het versturen en een \`Alert\` met het meldingsnummer.

Er wordt niets verstuurd. De code staat in \`packages/storybook-angular/src/examples/report-form.component.ts\` en onder _Show code_.`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<ReportForm>;

export const Default: Story = { name: 'Melding openbare ruimte' };
