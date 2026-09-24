/**
 * Enhance every `.utrecht-accordion[data-tilburg-accordion-enhance]` within
 * `root`. Wires up click + keyboard navigation on the section buttons so the
 * canonical HTML/CSS markup is interactive without consumer-written JS.
 * Idempotent — already-enhanced accordions are skipped.
 */
export function enhanceAccordion(root?: ParentNode): void;

export default enhanceAccordion;
