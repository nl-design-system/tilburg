/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';
import { type ReactNode, useState } from 'react';

const meta = {
  title: 'Tilburg/Accordion',
  id: 'tilburg-accordion',
  tags: ['autodocs'],
  parameters: {
    bugs: 'https://github.com/nl-design-system/tilburg/labels/component%2Faccordion',
    docs: {
      description: {
        component: `Tilburg accordion built on \`.utrecht-accordion\`. Sections have a thin gray border, no internal panel padding, and the projected expand/collapse icon stays at the right edge. Arrow Up/Down and Home/End move focus between section buttons.

## Usage

### Angular

\`\`\`html
<tilburg-accordion ariaLabel="Veelgestelde vragen">
  <tilburg-accordion-section
    key="apply"
    label="Hoe vraag ik een vergunning aan?"
    [expanded]="openId === 'apply'"
    (toggled)="openId = openId === 'apply' ? null : 'apply'"
  >
    <p class="utrecht-paragraph">U kunt een vergunning aanvragen via …</p>
  </tilburg-accordion-section>

  <tilburg-accordion-section key="time" label="Hoe lang duurt de behandeling?" [autoToggle]="true">
    <p class="utrecht-paragraph">De behandeltijd hangt af van …</p>
  </tilburg-accordion-section>
</tilburg-accordion>
\`\`\`

\`<tilburg-accordion>\` inputs: \`ariaLabel\`, \`headingLevel\` (1–6, default 2), \`displayName\`.
\`<tilburg-accordion-section>\` inputs: \`key\`, \`label\`, \`expanded\`, \`disabled\`, \`autoToggle\`; output: \`(toggled)\`.

### Plain HTML / CSS

\`\`\`html
<div class="utrecht-accordion" role="region" aria-label="Veelgestelde vragen">
  <div class="utrecht-accordion__section">
    <span class="utrecht-accordion__header">
      <button
        type="button"
        class="utrecht-button utrecht-button--subtle utrecht-accordion__button"
        id="apply-btn"
        aria-expanded="true"
        aria-controls="apply-panel"
      >
        <span class="utrecht-accordion__button-icon" aria-hidden="true">−</span>
        <span class="utrecht-accordion__button-label tilburg-accordion__display-name">Hoe vraag ik een vergunning aan?</span>
      </button>
    </span>
    <div class="utrecht-accordion__panel" id="apply-panel" role="region" aria-labelledby="apply-btn">
      <p class="utrecht-paragraph">U kunt een vergunning aanvragen via …</p>
    </div>
  </div>
</div>
\`\`\`
`,
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

interface SectionSpec {
  id: string;
  label: string;
  disabled?: boolean;
  body: ReactNode;
}

const AccordionDemo = ({ initialOpenId, sections }: { initialOpenId?: string; sections: SectionSpec[] }) => {
  const [openIds, setOpenIds] = useState<Set<string>>(() => new Set(initialOpenId ? [initialOpenId] : []));

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="utrecht-accordion" role="region" aria-label="Veelgestelde vragen">
      {sections.map((section) => {
        const expanded = openIds.has(section.id);
        return (
          <div key={section.id} className="utrecht-accordion__section">
            <span className="utrecht-accordion__header">
              <button
                type="button"
                className="utrecht-button utrecht-button--subtle utrecht-accordion__button"
                id={`accordion-${section.id}-button`}
                aria-expanded={expanded}
                aria-controls={`accordion-${section.id}-panel`}
                disabled={section.disabled}
                onClick={() => toggle(section.id)}
              >
                <span className="utrecht-accordion__button-icon" aria-hidden="true">
                  {expanded ? '−' : '+'}
                </span>
                <span className="utrecht-accordion__button-label tilburg-accordion__display-name">{section.label}</span>
              </button>
            </span>
            <div
              className="utrecht-accordion__panel"
              id={`accordion-${section.id}-panel`}
              role="region"
              aria-labelledby={`accordion-${section.id}-button`}
              hidden={!expanded}
            >
              {section.body}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const MultipleSections: Story = {
  name: 'Multiple sections',
  render: () => (
    <AccordionDemo
      initialOpenId="apply"
      sections={[
        {
          id: 'apply',
          label: 'Hoe vraag ik een vergunning aan?',
          body: (
            <p className="utrecht-paragraph">
              U kunt een vergunning aanvragen via het online formulier op deze website. Vul alle verplichte velden in en
              upload de benodigde documenten.
            </p>
          ),
        },
        {
          id: 'time',
          label: 'Hoe lang duurt de behandeling?',
          body: (
            <p className="utrecht-paragraph">
              De behandeltijd is afhankelijk van het type vergunning. In de meeste gevallen ontvangt u binnen 8 weken
              een beslissing.
            </p>
          ),
        },
        {
          id: 'appeal',
          label: 'Kan ik bezwaar maken?',
          body: (
            <p className="utrecht-paragraph">
              Ja, u kunt bezwaar maken tegen een beslissing. U heeft hiervoor 6 weken de tijd na de datum van het
              besluit.
            </p>
          ),
        },
      ]}
    />
  ),
};

export const WithDisabledSection: Story = {
  name: 'With a disabled section',
  render: () => (
    <AccordionDemo
      sections={[
        {
          id: 'open',
          label: 'Beschikbaar',
          body: <p className="utrecht-paragraph">Deze sectie is normaal te openen.</p>,
        },
        {
          id: 'disabled',
          label: 'Nog niet beschikbaar',
          disabled: true,
          body: <p className="utrecht-paragraph">(Disabled — deze sectie is niet uit te klappen)</p>,
        },
        {
          id: 'other',
          label: 'Ook beschikbaar',
          body: <p className="utrecht-paragraph">Deze sectie is ook normaal te openen.</p>,
        },
      ]}
    />
  ),
};
