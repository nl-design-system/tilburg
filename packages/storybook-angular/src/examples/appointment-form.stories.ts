/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/angular';
import { AppointmentForm } from './appointment-form.component';
import source from './appointment-form.component.ts?raw';

/* The page itself is `appointment-form.component.ts`; its source is what "Show code" shows. Same title and id as the React
   Storybook's page, so links to it work in both. */
const meta: Meta<AppointmentForm> = {
  title: 'Tilburg/Voorbeelden/Afspraak maken',
  id: 'tilburg-example-appointment-form',
  component: AppointmentForm,
  tags: ['autodocs', 'example'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      source: { code: source, language: 'ts' },
      description: {
        component: `Een afspraak maken bij de gemeente, nagebouwd naar het afsprakenformulier van Tilburg (winkel.tilburg.nl, _Afspraak maken_, zonder DigiD). Het werkt echt: kies _zonder DigiD_, dan een soort afspraak (bij _Aanvraag paspoort of ID-kaart_ verschijnen vervolgvragen), dan een datum en een tijd. Stap 3 tot en met 6 zijn niet nagebouwd; de locaties, datums en tijden zijn voorbeelden.

Componenten: \`ProgressBar\` (stap en "Vorige stap"), \`Fieldset\` met \`FormField\`, \`FormLabel\` en \`RadioButton\`, \`Combobox\`, \`ButtonGroup\` met \`Button\`, \`Heading1\` t/m \`Heading3\`, \`Paragraph\`, \`UnorderedList\`, \`Link\` en \`Alert\`, in de paginaopbouw met \`SkipLink\`, \`PageHeader\` (met \`LanguageToggle\`), \`PageContent\` en \`PageFooter\`.

De code staat in \`packages/storybook-angular/src/examples/appointment-form.component.ts\` en onder _Show code_.`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<AppointmentForm>;

export const Default: Story = { name: 'Afspraak maken' };
