/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';
import { createElement, type ReactNode } from 'react';

const meta = {
  title: 'Tilburg/Alert',
  id: 'tilburg-alert',
  tags: ['autodocs'],
  parameters: {
    bugs: 'https://github.com/nl-design-system/tilburg/labels/component%2Falert',
    docs: {
      description: {
        component: `Tilburg alert built on \`.utrecht-alert\` + \`.tilburg-alert\` BEM. The icon vertically centers with the first line of the title via the heading line-height trick; the close button is pushed to the right edge of the row.

## Usage

### Angular

\`\`\`html
<tilburg-alert
  variant="info"
  title="Informatie"
  [closable]="true"
  liveRegion="polite"
  (closed)="onAlertClosed()"
>
  <app-icon alertIcon name="info" />
  De openingstijden zijn gewijzigd.
</tilburg-alert>
\`\`\`

Inputs: \`variant\` (\`'info' | 'success' | 'warning' | 'danger'\`, default \`'info'\`), \`title\`, \`headingLevel\` (1–6, default 3), \`closable\`, \`liveRegion\` (\`'polite' | 'assertive' | 'off'\`), \`ariaLabel\`, \`closeButtonAriaLabel\`. Output: \`(closed)\`.

### Plain HTML / CSS

\`\`\`html
<div class="utrecht-alert tilburg-alert utrecht-alert--info" role="status" aria-live="polite" aria-atomic="true">
  <div class="utrecht-alert__icon">
    <i aria-hidden="true"><!-- icon svg --></i>
  </div>
  <div class="utrecht-alert__content">
    <utrecht-heading-3 class="tilburg-alert__title">
      <h3 class="utrecht-heading-3">Informatie</h3>
    </utrecht-heading-3>
    <div class="utrecht-alert__message">
      <p class="utrecht-paragraph">De openingstijden zijn gewijzigd.</p>
    </div>
  </div>
  <button type="button" class="tilburg-alert__close" aria-label="Sluit alert">
    <i aria-hidden="true"><!-- close icon --></i>
  </button>
</div>
\`\`\`

Variant modifiers map: \`success\` → \`.utrecht-alert--ok\`, \`danger\` → \`.utrecht-alert--error\`; \`info\` and \`warning\` keep their names.
`,
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Match the heading rendering used by Angular consumers. `<tilburg-heading-3>`
// renders `<utrecht-heading-3><h3 class="utrecht-heading-3">…</h3></utrecht-heading-3>`
// — the outer custom element triggers `components-css/heading-3`'s
// `utrecht-heading-3 { --utrecht-heading-3-font-size: var(--tilburg-heading-3-…) }`
// rule; the inner `.utrecht-heading-3` class is what utrecht's font-size rule
// reads. Without this wrapper the `<h3>` falls back to the browser default
// (~18.72px) and the icon (24px) sits higher than the heading text.
const Title = ({ children }: { children: ReactNode }) =>
  createElement(
    'utrecht-heading-3',
    { className: 'tilburg-alert__title' },
    createElement('h3', { className: 'utrecht-heading-3' }, children),
  );

// Match the icon rendering used by Angular consumers: wrap the glyph in
// an `<i>` element so the `.utrecht-alert__icon i { line-height: heading-3 }`
// rule applies and the icon vertically centers with the heading's first line.
const Icon = ({ children }: { children: ReactNode }) => (
  <i
    aria-hidden="true"
    style={{
      alignItems: 'center',
      display: 'inline-flex',
      fontSize: 'var(--utrecht-alert-icon-size, 1.5rem)',
      fontStyle: 'normal',
      justifyContent: 'center',
    }}
  >
    {children}
  </i>
);

const InfoGlyph = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 15h-2v-6h2v6Zm0-8h-2V7h2v2Z" />
  </svg>
);

const CheckGlyph = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm-1.4 14.6L6 12l1.4-1.4 3.2 3.2 6-6L18 9.2l-7.4 7.4Z" />
  </svg>
);

const WarnGlyph = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M1 21h22L12 2 1 21Zm12-3h-2v-2h2v2Zm0-4h-2v-4h2v4Z" />
  </svg>
);

const ErrorGlyph = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm5 13.6L15.6 17 12 13.4 8.4 17 7 15.6 10.6 12 7 8.4 8.4 7 12 10.6 15.6 7 17 8.4 13.4 12 17 15.6Z" />
  </svg>
);

const CloseGlyph = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="m18.3 5.71-1.42-1.42L12 9.17 7.12 4.29 5.71 5.71 10.59 10.59 5.71 15.46l1.41 1.42L12 12l4.88 4.88 1.42-1.42-4.88-4.87 4.87-4.88Z" />
  </svg>
);

export const Info: Story = {
  name: 'Info',
  render: () => (
    <div
      className="utrecht-alert tilburg-alert utrecht-alert--info"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="utrecht-alert__icon">
        <Icon>
          <InfoGlyph />
        </Icon>
      </div>
      <div className="utrecht-alert__content">
        <Title>Informatie</Title>
        <div className="utrecht-alert__message">
          <p className="utrecht-paragraph">
            De openingstijden zijn gewijzigd. Bekijk de actuele tijden op deze pagina.
          </p>
        </div>
      </div>
    </div>
  ),
};

export const Success: Story = {
  name: 'Success (ok)',
  render: () => (
    <div className="utrecht-alert tilburg-alert utrecht-alert--ok" role="status" aria-live="polite" aria-atomic="true">
      <div className="utrecht-alert__icon">
        <Icon>
          <CheckGlyph />
        </Icon>
      </div>
      <div className="utrecht-alert__content">
        <Title>Aanvraag verstuurd</Title>
        <div className="utrecht-alert__message">
          <p className="utrecht-paragraph">U ontvangt binnen 8 weken een beslissing per e-mail.</p>
        </div>
      </div>
    </div>
  ),
};

export const Warning: Story = {
  name: 'Warning',
  render: () => (
    <div
      className="utrecht-alert tilburg-alert utrecht-alert--warning"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="utrecht-alert__icon">
        <Icon>
          <WarnGlyph />
        </Icon>
      </div>
      <div className="utrecht-alert__content">
        <Title>Let op</Title>
        <div className="utrecht-alert__message">
          <p className="utrecht-paragraph">De aanvraagperiode sluit over twee weken.</p>
        </div>
      </div>
    </div>
  ),
};

export const Danger: Story = {
  name: 'Danger (error)',
  render: () => (
    <div
      className="utrecht-alert tilburg-alert utrecht-alert--error"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div className="utrecht-alert__icon">
        <Icon>
          <ErrorGlyph />
        </Icon>
      </div>
      <div className="utrecht-alert__content">
        <Title>Er ging iets mis</Title>
        <div className="utrecht-alert__message">
          <p className="utrecht-paragraph">Probeer het opnieuw of neem contact op met de gemeente.</p>
        </div>
      </div>
    </div>
  ),
};

export const Closable: Story = {
  name: 'Closable',
  render: () => (
    <div
      className="utrecht-alert tilburg-alert utrecht-alert--info"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="utrecht-alert__icon">
        <Icon>
          <InfoGlyph />
        </Icon>
      </div>
      <div className="utrecht-alert__content">
        <Title>Informatie</Title>
        <div className="utrecht-alert__message">
          <p className="utrecht-paragraph">Klik op het kruisje om dit bericht te sluiten.</p>
        </div>
      </div>
      <button type="button" className="tilburg-alert__close" aria-label="Sluit alert">
        <Icon>
          <CloseGlyph />
        </Icon>
      </button>
    </div>
  ),
};

export const MessageOnly: Story = {
  name: 'Message only (no title)',
  render: () => (
    <div
      className="utrecht-alert tilburg-alert utrecht-alert--info"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="utrecht-alert__icon">
        <Icon>
          <InfoGlyph />
        </Icon>
      </div>
      <div className="utrecht-alert__content">
        <div className="utrecht-alert__message">
          <p className="utrecht-paragraph">Deze melding heeft geen titel — alleen een korte tekst.</p>
        </div>
      </div>
    </div>
  ),
};
