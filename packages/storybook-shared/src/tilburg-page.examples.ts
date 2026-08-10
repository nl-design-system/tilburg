/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg page.
   Imported by both the React storybook (`packages/storybook`) and the Angular
   storybook (`packages/storybook-angular`) so the HTML lives in one place. */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Fpage';

const intro = `Page-level grid container. Sets up the named grid areas (\`header\`, \`content\`, \`footer\`) and the min-block-size so the footer sticks to the bottom of short pages.`;

const usageAngular = `### Angular

\`\`\`html
<tilburg-page>
  <tilburg-page-header logoSrc="/logo-on-dark.svg" title="Gemeente Tilburg" />
  <tilburg-page-content>
    <!-- main content -->
  </tilburg-page-content>
  <tilburg-page-footer [links]="legalLinks" />
</tilburg-page>
\`\`\``;

const usageReact = `### React

\`Page\` renders a single \`<div class="utrecht-page">\` and passes its children straight through, so it is the outermost layout wrapper you compose the header, content and footer into.

\`\`\`tsx
import { Page, PageContent, PageFooter, PageHeader, Paragraph } from '@gemeente-tilburg/components-react';

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <Page>
      <PageHeader logoSrc="/logo-on-dark.svg" title="Gemeente Tilburg" titleHref="/" />
      <PageContent id="main" tabIndex={-1}>
        {children}
        <Paragraph>Pagina-inhoud staat hier.</Paragraph>
      </PageContent>
      <PageFooter
        links={[
          { label: 'Privacystatement', href: '/privacystatement' },
          { label: 'Cookies', href: '/cookies' },
        ]}
      />
    </Page>
  );
}
\`\`\`

Props: \`children\`, \`className\` (merged with \`utrecht-page\`), plus any standard \`<div>\` attribute (\`id\`, \`style\`, \`aria-*\`, …) — \`PageProps\` is exported as an alias for \`HTMLAttributes<HTMLDivElement>\`. The component forwards its ref to the underlying \`<div>\`.`;

const usagePlainHtml = `### Plain HTML / CSS

\`\`\`html
<div class="utrecht-page">
  <header class="utrecht-page-header tilburg-page-header">…</header>
  <main class="utrecht-page-content">…</main>
  <footer class="utrecht-page-footer tilburg-page-footer">…</footer>
</div>
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

export const descriptionHtml = `${intro}

## Usage

${usagePlainHtml}
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
