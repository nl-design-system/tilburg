/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Tilburg/Page Footer',
  id: 'tilburg-page-footer',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    bugs: 'https://github.com/nl-design-system/tilburg/labels/component%2Fpage-footer',
    docs: {
      description: {
        component: `Bottom-of-page link bar. Centered horizontal list of legal / accessibility links on a darker blue background, white text, with an optional primary call-to-action row above.

## Usage

### Angular

\`\`\`html
<tilburg-page-footer
  [primaryLink]="{ label: 'Contact', href: '/contact' }"
  [links]="[
    { label: 'Privacystatement', href: '/privacystatement' },
    { label: 'Cookies',          href: '/cookies' },
    { label: 'Toegankelijkheid', href: '/toegankelijkheid' },
    { label: 'Proclaimer',       href: '/proclaimer' },
  ]"
/>
\`\`\`

Inputs: \`primaryLink\` (optional \`{ label, href }\`), \`links\` (array of \`{ label, href }\`), \`ariaLabel\`. You can also project extra content via \`<ng-content>\`.

### Plain HTML / CSS

\`\`\`html
<footer class="tilburg-page-footer">
  <div class="tilburg-page-footer__container">
    <ul class="tilburg-page-footer__primary">
      <li><a class="tilburg-page-footer__primary-link" href="/contact">Contact</a></li>
    </ul>
    <ul class="tilburg-page-footer__list">
      <li><a class="tilburg-page-footer__link" href="/privacystatement">Privacystatement</a></li>
      <li><a class="tilburg-page-footer__link" href="/cookies">Cookies</a></li>
      <li><a class="tilburg-page-footer__link" href="/toegankelijkheid">Toegankelijkheid</a></li>
      <li><a class="tilburg-page-footer__link" href="/proclaimer">Proclaimer</a></li>
    </ul>
  </div>
</footer>
\`\`\`

Theming via custom properties: \`--tilburg-page-footer-background-color\`, \`--tilburg-page-footer-color\`, \`--tilburg-page-footer-margin-block-start\` (default 5rem), \`--tilburg-page-footer-max-inline-size\` (default 1150px).
`,
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const legalLinks = [
  { label: 'Privacystatement', href: '#' },
  { label: 'Cookies', href: '#' },
  { label: 'Toegankelijkheid', href: '#' },
  { label: 'Proclaimer', href: '#' },
];

const Links = () => (
  <ul className="tilburg-page-footer__list">
    {legalLinks.map((link) => (
      <li key={link.label}>
        <a className="tilburg-page-footer__link" href={link.href}>
          {link.label}
        </a>
      </li>
    ))}
  </ul>
);

export const Default: Story = {
  name: 'Links only',
  render: () => (
    <footer className="tilburg-page-footer">
      <div className="tilburg-page-footer__container">
        <Links />
      </div>
    </footer>
  ),
};

export const WithPrimaryAction: Story = {
  name: 'With primary action',
  render: () => (
    <footer className="tilburg-page-footer">
      <div className="tilburg-page-footer__container">
        <ul className="tilburg-page-footer__primary">
          <li>
            <a className="tilburg-page-footer__primary-link" href="#">
              Contact &nbsp;›
            </a>
          </li>
        </ul>
        <Links />
      </div>
    </footer>
  ),
};
