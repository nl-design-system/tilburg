/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg page footer. Imported
   by both the React storybook (`packages/storybook`) and the Angular
   storybook (`packages/storybook-angular`) so the HTML lives in one place. */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Fpage-footer';

export const description = `Bottom-of-page link bar. Centered horizontal list of legal / accessibility links on a darker blue background, white text, with an optional primary call-to-action row above.

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
`;

export interface Example {
  name: string;
  html: string;
}

const linksHtml = `<ul class="tilburg-page-footer__list">
      <li><a class="tilburg-page-footer__link" href="#">Privacystatement</a></li>
      <li><a class="tilburg-page-footer__link" href="#">Cookies</a></li>
      <li><a class="tilburg-page-footer__link" href="#">Toegankelijkheid</a></li>
      <li><a class="tilburg-page-footer__link" href="#">Proclaimer</a></li>
    </ul>`;

export const examples = {
  default: {
    name: 'Links only',
    html: `<footer class="tilburg-page-footer">
  <div class="tilburg-page-footer__container">
    ${linksHtml}
  </div>
</footer>`,
  },
  withPrimaryAction: {
    name: 'With primary action',
    html: `<footer class="tilburg-page-footer">
  <div class="tilburg-page-footer__container">
    <ul class="tilburg-page-footer__primary">
      <li>
        <a class="tilburg-page-footer__primary-link" href="#">Contact &nbsp;&rsaquo;</a>
      </li>
    </ul>
    ${linksHtml}
  </div>
</footer>`,
  },
} satisfies Record<string, Example>;
