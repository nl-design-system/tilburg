/**
 * Writes attributes onto a native form control after the utrecht directive on it has run.
 *
 * `UtrechtTextboxAttr` / `UtrechtTextareaAttr` declare host bindings such as `attr.name: name || null` and
 * `attr.dir: dir || "auto"` without matching inputs, so they always win over a template binding and strip the value
 * (no `name` means no autofill and nothing in a native form submit). Host bindings only write when their own value
 * changes, so setting the attribute afterwards — from `ngAfterViewChecked` — sticks.
 *
 * Only values that are set are written; an unset input leaves whatever the directive chose (e.g. `dir="auto"`,
 * `inputmode="numeric"` for `type="number"`).
 */
export function setNativeAttributes(element: HTMLElement | undefined, attributes: Record<string, string | undefined>) {
  if (!element) return;
  for (const [name, value] of Object.entries(attributes)) {
    if (value && element.getAttribute(name) !== value) element.setAttribute(name, value);
  }
}
