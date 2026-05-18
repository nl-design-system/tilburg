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
        component:
          'Tilburg accordion built on `.utrecht-accordion`. Sections have a thin gray border, no internal panel padding, and the projected expand/collapse icon stays at the right edge. Sections are toggle-controlled here via local state so they can be opened and closed in Storybook.',
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
    <div className="utrecht-accordion" aria-label="Veelgestelde vragen">
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
            <p>
              U kunt een vergunning aanvragen via het online formulier op deze website. Vul alle verplichte velden in en
              upload de benodigde documenten.
            </p>
          ),
        },
        {
          id: 'time',
          label: 'Hoe lang duurt de behandeling?',
          body: (
            <p>
              De behandeltijd is afhankelijk van het type vergunning. In de meeste gevallen ontvangt u binnen 8 weken
              een beslissing.
            </p>
          ),
        },
        {
          id: 'appeal',
          label: 'Kan ik bezwaar maken?',
          body: (
            <p>
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
          body: <p>Deze sectie is normaal te openen.</p>,
        },
        {
          id: 'disabled',
          label: 'Nog niet beschikbaar',
          disabled: true,
          body: <p>(Disabled — deze sectie is niet uit te klappen)</p>,
        },
        {
          id: 'other',
          label: 'Ook beschikbaar',
          body: <p>Deze sectie is ook normaal te openen.</p>,
        },
      ]}
    />
  ),
};
