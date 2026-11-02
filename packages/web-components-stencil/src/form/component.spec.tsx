import { newSpecPage } from '@stencil/core/testing';
import { TilburgWbcForm } from './component';

const render = (html: string) => newSpecPage({ components: [TilburgWbcForm], html });

describe('tilburg-wbc-form', () => {
  it('renders form.utrecht-form in light DOM with the content inside it', async () => {
    const page = await render('<tilburg-wbc-form><input name="naam" /></tilburg-wbc-form>');
    const form = page.root!.querySelector('form')!;
    expect(page.root!.shadowRoot).toBeNull();
    expect(form).toHaveClass('utrecht-form');
    expect(form.querySelector('input[name="naam"]')).not.toBeNull();
    expect(form.hasAttribute('novalidate')).toBe(false);
  });

  it('moves id, name, action, method and aria attributes onto the form and maps no-validate', async () => {
    const page = await render(
      '<tilburg-wbc-form id="contact" name="contact" action="/verstuur" method="post" aria-labelledby="titel" no-validate></tilburg-wbc-form>',
    );
    const form = page.root!.querySelector('form')!;
    expect(page.root!.hasAttribute('id')).toBe(false);
    expect(form.getAttribute('id')).toBe('contact');
    expect(form.getAttribute('name')).toBe('contact');
    expect(form.getAttribute('action')).toBe('/verstuur');
    expect(form.getAttribute('method')).toBe('post');
    expect(form.getAttribute('aria-labelledby')).toBe('titel');
    expect(form.hasAttribute('novalidate')).toBe(true);
  });

  it('lets the native submit event bubble through the host', async () => {
    const page = await render('<tilburg-wbc-form></tilburg-wbc-form>');
    const spy = jest.fn();
    page.root!.addEventListener('submit', spy);
    page.root!.querySelector('form')!.dispatchEvent(new Event('submit', { bubbles: true }));
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
