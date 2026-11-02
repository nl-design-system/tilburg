import { newSpecPage } from '@stencil/core/testing';
import { TilburgWbcFigure } from './component';

const render = (html: string) => newSpecPage({ components: [TilburgWbcFigure], html });

describe('tilburg-wbc-figure', () => {
  it('renders a utrecht-figure with its content and the caption last', async () => {
    const page = await render('<tilburg-wbc-figure caption="Het logo"><img id="i" alt="Logo" /></tilburg-wbc-figure>');
    const figure = page.root!.querySelector('figure.utrecht-figure')!;
    expect(figure.querySelector('#i')).not.toBeNull();
    const caption = figure.querySelector('figcaption.utrecht-figure__caption')!;
    expect(caption.textContent).toBe('Het logo');
    expect(figure.lastElementChild).toBe(caption);
  });

  it('renders no figcaption without a caption', async () => {
    const page = await render('<tilburg-wbc-figure>Inhoud</tilburg-wbc-figure>');
    expect(page.root!.querySelector('figcaption')).toBeNull();
  });

  it('moves id and aria-label from the host to <figure>', async () => {
    const page = await render('<tilburg-wbc-figure id="f" aria-label="Logo">x</tilburg-wbc-figure>');
    expect(page.root!.hasAttribute('id')).toBe(false);
    expect(page.root!.hasAttribute('aria-label')).toBe(false);
    const figure = page.root!.querySelector('figure')!;
    expect(figure.getAttribute('id')).toBe('f');
    expect(figure.getAttribute('aria-label')).toBe('Logo');
  });
});
