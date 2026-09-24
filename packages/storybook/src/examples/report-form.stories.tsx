/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';
import { ReportForm } from './ReportForm';
import source from './ReportForm.tsx?raw';

/* The page itself is `ReportForm.tsx`; its source is what "Show code" shows. */
const meta = {
  title: 'Tilburg/Voorbeelden/Melding openbare ruimte',
  id: 'tilburg-example-report-form',
  component: ReportForm,
  tags: ['autodocs', 'example'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      source: { code: source, language: 'tsx' },
      description: {
        component: `Een formulier in drie stappen: wat wilt u melden, uw gegevens, controleren. Het laat de formulierpatronen zien die bij _Afspraak maken_ ontbreken:

- **Tekstvelden met uitleg**: \`FormField\`, \`FormLabel\`, \`FormFieldDescription\`, \`Textbox\` en \`Textarea\`, gekoppeld met \`aria-describedby\`.
- **Validatie**: klik op _Volgende_ zonder iets in te vullen. Elk veld krijgt een \`ValidationMessage\`, en bovenaan staat een foutoverzicht (\`Alert\`) dat de focus krijgt en naar de velden linkt.
- **Controleren**: de antwoorden in een \`DataList\`, met links om terug te gaan en een verplicht \`Checkbox\`.
- **Versturen**: een \`Modal\` om te bevestigen, een \`LoadingSpinner\` tijdens het versturen en een \`Alert\` met het meldingsnummer.

Er wordt niets verstuurd. De code staat in \`packages/storybook/src/examples/ReportForm.tsx\` en onder _Show code_.`,
      },
    },
  },
} satisfies Meta<typeof ReportForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { name: 'Melding openbare ruimte' };
