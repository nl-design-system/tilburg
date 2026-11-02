import { newSpecPage } from '@stencil/core/testing';
import { TilburgWbcColorSample } from './component';

describe('tilburg-wbc-color-sample', () => {
  it('renders a data element with the colour as value and inline color', async () => {
    const page = await newSpecPage({
      components: [TilburgWbcColorSample],
      html: '<tilburg-wbc-color-sample color="#e00078"></tilburg-wbc-color-sample>',
    });
    const data = page.root!.querySelector('data.utrecht-color-sample') as HTMLElement;
    expect(data.getAttribute('value')).toBe('#e00078');
    expect(data.style.color).toBe('#e00078');
  });
});
