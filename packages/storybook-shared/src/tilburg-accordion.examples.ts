/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg accordion. Imported by
   both the React storybook (`packages/storybook`) and the Angular storybook
   (`packages/storybook-angular`). Each storybook's `tilburg-accordion.stories.*`
   file is a thin renderer wrapper around the strings below.

   The accordion is interactive in the HTML/CSS layer too — `data-tilburg-
   accordion-enhance` on the root opts the markup in to the small enhancement
   script at `packages/components-css/accordion/index.js`. The storybook
   previews import that script so clicks toggle sections; consumers using the
   HTML/CSS layer in their own app load it via
   `import '@gemeente-tilburg/components-css/accordion'`. */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Faccordion';

export const description = `Tilburg accordion built on \`.utrecht-accordion\`. Sections have a thin gray border, no internal panel padding, and the projected expand/collapse icon stays at the right edge. Arrow Up/Down and Home/End move focus between section buttons.

## Usage

### Angular

\`\`\`html
<tilburg-accordion ariaLabel="Veelgestelde vragen">
  <tilburg-accordion-section
    key="apply"
    label="Hoe vraag ik een vergunning aan?"
    [expanded]="openId === 'apply'"
    (toggled)="openId = openId === 'apply' ? null : 'apply'"
  >
    <p class="utrecht-paragraph">Je kunt een vergunning aanvragen via …</p>
  </tilburg-accordion-section>

  <tilburg-accordion-section key="time" label="Hoe lang duurt de behandeling?" [autoToggle]="true">
    <p class="utrecht-paragraph">De behandeltijd hangt af van …</p>
  </tilburg-accordion-section>
</tilburg-accordion>
\`\`\`

\`<tilburg-accordion>\` inputs: \`ariaLabel\`, \`headingLevel\` (1–6, default 2), \`displayName\`.
\`<tilburg-accordion-section>\` inputs: \`key\`, \`label\`, \`expanded\`, \`disabled\`, \`autoToggle\`; output: \`(toggled)\`.

### Plain HTML / CSS

De toggle (\`aria-expanded\` + \`[hidden]\` + keyboard-navigatie) zit niet in pure CSS. Laad het kleine enhancement-script en zet \`data-tilburg-accordion-enhance\` op het accordion-root:

\`\`\`html
<script type="module">
  import '@gemeente-tilburg/components-css/accordion';
</script>

<div class="utrecht-accordion" data-tilburg-accordion-enhance role="region" aria-label="Veelgestelde vragen">
  <div class="utrecht-accordion__section">
    <span class="utrecht-accordion__header">
      <button
        type="button"
        class="utrecht-button utrecht-button--subtle utrecht-accordion__button"
        id="apply-btn"
        aria-expanded="true"
        aria-controls="apply-panel"
      >
        <span class="utrecht-accordion__button-icon" aria-hidden="true"></span>
        <span class="utrecht-accordion__button-label tilburg-accordion__display-name">Hoe vraag ik een vergunning aan?</span>
      </button>
    </span>
    <div class="utrecht-accordion__panel" id="apply-panel" role="region" aria-labelledby="apply-btn">
      <p class="utrecht-paragraph">Je kunt een vergunning aanvragen via …</p>
    </div>
  </div>
</div>
\`\`\`

De lege \`<span class="utrecht-accordion__button-icon">\` laat CSS \`+\` / \`−\` schilderen op basis van \`[aria-expanded]\` — zie \`components-css/accordion/index.scss\`. Wil je een eigen glyph, vul de span en CSS sit out.
`;

export interface Example {
  name: string;
  html: string;
}

/* Each named export is one story. Using a typed object literal (not a
   `Record<string, Example>`) so consumers' strict TS settings —
   `noPropertyAccessFromIndexSignature` in particular — still allow dot
   access (`examples.default.html` instead of `examples['default'].html`). */
export const examples = {
  multipleSections: {
    name: 'Multiple sections',
    html: `<div class="utrecht-accordion" data-tilburg-accordion-enhance role="region" aria-label="Veelgestelde vragen">
  <div class="utrecht-accordion__section">
    <span class="utrecht-accordion__header">
      <button type="button" class="utrecht-button utrecht-button--subtle utrecht-accordion__button" id="accordion-apply-button" aria-expanded="true" aria-controls="accordion-apply-panel">
        <span class="utrecht-accordion__button-icon" aria-hidden="true"></span>
        <span class="utrecht-accordion__button-label tilburg-accordion__display-name">Hoe vraag ik een vergunning aan?</span>
      </button>
    </span>
    <div class="utrecht-accordion__panel" id="accordion-apply-panel" role="region" aria-labelledby="accordion-apply-button">
      <p class="utrecht-paragraph">Je kunt een vergunning aanvragen via het online formulier op deze website. Vul alle verplichte velden in en upload de benodigde documenten.</p>
    </div>
  </div>
  <div class="utrecht-accordion__section">
    <span class="utrecht-accordion__header">
      <button type="button" class="utrecht-button utrecht-button--subtle utrecht-accordion__button" id="accordion-time-button" aria-expanded="false" aria-controls="accordion-time-panel">
        <span class="utrecht-accordion__button-icon" aria-hidden="true"></span>
        <span class="utrecht-accordion__button-label tilburg-accordion__display-name">Hoe lang duurt de behandeling?</span>
      </button>
    </span>
    <div class="utrecht-accordion__panel" id="accordion-time-panel" role="region" aria-labelledby="accordion-time-button" hidden>
      <p class="utrecht-paragraph">De behandeltijd is afhankelijk van het type vergunning. In de meeste gevallen ontvang je binnen 8 weken een beslissing.</p>
    </div>
  </div>
  <div class="utrecht-accordion__section">
    <span class="utrecht-accordion__header">
      <button type="button" class="utrecht-button utrecht-button--subtle utrecht-accordion__button" id="accordion-appeal-button" aria-expanded="false" aria-controls="accordion-appeal-panel">
        <span class="utrecht-accordion__button-icon" aria-hidden="true"></span>
        <span class="utrecht-accordion__button-label tilburg-accordion__display-name">Kan ik bezwaar maken?</span>
      </button>
    </span>
    <div class="utrecht-accordion__panel" id="accordion-appeal-panel" role="region" aria-labelledby="accordion-appeal-button" hidden>
      <p class="utrecht-paragraph">Ja, je kunt bezwaar maken tegen een beslissing. Je hebt hiervoor 6 weken de tijd na de datum van het besluit.</p>
    </div>
  </div>
</div>`,
  },
  withDisabledSection: {
    name: 'With a disabled section',
    html: `<div class="utrecht-accordion" data-tilburg-accordion-enhance role="region" aria-label="Veelgestelde vragen">
  <div class="utrecht-accordion__section">
    <span class="utrecht-accordion__header">
      <button type="button" class="utrecht-button utrecht-button--subtle utrecht-accordion__button" id="accordion-open-button" aria-expanded="false" aria-controls="accordion-open-panel">
        <span class="utrecht-accordion__button-icon" aria-hidden="true"></span>
        <span class="utrecht-accordion__button-label tilburg-accordion__display-name">Beschikbaar</span>
      </button>
    </span>
    <div class="utrecht-accordion__panel" id="accordion-open-panel" role="region" aria-labelledby="accordion-open-button" hidden>
      <p class="utrecht-paragraph">Deze sectie is normaal te openen.</p>
    </div>
  </div>
  <div class="utrecht-accordion__section">
    <span class="utrecht-accordion__header">
      <button type="button" class="utrecht-button utrecht-button--subtle utrecht-accordion__button" id="accordion-disabled-button" aria-expanded="false" aria-controls="accordion-disabled-panel" disabled>
        <span class="utrecht-accordion__button-icon" aria-hidden="true"></span>
        <span class="utrecht-accordion__button-label tilburg-accordion__display-name">Nog niet beschikbaar</span>
      </button>
    </span>
    <div class="utrecht-accordion__panel" id="accordion-disabled-panel" role="region" aria-labelledby="accordion-disabled-button" hidden>
      <p class="utrecht-paragraph">(Disabled — deze sectie is niet uit te klappen)</p>
    </div>
  </div>
  <div class="utrecht-accordion__section">
    <span class="utrecht-accordion__header">
      <button type="button" class="utrecht-button utrecht-button--subtle utrecht-accordion__button" id="accordion-other-button" aria-expanded="false" aria-controls="accordion-other-panel">
        <span class="utrecht-accordion__button-icon" aria-hidden="true"></span>
        <span class="utrecht-accordion__button-label tilburg-accordion__display-name">Ook beschikbaar</span>
      </button>
    </span>
    <div class="utrecht-accordion__panel" id="accordion-other-panel" role="region" aria-labelledby="accordion-other-button" hidden>
      <p class="utrecht-paragraph">Deze sectie is ook normaal te openen.</p>
    </div>
  </div>
</div>`,
  },
} satisfies Record<string, Example>;
