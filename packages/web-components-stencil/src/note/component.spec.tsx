import { newSpecPage } from '@stencil/core/testing';
import { TilburgWbcNote } from './component';

const render = (html: string) => newSpecPage({ components: [TilburgWbcNote], html });

describe('tilburg-wbc-note', () => {
  it('renders a neutral <section role="note"> by default', async () => {
    const page = await render('<tilburg-wbc-note><p>Tekst</p></tilburg-wbc-note>');
    const note = page.root!.querySelector('section')!;
    expect(note.className).toBe('utrecht-note');
    expect(note.getAttribute('role')).toBe('note');
    expect(note.querySelector('p')!.textContent).toBe('Tekst');
  });

  it.each([
    ['info', 'info'],
    ['success', 'success'],
    ['warning', 'warning'],
    ['danger', 'error'],
  ])('maps variant %s to the utrecht --%s modifier', async (variant, modifier) => {
    const page = await render(`<tilburg-wbc-note variant="${variant}"></tilburg-wbc-note>`);
    expect(page.root!.querySelector('section')).toHaveClass(`utrecht-note--${modifier}`);
  });

  it('renders an <aside> without role="note" and moves aria-labelledby onto it', async () => {
    const page = await render('<tilburg-wbc-note aside aria-labelledby="t"><h3 id="t">Titel</h3></tilburg-wbc-note>');
    const aside = page.root!.querySelector('aside')!;
    expect(aside).toHaveClass('utrecht-note');
    expect(aside.hasAttribute('role')).toBe(false);
    expect(aside.getAttribute('aria-labelledby')).toBe('t');
    expect(page.root!.hasAttribute('aria-labelledby')).toBe(false);
  });
});
