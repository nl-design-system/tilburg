/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

/*
 * Allowlist HTML sanitizer for the `html` prop — the Stencil stand-in for the
 * Angular `DomSanitizer` that sanitizes `[innerHTML]` in `<tilburg-html-content>`.
 * Modelled on Angular's rules for CMS-style content:
 * - unknown elements are unwrapped (their text is kept),
 * - script-like elements are dropped with their content,
 * - only known-safe attributes survive, `on*` handlers never do,
 * - URL attributes must use a safe scheme (Angular's SAFE_URL_PATTERN).
 * It parses into an inert document, so nothing loads or runs while sanitizing.
 * It is a defence in depth, not a licence to render untrusted HTML without
 * server-side sanitising.
 */

const ALLOWED_ELEMENTS = new Set(
  (
    'a abbr address article aside b bdi bdo blockquote br caption cite code col colgroup dd del details dfn div dl ' +
    'dt em figcaption figure footer h1 h2 h3 h4 h5 h6 header hr i img ins kbd li main mark nav ol p picture pre q ' +
    's samp section small source span strong sub summary sup table tbody td tfoot th thead time tr u ul var wbr'
  ).split(' '),
);

/* Dropped together with everything inside them. */
const BLOCKED_ELEMENTS = new Set(
  'script style template noscript iframe frame frameset object embed applet link meta base title svg math form input button textarea select option'.split(
    ' ',
  ),
);

const ALLOWED_ATTRIBUTES = new Set(
  (
    'abbr align alt cite class colspan datetime dir headers height href hreflang id lang open rel reversed ' +
    'rowspan scope sizes span src srcset start summary target title type width'
  ).split(' '),
);

const URL_ATTRIBUTES = new Set(['href', 'src', 'cite']);
/* Relative URLs or http(s)/mailto/ftp/tel/sms — Angular's SAFE_URL_PATTERN. */
const SAFE_SCHEME = /^(?:(?:https?|mailto|ftp|tel|sms):|[^&:/?#]*(?:[/?#]|$))/i;
const SAFE_SRCSET_ENTRY = /^\s*(\S+)(\s+[\d.]+[wx])?\s*$/;

const isSafeUrl = (value: string) => SAFE_SCHEME.test(value.trim());

const isSafeSrcset = (value: string) =>
  value.split(',').every((entry) => {
    const match = SAFE_SRCSET_ENTRY.exec(entry);
    return match !== null && isSafeUrl(match[1]);
  });

function parse(html: string): HTMLElement {
  /* `createHTMLDocument` gives an inert document: images don't load and
     handlers don't fire while we walk the tree. */
  const doc = document.implementation?.createHTMLDocument ? document.implementation.createHTMLDocument('') : document;
  const container = doc.createElement('div');
  container.innerHTML = html;
  return container;
}

function clean(parent: Element) {
  for (const node of Array.from(parent.childNodes)) {
    if (node.nodeType === 3) continue; // text
    if (node.nodeType !== 1) {
      node.parentNode?.removeChild(node); // comments, processing instructions
      continue;
    }
    const element = node as Element;
    const tag = element.tagName.toLowerCase();
    if (BLOCKED_ELEMENTS.has(tag)) {
      element.parentNode?.removeChild(element);
      continue;
    }
    clean(element);
    if (!ALLOWED_ELEMENTS.has(tag)) {
      while (element.firstChild) {
        parent.insertBefore(element.firstChild, element);
      }
      parent.removeChild(element);
      continue;
    }
    for (const { name, value } of Array.from(element.attributes)) {
      const attribute = name.toLowerCase();
      const allowed =
        (ALLOWED_ATTRIBUTES.has(attribute) || attribute.startsWith('aria-')) &&
        (!URL_ATTRIBUTES.has(attribute) || isSafeUrl(value)) &&
        (attribute !== 'srcset' || isSafeSrcset(value));
      if (!allowed) {
        element.removeAttribute(name);
      }
    }
    /* Explicit: some DOM implementations keep `style` out of `attributes`. */
    element.removeAttribute('style');
  }
}

export function sanitizeHtml(html: string): string {
  const container = parse(html);
  clean(container);
  return container.innerHTML;
}
