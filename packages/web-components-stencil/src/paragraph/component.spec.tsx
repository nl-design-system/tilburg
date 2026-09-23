import { newSpecPage } from '@stencil/core/testing';
import { TilburgWbcParagraph } from './component';

const render = (html: string) => newSpecPage({ components: [TilburgWbcParagraph], html });

describe('tilburg-wbc-paragraph', () => {
  it('renders a utrecht paragraph in light DOM', async () => {
    const page = await render('<tilburg-wbc-paragraph>Tekst</tilburg-wbc-paragraph>');
    const p = page.root!.querySelector('p')!;
    expect(page.root!.shadowRoot).toBeNull();
    expect(p).toHaveClass('utrecht-paragraph');
    expect(p).not.toHaveClass('utrecht-paragraph--lead');
    expect(p).not.toHaveClass('utrecht-paragraph--small');
    expect(p.textContent).toBe('Tekst');
  });

  it('adds the lead modifier', async () => {
    const page = await render('<tilburg-wbc-paragraph lead>Intro</tilburg-wbc-paragraph>');
    expect(page.root!.querySelector('p')).toHaveClasses(['utrecht-paragraph', 'utrecht-paragraph--lead']);
  });

  it('adds the small modifier', async () => {
    const page = await render('<tilburg-wbc-paragraph small>Voetnoot</tilburg-wbc-paragraph>');
    expect(page.root!.querySelector('p')).toHaveClasses(['utrecht-paragraph', 'utrecht-paragraph--small']);
  });

  it('keeps inline markup inside the paragraph', async () => {
    const page = await render('<tilburg-wbc-paragraph>Met <strong>nadruk</strong></tilburg-wbc-paragraph>');
    expect(page.root!.querySelector('p > strong')!.textContent).toBe('nadruk');
  });
});
