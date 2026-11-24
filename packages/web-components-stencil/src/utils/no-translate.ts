/* `translate="no"` as a plain JSX attribute sets the boolean `translate` property in the browser, and the string "no"
   is truthy, so the element got `translate="yes"`. Stencil's `attr:` prefix forces the attribute: spread this. */
export const noTranslate = { 'attr:translate': 'no' };
