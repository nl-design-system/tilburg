import { newSpecPage } from '@stencil/core/testing';
import { TilburgWbcImage } from './component';

const render = (html: string) => newSpecPage({ components: [TilburgWbcImage], html });

describe('tilburg-wbc-image', () => {
  it('renders an img with the props as attributes', async () => {
    const page = await render('<tilburg-wbc-image src="logo.svg" alt="Logo" width="240"></tilburg-wbc-image>');
    const img = page.root!.querySelector('img')!;
    expect(img.className).toBe('utrecht-img');
    expect(img.getAttribute('src')).toBe('logo.svg');
    expect(img.getAttribute('alt')).toBe('Logo');
    expect(img.getAttribute('width')).toBe('240');
    expect(img.hasAttribute('height')).toBe(false);
  });

  it('keeps an empty alt and adds the photo modifier', async () => {
    const page = await render('<tilburg-wbc-image src="logo.svg" alt="" photo></tilburg-wbc-image>');
    const img = page.root!.querySelector('img')!;
    expect(img.getAttribute('alt')).toBe('');
    expect(img.classList.contains('utrecht-img--photo')).toBe(true);
  });

  it('moves id from the host to <img>', async () => {
    const page = await render('<tilburg-wbc-image id="logo" alt=""></tilburg-wbc-image>');
    expect(page.root!.hasAttribute('id')).toBe(false);
    expect(page.root!.querySelector('img')!.getAttribute('id')).toBe('logo');
  });
});
