import { newSpecPage } from '@stencil/core/testing';
import { TilburgWebcAlert } from './component';
import { TilburgWebcHeading2 } from '../heading-2/component';
import { TilburgWebcHeading3 } from '../heading-3/component';

const render = (html: string) =>
  newSpecPage({ components: [TilburgWebcAlert, TilburgWebcHeading2, TilburgWebcHeading3], html });

describe('tilburg-webc-alert', () => {
  it('renders the utrecht alert markup for the default info variant', async () => {
    const page = await render('<tilburg-webc-alert heading="Informatie">Tekst</tilburg-webc-alert>');
    const alert = page.root!.querySelector('.utrecht-alert')!;
    expect(alert).toHaveClasses(['tilburg-alert', 'utrecht-alert--info']);
    expect(alert.getAttribute('role')).toBe('status');
    expect(alert.getAttribute('aria-live')).toBe('polite');
    expect(alert.getAttribute('aria-atomic')).toBe('true');
    expect(alert.querySelector('.utrecht-alert__message')!.textContent).toContain('Tekst');
  });

  it('renders the heading at the requested level', async () => {
    const page = await render('<tilburg-webc-alert heading="Titel" heading-level="2">Tekst</tilburg-webc-alert>');
    const title = page.root!.querySelector('tilburg-webc-heading-2.tilburg-alert__title')!;
    expect(title).not.toBeNull();
    expect(title.querySelector('h2.utrecht-heading-2')!.textContent).toBe('Titel');
  });

  it('omits the heading when no heading text is given', async () => {
    const page = await render('<tilburg-webc-alert>Tekst</tilburg-webc-alert>');
    expect(page.root!.querySelector('.tilburg-alert__title')).toBeNull();
  });

  it('maps danger to utrecht error with an assertive alert role', async () => {
    const page = await render('<tilburg-webc-alert variant="danger">Fout</tilburg-webc-alert>');
    const alert = page.root!.querySelector('.utrecht-alert')!;
    expect(alert).toHaveClass('utrecht-alert--error');
    expect(alert.getAttribute('role')).toBe('alert');
    expect(alert.getAttribute('aria-live')).toBe('assertive');
  });

  it('maps success to utrecht ok', async () => {
    const page = await render('<tilburg-webc-alert variant="success">OK</tilburg-webc-alert>');
    expect(page.root!.querySelector('.utrecht-alert')).toHaveClass('utrecht-alert--ok');
  });

  it('respects an explicit live region', async () => {
    const page = await render('<tilburg-webc-alert variant="danger" live-region="off">Fout</tilburg-webc-alert>');
    expect(page.root!.querySelector('.utrecht-alert')!.getAttribute('aria-live')).toBe('off');
  });

  it('keeps the icon container empty so the CSS default icon is painted', async () => {
    const page = await render('<tilburg-webc-alert>Tekst</tilburg-webc-alert>');
    expect(page.root!.querySelector('.utrecht-alert__icon')!.childNodes.length).toBe(0);
  });

  it('projects a custom icon into the icon slot', async () => {
    const page = await render('<tilburg-webc-alert><span slot="icon" id="i">!</span>Tekst</tilburg-webc-alert>');
    expect(page.root!.querySelector('.utrecht-alert__icon #i')).not.toBeNull();
  });

  it('renders the screen-reader prefix', async () => {
    const page = await render('<tilburg-webc-alert sr-prefix="Fout:">Tekst</tilburg-webc-alert>');
    expect(page.root!.querySelector('.utrecht-alert__message .utrecht-visually-hidden')!.textContent).toBe('Fout:');
  });

  it('renders a close button that emits tilburgClose', async () => {
    const page = await render('<tilburg-webc-alert closable>Tekst</tilburg-webc-alert>');
    const close = page.root!.querySelector<HTMLButtonElement>('button.tilburg-alert__close')!;
    expect(close.getAttribute('aria-label')).toBe('sluit alert');
    expect(close.childNodes.length).toBe(0);
    const spy = jest.fn();
    page.root!.addEventListener('tilburgClose', spy);
    close.click();
    await page.waitForChanges();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('moves aria-label from the host to the alert', async () => {
    const page = await render('<tilburg-webc-alert aria-label="Melding">Tekst</tilburg-webc-alert>');
    expect(page.root!.hasAttribute('aria-label')).toBe(false);
    expect(page.root!.querySelector('.utrecht-alert')!.getAttribute('aria-label')).toBe('Melding');
  });
});
