/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg button link. */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Fbutton-link';

const intro = `Anchor styled like a button — same visual treatment as \`<tilburg-button>\` but rendered as an \`<a>\` for navigation that needs URL semantics (right-click, copy link, middle-click new tab, etc.). Three appearance modifiers: \`--primary-action\`, \`--secondary-action\`, \`--subtle\`.`;

const usageAngular = `### Angular

\`\`\`html
<a tilburg-button-link appearance="primary-action-button" href="/aanvraag/nieuw">
  Nieuwe aanvraag starten
</a>
\`\`\`

Inputs: \`appearance\` (\`'primary-action-button' | 'secondary-action-button' | 'subtle-button'\`), \`external\` (sets \`rel="external noopener noreferrer"\`).`;

const usageReact = `### React

\`\`\`tsx
import { ButtonLink } from '@gemeente-tilburg/components-react';

export function StartAanvraag() {
  return (
    <ButtonLink appearance="primary-action-button" href="/aanvraag/nieuw">
      Nieuwe aanvraag starten
    </ButtonLink>
  );
}
\`\`\`

Props: \`appearance\` (\`'primary-action-button' | 'secondary-action-button' | 'subtle-button'\`), \`external\` (sets \`rel="external noopener noreferrer"\`), \`placeholder\` (renders \`aria-disabled="true"\` plus the \`--placeholder\` modifier, for a link that is visible but not yet actionable), plus any standard anchor attribute (\`href\`, \`target\`, \`rel\`, \`aria-label\`, \`className\`, …). \`ButtonLinkAppearance\` and \`ButtonLinkProps\` are exported as type aliases.

The \`--html-a\` class is applied for you, so unlike the plain HTML snippet you never write it by hand. \`placeholder\` has no Angular counterpart.`;

const usagePlainHtml = `### Plain HTML / CSS

\`\`\`html
<a href="/aanvraag/nieuw"
   class="utrecht-button-link utrecht-button-link--html-a utrecht-button-link--primary-action">
  Nieuwe aanvraag starten
</a>
\`\`\``;

const baselineShift = `## Vertical baseline shift

Button-link uses the same TradeGothicCondensed18 font as \`<tilburg-button>\`, which has more empty descent space below the baseline than ascent space above. With \`line-height: 1\` this makes the visible letters read as sitting *above* the geometric centre of the control.

We compensate the same way as the button: more \`padding-block-start\`, less \`padding-block-end\`, with total height unchanged. Button-link has no size variants, so a single offset is applied via the design token \`--tilburg-fix-button-link-baseline-offset\` (\`2px\`, defined in \`proprietary/design-tokens/src/patches/button-link.tokens.json\`).

See the "Vertical baseline shift" section in the **Button** story for the full rationale (font metrics, why the shift is needed, why the value differs per size).`;

export const description = `${intro}

## Usage

${usageAngular}

${usagePlainHtml}

${baselineShift}
`;

export const descriptionReact = `${intro}

## Usage

${usageReact}

${usagePlainHtml}

${baselineShift}
`;

export interface Example {
  name: string;
  html: string;
}

export const examples = {
  primaryAction: {
    name: 'Primary action',
    html: `<a href="#" class="utrecht-button-link utrecht-button-link--html-a utrecht-button-link--primary-action">Nieuwe aanvraag starten</a>`,
  },
  secondaryAction: {
    name: 'Secondary action',
    html: `<a href="#" class="utrecht-button-link utrecht-button-link--html-a utrecht-button-link--secondary-action">Meer informatie</a>`,
  },
  subtle: {
    name: 'Subtle',
    html: `<a href="#" class="utrecht-button-link utrecht-button-link--html-a utrecht-button-link--subtle">Ga terug</a>`,
  },
} satisfies Record<string, Example>;
