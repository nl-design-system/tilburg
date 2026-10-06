/**
 * Announce `message` to screen-reader users through a persistent, visually hidden live region. Use it for content
 * that is inserted together with its text (an alert after a submit), which a live region on that content itself often
 * does not announce. `politeness`: `'polite'` (default) or `'assertive'` (interrupts; for errors).
 */
export function announce(message: string | null | undefined, politeness?: 'polite' | 'assertive'): void;

export default announce;
