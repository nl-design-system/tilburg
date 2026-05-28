/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Tilburg/Breadcrumb',
  id: 'tilburg-breadcrumb',
  tags: ['autodocs'],
  parameters: {
    bugs: 'https://github.com/nl-design-system/tilburg/labels/component%2Fbreadcrumb',
    docs: {
      description: {
        component: `Tilburg breadcrumb. Trail links are blue with no underline by default and underlined on hover; the current item is bold gray-500.

## Usage

### Angular

\`\`\`ts
items: TilburgBreadcrumbItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Parkeren', href: '/parkeren' },
  { label: 'Bewonersvergunning', current: true },
];
\`\`\`

\`\`\`html
<tilburg-breadcrumb
  ariaLabel="Kruimelpad"
  [items]="items"
  (itemClick)="onCrumbClick($event)"
/>
\`\`\`

Inputs: \`ariaLabel\` (default \`'Kruimelpad'\`), \`items\` (\`{ label, href?, current?, data? }[]\`). Output: \`(itemClick)\` emits \`{ item, event }\`.

### Plain HTML / CSS

\`\`\`html
<nav class="utrecht-breadcrumb-nav tilburg-breadcrumb" aria-label="Kruimelpad">
  <ol class="utrecht-breadcrumb-nav__list utrecht-breadcrumb-nav__list--html-ol">
    <li class="utrecht-breadcrumb-nav__item">
      <a class="utrecht-breadcrumb-nav__link" href="/">Home</a>
      <span class="utrecht-breadcrumb-nav__separator" aria-hidden="true">›</span>
    </li>
    <li class="utrecht-breadcrumb-nav__item">
      <span aria-current="page" class="utrecht-breadcrumb-nav__link utrecht-breadcrumb-nav__link--current">
        Bewonersvergunning
      </span>
    </li>
  </ol>
</nav>
\`\`\`
`,
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Default trail',
  render: () => (
    <nav className="utrecht-breadcrumb-nav tilburg-breadcrumb" aria-label="Kruimelpad">
      <ol className="utrecht-breadcrumb-nav__list utrecht-breadcrumb-nav__list--html-ol">
        <li className="utrecht-breadcrumb-nav__item">
          <a className="utrecht-breadcrumb-nav__link" href="#">
            Home
          </a>
          <span className="utrecht-breadcrumb-nav__separator" aria-hidden="true">
            ›
          </span>
        </li>
        <li className="utrecht-breadcrumb-nav__item">
          <a className="utrecht-breadcrumb-nav__link" href="#">
            Parkeren
          </a>
          <span className="utrecht-breadcrumb-nav__separator" aria-hidden="true">
            ›
          </span>
        </li>
        <li className="utrecht-breadcrumb-nav__item">
          <a className="utrecht-breadcrumb-nav__link" href="#">
            Vergunning aanvragen
          </a>
          <span className="utrecht-breadcrumb-nav__separator" aria-hidden="true">
            ›
          </span>
        </li>
        <li className="utrecht-breadcrumb-nav__item">
          <span aria-current="page" className="utrecht-breadcrumb-nav__link utrecht-breadcrumb-nav__link--current">
            Bewonersvergunning
          </span>
        </li>
      </ol>
    </nav>
  ),
};

export const TwoLevels: Story = {
  name: 'Two levels',
  render: () => (
    <nav className="utrecht-breadcrumb-nav tilburg-breadcrumb" aria-label="Kruimelpad">
      <ol className="utrecht-breadcrumb-nav__list utrecht-breadcrumb-nav__list--html-ol">
        <li className="utrecht-breadcrumb-nav__item">
          <a className="utrecht-breadcrumb-nav__link" href="#">
            Home
          </a>
          <span className="utrecht-breadcrumb-nav__separator" aria-hidden="true">
            ›
          </span>
        </li>
        <li className="utrecht-breadcrumb-nav__item">
          <span aria-current="page" className="utrecht-breadcrumb-nav__link utrecht-breadcrumb-nav__link--current">
            Aanvragen
          </span>
        </li>
      </ol>
    </nav>
  ),
};
