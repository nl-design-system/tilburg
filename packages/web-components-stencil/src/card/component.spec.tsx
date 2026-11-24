import { newSpecPage } from '@stencil/core/testing';
import { TilburgWbcCard } from './component';

const render = (html: string) => newSpecPage({ components: [TilburgWbcCard], html });

describe('tilburg-wbc-card', () => {
  it('renders the HTML/CSS reference structure in light DOM', async () => {
    const page = await render('<tilburg-wbc-card heading="Openingstijden"><p>Op afspraak.</p></tilburg-wbc-card>');
    const card = page.root!.querySelector('.utrecht-card')!;
    expect(card.className).toBe('utrecht-card');
    const content = card.querySelector('.utrecht-card__content')!;
    const heading = content.querySelector('.utrecht-card__heading > h3.utrecht-heading-3')!;
    expect(heading.textContent).toBe('Openingstijden');
    expect(heading.querySelector('a')).toBeNull();
    expect(content.querySelector('.utrecht-card__image')).toBeNull();
    expect(content.querySelector('.utrecht-card__body p')!.textContent).toBe('Op afspraak.');
  });

  it('makes the heading a stretched link with href', async () => {
    const page = await render('<tilburg-wbc-card heading="Afval" href="/afval"></tilburg-wbc-card>');
    expect(page.root!.querySelector('.utrecht-card')).toHaveClass('utrecht-card--link');
    const link = page.root!.querySelector('h3 > a')!;
    expect(link.className).toBe('utrecht-link utrecht-link--html-a utrecht-card__link');
    expect(link.getAttribute('href')).toBe('/afval');
    expect(link.textContent).toBe('Afval');
  });

  it('renders the heading level and the image slot after the heading', async () => {
    const page = await render(
      '<tilburg-wbc-card heading="Parkeren" heading-level="2"><img slot="image" src="x.png" alt="" /></tilburg-wbc-card>',
    );
    expect(page.root!.querySelector('.utrecht-card__heading > h2.utrecht-heading-2')!.textContent).toBe('Parkeren');
    const parts = Array.from(page.root!.querySelector('.utrecht-card__content')!.children, (el) => el.className);
    expect(parts.slice(0, 2)).toEqual(['utrecht-card__heading', 'utrecht-card__image']);
    expect(page.root!.querySelector('.utrecht-card__image img')).not.toBeNull();
  });
});
