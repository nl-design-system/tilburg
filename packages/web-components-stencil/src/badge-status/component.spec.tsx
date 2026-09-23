import { newSpecPage } from '@stencil/core/testing';
import { TilburgWbcBadgeStatus } from './component';

const render = (html: string) => newSpecPage({ components: [TilburgWbcBadgeStatus], html });

describe('tilburg-wbc-badge-status', () => {
  it('renders a polite status region with the status modifier', async () => {
    const page = await render('<tilburg-wbc-badge-status status="success">Goedgekeurd</tilburg-wbc-badge-status>');
    const badge = page.root!.querySelector('span')!;
    expect(page.root!.shadowRoot).toBeNull();
    expect(badge).toHaveClasses(['utrecht-badge-status', 'utrecht-badge-status--success']);
    expect(badge.getAttribute('role')).toBe('status');
    expect(badge.getAttribute('aria-live')).toBe('polite');
    expect(badge.textContent).toBe('Goedgekeurd');
  });

  it('uses the status as accessible name when no aria-label is given', async () => {
    const page = await render('<tilburg-wbc-badge-status status="warning">Let op</tilburg-wbc-badge-status>');
    expect(page.root!.querySelector('span')!.getAttribute('aria-label')).toBe('warning');
  });

  it('renders no modifier and no aria-label without a status', async () => {
    const page = await render('<tilburg-wbc-badge-status>Neutraal</tilburg-wbc-badge-status>');
    const badge = page.root!.querySelector('span')!;
    expect(badge.className).toBe('utrecht-badge-status');
    expect(badge.hasAttribute('aria-label')).toBe(false);
  });

  it('respects an explicit live region', async () => {
    const page = await render('<tilburg-wbc-badge-status live-region="assertive">Fout</tilburg-wbc-badge-status>');
    expect(page.root!.querySelector('span')!.getAttribute('aria-live')).toBe('assertive');
  });

  it('moves aria-label from the host to the badge, overriding the status', async () => {
    const page = await render(
      '<tilburg-wbc-badge-status status="error" aria-label="Aanvraag afgewezen">Afgewezen</tilburg-wbc-badge-status>',
    );
    expect(page.root!.hasAttribute('aria-label')).toBe(false);
    expect(page.root!.querySelector('span')!.getAttribute('aria-label')).toBe('Aanvraag afgewezen');
  });

  it('updates the modifier when the status changes', async () => {
    const page = await render('<tilburg-wbc-badge-status status="info">Status</tilburg-wbc-badge-status>');
    page.root!.setAttribute('status', 'error');
    await page.waitForChanges();
    const badge = page.root!.querySelector('span')!;
    expect(badge).toHaveClass('utrecht-badge-status--error');
    expect(badge).not.toHaveClass('utrecht-badge-status--info');
  });
});
