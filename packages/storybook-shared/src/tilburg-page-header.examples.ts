/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg page header. Imported
   by both the React storybook (`packages/storybook`) and the Angular
   storybook (`packages/storybook-angular`) so the HTML lives in one place. */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Fpage-header';

export const description = `Top-of-page brand bar. Dark navy background with a responsive logo and/or wordmark title on the inline-start, and an actions slot pushed to the inline-end (username, logout, menu toggle, etc.). The brand area is rendered as a single \`<a>\` so the whole logo + title block is clickable.

## Usage

### Angular

\`\`\`html
<tilburg-page-header
  logoSrc="/logo-on-dark.svg"
  logoAlt=""
  title="Gemeente Tilburg"
  titleHref="/"
>
  <span class="tilburg-page-header__user">Jan Janssen</span>
  <button class="utrecht-button utrecht-button--subtle">Uitloggen</button>
</tilburg-page-header>
\`\`\`

Inputs: \`logoSrc\`, \`logoAlt\` (default \`''\`), \`title\` (configurable header text), \`titleHref\` (link target for the brand area; defaults to \`/\`), \`ariaLabel\`. Project anything else as the actions slot (\`<ng-content>\`).

### Plain HTML / CSS

\`\`\`html
<header class="tilburg-page-header">
  <div class="tilburg-page-header__container">
    <a class="tilburg-page-header__brand" href="/">
      <img class="tilburg-page-header__logo" src="/logo-on-dark.svg" alt="" />
      <span class="tilburg-page-header__title">Gemeente Tilburg</span>
    </a>
    <div class="tilburg-page-header__actions">
      <span class="tilburg-page-header__user">Jan Janssen</span>
      <button class="utrecht-button utrecht-button--subtle">Uitloggen</button>
    </div>
  </div>
</header>
\`\`\`

Theming via custom properties: \`--tilburg-page-header-background-color\`, \`--tilburg-page-header-color\`, \`--tilburg-page-header-border-color\`, \`--tilburg-page-header-title-font-size\`, \`--tilburg-page-header-max-inline-size\` (default 1150px).
`;

export interface Example {
  name: string;
  html: string;
}

const LOGO_SRC = '/logo-on-dark.svg';

export const examples = {
  logoOnly: {
    name: 'Logo only',
    html: `<header class="tilburg-page-header">
  <div class="tilburg-page-header__container">
    <a class="tilburg-page-header__brand" href="#">
      <img class="tilburg-page-header__logo" src="${LOGO_SRC}" alt="" />
    </a>
  </div>
</header>`,
  },
  logoAndTitle: {
    name: 'Logo + title',
    html: `<header class="tilburg-page-header">
  <div class="tilburg-page-header__container">
    <a class="tilburg-page-header__brand" href="#">
      <img class="tilburg-page-header__logo" src="${LOGO_SRC}" alt="" />
      <span class="tilburg-page-header__title">Mijn omgeving</span>
    </a>
  </div>
</header>`,
  },
  loggedIn: {
    name: 'Logged-in user with actions',
    html: `<header class="tilburg-page-header">
  <div class="tilburg-page-header__container">
    <a class="tilburg-page-header__brand" href="#">
      <img class="tilburg-page-header__logo" src="${LOGO_SRC}" alt="" />
    </a>
    <div class="tilburg-page-header__actions">
      <span class="tilburg-page-header__user">Jan Janssen</span>
      <button type="button" class="utrecht-button utrecht-button--subtle tilburg-medium">Uitloggen</button>
    </div>
  </div>
</header>`,
  },
} satisfies Record<string, Example>;
