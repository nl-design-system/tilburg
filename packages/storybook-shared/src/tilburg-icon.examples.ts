/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg icon. Imported by
   both the React storybook (`packages/storybook`) and the Angular storybook
   (`packages/storybook-angular`). */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Ficon';

const intro = `Container that sizes and colours an inline SVG icon: \`<span class="utrecht-icon" aria-hidden="true">\`. Tilburg ships no icon set; pass your own SVG (with \`fill="currentColor"\` so it takes the text colour). The icon is decorative and hidden from assistive technology, so put the meaning in the text next to it (or in a \`utrecht-visually-hidden\` label). Size: \`--utrecht-icon-size\` (Tilburg default \`--tilburg-size-icon-md\`, 24px); colour: \`--utrecht-icon-color\`, falling back to the text colour.`;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 15h-2v-6h2v6Zm0-8h-2V7h2v2Z"/></svg>`;

const usageAngular = `### Angular

\`\`\`html
<tilburg-icon>
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="…" /></svg>
</tilburg-icon>
Meer informatie
\`\`\`

No inputs. Project the SVG as \`<ng-content>\`.`;

const usageReact = `### React

\`\`\`tsx
import { Icon } from '@gemeente-tilburg/components-react';

export function MeerInformatie() {
  return (
    <span>
      <Icon>
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="…" />
        </svg>
      </Icon>{' '}
      Meer informatie
    </span>
  );
}
\`\`\`

Props: no component-specific props; \`children\` is the SVG. \`IconProps\` is exported as a type alias of \`HTMLAttributes<HTMLSpanElement>\`, so any standard attribute (\`className\`, merged after \`utrecht-icon\`, \`style\`, …) is passed on. The \`ref\` is forwarded to the \`<span>\`.`;

const usageWebComponents = `### Web Components (Stencil)

\`\`\`html
<tilburg-wbc-icon>
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="…" /></svg>
</tilburg-wbc-icon>
Meer informatie
\`\`\`

Renders \`<span class="utrecht-icon" aria-hidden="true">\` around the default slot. No attributes or events.`;

const usagePlainHtml = `### Plain HTML / CSS

\`\`\`html
<span class="utrecht-icon" aria-hidden="true">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="…" /></svg>
</span>
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

export const examples = {
  default: {
    name: 'Default',
    html: `<p class="utrecht-paragraph">
  <span class="utrecht-icon" aria-hidden="true">${svg}</span>
  Meer informatie over afvalinzameling
</p>`,
  },
  customSize: {
    name: 'Custom size and colour',
    html: `<p class="utrecht-paragraph" style="--utrecht-icon-size:var(--tilburg-size-icon-4xl);--utrecht-icon-color:var(--tilburg-interaction-color)">
  <span class="utrecht-icon" aria-hidden="true">${svg}</span>
  Let op
</p>`,
  },
  inheritColor: {
    name: 'Inherits the text colour',
    html: `<p class="utrecht-paragraph" style="color:var(--tilburg-feedback-informative-color)">
  <span class="utrecht-icon" aria-hidden="true">${svg}</span>
  Uw aanvraag is in behandeling
</p>`,
  },
} satisfies Record<string, Example>;
