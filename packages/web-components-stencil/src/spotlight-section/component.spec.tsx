import { newSpecPage } from '@stencil/core/testing';
import { TilburgWbcSpotlightSection } from './component';

const render = (html: string) => newSpecPage({ components: [TilburgWbcSpotlightSection], html });

describe('tilburg-wbc-spotlight-section', () => {
  it('renders a neutral <section> by default', async () => {
    const page = await render('<tilburg-wbc-spotlight-section><p>Tekst</p></tilburg-wbc-spotlight-section>');
    const section = page.root!.querySelector('section')!;
    expect(section.className).toBe('utrecht-spotlight-section');
    expect(section.querySelector('p')!.textContent).toBe('Tekst');
  });

  it.each([
    ['info', 'info'],
    ['success', 'ok'],
    ['warning', 'warning'],
    ['danger', 'error'],
  ])('maps variant %s to the utrecht --%s modifier', async (variant, modifier) => {
    const page = await render(`<tilburg-wbc-spotlight-section variant="${variant}"></tilburg-wbc-spotlight-section>`);
    expect(page.root!.querySelector('section')).toHaveClass(`utrecht-spotlight-section--${modifier}`);
  });

  it('renders an <aside> with aside and moves aria-label onto it', async () => {
    const page = await render(
      '<tilburg-wbc-spotlight-section aside aria-label="Tip">x</tilburg-wbc-spotlight-section>',
    );
    const aside = page.root!.querySelector('aside')!;
    expect(aside).toHaveClass('utrecht-spotlight-section');
    expect(aside.getAttribute('aria-label')).toBe('Tip');
    expect(page.root!.hasAttribute('aria-label')).toBe(false);
  });
});
