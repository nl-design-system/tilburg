/**
 * Enhance every `.tilburg-password-input[data-tilburg-password-input-enhance]` within `root`, so its toggle shows and
 * hides the password (input type, `aria-pressed`, status line). Idempotent — already-enhanced fields are skipped.
 */
export function enhancePasswordInput(root?: ParentNode): void;

export default enhancePasswordInput;
