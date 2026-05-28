/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Tilburg/Data List',
  id: 'tilburg-data-list',
  tags: ['autodocs'],
  parameters: {
    bugs: 'https://github.com/nl-design-system/tilburg/labels/component%2Fdata-list',
    docs: {
      description: {
        component: `Key-value pairs rendered as a definition list. Each row has a bold label, a value, and a hairline divider between rows. The \`--large\` modifier lays the key/value out in a three-column grid for wider read-only screens.

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
`,
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleItems = [
  { key: 'Voornaam', value: 'John' },
  { key: 'Achternaam', value: 'Doe' },
  { key: 'Adres', value: 'Stadhuisplein 130, 5038 TC Tilburg' },
  { key: 'Geboortedatum', value: '12 mei 1985' },
];

export const Default: Story = {
  name: 'Default',
  render: () => (
    <dl className="tilburg-data-list" style={{ maxWidth: '32rem' }}>
      {sampleItems.map((item) => (
        <div key={item.key} className="tilburg-data-list__item">
          <dt className="tilburg-data-list__key">{item.key}</dt>
          <dd className="tilburg-data-list__value">{item.value}</dd>
        </div>
      ))}
    </dl>
  ),
};

export const Large: Story = {
  name: 'Large (3-column grid)',
  render: () => (
    <dl className="tilburg-data-list tilburg-data-list--large">
      {sampleItems.map((item) => (
        <div key={item.key} className="tilburg-data-list__item">
          <dt className="tilburg-data-list__key">{item.key}</dt>
          <dd className="tilburg-data-list__value">{item.value}</dd>
        </div>
      ))}
    </dl>
  ),
};
