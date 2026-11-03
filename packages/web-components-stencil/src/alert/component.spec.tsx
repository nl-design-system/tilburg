import { newSpecPage } from '@stencil/core/testing';
import { TilburgWbcAlert } from './component';

const render = (html: string) => newSpecPage({ components: [TilburgWbcAlert], html });

describe('tilburg-wbc-alert', () => {
  it('renders the utrecht alert markup for the default info variant', async () => {
    const page = await render('<tilburg-wbc-alert heading="Informatie">Tekst</tilburg-wbc-alert>');
    const alert = page.root!.querySelector('.utrecht-alert')!;
    expect(alert).toHaveClasses(['tilburg-alert', 'utrecht-alert--info']);
    expect(alert.getAttribute('role')).toBe('status');
    expect(alert.getAttribute('aria-live')).toBe('polite');
    expect(alert.getAttribute('aria-atomic')).toBe('true');
    expect(alert.querySelector('.utrecht-alert__message')!.textContent).toContain('Tekst');
  });

  it('renders the heading at the requested level', async () => {
    const page = await render('<tilburg-wbc-alert heading="Titel" heading-level="2">Tekst</tilburg-wbc-alert>');
    const title = page.root!.querySelector('utrecht-heading-2.tilburg-alert__title > h2.utrecht-heading-2')!;
    expect(title.textContent).toBe('Titel');
    expect(page.root!.querySelector('tilburg-wbc-heading-2')).toBeNull();
    const level3 = await render('<tilburg-wbc-alert heading="Titel">Tekst</tilburg-wbc-alert>');
    expect(level3.root!.querySelector('utrecht-heading-3.tilburg-alert__title > h3.utrecht-heading-3')).not.toBeNull();
  });

  it('omits the heading when no heading text is given', async () => {
    const page = await render('<tilburg-wbc-alert>Tekst</tilburg-wbc-alert>');
    expect(page.root!.querySelector('.tilburg-alert__title')).toBeNull();
  });

  it('maps danger to utrecht error with an assertive alert role', async () => {
    const page = await render('<tilburg-wbc-alert variant="danger">Fout</tilburg-wbc-alert>');
    const alert = page.root!.querySelector('.utrecht-alert')!;
    expect(alert).toHaveClass('utrecht-alert--error');
    expect(alert.getAttribute('role')).toBe('alert');
    expect(alert.getAttribute('aria-live')).toBe('assertive');
  });

  it('maps success to utrecht ok', async () => {
    const page = await render('<tilburg-wbc-alert variant="success">OK</tilburg-wbc-alert>');
    expect(page.root!.querySelector('.utrecht-alert')).toHaveClass('utrecht-alert--ok');
  });

  it('respects an explicit live region', async () => {
    const page = await render('<tilburg-wbc-alert variant="danger" live-region="off">Fout</tilburg-wbc-alert>');
    expect(page.root!.querySelector('.utrecht-alert')!.getAttribute('aria-live')).toBe('off');
  });

  it('renders the default icon markup of the HTML reference, per variant', async () => {
    const info = await render('<tilburg-wbc-alert>Tekst</tilburg-wbc-alert>');
    const icon = info.root!.querySelector(
      '.utrecht-alert__icon > i[aria-hidden="true"] > svg[aria-hidden="true"] path',
    )!;
    expect(icon.getAttribute('d')).toMatch(/^M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 15h-2v-6h2v6Z/);
    const danger = await render('<tilburg-wbc-alert variant="danger">Tekst</tilburg-wbc-alert>');
    expect(danger.root!.querySelector('.utrecht-alert__icon path')!.getAttribute('d')).toContain('Zm5 13.6L15.6 17');
  });

  it('projects a custom icon into the icon slot', async () => {
    const page = await render('<tilburg-wbc-alert><span slot="icon" id="i">!</span>Tekst</tilburg-wbc-alert>');
    expect(page.root!.querySelector('.utrecht-alert__icon #i')).not.toBeNull();
    expect(page.root!.querySelector('.utrecht-alert__icon svg')).toBeNull();
  });

  it('renders the screen-reader prefix', async () => {
    const page = await render('<tilburg-wbc-alert sr-prefix="Fout:">Tekst</tilburg-wbc-alert>');
    expect(page.root!.querySelector('.utrecht-alert__message .utrecht-visually-hidden')!.textContent!.trim()).toBe(
      'Fout:',
    );
  });

  it('renders a close button that emits tilburgClose', async () => {
    const page = await render('<tilburg-wbc-alert closable>Tekst</tilburg-wbc-alert>');
    const close = page.root!.querySelector<HTMLButtonElement>('button.tilburg-alert__close')!;
    expect(close.getAttribute('aria-label')).toBe('Sluit alert');
    expect(close.querySelector('i[aria-hidden="true"] > svg')).not.toBeNull();
    const spy = jest.fn();
    page.root!.addEventListener('tilburgClose', spy);
    close.click();
    await page.waitForChanges();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('moves aria-label from the host to the alert', async () => {
    const page = await render('<tilburg-wbc-alert aria-label="Melding">Tekst</tilburg-wbc-alert>');
    expect(page.root!.hasAttribute('aria-label')).toBe(false);
    expect(page.root!.querySelector('.utrecht-alert')!.getAttribute('aria-label')).toBe('Melding');
  });

  it('reads the alert type before the message by default, per variant, unless sr-prefix is empty', async () => {
    const warning = await render('<tilburg-wbc-alert variant="warning">Tekst</tilburg-wbc-alert>');
    expect(warning.root!.querySelector('.utrecht-visually-hidden')!.textContent!.trim()).toBe('Waarschuwing:');
    const none = await render('<tilburg-wbc-alert variant="danger" sr-prefix="">Tekst</tilburg-wbc-alert>');
    expect(none.root!.querySelector('.utrecht-alert__message .utrecht-visually-hidden')).toBeNull();
  });

  it('with announce, reads the alert out through the shared live region instead of its own role', async () => {
    const page = await render(
      '<tilburg-wbc-alert variant="danger" heading="Er ging iets mis" announce>Probeer het opnieuw.</tilburg-wbc-alert>',
    );
    const alert = page.root!.querySelector('.utrecht-alert')!;
    expect(alert.hasAttribute('role')).toBe(false);
    expect(alert.hasAttribute('aria-live')).toBe(false);
    await new Promise((resolve) => setTimeout(resolve, 200));
    const region = page.doc.getElementById('tilburg-announcer-assertive')!;
    expect(region.getAttribute('aria-live')).toBe('assertive');
    expect(region.textContent).toBe('Er ging iets mis Fout: Probeer het opnieuw.');
  });
});
