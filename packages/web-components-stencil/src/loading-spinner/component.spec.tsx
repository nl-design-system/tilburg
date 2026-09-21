import { newSpecPage } from '@stencil/core/testing';
import { TilburgWebcLoadingSpinner } from './component';

const render = (html: string) => newSpecPage({ components: [TilburgWebcLoadingSpinner], html });

describe('tilburg-webc-loading-spinner', () => {
  it('renders nothing while hidden', async () => {
    const page = await render('<tilburg-webc-loading-spinner heading="Bezig"></tilburg-webc-loading-spinner>');
    expect(page.root!.shadowRoot).toBeNull();
    expect(page.root!.querySelector('.tilburg-loading-spinner__overlay')).toBeNull();
  });

  it('renders the overlay markup immediately with delay-ms="0"', async () => {
    const page = await render(
      '<tilburg-webc-loading-spinner visible delay-ms="0" heading="Bezig met laden" message="Even geduld"></tilburg-webc-loading-spinner>',
    );
    const overlay = page.root!.querySelector('.tilburg-loading-spinner__overlay')!;
    expect(overlay.getAttribute('aria-busy')).toBe('true');
    const content = overlay.querySelector('.tilburg-loading-spinner__panel > .tilburg-loading-spinner__content')!;
    expect(content.getAttribute('role')).toBe('status');
    expect(content.querySelector('.tilburg-loading-spinner__title')!.textContent).toBe('Bezig met laden');
    expect(content.querySelector('.tilburg-loading-spinner__message')!.textContent).toBe('Even geduld');
    const svg = content.querySelector('svg.tilburg-loading-spinner__svg')!;
    expect(svg.getAttribute('aria-hidden')).toBe('true');
    expect(svg.querySelectorAll('path').length).toBe(2);
  });

  it('omits title and message when not given', async () => {
    const page = await render('<tilburg-webc-loading-spinner visible delay-ms="0"></tilburg-webc-loading-spinner>');
    expect(page.root!.querySelector('.tilburg-loading-spinner__title')).toBeNull();
    expect(page.root!.querySelector('.tilburg-loading-spinner__message')).toBeNull();
  });

  it('moves aria-label from the host to the overlay', async () => {
    const page = await render(
      '<tilburg-webc-loading-spinner visible delay-ms="0" aria-label="Bezig met laden"></tilburg-webc-loading-spinner>',
    );
    expect(page.root!.hasAttribute('aria-label')).toBe(false);
    expect(page.root!.querySelector('.tilburg-loading-spinner__overlay')!.getAttribute('aria-label')).toBe(
      'Bezig met laden',
    );
  });

  it('does not render the host title attribute as heading', async () => {
    const page = await render(
      '<tilburg-webc-loading-spinner visible delay-ms="0" title="tooltip"></tilburg-webc-loading-spinner>',
    );
    expect(page.root!.querySelector('.tilburg-loading-spinner__title')).toBeNull();
  });

  /* Real timers with a short delay: Jest fake timers also freeze Stencil's
     render scheduler, so `waitForChanges()` would never resolve. */
  const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  it('only reveals the overlay after the grace timer', async () => {
    const page = await render('<tilburg-webc-loading-spinner delay-ms="50"></tilburg-webc-loading-spinner>');
    page.root!.visible = true;
    await page.waitForChanges();
    expect(page.root!.querySelector('.tilburg-loading-spinner__overlay')).toBeNull();
    await wait(80);
    await page.waitForChanges();
    expect(page.root!.querySelector('.tilburg-loading-spinner__overlay')).not.toBeNull();
  });

  it('hides immediately and cancels a pending timer', async () => {
    const page = await render('<tilburg-webc-loading-spinner delay-ms="50"></tilburg-webc-loading-spinner>');
    page.root!.visible = true;
    await page.waitForChanges();
    page.root!.visible = false;
    await page.waitForChanges();
    await wait(80);
    await page.waitForChanges();
    expect(page.root!.querySelector('.tilburg-loading-spinner__overlay')).toBeNull();
  });

  it('hides a shown overlay when visible turns false', async () => {
    const page = await render('<tilburg-webc-loading-spinner visible delay-ms="0"></tilburg-webc-loading-spinner>');
    page.root!.visible = false;
    await page.waitForChanges();
    expect(page.root!.querySelector('.tilburg-loading-spinner__overlay')).toBeNull();
  });
});
