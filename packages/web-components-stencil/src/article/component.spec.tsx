import { newSpecPage } from '@stencil/core/testing';
import { TilburgWebcArticle } from './component';

const render = (html: string) => newSpecPage({ components: [TilburgWebcArticle], html });

describe('tilburg-webc-article', () => {
  it('renders a utrecht-article around its content', async () => {
    const page = await render('<tilburg-webc-article><p id="p">Tekst</p></tilburg-webc-article>');
    const article = page.root!.querySelector('article.utrecht-article')!;
    expect(article).not.toBeNull();
    expect(article.querySelector('#p')).not.toBeNull();
  });

  it('moves id and aria-labelledby from the host to <article>', async () => {
    const page = await render('<tilburg-webc-article id="a" aria-labelledby="h">Tekst</tilburg-webc-article>');
    expect(page.root!.hasAttribute('id')).toBe(false);
    expect(page.root!.hasAttribute('aria-labelledby')).toBe(false);
    const article = page.root!.querySelector('article')!;
    expect(article.getAttribute('id')).toBe('a');
    expect(article.getAttribute('aria-labelledby')).toBe('h');
  });
});
