import { newSpecPage } from '@stencil/core/testing';
import { TilburgWbcProcessSteps } from './component';

const steps = [
  { title: 'Aanvraag ontvangen', status: 'checked', date: '3 november 2026' },
  {
    title: 'Aanvraag in behandeling',
    status: 'current',
    meta: 'We controleren uw gegevens.',
    steps: [{ title: 'Gegevens gecontroleerd', status: 'checked', date: '4 november 2026' }, { title: 'Kenteken' }],
  },
  { title: 'Besluit' },
];

const render = (attributes = '') =>
  newSpecPage({
    components: [TilburgWbcProcessSteps],
    html: `<tilburg-wbc-process-steps steps='${JSON.stringify(steps)}' ${attributes}></tilburg-wbc-process-steps>`,
  });

describe('tilburg-wbc-process-steps', () => {
  it('renders the steps from a JSON attribute with status classes and aria-current', async () => {
    const page = await render();
    const list = page.root!.querySelector('ol')!;
    expect(page.root!.shadowRoot).toBeNull();
    expect(list.className).toBe('denhaag-process-steps');
    const items = list.querySelectorAll('.denhaag-process-steps__step');
    expect(items.length).toBe(3);
    expect(items[0]).toHaveClasses(['denhaag-process-steps__step', 'denhaag-process-steps__step--checked']);
    expect(items[1].getAttribute('aria-current')).toBe('step');
    expect(items[2]).toHaveClass('denhaag-process-steps__step--not-checked');
  });

  it('moves aria-label from the host onto the list', async () => {
    const page = await render('aria-label="Status aanvraag"');
    expect(page.root!.hasAttribute('aria-label')).toBe(false);
    expect(page.root!.querySelector('ol')!.getAttribute('aria-label')).toBe('Status aanvraag');
  });

  it('renders markers, hidden status text and connectors like the HTML reference', async () => {
    const page = await render();
    const root = page.root!;
    const markers = root.querySelectorAll('.denhaag-process-steps__step > .denhaag-process-steps__step-header > div');
    expect(markers[0].getAttribute('aria-hidden')).toBe('true');
    expect(markers[0].querySelector('svg.denhaag-icon')).not.toBeNull();
    expect(markers[1].textContent).toBe('2');
    expect(root.querySelector('.denhaag-process-steps__step-heading')!.textContent).toBe(
      'Afgerond: Aanvraag ontvangen',
    );
    expect(Array.from(root.querySelectorAll('.denhaag-step-marker__connector')).map((c) => c.className)).toEqual([
      'denhaag-step-marker__connector denhaag-step-marker__connector--checked denhaag-step-marker__connector--main-to-main',
      'denhaag-step-marker__connector denhaag-step-marker__connector--current denhaag-step-marker__connector--main-to-nested',
      'denhaag-step-marker__connector denhaag-step-marker__connector--not-checked denhaag-step-marker__connector--nested-to-nested',
      'denhaag-step-marker__connector denhaag-step-marker__connector--not-checked denhaag-step-marker__connector--nested-to-main',
    ]);
    const subSteps = root.querySelectorAll('.denhaag-process-steps__sub-step');
    expect(subSteps.length).toBe(2);
    expect(subSteps[0].querySelector('.denhaag-process-steps__step-meta--nested')!.textContent).toBe('4 november 2026');
  });

  it('accepts status labels as a JSON attribute', async () => {
    const page = await render(`status-labels='{"checked":"Done","current":"Current step","not-checked":"To do"}'`);
    expect(page.root!.querySelector('.denhaag-process-steps__step-heading')!.textContent).toBe(
      'Done: Aanvraag ontvangen',
    );
  });

  it('leads to an unchecked sub-step with a dashed line, also below the last step', async () => {
    const page = await render();
    page.root!.steps = [
      { title: 'Aanvraag', status: 'checked', steps: [{ title: 'Gegevens' }] },
      { title: 'Controle', status: 'checked' },
      { title: 'Besluit', status: 'current', steps: [{ title: 'Brief', status: 'checked' }] },
    ];
    await page.waitForChanges();
    const connectors = Array.from(page.root!.querySelectorAll('.denhaag-step-marker__connector')).map((c) =>
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
