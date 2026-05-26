/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg page.
   Imported by both the React storybook (`packages/storybook`) and the Angular
   storybook (`packages/storybook-angular`) so the HTML lives in one place. */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Fpage';

export const description = `Page-level grid container. Sets up the named grid areas (\`header\`, \`content\`, \`footer\`) and the min-block-size so the footer sticks to the bottom of short pages.

## Usage

### Angular

\`\`\`html
<tilburg-page>
  <tilburg-page-header logoSrc="/logo-on-dark.svg" title="Gemeente Tilburg" />
  <tilburg-page-content>
    <!-- main content -->
  </tilburg-page-content>
  <tilburg-page-footer [links]="legalLinks" />
</tilburg-page>
\`\`\`

### Plain HTML / CSS

\`\`\`html
<div class="utrecht-page">
  <header class="utrecht-page-header tilburg-page-header">…</header>
  <main class="utrecht-page-content">…</main>
  <footer class="utrecht-page-footer tilburg-page-footer">…</footer>
</div>
\`\`\`
`;

export interface Example {
  name: string;
  html: string;
}

export const examples = {
  default: {
    name: 'Header + content + footer',
    html: `<div class="utrecht-page" style="min-block-size:24rem">
  <header class="tilburg-page-header">
    <div class="tilburg-page-header__container">
      <span class="tilburg-page-header__title">Gemeente Tilburg</span>
    </div>
  </header>
  <main style="padding:1rem;max-width:1150px;margin-inline:auto">
    <p class="utrecht-paragraph">Pagina-inhoud staat hier.</p>
  </main>
  <footer class="tilburg-page-footer">
    <div class="tilburg-page-footer__container">
      <ul class="tilburg-page-footer__list">
        <li><a class="tilburg-page-footer__link" href="#">Privacystatement</a></li>
        <li><a class="tilburg-page-footer__link" href="#">Cookies</a></li>
      </ul>
    </div>
  </footer>
</div>`,
  },
} satisfies Record<string, Example>;
