/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg form fieldset.
   Imported by both the React storybook (`packages/storybook`) and the Angular
   storybook (`packages/storybook-angular`) so the HTML lives in one place. */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Fform-fieldset';

const intro = `Groups related form fields under a single legend so assistive tech announces the group label before each field. Wraps the native \`<fieldset>\` + \`<legend>\` pair with utrecht-fieldset styling.`;

const usageAngular = `### Angular

\`\`\`html
<tilburg-form-fieldset ariaLabel="Persoonsgegevens">
  <legend class="utrecht-form-label">Persoonsgegevens</legend>
  <!-- form fields -->
</tilburg-form-fieldset>
\`\`\`

Inputs: \`disabled\`, \`invalid\`, \`ariaLabel\`, \`ariaLabelledby\`, \`ariaDescribedBy\`.`;

const usageReact = `### React

The component is \`Fieldset\` (not \`FormFieldset\`). There is no \`legend\` prop — pass a real \`<legend class="utrecht-form-label">\` as the first child, exactly like the plain HTML version, so the native fieldset/legend relationship stays intact.

\`\`\`tsx
import { Checkbox, Fieldset, FormLabel } from '@gemeente-tilburg/components-react';

export function Persoonsgegevens({ invalid }: { invalid: boolean }) {
  return (
    <Fieldset invalid={invalid}>
      <legend className="utrecht-form-label">Persoonsgegevens</legend>
      <FormLabel type="checkbox">
        <Checkbox name="nieuwsbrief" /> Nieuwsbrief ontvangen
      </FormLabel>
      <FormLabel type="checkbox">
        <Checkbox name="updates" /> Updates over mijn aanvraag
      </FormLabel>
    </Fieldset>
  );
}
\`\`\`

Props: \`invalid\` (adds \`utrecht-fieldset--invalid\` and \`aria-invalid="true"\`), plus any standard \`<fieldset>\` attribute — \`disabled\` is the native one (it also adds \`utrecht-fieldset--disabled\`), and labelling is done with the native attributes: pass \`aria-label\`, \`aria-labelledby\`, and \`aria-describedby\` directly. \`FieldsetProps\` is exported as a type alias.`;

const usagePlainHtml = `### Plain HTML / CSS

\`\`\`html
<fieldset class="utrecht-fieldset">
  <legend class="utrecht-form-label">Persoonsgegevens</legend>
  <!-- form fields -->
</fieldset>
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

const usageWebComponents = `### Web Components (Stencil)

The tag is \`<tilburg-webc-fieldset>\` (after the Angular selector \`tilburg-fieldset\`). It renders a native \`<fieldset class="utrecht-fieldset">\` in light DOM; pass a real \`<legend class="utrecht-form-label">\` as the first child so the native fieldset/legend relationship stays intact.

\`\`\`html
<tilburg-webc-fieldset invalid aria-describedby="persoon-error">
  <legend class="utrecht-form-label">Persoonsgegevens</legend>
  <tilburg-webc-form-field type="text">
    <label class="utrecht-form-label" for="naam">Naam</label>
    <input id="naam" name="naam" class="utrecht-textbox utrecht-textbox--html-input" />
  </tilburg-webc-form-field>
</tilburg-webc-fieldset>
\`\`\`

Attributes: \`disabled\` (native \`disabled\` on the \`<fieldset>\`, disabling every control in it, plus \`utrecht-fieldset--disabled\`), \`invalid\` (adds \`utrecht-fieldset--invalid\` and \`aria-invalid="true"\`). The Angular \`ariaLabel\` / \`ariaLabelledby\` / \`ariaDescribedBy\` inputs are the plain HTML attributes \`aria-label\`, \`aria-labelledby\` and \`aria-describedby\`; write them (and \`id\` / \`name\`) on the host and they are moved onto the inner \`<fieldset>\`. Slot: default (legend and form fields).`;

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

export const examples = {
  default: {
    name: 'Default',
    /* The `max-width` sits on an unclassed demo wrapper, not on the fieldset:
       it frames the example, it is not part of the component. Everything that
       is component styling — the user-agent border/padding/margin reset —
       comes from `.utrecht-fieldset` in packages/components-css/form-fieldset. */
    html: `<div style="max-width:24rem">
  <fieldset class="utrecht-fieldset">
    <legend class="utrecht-form-label">Persoonsgegevens</legend>
    <div class="utrecht-form-field utrecht-form-field--text">
      <label class="utrecht-form-label" for="fs-naam">Naam</label>
      <input id="fs-naam" type="text" class="utrecht-textbox utrecht-textbox--html-input" />
    </div>
    <div class="utrecht-form-field utrecht-form-field--text">
      <label class="utrecht-form-label" for="fs-email">E-mailadres</label>
      <input id="fs-email" type="email" class="utrecht-textbox utrecht-textbox--html-input" />
    </div>
  </fieldset>
</div>`,
  },
} satisfies Record<string, Example>;
