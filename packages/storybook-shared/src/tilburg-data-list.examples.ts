/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg data list. */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Fdata-list';

export const description = `Key-value pairs rendered as a definition list. Each row has a bold label, a value, and a hairline divider between rows. The \`--large\` modifier lays the key/value out in a three-column grid for wider read-only screens.

## Usage

### Angular

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
\`<tilburg-data-list-key>\` input: \`id\` (so external \`aria-labelledby\` can target the key).

### Plain HTML / CSS

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
\`\`\`
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
    html: `<dl class="tilburg-data-list" style="max-width:32rem">
${items}
</dl>`,
  },
  large: {
    name: 'Large (3-column grid)',
    html: `<dl class="tilburg-data-list tilburg-data-list--large">
${items}
</dl>`,
  },
} satisfies Record<string, Example>;
