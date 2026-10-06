/**
 * Live announcer: reads a message out to screen-reader users through one persistent, visually hidden live region per
 * politeness on `document.body`. A live region only announces changes to content that was already there, so a message
 * inserted together with its live region (an alert after a submit) is often not read (bq-tlb-frontend TIL-40).
 *
 * The same as `@gemeente-tilburg/components-css/announce` (used by React) and the Web Components copy; copied because the
 * Angular package cannot depend on the unpublished CSS package.
 */

const HIDDEN_STYLE =
  'position:absolute;inline-size:1px;block-size:1px;margin:-1px;padding:0;overflow:hidden;clip-path:inset(50%);white-space:nowrap;border:0';

/* Long enough for screen readers to notice the region was emptied, so repeating the same message is announced again. */
const ANNOUNCE_DELAY_MS = 100;

const timers = new Map<string, ReturnType<typeof setTimeout>>();

const liveRegion = (politeness: 'polite' | 'assertive'): HTMLElement => {
  const id = `tilburg-announcer-${politeness}`;
  let region = document.getElementById(id);
  if (!region) {
    region = document.createElement('div');
    region.id = id;
    region.setAttribute('aria-live', politeness);
    region.setAttribute('aria-atomic', 'true');
    region.setAttribute('style', HIDDEN_STYLE);
    document.body.appendChild(region);
  }
  return region;
};

/** Announce `message`; `politeness` is `polite` (default) or `assertive` (interrupts; for errors). */
export function announce(message: string | null | undefined, politeness: 'polite' | 'assertive' = 'polite'): void {
  const text = (message ?? '').replace(/\s+/g, ' ').trim();
  if (typeof document === 'undefined' || !document.body || !text) return;
  const region = liveRegion(politeness);
  region.textContent = '';
  clearTimeout(timers.get(politeness));
  timers.set(
    politeness,
    setTimeout(() => {
      region.textContent = text;
    }, ANNOUNCE_DELAY_MS),
  );
}
