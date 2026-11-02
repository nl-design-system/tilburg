/**
 * Enhance every `.utrecht-listbox--html-div[data-tilburg-listbox-enhance]` within `root`: keyboard navigation
 * (Arrow Up/Down, Home, End), selection with Space/Enter and click (toggle when `aria-multiselectable="true"`), and a
 * bubbling `change` event after every selection change. Idempotent — already-enhanced listboxes are skipped.
 */
export function enhanceListbox(root?: ParentNode): void;

export default enhanceListbox;
