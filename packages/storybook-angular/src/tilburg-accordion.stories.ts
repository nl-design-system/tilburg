/* @license CC0-1.0 */

import { TilburgAccordion } from '@gemeente-tilburg/components-angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description } from '../../storybook-shared/src/tilburg-accordion.examples';

const meta: Meta<TilburgAccordion> = {
  title: 'Tilburg Angular/Accordion',
  id: 'tilburg-accordion-angular',
  component: TilburgAccordion,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj<TilburgAccordion>;

/* Independent toggle (multi-open) — matches the CSS-class story and the
   React `Tilburg React/Accordion` story. */
export const MultipleSections: Story = {
  name: 'Multiple sections',
  render: () => ({
    template: `
      <tilburg-accordion ariaLabel="Veelgestelde vragen">
        <tilburg-accordion-section
          key="apply"
          label="Hoe vraag ik een vergunning aan?"
          [autoToggle]="true"
          [expanded]="true"
        >
          <span slot="icon-collapsed" aria-hidden="true">+</span>
          <span slot="icon-expanded" aria-hidden="true">&minus;</span>
          <p class="utrecht-paragraph">
            Je kunt een vergunning aanvragen via het online formulier op deze website. Vul alle verplichte velden
            in en upload de benodigde documenten.
          </p>
        </tilburg-accordion-section>
        <tilburg-accordion-section key="time" label="Hoe lang duurt de behandeling?" [autoToggle]="true">
          <span slot="icon-collapsed" aria-hidden="true">+</span>
          <span slot="icon-expanded" aria-hidden="true">&minus;</span>
          <p class="utrecht-paragraph">
            De behandeltijd is afhankelijk van het type vergunning. In de meeste gevallen ontvang je binnen 8 weken
            een beslissing.
          </p>
        </tilburg-accordion-section>
        <tilburg-accordion-section key="appeal" label="Kan ik bezwaar maken?" [autoToggle]="true">
          <span slot="icon-collapsed" aria-hidden="true">+</span>
          <span slot="icon-expanded" aria-hidden="true">&minus;</span>
          <p class="utrecht-paragraph">
            Ja, je kunt bezwaar maken tegen een beslissing. Je hebt hiervoor 6 weken de tijd na de datum van het
            besluit.
          </p>
        </tilburg-accordion-section>
      </tilburg-accordion>
    `,
  }),
};

export const WithDisabledSection: Story = {
  name: 'With a disabled section',
  render: () => ({
    template: `
      <tilburg-accordion>
        <tilburg-accordion-section key="open" label="Beschikbaar" [autoToggle]="true">
          <span slot="icon-collapsed" aria-hidden="true">+</span>
          <span slot="icon-expanded" aria-hidden="true">&minus;</span>
          <p class="utrecht-paragraph">Deze sectie is normaal te openen.</p>
        </tilburg-accordion-section>
        <tilburg-accordion-section key="disabled" label="Nog niet beschikbaar" [disabled]="true">
          <span slot="icon-collapsed" aria-hidden="true">+</span>
          <span slot="icon-expanded" aria-hidden="true">&minus;</span>
          <p class="utrecht-paragraph">(Disabled — niet uit te klappen)</p>
        </tilburg-accordion-section>
        <tilburg-accordion-section key="other" label="Ook beschikbaar" [autoToggle]="true">
          <span slot="icon-collapsed" aria-hidden="true">+</span>
          <span slot="icon-expanded" aria-hidden="true">&minus;</span>
          <p class="utrecht-paragraph">Deze sectie is ook normaal te openen.</p>
        </tilburg-accordion-section>
      </tilburg-accordion>
    `,
  }),
};

export const WithDisplayName: Story = {
  render: () => ({
    template: `
      <tilburg-accordion displayName="Veelgestelde vragen" [headingLevel]="2">
        <tilburg-accordion-section key="d1" label="Vraag 1" [autoToggle]="true">
          <span slot="icon-collapsed" aria-hidden="true">+</span>
          <span slot="icon-expanded" aria-hidden="true">&minus;</span>
          <p class="utrecht-paragraph">Antwoord 1.</p>
        </tilburg-accordion-section>
        <tilburg-accordion-section key="d2" label="Vraag 2" [autoToggle]="true">
          <span slot="icon-collapsed" aria-hidden="true">+</span>
          <span slot="icon-expanded" aria-hidden="true">&minus;</span>
          <p class="utrecht-paragraph">Antwoord 2.</p>
        </tilburg-accordion-section>
      </tilburg-accordion>
    `,
  }),
};
