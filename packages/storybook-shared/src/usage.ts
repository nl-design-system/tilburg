/* @license CC0-1.0 */

/* The "Gebruik" panel of both Storybooks: everything needed to put the component on screen into a project of your own.
   The pure parts live here (shared by the two panel files and tested from scripts/usage-snippets.test.mjs). Nothing
   is written twice: the panel reads
   - "Plaatsen" from what the story rendered (the JSX Storybook's renderer reports, see renderedSnippet), else from
     the `### <layer>` sections under `## Usage` of the component description (`tilburg-<name>.examples.ts`), which
     every story passes as `parameters.docs.description.component`, else from the story's source and args;
   - the install and load steps from the layer pages `documentation/intro-layer-*.md` and the stand-alone page from
     the "Minimale pagina" of `documentation/getting-started.md`, which both previews pass as `parameters.usage`;
   - the HTML a story renders from the preview frame, cleaned and formatted here. */

export interface UsageSection {
  /** The heading: 'React', 'Angular', 'Plain HTML / CSS', 'Web Components (Stencil)'. */
  title: string;
  /** The fence language ('tsx', 'html', …); 'text' when the fence names none. */
  language: string;
  code: string;
}

const FENCE = /^```(\w*)\n([\s\S]*?)^```/m;
const FENCES = /^```(\w*)\n([\s\S]*?)^```/gm;

export const usageSections = (markdown: string | undefined): UsageSection[] => {
  const [intro, ...rest] = markdown?.split(/^## Usage\s*$/m) ?? [];
  const usage = rest.join('').split(/^## /m)[0];
  if (!usage) return [];
  /* A section that says "the markup above" instead of repeating it: the intro's first code block is that markup. */
  const above = intro.match(FENCE);
  return usage
    .split(/^### /m)
    .slice(1)
    .flatMap((section) => {
      const [title, ...body] = section.split('\n');
      const fence = body.join('\n').match(FENCE) ?? above;
      return fence ? [{ title: title.trim(), language: fence[1] || 'text', code: fence[2].trimEnd() }] : [];
    });
};

/**
 * The usage sections of every component, from the modules of the examples files (path → its exports, as a bundler's
 * glob import gives them). A story only carries the description of its own layer; with this the panel can fill the
 * tabs of the other layers too. Per component the first section of each title wins.
 */
export const allSections = (modules: Record<string, Record<string, unknown>>): Record<string, UsageSection[]> =>
  Object.fromEntries(
    Object.entries(modules).flatMap(([path, exported]) => {
      const component = path.match(/tilburg-([\w-]+)\.examples/)?.[1];
      if (!component) return [];
      const sections: UsageSection[] = [];
      for (const [name, value] of Object.entries(exported)) {
        if (!name.startsWith('description') || typeof value !== 'string') continue;
        for (const section of usageSections(value))
          if (!sections.some((known) => known.title === section.title)) sections.push(section);
      }
      return [[component, sections]];
    }),
  );

export type Layer = 'html' | 'react' | 'angular' | 'webComponents';

export interface LayerInfo {
  id: Layer;
  title: string;
  /** The `### ` heading of its usage section in the component description. */
  heading: string;
  /** The story id suffix of this layer: `tilburg-button-react`. The HTML stories have none, or `-html` in the Angular Storybook. */
  suffixes: string[];
}

export const LAYERS: LayerInfo[] = [
  { id: 'html', title: 'HTML / CSS', heading: 'Plain HTML / CSS', suffixes: ['', '-html'] },
  { id: 'react', title: 'React', heading: 'React', suffixes: ['-react'] },
  { id: 'angular', title: 'Angular', heading: 'Angular', suffixes: ['-angular'] },
  { id: 'webComponents', title: 'Web Components', heading: 'Web Components (Stencil)', suffixes: ['-wbc'] },
];

/** The layer and component of a story id: `tilburg-button-group-react--sizes` → react, `button-group`. */
export const storyLayer = (storyId: string): { layer: Layer; component: string; base: string } => {
  const kind = storyId.split('--')[0].replace(/^tilburg-/, '');
  for (const { id, suffixes } of LAYERS) {
    for (const suffix of suffixes) {
      if (suffix && kind.endsWith(suffix)) {
        const component = kind.slice(0, -suffix.length);
        return { layer: id, component, base: `tilburg-${component}` };
      }
    }
  }
  return { layer: 'html', component: kind, base: `tilburg-${kind}` };
};

/** What the previews pass as `parameters.usage`: the markdown of the pages the steps come from. */
export interface UsageDocs {
  gettingStarted: string;
  pages: Record<Layer, string>;
  /** The names `@gemeente-tilburg/components-react` exports: what a React snippet may import. */
  reactExports?: string[];
  /** Per component ('button-group'): the usage sections of every layer, see allSections(). */
  sections?: Record<string, UsageSection[]>;
  /**
   * Set by a story or a meta (`parameters: { usage: { written: true } }`): show the section written in the examples
   * file under "Plaatsen", not what the story rendered. For a story whose render says little about how to use it.
   */
  written?: boolean;
}

export interface SetupStep {
  title: string;
  language: string;
  code: string;
  /** The section's prose under the code, a paragraph each. */
  notes: StepNote[];
}

export interface StepNote {
  /** Plain text, with `backticks` around code. */
  text: string;
  /** A notice (a quoted paragraph of the docs page): shown first, set apart. */
  callout: boolean;
}

interface Section {
  title: string;
  body: string;
}

const sections = (markdown: string): Section[] =>
  markdown
    .split(/^### /m)
    .slice(1)
    .map((section) => {
      const [title, ...body] = section.split('\n');
      return { title: title.trim(), body: body.join('\n') };
    });

const fences = (body: string) =>
  [...body.matchAll(FENCES)].map((m) => ({ language: m[1] || 'text', code: m[2].trimEnd() }));

/* The paragraphs of a section, each on one line: no fences or tables, links as their text, emphasis marks gone.
   The backticks stay (the panel shows that as code) and a quoted paragraph is a callout: the notice to read first. */
const notes = (body: string): StepNote[] =>
  body
    .replace(FENCES, '')
    .replace(/^\|.*$/gm, '')
    .split(/\n\s*\n/)
    .map((paragraph) => ({
      callout: /^\s*>/.test(paragraph),
      text: paragraph
        .replace(/^\s*>\s?/gm, '')
        .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
        .split('`')
        .map((part, index) => (index % 2 ? part : part.replace(/[*_]/g, '')))
        .join('`')
        .replace(/\s*\n\s*/g, ' ')
        .trim(),
    }))
    .filter((note) => note.text);

const pascal = (name: string) => name.replace(/(^|-)(\w)/g, (_all, _dash, letter: string) => letter.toUpperCase());

interface Enhancement {
  script: string;
  attribute: string;
}

/* The table of the "Interactieve componenten" section: component → its script and opt-in attribute. */
const enhancement = (page: string, component: string): Enhancement | undefined => {
  const section = sections(page).find((item) => /^Interactieve componenten/.test(item.title));
  const rows = [...(section?.body.matchAll(/^\|[^|]+\|\s*`([^`]+)`\s*\|\s*`([^`]+)`\s*\|/gm) ?? [])];
  const row = rows.find(([, script]) => script.startsWith(`${component}/`));
  return row && { script: row[1], attribute: row[2] };
};

/* The SCSS of the HTML layer lists two example components: keep one line, for this component. */
const forComponent = (code: string, component: string): string => {
  const lines = code.split('\n');
  const first = lines.findIndex((line) => /components-css\/[\w-]+\/index/.test(line));
  if (first < 0) return code;
  return lines
    .map((line, i) =>
      i === first ? line.replace(/components-css\/[\w-]+\/index/, `components-css/${component}/index`) : line,
    )
    .filter((line, i) => i === first || !(/components-css\/[\w-]+\/index/.test(line) || /^\/\* …/.test(line)))
    .join('\n');
};

/** The install and load steps for `component` ('button-group'), read from the layer's documentation page. */
export const layerSteps = (page: string | undefined, component: string): SetupStep[] => {
  if (!page) return [];
  const all = sections(page);
  const steps: SetupStep[] = [];
  const install = all.find((section) => /^Installatie/.test(section.title));
  if (install) {
    const code = fences(install.body);
    steps.push({
      title: 'Installeren',
      language: code[0]?.language ?? 'bash',
      code: code.map((fence) => fence.code).join('\n\n'),
      notes: notes(install.body),
    });
  }
  const load =
    all.find((section) => /^Setup/.test(section.title)) ?? all.find((section) => /^Gebruik/.test(section.title));
  if (load) {
    const code = fences(load.body);
    steps.push({
      title: 'Laden',
      language: code[0]?.language ?? 'text',
      /* The web components page shows the loading inside a whole page: the body is the example, not the setup. */
      code: forComponent(code.map((fence) => fence.code).join('\n\n'), component).replace(/\n*<body[\s\S]*$/, ''),
      notes: notes(load.body),
    });
  }
  const extra = enhancement(page, component);
  if (extra) {
    const section = all.find((item) => /^Interactieve componenten/.test(item.title));
    const example = fences(section?.body ?? '');
    const scriptOf = example.map((fence) => fence.code).join('\n\n');
    const from = scriptOf.match(/components-css\/([\w-]+\/index\.js)/)?.[1] ?? extra.script;
    steps.push({
      title: 'Gedrag aanzetten',
      language: 'html',
      code: scriptOf
        .split(from)
        .join(extra.script)
        .replace(/enhance\w+/g, `enhance${pascal(component)}`),
      notes: [
        {
          callout: false,
          text: `Zet \`${extra.attribute}\` op het element; het script slaat elementen die het al verwerkt heeft over.`,
        },
      ],
    });
  }
  return steps;
};

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

/* The story decorator wraps every story in these two; the page around the HTML puts them on <body> itself. */
const WRAPPERS = /^\s*<div class="(?:tilburg-theme|utrecht-document)">\s*/;

const unwrap = (html: string): string => {
  const inner = html.replace(WRAPPERS, '');
  if (inner === html) return html;
  return unwrap(inner.replace(/\s*<\/div>\s*$/, ''));
};

/**
 * The HTML a story rendered, without the framework's bookkeeping (Angular's _ngcontent, ng-reflect, Stencil's hydrated)
 * and without the decorator's theme wrappers.
 */
export const cleanStoryHtml = (html: string): string =>
  unwrap(html)
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/\s+(?:_ng(?:content|host)-[\w-]+|ng-reflect-[\w-]+|ng-version|data-ng-[\w-]+)(?:="[^"]*")?/g, '')
    .replace(/\sclass="([^"]*)"/g, (_all, classes: string) => {
      const kept = classes.split(/\s+/).filter((name) => name && name !== 'hydrated' && !/^ng-/.test(name));
      return kept.length ? ` class="${kept.join(' ')}"` : '';
    })
    .replace(/\s+>/g, '>');

/** Indented, one element per line; an element with only text stays on one line. */
export const formatHtml = (html: string): string => {
  const tokens = html
    .replace(/>\s+</g, '><')
    .split(/(<[^>]+>)/)
    .map((token) => token.trim())
    .filter(Boolean);
  const lines: string[] = [];
  let depth = 0;
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (!token.startsWith('<')) {
      lines.push(`${'  '.repeat(depth)}${token}`);
      continue;
    }
    const name = token.match(/^<\/?([\w-]+)/)?.[1] ?? '';
    if (token.startsWith('</')) {
      depth = Math.max(0, depth - 1);
      lines.push(`${'  '.repeat(depth)}${token}`);
      continue;
    }
    const closed = VOID.has(name) || token.endsWith('/>');
    /* <b>text</b> on one line */
    const text = tokens[i + 1];
    const closing = tokens[i + 2];
    if (!closed && text && !text.startsWith('<') && closing === `</${name}>`) {
      lines.push(`${'  '.repeat(depth)}${token}${text}${closing}`);
      i += 2;
      continue;
    }
    lines.push(`${'  '.repeat(depth)}${token}`);
    if (!closed) depth++;
  }
  return lines.join('\n');
};

const FALLBACK_PAGE = `<!doctype html>
<html lang="nl">
  <head>
    <!-- de tokens en de Utrecht-basis: zie Aan de slag -->
  </head>
  <body class="tilburg-theme utrecht-document">
    <!-- je componenten -->
  </body>
</html>`;

/** The layers a page of plain HTML can use: for React and Angular it would be a picture of the component, not a way to use it. */
export type PageLayer = 'html' | 'webComponents';
export const hasFullPage = (layer: Layer): layer is PageLayer => layer === 'html' || layer === 'webComponents';

/**
 * A stand-alone page around `body` (the story's HTML or the layer's snippet): the "Minimale pagina" of Aan de slag,
 * plus what the layer's page says it needs in the head (component CSS, the web components loader, a behaviour script).
 */
export const fullPage = (docs: UsageDocs | undefined, layer: PageLayer, component: string, body: string): string => {
  const minimal = sections(docs?.gettingStarted ?? '').find((section) => /^Minimale pagina/.test(section.title));
  const template = fences(minimal?.body ?? '')[0]?.code ?? FALLBACK_PAGE;
  const page = docs?.pages[layer] ?? '';
  /* Where the template keeps its packages: `/node_modules/@gemeente-tilburg/…` */
  const prefix = template.match(/href="([^"]*?)@gemeente-tilburg\//)?.[1] ?? '/node_modules/';
  /* The minimal page of the docs has no title; a downloaded file deserves one. */
  const head: string[] = /<title>/.test(template) ? [] : [`<title>${component}</title>`];
  if (layer === 'html') {
    head.push(`<link rel="stylesheet" href="${prefix}@gemeente-tilburg/components-css/${component}/index.css" />`);
    head.push('<!-- components-css/…/index.css: gecompileerd uit index.scss -->');
    const extra = enhancement(page, component);
    if (extra)
      head.push(`<script type="module" src="${prefix}@gemeente-tilburg/components-css/${extra.script}"></script>`);
  }
  if (layer === 'webComponents') {
    const loader = fences(page)
      .map((fence) => fence.code)
      .join('\n')
      .match(/<script type="module">[\s\S]*?<\/script>/)?.[0];
    if (loader) head.push(...loader.split('\n'));
  }
  const lines = template.split('\n').flatMap((line) => {
    const indent = line.match(/^\s*/)?.[0] ?? '';
    if (/<\/head>/.test(line)) return [...head.map((item) => `${indent}  ${item}`), line];
    if (/<!-- je componenten -->/.test(line)) return body.split('\n').map((item) => (item ? `${indent}${item}` : item));
    return [line];
  });
  return `${lines.join('\n').replace(/<title>[^<]*<\/title>/, `<title>${component}</title>`)}\n`;
};

/* ───── Snippets derived from the story itself ─────
   Storybook's CSF plugin attaches each story's source (`parameters.docs.source.originalSource`, the story object as
   written) and the manager knows its `initialArgs`. From those the "Plaatsen" snippet follows without anyone writing
   it: the JSX of a React story, the `template` of an Angular story, the custom-element HTML of a Web Components story,
   or the component with the story's args when the story has no render of its own. A hand-written `### <layer>`
   section in the examples file still wins, for polish. */

const dedent = (text: string): string => {
  const lines = text.replace(/^\n+|\s+$/g, '').split('\n');
  const indents = lines.filter((line) => line.trim()).map((line) => line.match(/^\s*/)?.[0].length ?? 0);
  const least = Math.min(...indents, Infinity);
  return lines.map((line) => line.slice(Number.isFinite(least) ? least : 0)).join('\n');
};

/* The expression after `render: (…) =>` in a story object: the JSX, or what the arrow returns. */
const renderExpression = (source: string): string | undefined => {
  const at = source.search(/\brender:\s*(?:\([^)]*\)|\w+)\s*=>\s*/);
  if (at < 0) return undefined;
  let rest = source.slice(at).replace(/^\brender:\s*(?:\([^)]*\)|\w+)\s*=>\s*/, '');
  /* To the end of the story object: its closing brace is the last one. */
  rest = rest.slice(0, rest.lastIndexOf('}')).replace(/,\s*$/, '');
  /* Keys after render (rare): cut at the first `,\n<key>:` at the start of a line. */
  rest = rest.replace(/,\n\s*\w+:\s[\s\S]*$/, '');
  rest = rest.trim();
  if (rest.startsWith('(') && rest.endsWith(')')) rest = rest.slice(1, -1);
  return dedent(rest);
};

const kebab = (name: string) => name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
const pascalOf = (slug: string) => slug.replace(/(^|-)(\w)/g, (_all, _dash, letter: string) => letter.toUpperCase());

/* `<TilburgWbcAlert heading="x" headingLevel={2} className="y" />` → `<tilburg-wbc-alert heading="x" heading-level="2" class="y"></tilburg-wbc-alert>` */
const jsxToElements = (jsx: string): string =>
  dedent(
    jsx
      .replace(/^\s*<>[ \t]*\n?|\n?[ \t]*<\/>\s*$/g, '')
      .replace(/\{\/\*([\s\S]*?)\*\/\}/g, '<!--$1-->')
      .replace(
        /<(\/?)([A-Z][\w]*)((?:\s+[^\s=/>]+(?:=(?:"[^"]*"|'[^']*'|\{[^}]*\}))?)*)\s*(\/?)>/g,
        (_all, close, name, attrText, slash) => {
          const tag = kebab(name);
          if (close) return `</${tag}>`;
          const attrs = [...attrText.matchAll(/([^\s=/>]+)(?:=(?:"([^"]*)"|'([^']*)'|\{([^}]*)\}))?/g)]
            .map(([, prop, double, single, expr]) => {
              const attr = prop === 'className' ? 'class' : kebab(prop);
              if (double !== undefined || single !== undefined) return `${attr}="${double ?? single}"`;
              if (expr === undefined || expr.trim() === 'true') return attr;
              const value = expr.trim().replace(/^['"`]|['"`]$/g, '');
              return `${attr}="${value}"`;
            })
            .join(' ');
          const open = `<${tag}${attrs ? ` ${attrs}` : ''}>`;
          return slash ? `${open}</${tag}>` : open;
        },
      )
      .replace(/className=/g, 'class='),
  );

const fromArgs = (
  args: Record<string, unknown> | undefined,
  open: (attrs: string) => string,
  close: string,
  bind: (name: string, value: unknown) => string,
) => {
  const entries = Object.entries(args ?? {}).filter(([name]) => name !== 'children');
  const attrs = entries.map(([name, value]) => bind(name, value)).join(' ');
  const children = args?.['children'];
  return `${open(attrs ? ` ${attrs}` : '')}${typeof children === 'string' ? children : ''}${close}`;
};

/**
 * The "Plaatsen" snippet a story carries in itself, for a React, Angular or Web Components story; undefined for an HTML
 * story (its rendered HTML is the snippet) or when nothing can be read.
 */
export function storySnippet(
  layer: Layer,
  component: string,
  source: string | undefined,
  args?: Record<string, unknown>,
): UsageSection | undefined {
  const pascal = pascalOf(component);
  const rendered = source ? renderExpression(source) : undefined;
  if (layer === 'react') {
    const jsx =
      rendered ??
      fromArgs(
        args,
        (attrs) => `<${pascal}${attrs}${typeof args?.['children'] === 'string' ? '>' : ' />'}`,
        typeof args?.['children'] === 'string' ? `</${pascal}>` : '',
        (name, value) => (typeof value === 'string' ? `${name}="${value}"` : `${name}={${JSON.stringify(value)}}`),
      );
    const code = `import { ${pascal} } from '@gemeente-tilburg/components-react';\n\n${jsx}`;
    return { title: 'React', language: 'tsx', code };
  }
  if (layer === 'angular') {
    const template = source?.match(/\btemplate:\s*`([\s\S]*?)`/)?.[1];
    const code =
      (template && bindArgs(dedent(template), args)) ??
      fromArgs(
        args,
        (attrs) => `<tilburg-${component}${attrs}>`,
        `</tilburg-${component}>`,
        (name, value) =>
          typeof value === 'string' ? `${name}="${value}"` : `[${name}]="${JSON.stringify(value).replace(/"/g, "'")}"`,
      );
    return { title: 'Angular', language: 'html', code };
  }
  if (layer === 'webComponents') {
    const code = rendered
      ? jsxToElements(rendered)
      : fromArgs(
          args,
          (attrs) => `<tilburg-wbc-${component}${attrs}>`,
          `</tilburg-wbc-${component}>`,
          (name, value) => (value === true ? kebab(name) : `${kebab(name)}="${String(value)}"`),
        );
    return { title: 'Web Components (Stencil)', language: 'html', code };
  }
  return undefined;
}

/* ───── Snippets from what the story rendered ─────
   Storybook's renderers send the JSX a React story rendered (SNIPPET_RENDERED; `docs.source.type: 'dynamic'` in the
   preview): the real elements with their real values, loops unrolled, and again after every change in Controls. That
   is "Plaatsen" without anyone writing it, and without guessing from the story's source. Left to do here: drop what
   is the story's and not the reader's (layout helpers), and for Web Components turn the JSX of the generated React
   wrappers into the custom-element HTML. */

interface JsxAttr {
  name: string;
  /** `name="value"` */
  value?: string;
  /** `name={expr}`, without the braces */
  expr?: string;
}
type JsxToken =
  | { kind: 'text'; text: string }
  | { kind: 'open'; name: string; attrs: JsxAttr[]; selfClosing: boolean }
  | { kind: 'close'; name: string };

/* The index after the `}` that closes the `{` at `at`; braces inside strings do not count. */
const endOfBraces = (text: string, at: number): number => {
  let depth = 0;
  let quote = '';
  for (let i = at; i < text.length; i++) {
    const char = text[i];
    if (quote) {
      if (char === '\\') i++;
      else if (char === quote) quote = '';
    } else if (char === "'" || char === '"' || char === '`') quote = char;
    else if (char === '{') depth++;
    else if (char === '}' && --depth === 0) return i + 1;
  }
  return text.length;
};

/* JSX as Storybook prints it (react-element-to-jsx-string): tags, attributes with "strings" or {expressions}, text. */
const jsxTokens = (jsx: string): JsxToken[] => {
  const out: JsxToken[] = [];
  let i = 0;
  let textStart = 0;
  const text = (end: number) => {
    if (end > textStart) out.push({ kind: 'text', text: jsx.slice(textStart, end) });
  };
  while (i < jsx.length) {
    if (jsx[i] === '{') {
      i = endOfBraces(jsx, i);
      continue;
    }
    if (jsx[i] !== '<' || !/[A-Za-z/>]/.test(jsx[i + 1] ?? '')) {
      i++;
      continue;
    }
    text(i);
    if (jsx[i + 1] === '/') {
      const end = jsx.indexOf('>', i);
      out.push({ kind: 'close', name: jsx.slice(i + 2, end).trim() });
      i = textStart = end + 1;
      continue;
    }
    let j = i + 1;
    const name = /^[\w.-]*/.exec(jsx.slice(j))?.[0] ?? '';
    j += name.length;
    const attrs: JsxAttr[] = [];
    let selfClosing = false;
    while (j < jsx.length) {
      while (/\s/.test(jsx[j] ?? '')) j++;
      if (jsx[j] === '>') {
        j++;
        break;
      }
      if (jsx.startsWith('/>', j)) {
        j += 2;
        selfClosing = true;
        break;
      }
      const attr = /^[^\s=/>]+/.exec(jsx.slice(j))?.[0];
      if (!attr) break;
      j += attr.length;
      if (jsx[j] !== '=') attrs.push({ name: attr });
      else if (jsx[j + 1] === '"') {
        const end = jsx.indexOf('"', j + 2);
        attrs.push({ name: attr, value: jsx.slice(j + 2, end) });
        j = end + 1;
      } else {
        const end = endOfBraces(jsx, j + 1);
        attrs.push({ name: attr, expr: jsx.slice(j + 2, end - 1).trim() });
        j = end;
      }
    }
    out.push({ kind: 'open', name, attrs, selfClosing });
    i = textStart = j;
  }
  text(jsx.length);
  return out;
};

/* The custom element of a generated React wrapper: TilburgWbcHeading1 → tilburg-wbc-heading-1; a native tag as it is. */
const elementName = (name: string) => (/^[A-Z]/.test(name) ? kebab(name).replace(/([a-z])(\d)/g, '$1-$2') : name);

const oneLine = (text: string) => text.replace(/\s*\n\s*/g, ' ').trim();
const VOID_TAGS = new Set(['area', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'wbr']);

/* `{ display: 'flex', flexDirection: 'column' }` → `display: flex; flex-direction: column` */
const styleText = (expr: string) =>
  [...expr.matchAll(/(\w+):\s*(?:'([^']*)'|"([^"]*)"|(-?[\d.]+))/g)]
    .map(([, key, single, double, number]) => `${kebab(key)}: ${single ?? double ?? number}`)
    .join('; ');

/* One opening tag as HTML, with the lines that go before it: what a custom element takes as a property or an event. */
const htmlTag = (token: Extract<JsxToken, { kind: 'open' }>): { tag: string; name: string; before: string[] } => {
  const custom = /^[A-Z]/.test(token.name);
  const name = elementName(token.name);
  const before: string[] = [];
  const attrs = token.attrs.flatMap(({ name: prop, value, expr }) => {
    if (prop === 'key' || prop === 'ref') return [];
    // ponytail: only className and htmlFor are renamed on native elements; other camelCase React names (tabIndex) stay.
    const attr = prop === 'className' ? 'class' : prop === 'htmlFor' ? 'for' : custom ? kebab(prop) : prop;
    if (value !== undefined) return [`${attr}="${value}"`];
    if (expr === undefined || expr === 'true') return [attr];
    if (prop === 'style' && expr.startsWith('{')) return [`style="${styleText(expr)}"`];
    if (/^(?:-?[\d.]+|false)$/.test(expr)) return [`${attr}="${expr}"`];
    if (/^(['"`])[^'"`]*\1$/.test(expr)) return [`${attr}="${expr.slice(1, -1)}"`];
    if (/=>|^function\b/.test(expr)) {
      const event = prop.replace(/^on([A-Z])/, (_all, first: string) => first.toLowerCase());
      before.push(`<!-- event: element.addEventListener('${event}', …) -->`);
    } else before.push(`<!-- JavaScript-property (geen attribuut): element.${prop} = ${oneLine(expr)} -->`);
    return [];
  });
  return { tag: `<${name}${attrs.length ? ` ${attrs.join(' ')}` : ''}>`, name, before };
};

const jsxTag = (token: Extract<JsxToken, { kind: 'open' }>, depth: number): string[] => {
  const attrs = token.attrs.map(({ name, value, expr }) =>
    value !== undefined ? `${name}="${value}"` : expr !== undefined ? `${name}={${oneLine(expr)}}` : name,
  );
  const end = token.selfClosing ? ' />' : '>';
  const line = `<${token.name}${attrs.length ? ` ${attrs.join(' ')}` : ''}${end}`;
  if (line.length + depth * 2 <= 100 || attrs.length < 2) return [line];
  return [`<${token.name}`, ...attrs.map((attr) => `  ${attr}`), end.trim()];
};

/**
 * "Plaatsen" from the JSX the story rendered: for React that JSX with its import, for Web Components the same as
 * custom elements. A component that is the story's own (not in `exports`, the names the React package exports) is
 * left out and its children kept, and so is the story's layout around the components (a styled div, a caption). Undefined when that leaves nothing to show: such a helper without children (it
 * renders the example itself, with state), or a result without `component` ('button-group') in it.
 */
export function renderedSnippet(
  layer: Layer,
  component: string,
  rendered: string | undefined,
  exports?: string[],
): UsageSection | undefined {
  if (!rendered?.trim() || (layer !== 'react' && layer !== 'webComponents')) return undefined;
  const html = layer === 'webComponents';
  const known = (name: string) =>
    !/^[A-Z]/.test(name) || (html ? name.startsWith('TilburgWbc') : !exports || exports.includes(name));
  /* In a prop too (`icon={<BackIcon />}`): a helper there cannot be left out. */
  const inProps = [...rendered.matchAll(/=\{\s*<([A-Z]\w*)/g)].some(([, name]) => !known(name));
  if (inProps) return undefined;
  const lines: string[] = [];
  const used = new Set<string>();
  /* Per open element: printed, left out with its children kept, or dropped with everything in it. */
  const stack: { frame: 'shown' | 'unwrapped' | 'dropped'; component: boolean }[] = [];
  let depth = 0;
  /* How many library components, and how many dropped elements, we are inside. */
  let components = 0;
  let dropped = 0;
  const put = (line: string) => lines.push(`${'  '.repeat(depth)}${line}`.trimEnd());
  for (const token of jsxTokens(rendered)) {
    if (token.kind === 'text') {
      if (dropped) continue;
      for (const line of token.text.split('\n')) {
        const text = (html ? line.replace(/\{' '\}/g, '') : line).trim();
        if (text) put(text);
      }
    } else if (token.kind === 'open') {
      if (dropped) {
        if (!token.selfClosing) dropped += stack.push({ frame: 'dropped', component: false }) && 1;
        continue;
      }
      const component = /^[A-Z]/.test(token.name);
      const helper = token.name === '' || !known(token.name);
      if (helper && token.selfClosing && token.name !== '') return undefined;
      /* The story's own layout around the components, not something to copy: a caption above a group of examples,
         and a div that only lays them out. Inside a component everything is the reader's. */
      const layout = !component && !helper && components === 0;
      const caption = layout && /^h[1-6]$/.test(token.name);
      const wrapper =
        layout &&
        /^(?:div|span|section)$/.test(token.name) &&
        token.attrs.every(({ name }) => name === 'style' || name === 'key');
      const frame = caption ? 'dropped' : helper || wrapper ? 'unwrapped' : 'shown';
      if (frame === 'shown') {
        if (component) used.add(token.name.split('.')[0]);
        if (html) {
          const { tag, name, before } = htmlTag(token);
          before.forEach(put);
          put(token.selfClosing && !VOID_TAGS.has(name) ? `${tag}</${name}>` : tag);
        } else jsxTag(token, depth).forEach(put);
      }
      if (token.selfClosing) continue;
      stack.push({ frame, component: component && frame === 'shown' });
      if (frame === 'shown') depth++;
      if (frame === 'dropped') dropped++;
      if (component && frame === 'shown') components++;
    } else {
      const top = stack.pop();
      if (!top) continue;
      if (top.frame === 'dropped') dropped--;
      if (top.component) components--;
      if (top.frame === 'shown') {
        depth = Math.max(0, depth - 1);
        put(`</${html ? elementName(token.name) : token.name}>`);
      }
    }
  }
  /* Fieldset for form-fieldset, Heading1 for heading, TableRow for table: one name within the other. */
  const slug = component.replace(/-/g, '');
  const own = [...used].some((name) => {
    const tag = name.replace(/^TilburgWbc/, '').toLowerCase();
    return tag.includes(slug) || slug.includes(tag);
  });
  if (!own) return undefined;
  const code = lines.join('\n');
  return html
    ? { title: 'Web Components (Stencil)', language: 'html', code }
    : {
        title: 'React',
        language: 'tsx',
        code: `import { ${[...used].sort().join(', ')} } from '@gemeente-tilburg/components-react';\n\n${code}`,
      };
}

/**
 * An Angular template with the story's args filled in: `[variant]="variant"` → `variant="info"`, so it can be pasted
 * without the story's component class. Bindings to anything else (a method, an object) stay as they are.
 */
export const bindArgs = (template: string, args: Record<string, unknown> | undefined): string =>
  template
    .replace(/\[([\w.-]+)\]="(\w+)"/g, (all, prop: string, name: string) => {
      const value = args?.[name];
      if (typeof value === 'string' && !value.includes('"')) return `${prop}="${value}"`;
      return typeof value === 'boolean' || typeof value === 'number' ? `[${prop}]="${value}"` : all;
    })
    .replace(/\{\{\s*(\w+)\s*\}\}/g, (all, name: string) => {
      const value = args?.[name];
      return typeof value === 'string' || typeof value === 'number' ? String(value) : all;
    });

/** The online Storybooks, for the layer the other Storybook documents (kept equal to SITE in scripts/lib/components.mjs). */
export const SITES = {
  react: 'https://nl-design-system.github.io/tilburg/',
  angular: 'https://nl-design-system.github.io/tilburg/angular/',
};

/** Which Storybook documents `layer`: the Angular one for Angular, the React one for React and Web Components. */
export const storybookOf = (layer: Layer): 'react' | 'angular' => (layer === 'angular' ? 'angular' : 'react');

/* ── Links between the component pages and the documentation pages ───────────────────────────────────────────────
   - linkStatus(): the names in the implementation-status table become links to the component;
   - componentLinks(): the lines under a component's description, to the setup, the status and related components.
   The HTML page of a component has the same id in both Storybooks (`tilburg-<name>--docs`), as have the
   documentation pages; scripts/usage-snippets.test.mjs checks that every id here exists. */

const docsPath = (id: string): string => `?path=/docs/${id}--docs`;
const slugOf = (name: string): string => name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
const titleOf = (slug: string): string =>
  slug.replace(/(^|-)(\w)/g, (_, dash, letter) => (dash ? ' ' : '') + letter.toUpperCase()).replace(/\bHtml\b/, 'HTML');

/** The status table with every component name a link to its page. Padding is left to the renderer. */
export const linkStatus = (markdown: string): string =>
  markdown.replace(/^\| ([A-Z][\w ]*?)( +)\|/gm, (row, name: string, pad: string) =>
    name === 'Component' ? row : `| [${name}](${docsPath(`tilburg-${slugOf(name)}`)})${pad}|`,
  );

/** Components that are used together, or that you choose between. A component may be in more than one group. */
export const RELATED: string[][] = [
  ['form-field', 'form-label', 'form-field-description', 'validation-message', 'form-fieldset'],
  ['form-field', 'textbox', 'textarea', 'password-input', 'select', 'combobox', 'checkbox', 'radio-button'],
  ['document', 'page', 'page-header', 'page-content', 'page-footer', 'skip-link'],
  ['button', 'button-group', 'button-link', 'link'],
  ['breadcrumb', 'pagination', 'link'],
  ['ordered-list', 'unordered-list', 'data-list'],
  ['heading', 'paragraph', 'article', 'html-content'],
  ['alert', 'validation-message', 'badge-status', 'badge-counter'],
  ['loading-spinner', 'progress-bar'],
  ['modal', 'tooltip'],
];

/**
 * Markdown for under the description of a component page: where to read the setup, and the related components.
 * A related component links to its page in the same layer when it has a usage section for that layer (`sections`,
 * see allSections()), else to its HTML page. Empty for a page that is not a component (the tokens).
 */
export const componentLinks = (storyId: string, sections: Record<string, UsageSection[]> = {}): string => {
  const { layer, component } = storyLayer(storyId);
  if (!sections[component]) return '';
  const { heading } = LAYERS.find(({ id }) => id === layer) ?? LAYERS[0];
  const suffix = storyId.split('--')[0].slice(`tilburg-${component}`.length);
  const related = [...new Set(RELATED.filter((group) => group.includes(component)).flat())]
    .filter((slug) => slug !== component)
    .map((slug) => {
      const own = sections[slug]?.some((section) => section.title === heading);
      return `[${titleOf(slug)}](${docsPath(`tilburg-${slug}${own ? suffix : ''}`)})`;
    });
  return [
    `Installing and loading: [Aan de slag](${docsPath('tilburg-aan-de-slag')}). The **\`</> Gebruik\`** button in the toolbar of a story gives the code for your project. Which layers exist: [Implementatiestatus](${docsPath('tilburg-implementatiestatus')}).`,
    ...(related.length ? [`See also: ${related.join(', ')}.`] : []),
  ].join('\n\n');
};
