/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg link button. Imported
   by both the React storybook (`packages/storybook`) and the Angular
   storybook (`packages/storybook-angular`) so the HTML lives in one place. */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Flink-button';

const intro = `A \`<button>\` that looks like a link (Tilburg link colours, underline and typography). Use it in forms and applications where a button belongs but the action reads as navigation, for example "Vorige stap" in a multi-step form that saves the current step. On ordinary information pages use a Link; for a link that looks like a button use Button Link. \`inline\` removes the button padding and minimum size so it flows inside running text. \`pressed\` makes it a toggle (\`aria-pressed\`).`;

const usageAngular = `### Angular

\`\`\`html
<tilburg-link-button (click)="vorigeStap()">Vorige stap</tilburg-link-button>
<tilburg-link-button [inline]="true" [pressed]="toonDetails" (click)="toonDetails = !toonDetails">Toon details</tilburg-link-button>
\`\`\`

Inputs: \`type\` (default \`'button'\`), \`disabled\` (default \`false\`), \`inline\` (default \`false\`), \`pressed\` (\`boolean | undefined\`; when set it renders \`aria-pressed\`), \`ariaLabel\`, \`ariaDescribedBy\`. The native \`click\` of the inner \`<button>\` bubbles through the host.`;

const usageReact = `### React

\`\`\`tsx
import { LinkButton } from '@gemeente-tilburg/components-react';

export function VorigeStap({ onBack }: { onBack: () => void }) {
  return <LinkButton onClick={onBack}>Vorige stap</LinkButton>;
}
\`\`\`

Props: \`inline\` (default \`false\`), \`pressed\` (\`boolean\`; when set it renders \`aria-pressed\`), plus any \`<button>\` attribute (\`type\` — default \`'button'\`, \`disabled\`, \`onClick\`, \`aria-label\`, \`className\`, …). \`LinkButtonProps\` is exported as a type. The \`ref\` is forwarded to the \`<button>\`.`;

const usageWebComponents = `### Web Components (Stencil)

\`\`\`html
<tilburg-wbc-link-button>Vorige stap</tilburg-wbc-link-button>
<tilburg-wbc-link-button inline pressed="false">Toon details</tilburg-wbc-link-button>
\`\`\`

Attributes: \`type\` (default \`'button'\`), \`disabled\`, \`inline\`, \`pressed\` (\`true\` / \`false\`; leave it off for a plain button), and \`aria-label\` / \`aria-describedby\` / \`title\` / \`lang\` (moved onto the inner \`<button>\`). Slot: default (the label). The native \`click\` bubbles through the host; no custom events.`;

const usagePlainHtml = `### Plain HTML / CSS

\`\`\`html
<button type="button" class="utrecht-link-button utrecht-link-button--html-button">Vorige stap</button>

<!-- inline, as a toggle -->
<button type="button" class="utrecht-link-button utrecht-link-button--html-button utrecht-link-button--inline utrecht-link-button--pressed" aria-pressed="true">
  Verberg details
</button>
\`\`\`

Modifiers: \`utrecht-link-button--inline\`, \`utrecht-link-button--pressed\` (with \`aria-pressed="true"\`), \`utrecht-link-button--disabled\` (with \`disabled\`).`;

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

const base = 'utrecht-link-button utrecht-link-button--html-button';

export const examples = {
  default: {
    name: 'Default',
    html: `<button type="button" class="${base}">Vorige stap</button>`,
  },
  inline: {
    name: 'Inline in text',
    html: `<p class="utrecht-paragraph">
  Klopt uw adres niet?
  <button type="button" class="${base} utrecht-link-button--inline">Wijzig uw adres</button>
  voordat u verdergaat.
</p>`,
  },
  pressed: {
    name: 'Toggle (pressed)',
    html: `<button type="button" class="${base} utrecht-link-button--inline" aria-pressed="false">Toon details</button>
<button type="button" class="${base} utrecht-link-button--inline utrecht-link-button--pressed" aria-pressed="true">Verberg details</button>`,
  },
  disabled: {
    name: 'Disabled',
    html: `<button type="button" class="${base} utrecht-link-button--disabled" disabled>Vorige stap</button>`,
  },
} satisfies Record<string, Example>;
