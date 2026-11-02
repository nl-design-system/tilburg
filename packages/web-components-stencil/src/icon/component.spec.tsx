import { newSpecPage } from '@stencil/core/testing';
import { TilburgWbcIcon } from './component';

describe('tilburg-wbc-icon', () => {
  it('renders a hidden utrecht-icon span around the slotted svg', async () => {
    const page = await newSpecPage({
      components: [TilburgWbcIcon],
      html: '<tilburg-wbc-icon><svg viewBox="0 0 24 24"></svg></tilburg-wbc-icon>',
    });
    const span = page.root!.querySelector('span.utrecht-icon')!;
    expect(span.getAttribute('aria-hidden')).toBe('true');
    expect(span.querySelector('svg')).not.toBeNull();
  });
});
