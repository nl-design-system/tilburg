import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TilburgProcessStep, TilburgProcessSteps } from './component';

@Component({
  template: `<tilburg-process-steps [steps]="steps"></tilburg-process-steps>`,
  standalone: false,
})
class HostComponent {
  steps: TilburgProcessStep[] = [
    { title: 'Aanvraag ontvangen', status: 'checked', date: '3 november 2026' },
    {
      title: 'Aanvraag in behandeling',
      status: 'current',
      meta: 'We controleren uw gegevens.',
      steps: [{ title: 'Gegevens gecontroleerd', status: 'checked', date: '4 november 2026' }, { title: 'Kenteken' }],
    },
    { title: 'Besluit' },
  ];
}

describe('TilburgProcessSteps', () => {
  let fixture: ComponentFixture<HostComponent>;
  const el = () => fixture.nativeElement as HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [TilburgProcessSteps, HostComponent] });
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('renders the steps with status classes and aria-current', () => {
    const steps = el().querySelectorAll('.denhaag-process-steps__step');
    expect(el().querySelector('ol')!.className).toBe('denhaag-process-steps');
    expect(steps.length).toBe(3);
    expect(steps[0].className).toBe('denhaag-process-steps__step denhaag-process-steps__step--checked');
    expect(steps[0].hasAttribute('aria-current')).toBe(false);
    expect(steps[1].getAttribute('aria-current')).toBe('step');
    expect(steps[2].className).toContain('denhaag-process-steps__step--not-checked');
  });

  it('shows a check or the step number in the marker, hidden from assistive technology', () => {
    const markers = el().querySelectorAll('.denhaag-process-steps__step > .denhaag-process-steps__step-header > div');
    expect(markers[0].className).toBe('denhaag-step-marker denhaag-step-marker--checked');
    expect(markers[0].getAttribute('aria-hidden')).toBe('true');
    expect(markers[0].querySelector('svg.denhaag-icon')).not.toBeNull();
    expect(markers[1].textContent!.trim()).toBe('2');
    expect(markers[2].textContent!.trim()).toBe('3');
  });

  it('reads the status before each heading', () => {
    const headings = el().querySelectorAll('.denhaag-process-steps__step-heading');
    expect(headings[0].textContent!.trim()).toBe('Afgerond: Aanvraag ontvangen');
    expect(headings[1].textContent!.trim()).toBe('Huidige stap: Aanvraag in behandeling');
    expect(el().querySelectorAll('.denhaag-process-steps__sub-step-heading')[1].textContent!.trim()).toBe(
      'Nog niet gestart: Kenteken',
    );
  });

  it('renders the connectors like the HTML reference', () => {
    const connectors = Array.from(el().querySelectorAll('.denhaag-step-marker__connector')).map((c) => c.className);
    expect(connectors).toEqual([
      'denhaag-step-marker__connector denhaag-step-marker__connector--checked denhaag-step-marker__connector--main-to-main',
      'denhaag-step-marker__connector denhaag-step-marker__connector--current denhaag-step-marker__connector--main-to-nested',
      'denhaag-step-marker__connector denhaag-step-marker__connector--not-checked denhaag-step-marker__connector--nested-to-nested',
      'denhaag-step-marker__connector denhaag-step-marker__connector--not-checked denhaag-step-marker__connector--nested-to-main',
    ]);
  });

  it('renders meta, dates and sub-steps', () => {
    expect(el().querySelector('.denhaag-process-steps__step-meta--date')!.textContent!.trim()).toBe('3 november 2026');
    const subSteps = el().querySelectorAll('.denhaag-process-steps__sub-step');
    expect(subSteps.length).toBe(2);
    expect(subSteps[0].querySelector('.denhaag-step-marker')!.className).toBe(
      'denhaag-step-marker denhaag-step-marker--checked denhaag-step-marker--nested',
    );
    expect(subSteps[0].querySelector('.denhaag-process-steps__step-meta--nested')!.textContent!.trim()).toBe(
      '4 november 2026',
    );
  });

  it('leads to an unchecked sub-step with a dashed line, also below the last step', () => {
    fixture.componentInstance.steps = [
      { title: 'Aanvraag', status: 'checked', steps: [{ title: 'Gegevens' }] },
      { title: 'Controle', status: 'checked' },
      { title: 'Besluit', status: 'current', steps: [{ title: 'Brief', status: 'checked' }] },
    ];
    fixture.detectChanges();
    const connectors = Array.from(el().querySelectorAll('.denhaag-step-marker__connector')).map((c) =>
      c.className
        .replace(/denhaag-step-marker__connector(--)?/g, '')
        .trim()
        .replace(/\s+/g, ' '),
    );
    expect(connectors).toEqual([
      'not-checked main-to-nested',
      'not-checked nested-to-main',
      'checked main-to-main',
      'current main-to-nested',
    ]);
  });
});
