import { newSpecPage } from '@stencil/core/testing';
import { TilburgWbcDataBadge } from './component';

const render = (html: string) => newSpecPage({ components: [TilburgWbcDataBadge], html });

describe('tilburg-wbc-data-badge', () => {
  it('renders a span.utrecht-data-badge around its content by default', async () => {
    const page = await render('<tilburg-wbc-data-badge>Energielabel A</tilburg-wbc-data-badge>');
    const badge = page.root!.querySelector('.utrecht-data-badge')!;
    expect(badge.tagName).toBe('SPAN');
    expect(badge.textContent).toBe('Energielabel A');
  });

  it('renders <data value> for a value and <time datetime> for a date-time (which wins)', async () => {
    let page = await render('<tilburg-wbc-data-badge value="259">≥ 250㎡</tilburg-wbc-data-badge>');
    let badge = page.root!.querySelector('.utrecht-data-badge')!;
    expect(badge.tagName).toBe('DATA');
    expect(badge.getAttribute('value')).toBe('259');
    page = await render(
      '<tilburg-wbc-data-badge date-time="2026-12-24" value="x">24 december</tilburg-wbc-data-badge>',
    );
    badge = page.root!.querySelector('.utrecht-data-badge')!;
    expect(badge.tagName).toBe('TIME');
    expect(badge.getAttribute('datetime')).toBe('2026-12-24');
    expect(badge.hasAttribute('value')).toBe(false);
  });

  it('falls back to a span when value and date-time are removed (props become null)', async () => {
    const page = await render('<tilburg-wbc-data-badge value="1" date-time="2026-12-24">x</tilburg-wbc-data-badge>');
    page.root!.removeAttribute('date-time');
    await page.waitForChanges();
    expect(page.root!.querySelector('.utrecht-data-badge')!.tagName).toBe('DATA');
    page.root!.removeAttribute('value');
    await page.waitForChanges();
    expect(page.root!.querySelector('.utrecht-data-badge')!.tagName).toBe('SPAN');
  });

  it('moves id from the host to the badge', async () => {
    const page = await render('<tilburg-wbc-data-badge id="b">x</tilburg-wbc-data-badge>');
    expect(page.root!.hasAttribute('id')).toBe(false);
    expect(page.root!.querySelector('span')!.getAttribute('id')).toBe('b');
  });
});
