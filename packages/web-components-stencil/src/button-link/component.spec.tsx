import { newSpecPage } from '@stencil/core/testing';
import { TilburgWbcButtonLink } from './component';

const render = (html: string) => newSpecPage({ components: [TilburgWbcButtonLink], html });

describe('tilburg-wbc-button-link', () => {
  it('renders an anchor in light DOM with the base classes', async () => {
    const page = await render('<tilburg-wbc-button-link href="/nieuw">Start</tilburg-wbc-button-link>');
    const a = page.root!.querySelector('a')!;
    expect(page.root!.shadowRoot).toBeNull();
    expect(a.getAttribute('href')).toBe('/nieuw');
    expect(a.textContent).toBe('Start');
    expect(a.className).toBe('utrecht-button-link utrecht-button-link--html-a');
    expect(a.hasAttribute('rel')).toBe(false);
    expect(a.hasAttribute('aria-disabled')).toBe(false);
  });

  it.each([
    ['primary-action-button', 'utrecht-button-link--primary-action'],
    ['secondary-action-button', 'utrecht-button-link--secondary-action'],
    ['subtle-button', 'utrecht-button-link--subtle'],
  ])('maps appearance %s to %s', async (appearance, cls) => {
    const page = await render(
      `<tilburg-wbc-button-link href="#" appearance="${appearance}">X</tilburg-wbc-button-link>`,
    );
    expect(page.root!.querySelector('a')).toHaveClass(cls);
  });

  it('forwards target and rel, and replaces rel when external', async () => {
    const page = await render(
      '<tilburg-wbc-button-link href="#" target="_blank" rel="nofollow">X</tilburg-wbc-button-link>',
    );
    const a = page.root!.querySelector('a')!;
    expect(a.getAttribute('target')).toBe('_blank');
    expect(a.getAttribute('rel')).toBe('nofollow');
    const ext = await render('<tilburg-wbc-button-link href="#" rel="nofollow" external>X</tilburg-wbc-button-link>');
    expect(ext.root!.querySelector('a')!.getAttribute('rel')).toBe('external noopener noreferrer');
  });

  it('marks placeholders as aria-disabled', async () => {
    const page = await render('<tilburg-wbc-button-link href="#" placeholder>X</tilburg-wbc-button-link>');
    const a = page.root!.querySelector('a')!;
    expect(a.getAttribute('aria-disabled')).toBe('true');
    expect(a).toHaveClass('utrecht-button-link--placeholder');
  });

  it('moves aria-label and title from the host to the anchor', async () => {
    const page = await render(
      '<tilburg-wbc-button-link href="#" aria-label="Start aanvraag" title="Tip">X</tilburg-wbc-button-link>',
    );
    const a = page.root!.querySelector('a')!;
    expect(page.root!.hasAttribute('aria-label')).toBe(false);
    expect(page.root!.hasAttribute('title')).toBe(false);
    expect(a.getAttribute('aria-label')).toBe('Start aanvraag');
    expect(a.getAttribute('title')).toBe('Tip');
  });
});
