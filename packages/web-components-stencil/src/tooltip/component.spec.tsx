import { newSpecPage } from '@stencil/core/testing';
import { TilburgWbcTooltip } from './component';

const render = (html: string) => newSpecPage({ components: [TilburgWbcTooltip], html });

describe('tilburg-wbc-tooltip', () => {
  it('renders the reference markup around the trigger and adds the tooltip to its description', async () => {
    const page = await render(
      '<tilburg-wbc-tooltip text="Uw gegevens bewerken" placement="below"><button type="button" aria-label="Bewerken" aria-describedby="hint">✎</button></tilburg-wbc-tooltip>',
    );
    const wrapper = page.root!.querySelector('.tilburg-tooltip')!;
    const popup = page.root!.querySelector('[role="tooltip"]')!;
    expect(page.root!.shadowRoot).toBeNull();
    expect(wrapper).toHaveClass('tilburg-tooltip--below');
    expect(wrapper.querySelector('button')).not.toBeNull();
    expect(popup.textContent).toBe('Uw gegevens bewerken');
    expect(page.root!.querySelector('button')!.getAttribute('aria-describedby')).toBe(`hint ${popup.id}`);
  });

  it('opens on focus and closes on Escape', async () => {
    const page = await render(
      '<tilburg-wbc-tooltip text="Uitleg"><button type="button">Opslaan</button></tilburg-wbc-tooltip>',
    );
    const wrapper = page.root!.querySelector('.tilburg-tooltip')!;
    wrapper.dispatchEvent(new Event('focusin'));
    expect(wrapper).toHaveClass('tilburg-tooltip--open');
    page.doc.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(wrapper).not.toHaveClass('tilburg-tooltip--open');
  });

  it('flips below the trigger when there is no room above it', async () => {
    const page = await render(
      '<tilburg-wbc-tooltip text="Uitleg"><button type="button">Opslaan</button></tilburg-wbc-tooltip>',
    );
    const wrapper = page.root!.querySelector('.tilburg-tooltip')!;
    const popup = page.root!.querySelector('[role="tooltip"]')!;
    /* The mock DOM has no layout: fake a 1000×800 viewport and where the popup would be for each side. */
    Object.defineProperty(page.doc.documentElement, 'clientWidth', { value: 1000, configurable: true });
    Object.defineProperty(page.doc.documentElement, 'clientHeight', { value: 800, configurable: true });
    popup.getBoundingClientRect = () =>
      (wrapper.getAttribute('data-tilburg-tooltip-placement') === 'above'
        ? { top: -30, bottom: -2, left: 400, right: 500 }
        : { top: 40, bottom: 68, left: 400, right: 500 }) as DOMRect;
    wrapper.dispatchEvent(new Event('focusin'));
    expect(wrapper.getAttribute('data-tilburg-tooltip-placement')).toBe('below');
  });
});
