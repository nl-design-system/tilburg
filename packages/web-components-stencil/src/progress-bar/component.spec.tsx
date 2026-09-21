import { newSpecPage } from '@stencil/core/testing';
import { TilburgWebcProgressBar } from './component';

const render = (html: string) => newSpecPage({ components: [TilburgWebcProgressBar], html });

describe('tilburg-webc-progress-bar', () => {
  it('renders header and progressbar track like the HTML reference', async () => {
    const page = await render(
      '<tilburg-webc-progress-bar value="2" total="4" heading="Adresgegevens" label="Stap 2 van 4"></tilburg-webc-progress-bar>',
    );
    expect(page.root!.shadowRoot).toBeNull();
    const header = page.root!.querySelector('.tilburg-progress-bar__header')!;
    expect(header.querySelector('h2.tilburg-progress-bar__title.tilburg-step-title')!.textContent).toBe(
      'Adresgegevens',
    );
    expect(header.querySelector('.tilburg-progress-bar__label')!.textContent).toBe('Stap 2 van 4');
    const track = page.root!.querySelector('.tilburg-progress-bar__track')!;
    expect(track.getAttribute('role')).toBe('progressbar');
    expect(track.getAttribute('aria-label')).toBe('Adresgegevens');
    expect(track.getAttribute('aria-valuemin')).toBe('0');
    expect(track.getAttribute('aria-valuemax')).toBe('100');
    expect(track.getAttribute('aria-valuenow')).toBe('50');
    expect(track.getAttribute('aria-valuetext')).toBe('Stap 2 van 4');
    const indicator = track.querySelector<HTMLElement>('.tilburg-progress-bar__indicator.progress-bar-indicator')!;
    expect(indicator.style.width).toBe('50%');
    expect(page.root!.querySelector('.tilburg-progress-bar__back')).toBeNull();
  });

  it('clamps the percentage and handles a zero total', async () => {
    const over = await render('<tilburg-webc-progress-bar value="9" total="4"></tilburg-webc-progress-bar>');
    expect(over.root!.querySelector('[role=progressbar]')!.getAttribute('aria-valuenow')).toBe('100');
    const zero = await render('<tilburg-webc-progress-bar value="3"></tilburg-webc-progress-bar>');
    expect(zero.root!.querySelector('[role=progressbar]')!.getAttribute('aria-valuenow')).toBe('0');
  });

  it('rounds aria-valuenow but keeps the exact width', async () => {
    const page = await render('<tilburg-webc-progress-bar value="1" total="3"></tilburg-webc-progress-bar>');
    const track = page.root!.querySelector('[role=progressbar]')!;
    expect(track.getAttribute('aria-valuenow')).toBe('33');
    expect(track.querySelector<HTMLElement>('.tilburg-progress-bar__indicator')!.style.width).toMatch(/^33\.3+\d*%$/);
  });

  it('omits title, label and valuetext when not given and falls back to "Voortgang"', async () => {
    const page = await render('<tilburg-webc-progress-bar value="1" total="2"></tilburg-webc-progress-bar>');
    expect(page.root!.querySelector('.tilburg-progress-bar__title')).toBeNull();
    expect(page.root!.querySelector('.tilburg-progress-bar__label')).toBeNull();
    const track = page.root!.querySelector('[role=progressbar]')!;
    expect(track.getAttribute('aria-label')).toBe('Voortgang');
    expect(track.hasAttribute('aria-valuetext')).toBe(false);
  });

  it('moves aria-label from the host to the track', async () => {
    const page = await render(
      '<tilburg-webc-progress-bar aria-label="Aanvraag" heading="Stap"></tilburg-webc-progress-bar>',
    );
    expect(page.root!.hasAttribute('aria-label')).toBe(false);
    expect(page.root!.querySelector('[role=progressbar]')!.getAttribute('aria-label')).toBe('Aanvraag');
  });

  it('renders the back link with the default arrow and emits tilburgBackClick', async () => {
    const page = await render(
      '<tilburg-webc-progress-bar show-back back-label="Vorige stap"></tilburg-webc-progress-bar>',
    );
    const back = page.root!.querySelector<HTMLAnchorElement>(
      'a.tilburg-progress-bar__back.utrecht-link.utrecht-link--html-a',
    )!;
    expect(back.getAttribute('href')).toBe('#');
    expect(back.querySelector('span[aria-hidden=true]')!.textContent).toBe('←');
    expect(back.querySelector('.tilburg-progress-bar__back-label')!.textContent).toBe('Vorige stap');
    const spy = jest.fn();
    page.root!.addEventListener('tilburgBackClick', spy);
    back.click();
    await page.waitForChanges();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('projects a custom back icon', async () => {
    const page = await render(
      '<tilburg-webc-progress-bar show-back back-label="Terug"><span slot="back-icon" id="i">‹</span></tilburg-webc-progress-bar>',
    );
    const back = page.root!.querySelector('.tilburg-progress-bar__back')!;
    expect(back.querySelector('#i')).not.toBeNull();
    expect(back.textContent).not.toContain('←');
  });
});
