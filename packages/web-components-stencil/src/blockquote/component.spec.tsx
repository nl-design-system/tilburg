import { newSpecPage } from '@stencil/core/testing';
import { TilburgWbcBlockquote } from './component';

const render = (html: string) => newSpecPage({ components: [TilburgWbcBlockquote], html });

describe('tilburg-wbc-blockquote', () => {
  it('renders the content without an attribution by default', async () => {
    const page = await render('<tilburg-wbc-blockquote><p>Citaat</p></tilburg-wbc-blockquote>');
    const blockquote = page.root!.querySelector('blockquote.utrecht-blockquote')!;
    expect(blockquote.querySelector('.utrecht-blockquote__content > p')!.textContent).toBe('Citaat');
    expect(blockquote.querySelector('.utrecht-blockquote__attribution')).toBeNull();
  });

  it('renders the attribution after the content', async () => {
    const page = await render(
      '<tilburg-wbc-blockquote attribution="Inwoner van de Reeshof">Citaat</tilburg-wbc-blockquote>',
    );
    const children = page.root!.querySelector('blockquote')!.children;
    expect(children[0].className).toBe('utrecht-blockquote__content');
    expect(children[1].className).toBe('utrecht-blockquote__attribution');
    expect(children[1].textContent).toBe('Inwoner van de Reeshof');
  });

  it('moves cite from the host to <blockquote>', async () => {
    const page = await render('<tilburg-wbc-blockquote cite="https://www.tilburg.nl">Citaat</tilburg-wbc-blockquote>');
    expect(page.root!.hasAttribute('cite')).toBe(false);
    expect(page.root!.querySelector('blockquote')!.getAttribute('cite')).toBe('https://www.tilburg.nl');
  });
});
