/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg form. Imported by both the React storybook
   (`packages/storybook`) and the Angular storybook (`packages/storybook-angular`). */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Fform';

const intro = `Container for a form: a native \`<form class="utrecht-form">\` around form fields, fieldsets and a button group. The utrecht base style plus one Tilburg rule: the form's direct children (fields, fieldsets, the button row) get \`--tilburg-space-block-rabbit\` between them, because the utrecht form-field margins are 0 in the Tilburg theme. Give a form an accessible name (\`aria-label\` or \`aria-labelledby\` pointing at its heading) only when the page holds more than one form, so it is announced as a landmark.`;

const usageAngular = `### Angular

\`\`\`html
<tilburg-form [formGroup]="form" (ngSubmit)="verstuur()" ariaLabelledBy="contact-heading">
  <tilburg-form-field>…</tilburg-form-field>
  <tilburg-button-group>
    <button type="submit" utrecht-button appearance="primary-action-button">Versturen</button>
  </tilburg-button-group>
</tilburg-form>
\`\`\`

\`<tilburg-form>\` renders the \`<form>\` and projects its content into it. Put \`[formGroup]\` and \`(ngSubmit)\` on the
\`<tilburg-form>\` element: the native \`submit\` event of the inner form bubbles to it, so reactive forms work as usual.
The \`id\` moves from the host to the inner \`<form>\` (so \`<button form="…">\` resolves to it).

Inputs: \`id\`, \`ariaLabel\`, \`ariaLabelledBy\`, \`noValidate\` (default \`false\`; sets \`novalidate\` so the browser leaves validation to the app).
There are no \`action\` / \`method\` inputs: an Angular form submits through \`(ngSubmit)\`. For a native submit to a URL, use
the plain HTML \`<form class="utrecht-form" action="…" method="…">\`.`;

const usageReact = `### React

\`\`\`tsx
import { Button, Form, FormField, FormLabel, Textbox } from '@gemeente-tilburg/components-react';

export function ContactForm() {
  return (
    <Form aria-labelledby="contact-heading" onSubmit={(event) => { event.preventDefault(); /* … */ }}>
      <FormField>
        <FormLabel htmlFor="naam">Naam</FormLabel>
        <Textbox id="naam" name="naam" />
      </FormField>
      <Button type="submit" appearance="primary-action-button">Versturen</Button>
    </Form>
  );
}
\`\`\`

Props: \`noValidate\` and every other native \`<form>\` attribute (\`onSubmit\`, \`action\`, \`method\`, \`id\`, \`aria-*\`, \`className\`, merged after \`utrecht-form\`). The \`ref\` is forwarded to the \`<form>\`. \`FormProps\` is exported as a type.`;

const usageWebComponents = `### Web Components (Stencil)

\`\`\`html
<tilburg-wbc-form aria-labelledby="contact-heading" action="/contact" method="post">
  <tilburg-wbc-form-field>…</tilburg-wbc-form-field>
  <tilburg-wbc-button type="submit" appearance="primary-action-button">Versturen</tilburg-wbc-button>
</tilburg-wbc-form>
\`\`\`

Renders a real \`<form class="utrecht-form">\` in light DOM with the content slotted inside it, so the controls submit with it. The native \`submit\` and \`reset\` events bubble through the host. Attribute: \`no-validate\` (sets \`novalidate\`). \`id\`, \`name\`, \`action\`, \`method\`, \`enctype\`, \`target\`, \`autocomplete\`, \`accept-charset\`, \`aria-label\` and \`aria-labelledby\` are moved from the host onto the \`<form>\`.`;

const usagePlainHtml = `### Plain HTML / CSS

\`\`\`html
<form class="utrecht-form" action="/contact" method="post" aria-labelledby="contact-heading">
  <div class="utrecht-form-field utrecht-form-field--text">
    <label class="utrecht-form-label" for="naam">Naam</label>
    <input id="naam" name="naam" class="utrecht-textbox utrecht-textbox--html-input" />
  </div>
  <button type="submit" class="utrecht-button utrecht-button--primary-action tilburg-medium">Versturen</button>
</form>
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

export const descriptionWebComponents = `${intro}

## Usage

${usageWebComponents}

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

const field = (
  id: string,
  label: string,
  type = 'text',
  extra = '',
) => `  <div class="utrecht-form-field utrecht-form-field--text">
    <label class="utrecht-form-label" for="${id}">${label}</label>
    <input id="${id}" name="${id}" type="${type}" class="utrecht-textbox utrecht-textbox--html-input"${extra} />
  </div>`;

export const examples = {
  default: {
    name: 'Default',
    html: `<form class="utrecht-form" action="#" style="max-inline-size:32rem">
${field('form-naam', 'Naam', 'text', ' autocomplete="name"')}
${field('form-email', 'E-mailadres', 'email', ' autocomplete="email"')}
  <div class="utrecht-button-group">
    <button type="submit" class="utrecht-button utrecht-button--primary-action tilburg-medium">Versturen</button>
  </div>
</form>`,
  },
  labelled: {
    name: 'Labelled (landmark)',
    html: `<h2 class="utrecht-heading-2" id="form-melding-titel">Melding openbare ruimte</h2>
<form class="utrecht-form" action="#" aria-labelledby="form-melding-titel" novalidate style="max-inline-size:32rem">
${field('form-locatie', 'Locatie', 'text', ' required aria-required="true"')}
  <div class="utrecht-form-field utrecht-form-field--text">
    <label class="utrecht-form-label" for="form-omschrijving">Omschrijving</label>
    <textarea id="form-omschrijving" name="form-omschrijving" class="utrecht-textarea utrecht-textarea--html-textarea"></textarea>
  </div>
  <div class="utrecht-button-group">
    <button type="submit" class="utrecht-button utrecht-button--primary-action tilburg-medium">Melding versturen</button>
    <button type="reset" class="utrecht-button utrecht-button--secondary-action tilburg-medium">Wissen</button>
  </div>
</form>`,
  },
} satisfies Record<string, Example>;
