/* HTML reference markup → the templates of the three wrappers. The HTML/CSS layer is leading: React, Angular and
   the Web Component render exactly that markup, so `pnpm new` derives their templates from it instead of asking
   for them three times. One root element; its content becomes the children slot when it holds no elements of its
   own, else it is kept as it is (text and all), for the author to turn into props. */

const VOID = new Set([
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'link',
  'meta',
  'source',
  'track',
  'wbr',
]);

/* HTML attribute → React prop, where the names differ. aria-* and data-* stay as they are. */
const REACT_ATTRS = {
  autocomplete: 'autoComplete',
  autofocus: 'autoFocus',
  class: 'className',
  colspan: 'colSpan',
  contenteditable: 'contentEditable',
  crossorigin: 'crossOrigin',
  enctype: 'encType',
  for: 'htmlFor',
  maxlength: 'maxLength',
  minlength: 'minLength',
  novalidate: 'noValidate',
  readonly: 'readOnly',
  rowspan: 'rowSpan',
  spellcheck: 'spellCheck',
  srcset: 'srcSet',
  tabindex: 'tabIndex',
};

const ATTR = /([^\s=/>]+)(?:=(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g;

/** The attributes of a tag's attribute string: [name, value]; value null for a bare attribute (`disabled`). */
export const attributes = (text) =>
  [...text.matchAll(ATTR)].map(([, name, double, single, bare]) => [name, double ?? single ?? bare ?? null]);

/**
 * The one root element of `html`: its tag, attributes, inner markup, and whether that inner markup holds elements.
 * Throws on anything else (text around it, two roots, an unclosed tag).
 */
export function parseRoot(html) {
  const text = html.trim();
  const open = text.match(/^<([a-z][\w-]*)((?:\s+[^\s=/>]+(?:=(?:"[^"]*"|'[^']*'|[^\s>]+))?)*)\s*(\/?)>/i);
  if (!open) throw new Error('the HTML must start with one element: <div class="…">…</div>');
  const [whole, tag, attrText, selfClosing] = open;
  const attrs = attributes(attrText);
  if (selfClosing || VOID.has(tag.toLowerCase())) {
    if (text.slice(whole.length).trim()) throw new Error(`nothing may follow the <${tag}>: one root element`);
    return { tag, attrs, inner: '', hasElements: false, void: true };
  }
  /* Walk the tags to where the root closes; nothing but whitespace may follow it. */
  let depth = 0;
  for (const match of text.matchAll(/<(\/?)([a-z][\w-]*)(?:\s[^>]*?)?(\/?)>/gi)) {
    const [token, closing, name, slash] = match;
    if (closing) depth--;
    else if (!slash && !VOID.has(name.toLowerCase())) depth++;
    if (depth === 0) {
      if (text.slice(match.index + token.length).trim())
        throw new Error(`nothing may follow </${tag}>: one root element`);
      if (name.toLowerCase() !== tag.toLowerCase())
        throw new Error(`the HTML must end with </${tag}>: one root element`);
      const inner = text.slice(whole.length, match.index).trim();
      return { tag, attrs, inner, hasElements: /<[a-z]/i.test(inner), void: false };
    }
  }
  throw new Error(`the HTML must end with </${tag}>: one root element`);
}

/* `style="a: b; c-d: e"` → `{{ a: 'b', cD: 'e' }}` */
const styleObject = (css) =>
  `{{ ${css
    .split(';')
    .map((rule) => rule.trim())
    .filter(Boolean)
    .map((rule) => {
      const [name, ...value] = rule.split(':');
      const key = name.trim().replace(/-(\w)/g, (_all, letter) => letter.toUpperCase());
      return `${/^[a-z]\w*$/i.test(key) ? key : `'${key}'`}: '${value.join(':').trim()}'`;
    })
    .join(', ')} }}`;

const jsxAttribute = ([name, value], react) => {
  const prop = react ? (REACT_ATTRS[name.toLowerCase()] ?? name) : name;
  if (name === 'style' && value !== null) return `style=${styleObject(value)}`;
  if (value === null) return prop;
  return `${prop}="${value}"`;
};

/**
 * Markup as JSX: React prop names (`react: true`) or Stencil's (`class` stays), void elements self-closed, comments as
 * JSX comments. Text is kept as it is.
 */
export const toJsx = (markup, { react = true } = {}) =>
  markup
    .replace(/<!--([\s\S]*?)-->/g, (_all, comment) => `{/*${comment}*/}`)
    .replace(
      /<([a-z][\w-]*)((?:\s+[^\s=/>]+(?:=(?:"[^"]*"|'[^']*'|[^\s>]+))?)*)\s*(\/?)>/gi,
      (_all, tag, attrText, slash) => {
        const attrs = attributes(attrText)
          .map((attr) => jsxAttribute(attr, react))
          .join(' ');
        const closed = slash || VOID.has(tag.toLowerCase());
        return `<${tag}${attrs ? ` ${attrs}` : ''}${closed ? ' />' : '>'}`;
      },
    );

export const indent = (text, spaces) =>
  text
    .split('\n')
    .map((line) => (line ? `${' '.repeat(spaces)}${line}` : line))
    .join('\n');

/**
 * The JSX of a React component's render for `root`: the root element with the class merged through clsx, the ref
 * and the rest props, and `{children}` (or the inner markup) inside.
 */
export function reactTemplate(root) {
  const classes = root.attrs.find(([name]) => name === 'class')?.[1] ?? '';
  const others = root.attrs.filter(([name]) => name !== 'class').map((attr) => jsxAttribute(attr, true));
  const open = [`<${root.tag}`, 'ref={ref}', `className={clsx('${classes}', className)}`, ...others, '{...restProps}'];
  if (root.void) return `${open.join(' ')} />`;
  const inner = root.hasElements ? toJsx(root.inner) : '{children}';
  return `${open.join(' ')}>\n${indent(inner, 2)}\n</${root.tag}>`;
}

/** The Angular template for `root`: the markup, with `<ng-content>` where the children go. */
export function angularTemplate(root) {
  const attrs = root.attrs.map(([name, value]) => (value === null ? name : `${name}="${value}"`)).join(' ');
  const open = `<${root.tag}${attrs ? ` ${attrs}` : ''}`;
  if (root.void) return `${open} />`;
  const inner = root.hasElements ? root.inner : '<ng-content></ng-content>';
  return `${open}>${root.hasElements ? `\n${indent(inner, 2)}\n` : inner}</${root.tag}>`;
}

/** The Stencil JSX for `root`: the markup as JSX with `class`, and `<slot />` where the children go. */
export function stencilTemplate(root) {
  const attrs = root.attrs.map((attr) => jsxAttribute(attr, false)).join(' ');
  const open = `<${root.tag}${attrs ? ` ${attrs}` : ''}`;
  if (root.void) return `${open} />`;
  const inner = root.hasElements ? toJsx(root.inner, { react: false }) : '<slot />';
  return `${open}>\n${indent(inner, 2)}\n</${root.tag}>`;
}
