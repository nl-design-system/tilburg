/* @license CC0-1.0 */

/**
 * Tilburg live announcer: reads a message out to screen-reader users.
 *
 * A live region only announces changes to content that was already on the page. A message that is inserted together
 * with its live region (an alert rendered after a form submit, a spinner that appears) is therefore often not read at
 * all (bq-tlb-frontend TIL-40, which solved this with Angular CDK's `LiveAnnouncer`). This keeps one persistent,
 * visually hidden live region per politeness on `document.body` and writes the message into it.
 *
 * Usage:
 *   import { announce } from '@gemeente-tilburg/components-css/announce/index.js';
 *   announce('Uw aanvraag is verstuurd.');
 *   announce('Er ging iets mis.', 'assertive');
 */

/* Visually hidden, but read by screen readers; inline so it works without any stylesheet. */
const HIDDEN_STYLE =
  'position:absolute;inline-size:1px;block-size:1px;margin:-1px;padding:0;overflow:hidden;clip-path:inset(50%);white-space:nowrap;border:0';

/* Long enough for screen readers to notice the region was emptied, so repeating the same message is announced again. */
const ANNOUNCE_DELAY_MS = 100;

const timers = new Map();

const liveRegion = (politeness) => {
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

/**
 * Announce `message` to screen-reader users. `politeness` is `'polite'` (default: waits until the user is idle) or
 * `'assertive'` (interrupts; for errors). Does nothing outside a browser or for an empty message.
 */
export function announce(message, politeness = 'polite') {
  const text = String(message || '')
    .replace(/\s+/g, ' ')
    .trim();
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

export default announce;
