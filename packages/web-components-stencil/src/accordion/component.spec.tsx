import { newSpecPage } from '@stencil/core/testing';
import { TilburgWebcAccordion } from './component';
import { TilburgWebcAccordionSection } from './section';
import { TilburgWebcHeading2 } from '../heading-2/component';

const render = (html: string) =>
  newSpecPage({ components: [TilburgWebcAccordion, TilburgWebcAccordionSection, TilburgWebcHeading2], html });

const markup = `
  <tilburg-webc-accordion display-name="Veelgestelde vragen" aria-label="FAQ">
    <tilburg-webc-accordion-section section-key="a" label="Vraag A">Antwoord A</tilburg-webc-accordion-section>
    <tilburg-webc-accordion-section section-key="b" label="Vraag B" disabled>Antwoord B</tilburg-webc-accordion-section>
    <tilburg-webc-accordion-section section-key="c" label="Vraag C" expanded>Antwoord C</tilburg-webc-accordion-section>
  </tilburg-webc-accordion>`;

describe('tilburg-webc-accordion', () => {
  it('renders the utrecht accordion with a region label and display name', async () => {
    const page = await render(markup);
    const root = page.root!.querySelector('.utrecht-accordion')!;
    expect(root.getAttribute('role')).toBe('region');
    expect(root.getAttribute('aria-label')).toBe('FAQ');
    expect(page.root!.hasAttribute('aria-label')).toBe(false);
    expect(root.querySelector('tilburg-webc-heading-2.tilburg-accordion__display-name')!.textContent).toBe(
      'Veelgestelde vragen',
    );
  });

  it('links each header button to its panel', async () => {
    const page = await render(markup);
    const button = page.body.querySelector('#utrecht-accordion-a-button')!;
    const panel = page.body.querySelector('#utrecht-accordion-a-panel')!;
    expect(button.getAttribute('aria-controls')).toBe('utrecht-accordion-a-panel');
    expect(button.getAttribute('aria-expanded')).toBe('false');
    expect(panel.getAttribute('aria-labelledby')).toBe('utrecht-accordion-a-button');
    expect(panel.hasAttribute('hidden')).toBe(true);
    expect(panel.textContent).toContain('Antwoord A');
  });

  it('shows the default + / − icons', async () => {
    const page = await render(markup);
    expect(page.body.querySelector('#utrecht-accordion-a-button .utrecht-accordion__button-icon')!.textContent).toBe(
      '+',
    );
    expect(page.body.querySelector('#utrecht-accordion-c-button .utrecht-accordion__button-icon')!.textContent).toBe(
      '−',
    );
  });

  it('only emits tilburgToggle without autoToggle', async () => {
    const page = await render(markup);
    const spy = jest.fn();
    page.body.addEventListener('tilburgToggle', (event) => spy((event as CustomEvent<boolean>).detail));
    page.body.querySelector<HTMLButtonElement>('#utrecht-accordion-a-button')!.click();
    await page.waitForChanges();
    expect(spy).toHaveBeenCalledWith(true);
    expect(page.body.querySelector('#utrecht-accordion-a-panel')!.hasAttribute('hidden')).toBe(true);
  });

  it('toggles itself with autoToggle', async () => {
    const page = await render(
      '<tilburg-webc-accordion><tilburg-webc-accordion-section section-key="x" label="X" auto-toggle>Inhoud</tilburg-webc-accordion-section></tilburg-webc-accordion>',
    );
    page.body.querySelector<HTMLButtonElement>('#utrecht-accordion-x-button')!.click();
    await page.waitForChanges();
    expect(page.body.querySelector('#utrecht-accordion-x-button')!.getAttribute('aria-expanded')).toBe('true');
    expect(page.body.querySelector('#utrecht-accordion-x-panel')!.hasAttribute('hidden')).toBe(false);
    expect(page.body.querySelector('tilburg-webc-accordion-section')!.hasAttribute('expanded')).toBe(true);
  });

  it('generates unique IDs when no section-key is set', async () => {
    const page = await render(
      '<tilburg-webc-accordion><tilburg-webc-accordion-section label="1"></tilburg-webc-accordion-section><tilburg-webc-accordion-section label="2"></tilburg-webc-accordion-section></tilburg-webc-accordion>',
    );
    const ids = Array.from(page.body.querySelectorAll('.utrecht-accordion__button')).map((b) => b.id);
    expect(new Set(ids).size).toBe(2);
  });
});
