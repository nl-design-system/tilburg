import { render } from '@testing-library/react';
import { ProcessSteps } from './ProcessSteps';
import type { ProcessStep } from './ProcessSteps';
import '@testing-library/jest-dom';

const steps: ProcessStep[] = [
  { title: 'Aanvraag ontvangen', status: 'checked', date: '3 november 2026' },
  {
    title: 'Aanvraag in behandeling',
    status: 'current',
    meta: 'We controleren uw gegevens.',
    steps: [
      { title: 'Gegevens gecontroleerd', status: 'checked', date: '4 november 2026' },
      { title: 'Kenteken gecontroleerd' },
    ],
  },
  { title: 'Besluit' },
];

describe('ProcessSteps', () => {
  it('renders the Den Haag process steps DOM', () => {
    const { container } = render(<ProcessSteps steps={steps} aria-label="Status aanvraag" className="extra" />);
    const list = container.firstElementChild!;
    expect(list.tagName).toBe('OL');
    expect(list).toHaveClass('denhaag-process-steps', 'extra');
    expect(list).toHaveAttribute('aria-label', 'Status aanvraag');
    const items = list.querySelectorAll('.denhaag-process-steps__step');
    expect(items).toHaveLength(3);
    expect(items[0]).toHaveClass('denhaag-process-steps__step', 'denhaag-process-steps__step--checked');
    expect(items[0]).not.toHaveAttribute('aria-current');
    expect(items[1]).toHaveAttribute('aria-current', 'step');
    expect(items[2]).toHaveClass('denhaag-process-steps__step--not-checked');
  });

  it('shows a check for checked steps and the number otherwise', () => {
    const { container } = render(<ProcessSteps steps={steps} />);
    const markers = container.querySelectorAll(
      '.denhaag-process-steps__step > .denhaag-process-steps__step-header > div',
    );
    expect(markers[0]).toHaveClass('denhaag-step-marker', 'denhaag-step-marker--checked');
    expect(markers[0]).toHaveAttribute('aria-hidden', 'true');
    expect(markers[0].querySelector('svg.denhaag-icon')).toBeInTheDocument();
    expect(markers[1]).toHaveTextContent('2');
    expect(markers[2]).toHaveTextContent('3');
  });

  it('reads the status before the heading', () => {
    const { container } = render(<ProcessSteps steps={steps} />);
    const headings = container.querySelectorAll('.denhaag-process-steps__step-heading');
    expect(headings[0]).toHaveClass('denhaag-process-steps__step-heading--checked');
    expect(headings[0]).toHaveTextContent('Afgerond: Aanvraag ontvangen');
    expect(headings[1]).toHaveTextContent('Huidige stap: Aanvraag in behandeling');
    expect(headings[2].querySelector('.utrecht-visually-hidden')).toHaveTextContent('Nog niet gestart:');
  });

  it('accepts other status labels', () => {
    const { container } = render(
      <ProcessSteps
        steps={[{ title: 'Received', status: 'checked' }]}
        statusLabels={{ checked: 'Done', current: 'Current step', 'not-checked': 'To do' }}
      />,
    );
    expect(container.querySelector('.denhaag-process-steps__step-heading')).toHaveTextContent('Done: Received');
  });

  it('connects the markers following the next step', () => {
    const { container } = render(<ProcessSteps steps={steps} />);
    const connectors = Array.from(container.querySelectorAll('.denhaag-step-marker__connector')).map(
      (c) => c.className,
    );
    expect(connectors).toEqual([
      'denhaag-step-marker__connector denhaag-step-marker__connector--checked denhaag-step-marker__connector--main-to-main',
      'denhaag-step-marker__connector denhaag-step-marker__connector--current denhaag-step-marker__connector--main-to-nested',
      'denhaag-step-marker__connector denhaag-step-marker__connector--not-checked denhaag-step-marker__connector--nested-to-nested',
      'denhaag-step-marker__connector denhaag-step-marker__connector--not-checked denhaag-step-marker__connector--nested-to-main',
    ]);
  });

  it('renders meta, date and sub-steps', () => {
    const { container } = render(<ProcessSteps steps={steps} />);
    expect(container.querySelector('.denhaag-process-steps__step-meta--date')).toHaveTextContent('3 november 2026');
    const subSteps = container.querySelectorAll(
      '.denhaag-process-steps__step-details .denhaag-process-steps__sub-step',
    );
    expect(subSteps).toHaveLength(2);
    expect(subSteps[0]).toHaveClass('denhaag-process-steps__sub-step--checked');
    expect(subSteps[0].querySelector('.denhaag-step-marker')).toHaveClass('denhaag-step-marker--nested');
    expect(subSteps[0].querySelector('.denhaag-process-steps__step-meta--nested')).toHaveTextContent('4 november 2026');
    expect(subSteps[1].querySelector('.denhaag-process-steps__sub-step-heading')).toHaveTextContent(
      'Nog niet gestart: Kenteken gecontroleerd',
    );
  });
});
