/**
 * Walk every `[data-token]` element within `root` and fill its text content
 * with the live `getComputedStyle()` value of the referenced CSS custom
 * property. Cells with undefined tokens show an em dash. Idempotent.
 */
// eslint-disable-next-line no-unused-vars
export function resolveTokens(root?: ParentNode): void;

export default resolveTokens;
