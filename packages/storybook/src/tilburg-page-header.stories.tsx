/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';
import type { ReactNode } from 'react';

const meta = {
  title: 'Tilburg/Page Header',
  id: 'tilburg-page-header',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    bugs: 'https://github.com/nl-design-system/tilburg/labels/component%2Fpage-header',
    docs: {
      description: {
        component: `Top-of-page brand bar. Dark navy background with a responsive logo and/or wordmark title on the inline-start, and an actions slot pushed to the inline-end (username, logout, menu toggle, etc.). The brand area is rendered as a single \`<a>\` so the whole logo + title block is clickable.

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
`,
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const LOGO_SRC = '/logo-on-dark.svg';

const Brand = ({ logo = true, title }: { logo?: boolean; title?: ReactNode }) => (
  <a className="tilburg-page-header__brand" href="#">
    {logo && <img className="tilburg-page-header__logo" src={LOGO_SRC} alt="" />}
    {title && <span className="tilburg-page-header__title">{title}</span>}
  </a>
);

export const LogoOnly: Story = {
  name: 'Logo only',
  render: () => (
    <header className="tilburg-page-header">
      <div className="tilburg-page-header__container">
        <Brand />
      </div>
    </header>
  ),
};

export const TitleOnly: Story = {
  name: 'Title only',
  render: () => (
    <header className="tilburg-page-header">
      <div className="tilburg-page-header__container">
        <Brand logo={false} title="Gemeente Tilburg" />
      </div>
    </header>
  ),
};

export const LogoAndTitle: Story = {
  name: 'Logo + title',
  render: () => (
    <header className="tilburg-page-header">
      <div className="tilburg-page-header__container">
        <Brand title="Mijn omgeving" />
      </div>
    </header>
  ),
};

export const LoggedIn: Story = {
  name: 'Logged-in user with actions',
  render: () => (
    <header className="tilburg-page-header">
      <div className="tilburg-page-header__container">
        <Brand />
        <div className="tilburg-page-header__actions">
          <span className="tilburg-page-header__user">Jan Janssen</span>
          <button type="button" className="utrecht-button utrecht-button--subtle tilburg-medium">
            Uitloggen
          </button>
        </div>
      </div>
    </header>
  ),
};
