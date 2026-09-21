import { newSpecPage } from '@stencil/core/testing';
import { TilburgWebcSkipLink } from './component';

const render = (html: string) => newSpecPage({ components: [TilburgWebcSkipLink], html });

describe('tilburg-webc-skip-link', () => {
  it('renders the production visible-on-focus link by default', async () => {
    const page = await render('<tilburg-webc-skip-link href="#main">Naar inhoud</tilburg-webc-skip-link>');
    const link = page.root!.querySelector('a')!;
    expect(link).toHaveClasses(['utrecht-skip-link', 'utrecht-skip-link--visible-on-focus']);
    expect(link.getAttribute('href')).toBe('#main');
    expect(link.textContent).toBe('Naar inhoud');
  });

  it.each(['visible', 'hidden', 'focus'])('maps visibility="%s" to its modifier only', async (visibility) => {
    const page = await render(`<tilburg-webc-skip-link visibility="${visibility}">X</tilburg-webc-skip-link>`);
    const link = page.root!.querySelector('a')!;
    expect(link).toHaveClass(`utrecht-skip-link--${visibility}`);
    expect(link).not.toHaveClass('utrecht-skip-link--visible-on-focus');
  });

  it('omits href when none is given', async () => {
    const page = await render('<tilburg-webc-skip-link>X</tilburg-webc-skip-link>');
    expect(page.root!.querySelector('a')!.hasAttribute('href')).toBe(false);
  });

  it('moves aria-label from the host to the link', async () => {
    const page = await render('<tilburg-webc-skip-link aria-label="Naar inhoud">X</tilburg-webc-skip-link>');
    expect(page.root!.hasAttribute('aria-label')).toBe(false);
    expect(page.root!.querySelector('a')!.getAttribute('aria-label')).toBe('Naar inhoud');
  });
});
