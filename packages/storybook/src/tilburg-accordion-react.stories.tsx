/* @license CC0-1.0 */

import { Accordion, AccordionSection, Paragraph } from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { type ReactNode, useState } from 'react';
import { bugs, description } from '../../storybook-shared/src/tilburg-accordion.examples';

const meta = {
  title: 'Tilburg React/Accordion',
  id: 'tilburg-accordion-react',
  component: Accordion,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

interface SectionSpec {
  id: string;
  label: string;
  disabled?: boolean;
  body: ReactNode;
}

/* Multi-open behaviour matches the CSS-class story exactly: clicking a
   section toggles only that section, sections remain independent. */
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
    <Accordion aria-label="Veelgestelde vragen">
      {sections.map((section) => (
        <AccordionSection
          key={section.id}
          sectionKey={section.id}
          label={section.label}
          disabled={section.disabled}
          expanded={openIds.has(section.id)}
          onToggle={() => toggle(section.id)}
        >
          {section.body}
        </AccordionSection>
      ))}
    </Accordion>
  );
};

const SAMPLE: SectionSpec[] = [
  {
    id: 'apply',
    label: 'Hoe vraag ik een vergunning aan?',
    body: (
      <Paragraph>
        U kunt een vergunning aanvragen via het online formulier op deze website. Vul alle verplichte velden in en
        upload de benodigde documenten.
      </Paragraph>
    ),
  },
  {
    id: 'time',
    label: 'Hoe lang duurt de behandeling?',
    body: (
      <Paragraph>
        De behandeltijd is afhankelijk van het type vergunning. In de meeste gevallen ontvangt u binnen 8 weken een
        beslissing.
      </Paragraph>
    ),
  },
  {
    id: 'appeal',
    label: 'Kan ik bezwaar maken?',
    body: <Paragraph>Ja, u kunt bezwaar maken tegen een beslissing. U heeft hiervoor 6 weken de tijd.</Paragraph>,
  },
];

export const AllPermutations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h4>Multiple sections — independent toggle (matches CSS-class story)</h4>
        <MultiOpenDemo initialOpenIds={['apply']} sections={SAMPLE} />
      </div>
      <div>
        <h4>With a disabled section</h4>
        <MultiOpenDemo
          sections={[
            { id: 'open', label: 'Beschikbaar', body: <Paragraph>Normaal te openen.</Paragraph> },
            {
              id: 'disabled',
              label: 'Nog niet beschikbaar',
              disabled: true,
              body: <Paragraph>Disabled — niet uit te klappen.</Paragraph>,
            },
            { id: 'other', label: 'Ook beschikbaar', body: <Paragraph>Ook normaal te openen.</Paragraph> },
          ]}
        />
      </div>
      <div>
        <h4>Auto-toggle (sectie beheert eigen state)</h4>
        <Accordion>
          <AccordionSection sectionKey="a1" label="Eerste" autoToggle>
            <Paragraph>Klik om te wisselen.</Paragraph>
          </AccordionSection>
          <AccordionSection sectionKey="a2" label="Tweede" autoToggle>
            <Paragraph>Onafhankelijk.</Paragraph>
          </AccordionSection>
        </Accordion>
      </div>
      <div>
        <h4>With displayName + headingLevel</h4>
        <Accordion displayName="Veelgestelde vragen" headingLevel={2}>
          <AccordionSection sectionKey="d1" label="Vraag 1" autoToggle>
            <Paragraph>Antwoord 1.</Paragraph>
          </AccordionSection>
          <AccordionSection sectionKey="d2" label="Vraag 2" autoToggle>
            <Paragraph>Antwoord 2.</Paragraph>
          </AccordionSection>
        </Accordion>
      </div>
    </div>
  ),
};

export const MultipleSections: Story = {
  name: 'Multiple sections',
  render: () => <MultiOpenDemo initialOpenIds={['apply']} sections={SAMPLE} />,
};
