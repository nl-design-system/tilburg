/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg alert. Imported by
   both the React storybook (`packages/storybook`) and the Angular storybook
   (`packages/storybook-angular`).

   NOTE: The React `Closable` story originally used `useState` to allow
   dismissing the alert. The shared HTML markup is a STATIC snapshot — the
   close button is rendered but does not actually close anything. */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Falert';

export const description = `Tilburg alert built on \`.utrecht-alert\` + \`.tilburg-alert\` BEM. The icon vertically centers with the first line of the title via the heading line-height trick; the close button is pushed to the right edge of the row.

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
`;

export interface Example {
  name: string;
  html: string;
}

const iconStyle =
  'align-items:center;display:inline-flex;font-size:var(--utrecht-alert-icon-size, 1.5rem);font-style:normal;justify-content:center';

const infoGlyph = `<svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 15h-2v-6h2v6Zm0-8h-2V7h2v2Z"/></svg>`;
const checkGlyph = `<svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm-1.4 14.6L6 12l1.4-1.4 3.2 3.2 6-6L18 9.2l-7.4 7.4Z"/></svg>`;
const warnGlyph = `<svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M1 21h22L12 2 1 21Zm12-3h-2v-2h2v2Zm0-4h-2v-4h2v4Z"/></svg>`;
const errorGlyph = `<svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm5 13.6L15.6 17 12 13.4 8.4 17 7 15.6 10.6 12 7 8.4 8.4 7 12 10.6 15.6 7 17 8.4 13.4 12 17 15.6Z"/></svg>`;
const closeGlyph = `<svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="m18.3 5.71-1.42-1.42L12 9.17 7.12 4.29 5.71 5.71 10.59 10.59 5.71 15.46l1.41 1.42L12 12l4.88 4.88 1.42-1.42-4.88-4.87 4.87-4.88Z"/></svg>`;

const icon = (glyph: string) => `<i aria-hidden="true" style="${iconStyle}">${glyph}</i>`;
const title = (text: string) =>
  `<utrecht-heading-3 class="tilburg-alert__title"><h3 class="utrecht-heading-3">${text}</h3></utrecht-heading-3>`;

export const examples = {
  info: {
    name: 'Info',
    html: `<div class="utrecht-alert tilburg-alert utrecht-alert--info" role="status" aria-live="polite" aria-atomic="true">
  <div class="utrecht-alert__icon">${icon(infoGlyph)}</div>
  <div class="utrecht-alert__content">
    ${title('Informatie')}
    <div class="utrecht-alert__message">
      <p class="utrecht-paragraph">De openingstijden zijn gewijzigd. Bekijk de actuele tijden op deze pagina.</p>
    </div>
  </div>
</div>`,
  },
  success: {
    name: 'Success (ok)',
    html: `<div class="utrecht-alert tilburg-alert utrecht-alert--ok" role="status" aria-live="polite" aria-atomic="true">
  <div class="utrecht-alert__icon">${icon(checkGlyph)}</div>
  <div class="utrecht-alert__content">
    ${title('Aanvraag verstuurd')}
    <div class="utrecht-alert__message">
      <p class="utrecht-paragraph">Je ontvangt binnen 8 weken een beslissing per e-mail.</p>
    </div>
  </div>
</div>`,
  },
  warning: {
    name: 'Warning',
    html: `<div class="utrecht-alert tilburg-alert utrecht-alert--warning" role="status" aria-live="polite" aria-atomic="true">
  <div class="utrecht-alert__icon">${icon(warnGlyph)}</div>
  <div class="utrecht-alert__content">
    ${title('Let op')}
    <div class="utrecht-alert__message">
      <p class="utrecht-paragraph">De aanvraagperiode sluit over twee weken.</p>
    </div>
  </div>
</div>`,
  },
  danger: {
    name: 'Danger (error)',
    html: `<div class="utrecht-alert tilburg-alert utrecht-alert--error" role="alert" aria-live="assertive" aria-atomic="true">
  <div class="utrecht-alert__icon">${icon(errorGlyph)}</div>
  <div class="utrecht-alert__content">
    ${title('Er ging iets mis')}
    <div class="utrecht-alert__message">
      <p class="utrecht-paragraph">Probeer het opnieuw of neem contact op met de gemeente.</p>
    </div>
  </div>
</div>`,
  },
  closable: {
    name: 'Closable',
    html: `<div class="utrecht-alert tilburg-alert utrecht-alert--info" role="status" aria-live="polite" aria-atomic="true">
  <div class="utrecht-alert__icon">${icon(infoGlyph)}</div>
  <div class="utrecht-alert__content">
    ${title('Informatie')}
    <div class="utrecht-alert__message">
      <p class="utrecht-paragraph">Klik op het kruisje om dit bericht te sluiten.</p>
    </div>
  </div>
  <button type="button" class="tilburg-alert__close" aria-label="Sluit alert">${icon(closeGlyph)}</button>
</div>`,
  },
  messageOnly: {
    name: 'Message only (no title)',
    html: `<div class="utrecht-alert tilburg-alert utrecht-alert--info" role="status" aria-live="polite" aria-atomic="true">
  <div class="utrecht-alert__icon">${icon(infoGlyph)}</div>
  <div class="utrecht-alert__content">
    <div class="utrecht-alert__message">
      <p class="utrecht-paragraph">Deze melding heeft geen titel — alleen een korte tekst.</p>
    </div>
  </div>
</div>`,
  },
} satisfies Record<string, Example>;
