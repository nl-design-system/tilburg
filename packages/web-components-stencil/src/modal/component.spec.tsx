import { newSpecPage } from '@stencil/core/testing';
import { TilburgWebcModal } from './component';

const render = (html: string) => newSpecPage({ components: [TilburgWebcModal], html });

const markup = `
  <tilburg-webc-modal heading="Aanvraag bevestigen">
    <p class="utrecht-paragraph">Inhoud</p>
    <button slot="footer" type="button">Bevestigen</button>
  </tilburg-webc-modal>`;

describe('tilburg-webc-modal', () => {
  it('renders the HTML/CSS reference structure in light DOM', async () => {
    const page = await render(markup);
    const dialog = page.root!.querySelector('dialog')!;
    expect(page.root!.shadowRoot).toBeNull();
    expect(dialog).toHaveClass('tilburg-modal');
    expect(dialog.querySelector('header.tilburg-modal__header > h2')!.textContent).toBe('Aanvraag bevestigen');
    expect(dialog.querySelector('.tilburg-modal__close-button > span')!.textContent).toBe('Sluiten');
    expect(dialog.querySelector('.tilburg-modal__content p')!.textContent).toBe('Inhoud');
    expect(dialog.querySelector('footer.tilburg-modal__footer button')!.textContent).toBe('Bevestigen');
  });

  it('names the dialog after its heading', async () => {
    const page = await render(markup);
    const dialog = page.root!.querySelector('dialog')!;
    expect(dialog.querySelector('h2')!.id).toBe(dialog.getAttribute('aria-labelledby'));
  });

  it('omits the footer when the footer slot is unused', async () => {
    const page = await render('<tilburg-webc-modal heading="T">x</tilburg-webc-modal>');
    expect(page.root!.querySelector('.tilburg-modal__footer')).toBeNull();
  });

  it('opens and closes with the open prop and emits tilburgClose', async () => {
    const page = await render(markup);
    const spy = jest.fn();
    page.root!.addEventListener('tilburgClose', spy);
    page.root!.setAttribute('open', '');
    await page.waitForChanges();
    expect(page.root!.querySelector('dialog')!.hasAttribute('open')).toBe(true);
    (page.root as HTMLElement & { open: boolean }).open = false;
    await page.waitForChanges();
    expect(page.root!.querySelector('dialog')!.hasAttribute('open')).toBe(false);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('closes via the close button and reflects open=false', async () => {
    const page = await render('<tilburg-webc-modal heading="T" open>x</tilburg-webc-modal>');
    expect(page.root!.querySelector('dialog')!.hasAttribute('open')).toBe(true);
    page.root!.querySelector<HTMLButtonElement>('.tilburg-modal__close-button')!.click();
    await page.waitForChanges();
    expect(page.root!.querySelector('dialog')!.hasAttribute('open')).toBe(false);
    expect(page.root!.hasAttribute('open')).toBe(false);
  });

  it('closes on a backdrop click unless disabled', async () => {
    const page = await render('<tilburg-webc-modal heading="T" open>x</tilburg-webc-modal>');
    const dialog = page.root!.querySelector('dialog')!;
    page.root!.querySelector<HTMLElement>('.tilburg-modal__content')!.click();
    await page.waitForChanges();
    expect(dialog.hasAttribute('open')).toBe(true);
    dialog.click();
    await page.waitForChanges();
    expect(dialog.hasAttribute('open')).toBe(false);

    const locked = await render(
      '<tilburg-webc-modal heading="T" open close-on-backdrop-click="false">x</tilburg-webc-modal>',
    );
    const lockedDialog = locked.root!.querySelector('dialog')!;
    lockedDialog.click();
    await locked.waitForChanges();
    expect(lockedDialog.hasAttribute('open')).toBe(true);
  });

  it('exposes showModal() and close() methods', async () => {
    const page = await render(markup);
    const el = page.root as HTMLElement & { showModal(): Promise<void>; close(): Promise<void> };
    await el.showModal();
    await page.waitForChanges();
    expect(page.root!.querySelector('dialog')!.hasAttribute('open')).toBe(true);
    await el.close();
    await page.waitForChanges();
    expect(page.root!.querySelector('dialog')!.hasAttribute('open')).toBe(false);
  });
});
