import { newSpecPage } from '@stencil/core/testing';
import { TilburgWbcIndexCharNav, TilburgWbcIndexCharNavCharacter } from './component';

const CHARACTERS: TilburgWbcIndexCharNavCharacter[] = [
  { char: 'A', href: '#A' },
  { char: 'B' },
  { char: 'C', disabled: true },
];

const render = async (characters: TilburgWbcIndexCharNavCharacter[] | null, attrs = '') => {
  const page = await newSpecPage({
    components: [TilburgWbcIndexCharNav],
    html: `<tilburg-wbc-index-char-nav ${attrs}></tilburg-wbc-index-char-nav>`,
  });
  (page.root as HTMLElement & { characters: unknown }).characters = characters;
  await page.waitForChanges();
  return page;
};

describe('tilburg-wbc-index-char-nav', () => {
  it('renders button links: secondary, current (primary) and disabled (placeholder)', async () => {
    const page = await render(CHARACTERS, 'current-char="B"');
    const nav = page.root!.querySelector('nav')!;
    expect(nav.className).toBe('utrecht-index-char-nav');
    expect(nav.getAttribute('aria-label')).toBe('Alfabetische index');
    const [a, b, c] = Array.from(nav.querySelectorAll('a'));
    const base = ['utrecht-button-link', 'utrecht-button-link--html-a', 'utrecht-index-char-nav__link'];
    expect(a).toHaveClasses([...base, 'utrecht-button-link--secondary-action']);
    expect(a).not.toHaveClass('utrecht-button-link--primary-action');
    expect(a.getAttribute('href')).toBe('#A');
    expect(b).toHaveClasses([...base, 'utrecht-button-link--primary-action', 'utrecht-index-char-nav__link--current']);
    expect(b).not.toHaveClass('utrecht-button-link--secondary-action');
    expect(b.getAttribute('aria-current')).toBe('page');
    expect(b.getAttribute('href')).toBe('#');
    expect(c).toHaveClasses(['utrecht-button-link--placeholder', 'utrecht-index-char-nav__link--disabled']);
    expect(c.hasAttribute('href')).toBe(false);
    expect(c.getAttribute('role')).toBe('link');
    expect(c.getAttribute('aria-disabled')).toBe('true');
  });

  it('emits tilburgCharClick for enabled characters only, moves aria-label and renders nothing when empty', async () => {
    const page = await render(CHARACTERS, 'aria-label="Index"');
    expect(page.root!.hasAttribute('aria-label')).toBe(false);
    expect(page.root!.querySelector('nav')!.getAttribute('aria-label')).toBe('Index');
    const spy = jest.fn();
    page.root!.addEventListener('tilburgCharClick', spy);
    const links = page.root!.querySelectorAll<HTMLAnchorElement>('a');
    links[2].click();
    links[0].click();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0].detail.character).toBe(CHARACTERS[0]);
    expect((await render([])).root!.querySelector('nav')).toBeNull();
  });
});
