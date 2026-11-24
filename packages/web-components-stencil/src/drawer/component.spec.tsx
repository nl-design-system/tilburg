import { newSpecPage } from '@stencil/core/testing';
import { TilburgWbcDrawer } from './component';

const render = (html: string) => newSpecPage({ components: [TilburgWbcDrawer], html });

/* The spec DOM lays nothing out: the dialog's box is 0×0 at the origin, so any positive point is "outside" it. */
const pointer = (type: string, target: Element, offset: number) =>
  target.dispatchEvent(new MouseEvent(type, { bubbles: true, clientX: offset, clientY: offset }));
/* A real click: pointerdown, then click, both at the same point. */
const click = (target: Element, offset: number) => {
  pointer('pointerdown', target, offset);
  pointer('click', target, offset);
};

describe('tilburg-wbc-drawer', () => {
  it('renders the HTML/CSS reference markup and moves the accessible name onto the dialog', async () => {
    const page = await render('<tilburg-wbc-drawer aria-labelledby="t"><h2 id="t">Menu</h2></tilburg-wbc-drawer>');
    const dialog = page.root!.querySelector('dialog')!;
    expect(dialog.className).toBe('utrecht-drawer utrecht-drawer--inline-start');
    expect(dialog.getAttribute('aria-labelledby')).toBe('t');
    expect(page.root!.hasAttribute('aria-labelledby')).toBe(false);
    expect(dialog.hasAttribute('open')).toBe(false);
    expect(dialog.querySelector('h2')!.textContent).toBe('Menu');
  });

  it('maps align to the modifier', async () => {
    const page = await render('<tilburg-wbc-drawer align="block-end">x</tilburg-wbc-drawer>');
    expect(page.root!.querySelector('dialog')!.className).toBe('utrecht-drawer utrecht-drawer--block-end');
  });

  it('opens and closes with the open prop and emits tilburgClose', async () => {
    const page = await render('<tilburg-wbc-drawer>x</tilburg-wbc-drawer>');
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

  it('closes on a backdrop click, not on a click inside the drawer, unless disabled', async () => {
    const page = await render('<tilburg-wbc-drawer open><p>Inhoud</p></tilburg-wbc-drawer>');
    const dialog = page.root!.querySelector('dialog')!;
    click(dialog.querySelector('p')!, 500);
    click(dialog, 0);
    expect(dialog.hasAttribute('open')).toBe(true);
    click(dialog, 500);
    await page.waitForChanges();
    expect(dialog.hasAttribute('open')).toBe(false);
    expect(page.root!.hasAttribute('open')).toBe(false);

    const locked = await render('<tilburg-wbc-drawer open close-on-backdrop-click="false">x</tilburg-wbc-drawer>');
    click(locked.root!.querySelector('dialog')!, 500);
    expect(locked.root!.querySelector('dialog')!.hasAttribute('open')).toBe(true);
  });

  it('stays open when a text selection starts in the drawer and ends on the backdrop', async () => {
    const page = await render('<tilburg-wbc-drawer open><p>Inhoud</p></tilburg-wbc-drawer>');
    const dialog = page.root!.querySelector('dialog')!;
    pointer('pointerdown', dialog.querySelector('p')!, 500);
    pointer('click', dialog, 500);
    await page.waitForChanges();
    expect(dialog.hasAttribute('open')).toBe(true);
  });
});
