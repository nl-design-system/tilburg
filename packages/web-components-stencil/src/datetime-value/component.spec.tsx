import { newSpecPage } from '@stencil/core/testing';
import { TilburgWbcDatetimeValue } from './component';

describe('tilburg-wbc-datetime-value', () => {
  it('renders <time class="utrecht-value-datetime" datetime>', async () => {
    const page = await newSpecPage({
      components: [TilburgWbcDatetimeValue],
      html: '<tilburg-wbc-datetime-value date-time="2026-11-02T09:30" title="t">2 november 2026 om 09:30</tilburg-wbc-datetime-value>',
    });
    const time = page.root!.querySelector('time')!;
    expect(time.className).toBe('utrecht-value-datetime');
    expect(time.getAttribute('datetime')).toBe('2026-11-02T09:30');
    expect(time.getAttribute('title')).toBe('t');
    expect(time.textContent).toBe('2 november 2026 om 09:30');
  });
});
