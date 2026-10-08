import { newSpecPage } from '@stencil/core/testing';
import { TilburgWbcArticle } from './component';

const render = (html: string) => newSpecPage({ components: [TilburgWbcArticle], html });

describe('tilburg-wbc-article', () => {
  it('renders a utrecht-article around its content', async () => {
    const page = await render('<tilburg-wbc-article><p id="p">Tekst</p></tilburg-wbc-article>');
    const article = page.root!.querySelector('article.utrecht-article')!;
    expect(article).not.toBeNull();
    expect(article.querySelector('#p')).not.toBeNull();
  });

  it('moves id and aria-labelledby from the host to <article>', async () => {
    const page = await render('<tilburg-wbc-article id="a" aria-labelledby="h">Tekst</tilburg-wbc-article>');
    expect(page.root!.hasAttribute('id')).toBe(false);
    expect(page.root!.hasAttribute('aria-labelledby')).toBe(false);
    const article = page.root!.querySelector('article')!;
    expect(article.getAttribute('id')).toBe('a');
    expect(article.getAttribute('aria-labelledby')).toBe('h');
  });
});
