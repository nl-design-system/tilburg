/**
 * Enhance every `.utrecht-combobox[data-tilburg-combobox-enhance]` within
 * `root`. Wires up the chevron toggle, keyboard navigation, option click,
 * chip add/remove, and outside-click close on the canonical HTML/CSS
 * combobox markup so consumers using the raw BEM get the same UX without
 * writing their own JS. Idempotent — already-enhanced hosts are skipped.
 */
// eslint-disable-next-line no-unused-vars
export function enhanceCombobox(root?: ParentNode): void;

export default enhanceCombobox;
