/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Tilburg/Page',
  id: 'tilburg-page',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    bugs: 'https://github.com/nl-design-system/tilburg/labels/component%2Fpage',
    docs: {
      description: {
        component: `Page-level grid container. Sets up the named grid areas (\`header\`, \`content\`, \`footer\`) and the min-block-size so the footer sticks to the bottom of short pages.

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
`,
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Header + content + footer',
  render: () => (
    <div className="utrecht-page" style={{ minBlockSize: '24rem' }}>
      <header className="tilburg-page-header">
        <div className="tilburg-page-header__container">
          <span className="tilburg-page-header__title">Gemeente Tilburg</span>
        </div>
      </header>
      <main style={{ padding: '1rem', maxWidth: '1150px', marginInline: 'auto' }}>
        <p className="utrecht-paragraph">Pagina-inhoud staat hier.</p>
      </main>
      <footer className="tilburg-page-footer">
        <div className="tilburg-page-footer__container">
          <ul className="tilburg-page-footer__list">
            <li>
              <a className="tilburg-page-footer__link" href="#">
                Privacystatement
              </a>
            </li>
            <li>
              <a className="tilburg-page-footer__link" href="#">
                Cookies
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  ),
};
