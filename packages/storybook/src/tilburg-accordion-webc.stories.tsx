/* @license CC0-1.0 */

import { TilburgWebcAccordion, TilburgWebcAccordionSection } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { type ReactNode, useState } from 'react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-accordion.examples';

const meta = {
  title: 'Tilburg Web Components/Accordion',
  id: 'tilburg-accordion-webc',
  component: TilburgWebcAccordion,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWebcAccordion>;

export default meta;
type Story = StoryObj<typeof meta>;

interface SectionSpec {
  id: string;
  label: string;
  disabled?: boolean;
  body: ReactNode;
}

/* Controlled usage: the sections only emit `tilburgToggle`; the story owns
   the open state and writes it back through `expanded`. */
const MultiOpenDemo = ({ initialOpenIds = [], sections }: { initialOpenIds?: string[]; sections: SectionSpec[] }) => {
  const [openIds, setOpenIds] = useState<Set<string>>(() => new Set(initialOpenIds));
  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };
  return (
    <TilburgWebcAccordion aria-label="Veelgestelde vragen">
      {sections.map((section) => (
        <TilburgWebcAccordionSection
          key={section.id}
          sectionKey={section.id}
          label={section.label}
          disabled={section.disabled}
          expanded={openIds.has(section.id)}
          onTilburgToggle={() => toggle(section.id)}
        >
          {section.body}
        </TilburgWebcAccordionSection>
      ))}
    </TilburgWebcAccordion>
  );
};

const SAMPLE: SectionSpec[] = [
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
        De behandeltijd is afhankelijk van het type vergunning. In de meeste gevallen ontvangt u binnen 8 weken een
        beslissing.
      </p>
    ),
  },
  {
    id: 'appeal',
    label: 'Kan ik bezwaar maken?',
    body: (
      <p className="utrecht-paragraph">
        Ja, u kunt bezwaar maken tegen een beslissing. U heeft hiervoor 6 weken de tijd.
      </p>
    ),
  },
];

export const AllPermutations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h4>Multiple sections — controlled via tilburgToggle + expanded</h4>
        <MultiOpenDemo initialOpenIds={['apply']} sections={SAMPLE} />
      </div>
      <div>
        <h4>With a disabled section</h4>
        <MultiOpenDemo
          sections={[
            { id: 'open', label: 'Beschikbaar', body: <p className="utrecht-paragraph">Normaal te openen.</p> },
            {
              id: 'disabled',
              label: 'Nog niet beschikbaar',
              disabled: true,
              body: <p className="utrecht-paragraph">Disabled — niet uit te klappen.</p>,
            },
            {
              id: 'other',
              label: 'Ook beschikbaar',
              body: <p className="utrecht-paragraph">Ook normaal te openen.</p>,
            },
          ]}
        />
      </div>
      <div>
        <h4>Auto-toggle (sectie beheert eigen state)</h4>
        <TilburgWebcAccordion>
          <TilburgWebcAccordionSection sectionKey="a1" label="Eerste" autoToggle>
            <p className="utrecht-paragraph">Klik om te wisselen.</p>
          </TilburgWebcAccordionSection>
          <TilburgWebcAccordionSection sectionKey="a2" label="Tweede" autoToggle>
            <p className="utrecht-paragraph">Onafhankelijk.</p>
          </TilburgWebcAccordionSection>
        </TilburgWebcAccordion>
      </div>
      <div>
        <h4>With display-name + heading-level</h4>
        <TilburgWebcAccordion displayName="Veelgestelde vragen" headingLevel={2}>
          <TilburgWebcAccordionSection sectionKey="d1" label="Vraag 1" autoToggle>
            <p className="utrecht-paragraph">Antwoord 1.</p>
          </TilburgWebcAccordionSection>
          <TilburgWebcAccordionSection sectionKey="d2" label="Vraag 2" autoToggle>
            <p className="utrecht-paragraph">Antwoord 2.</p>
          </TilburgWebcAccordionSection>
        </TilburgWebcAccordion>
      </div>
    </div>
  ),
};

export const MultipleSections: Story = {
  name: 'Multiple sections',
  render: () => <MultiOpenDemo initialOpenIds={['apply']} sections={SAMPLE} />,
};

export const AutoToggle: Story = {
  name: 'Auto-toggle',
  render: () => (
    <TilburgWebcAccordion displayName="Veelgestelde vragen">
      {SAMPLE.map((section) => (
        <TilburgWebcAccordionSection
          key={section.id}
          sectionKey={`auto-${section.id}`}
          label={section.label}
          autoToggle
        >
          {section.body}
        </TilburgWebcAccordionSection>
      ))}
    </TilburgWebcAccordion>
  ),
};
