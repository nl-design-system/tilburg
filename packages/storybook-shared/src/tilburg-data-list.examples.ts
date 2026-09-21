/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg data list. */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Fdata-list';

const intro = `Key-value pairs rendered as a definition list. Each row has a bold label, a value, and a hairline divider between rows. The \`--large\` modifier lays the key/value out in a three-column grid for wider read-only screens.`;

const usageAngular = `### Angular

\`\`\`html
<tilburg-data-list [large]="true">
  <tilburg-data-list-item>
    <tilburg-data-list-key>Voornaam</tilburg-data-list-key>
    <tilburg-data-list-value>John</tilburg-data-list-value>
  </tilburg-data-list-item>
  <tilburg-data-list-item>
    <tilburg-data-list-key>Adres</tilburg-data-list-key>
    <tilburg-data-list-value>Stadhuisplein 130, 5038 TC Tilburg</tilburg-data-list-value>
  </tilburg-data-list-item>
</tilburg-data-list>
\`\`\`

\`<tilburg-data-list>\` input: \`large\` (boolean — 3-column grid for each item).
\`<tilburg-data-list-key>\` input: \`id\` (so external \`aria-labelledby\` can target the key).`;

const usageReact = `### React

A compound component: \`DataList\` renders the \`<dl>\`, \`DataListItem\` the row \`<div>\`, \`DataListKey\` the \`<dt>\`, and \`DataListValue\` the \`<dd>\`. Keep the key/value pair inside an item — the divider and the \`--large\` grid are applied per item, not per \`<dl>\`.

\`\`\`tsx
import { DataList, DataListItem, DataListKey, DataListValue } from '@gemeente-tilburg/components-react';

const gegevens = [
  { key: 'Voornaam', value: 'John' },
  { key: 'Adres', value: 'Stadhuisplein 130, 5038 TC Tilburg' },
];

export function Persoonsgegevens() {
  return (
    <DataList large>
      {gegevens.map((item) => (
        <DataListItem key={item.key}>
          <DataListKey>{item.key}</DataListKey>
          <DataListValue>{item.value}</DataListValue>
        </DataListItem>
      ))}
    </DataList>
  );
}
\`\`\`

Props:
- \`DataList\`: \`large\` (boolean — 3-column grid for each item), plus any standard \`<dl>\` attribute.
- \`DataListItem\`, \`DataListKey\`, \`DataListValue\`: no own props — they forward standard \`<div>\` / \`<dt>\` / \`<dd>\` attributes, so \`id\` on a \`DataListKey\` still works for external \`aria-labelledby\`. All four forward refs and merge \`className\` with the \`tilburg-data-list*\` classes.

\`DataListProps\`, \`DataListItemProps\`, \`DataListKeyProps\`, and \`DataListValueProps\` are exported as type aliases.`;

const usagePlainHtml = `### Plain HTML / CSS

\`\`\`html
<dl class="tilburg-data-list tilburg-data-list--large">
  <div class="tilburg-data-list__item">
    <dt class="tilburg-data-list__key">Voornaam</dt>
    <dd class="tilburg-data-list__value">John</dd>
  </div>
  <div class="tilburg-data-list__item">
    <dt class="tilburg-data-list__key">Adres</dt>
    <dd class="tilburg-data-list__value">Stadhuisplein 130, 5038 TC Tilburg</dd>
  </div>
</dl>
\`\`\``;

export const description = `${intro}

## Usage

${usageAngular}

${usagePlainHtml}
`;

export const descriptionReact = `${intro}

## Usage

${usageReact}

${usagePlainHtml}
`;

const usageWebComponents = `### Web Components (Stencil)

\`\`\`html
<tilburg-webc-data-list large>
  <tilburg-webc-data-list-item>
    <tilburg-webc-data-list-key id="key-voornaam">Voornaam</tilburg-webc-data-list-key>
    <tilburg-webc-data-list-value>John</tilburg-webc-data-list-value>
  </tilburg-webc-data-list-item>
  <tilburg-webc-data-list-item>
    <tilburg-webc-data-list-key>Adres</tilburg-webc-data-list-key>
    <tilburg-webc-data-list-value>Stadhuisplein 130, 5038 TC Tilburg</tilburg-webc-data-list-value>
  </tilburg-webc-data-list-item>
</tilburg-webc-data-list>
\`\`\`

Four elements: \`<tilburg-webc-data-list>\` renders the \`<dl>\`, \`<tilburg-webc-data-list-item>\` the row \`<div>\`, \`<tilburg-webc-data-list-key>\` the \`<dt>\` and \`<tilburg-webc-data-list-value>\` the \`<dd>\`. Each renders into light DOM and projects its children through a default slot. No events.

Attributes:
- \`<tilburg-webc-data-list>\`: \`large\` (boolean — 3-column grid per item; the \`tilburg-data-list--large\` class goes on the \`<dl>\` like the HTML reference), plus \`aria-label\` / \`aria-labelledby\`, moved onto the \`<dl>\`.
- \`<tilburg-webc-data-list-key>\`: \`id\` — moved from the host onto the \`<dt>\`, so an external \`aria-labelledby\` targets the key (Angular's \`id\` input).
- \`<tilburg-webc-data-list-item>\`, \`<tilburg-webc-data-list-value>\`: none.

Like the Angular component, the custom-element wrappers sit between \`<dl>\`, \`<div>\`, \`<dt>\` and \`<dd>\`, so the \`<dl>\` has no direct \`<div>\`/\`<dt>\`/\`<dd>\` children. Browsers still expose the \`<dt>\`/\`<dd>\` as term/definition, but HTML validators flag the content model and some screen readers no longer announce the list with its item count. Use the plain HTML markup when strict \`<dl>\` semantics matter.`;

export const descriptionWebComponents = `${intro}

## Usage

${usageWebComponents}

${usagePlainHtml}
`;

export const descriptionHtml = `${intro}

## Usage

${usagePlainHtml}
`;

export interface Example {
  name: string;
  html: string;
}

const items = `  <div class="tilburg-data-list__item">
    <dt class="tilburg-data-list__key">Voornaam</dt>
    <dd class="tilburg-data-list__value">John</dd>
  </div>
  <div class="tilburg-data-list__item">
    <dt class="tilburg-data-list__key">Achternaam</dt>
    <dd class="tilburg-data-list__value">Doe</dd>
  </div>
  <div class="tilburg-data-list__item">
    <dt class="tilburg-data-list__key">Adres</dt>
    <dd class="tilburg-data-list__value">Stadhuisplein 130, 5038 TC Tilburg</dd>
  </div>
  <div class="tilburg-data-list__item">
    <dt class="tilburg-data-list__key">Geboortedatum</dt>
    <dd class="tilburg-data-list__value">12 mei 1985</dd>
  </div>`;

export const examples = {
  default: {
    name: 'Default',
    /* The `max-width` lives on an unclassed demo wrapper: it frames the
       example, it is not part of the component. `.tilburg-data-list` is a
       block element, so it fills the wrapper. */
    html: `<div style="max-width:32rem">
<dl class="tilburg-data-list">
${items}
</dl>
</div>`,
  },
  large: {
    name: 'Large (3-column grid)',
    html: `<dl class="tilburg-data-list tilburg-data-list--large">
${items}
</dl>`,
  },
} satisfies Record<string, Example>;
