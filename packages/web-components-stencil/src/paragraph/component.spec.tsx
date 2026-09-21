import { newSpecPage } from '@stencil/core/testing';
import { TilburgWebcParagraph } from './component';

const render = (html: string) => newSpecPage({ components: [TilburgWebcParagraph], html });

describe('tilburg-webc-paragraph', () => {
  it('renders a utrecht paragraph in light DOM', async () => {
    const page = await render('<tilburg-webc-paragraph>Tekst</tilburg-webc-paragraph>');
    const p = page.root!.querySelector('p')!;
    expect(page.root!.shadowRoot).toBeNull();
    expect(p).toHaveClass('utrecht-paragraph');
    expect(p).not.toHaveClass('utrecht-paragraph--lead');
    expect(p).not.toHaveClass('utrecht-paragraph--small');
    expect(p.textContent).toBe('Tekst');
  });

  it('adds the lead modifier', async () => {
    const page = await render('<tilburg-webc-paragraph lead>Intro</tilburg-webc-paragraph>');
    expect(page.root!.querySelector('p')).toHaveClasses(['utrecht-paragraph', 'utrecht-paragraph--lead']);
  });

  it('adds the small modifier', async () => {
    const page = await render('<tilburg-webc-paragraph small>Voetnoot</tilburg-webc-paragraph>');
    expect(page.root!.querySelector('p')).toHaveClasses(['utrecht-paragraph', 'utrecht-paragraph--small']);
  });

  it('keeps inline markup inside the paragraph', async () => {
    const page = await render('<tilburg-webc-paragraph>Met <strong>nadruk</strong></tilburg-webc-paragraph>');
    expect(page.root!.querySelector('p > strong')!.textContent).toBe('nadruk');
  });
});
