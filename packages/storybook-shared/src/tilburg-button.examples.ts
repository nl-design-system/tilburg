/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg button. */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Fbutton';

const intro = `Tilburg-specific button variants on top of utrecht: \`.tilburg-small / .tilburg-medium / .tilburg-large\` size classes and \`--secondary-action\` / \`--subtle\` focus overrides.`;

const usageAngular = `### Angular

\`\`\`html
<tilburg-button appearance="primary-action-button" size="medium" (click)="submit()">
  Versturen
</tilburg-button>
\`\`\`

Inputs: \`appearance\` (\`'primary-action-button' | 'secondary-action-button' | 'subtle-button'\`, default \`'primary-action-button'\`), \`size\` (\`'small' | 'medium' | 'large'\`), \`type\`, \`disabled\`, \`title\`, \`ariaLabel\`, \`ariaDescribedBy\`, \`pressed\`.

The \`-button\` suffix is required: utrecht's \`[utrecht-button]\` directive maps \`appearance === 'primary-action-button'\` to \`.utrecht-button--primary-action\`, so an unsuffixed value silently renders a button with no appearance modifier.`;

const usageReact = `### React

\`\`\`tsx
import { Button } from '@gemeente-tilburg/components-react';

export function AanvraagFormulier({ onSubmit }: { onSubmit: () => void }) {
  return (
    <Button appearance="primary-action-button" size="medium" onClick={onSubmit}>
      Versturen
    </Button>
  );
}
\`\`\`

Props: \`appearance\` (\`'primary-action-button' | 'secondary-action-button' | 'subtle-button'\`), \`size\` (\`'small' | 'medium' | 'large'\`, default \`'medium'\`), \`pressed\`, \`busy\`, plus any standard button attribute (\`type\` — default \`'button'\`, \`disabled\`, \`title\`, \`onClick\`, \`aria-label\`, \`aria-describedby\`, \`className\`, …). \`ButtonAppearance\` and \`ButtonSize\` are exported as type aliases.

The \`appearance\` values are the same \`-button\`-suffixed strings Angular uses, so they copy across unchanged. React adds a \`busy\` flag that renders \`utrecht-button--busy\`, which has no Angular counterpart. Like Angular, an omitted \`aria-label\` falls back to \`title\`, so icon-only buttons still get an accessible name.`;

const usagePlainHtml = `### Plain HTML / CSS

\`\`\`html
<button type="button" class="utrecht-button utrecht-button--primary-action tilburg-medium">
  Versturen
</button>
\`\`\`

Combine one size class (\`tilburg-small | tilburg-medium | tilburg-large\`) with one appearance modifier (\`utrecht-button--primary-action | utrecht-button--secondary-action | utrecht-button--subtle\`).`;

const baselineShift = `## Vertical baseline shift (why button text is nudged down)

Tilburg buttons use **TradeGothicCondensed18**, whose vertical font metrics put more empty descent space below the baseline than ascent space above. With \`line-height: 1\` the line-box still includes that descent zone, and flex-centring the line-box places the visible letters in the upper half of the box — so the text reads as sitting *above* the geometric centre of the button.

We compensate by shifting the line-box downward via **asymmetric padding-block**: more \`padding-block-start\`, less \`padding-block-end\`. Total button height is unchanged; only the letters move down.

The shift amount lives in the design-token layer (\`proprietary/design-tokens/src/patches/button.tokens.json\`), under the \`tilburg-fix\` namespace used for non-systematic visual compensations:

| Size class | Token | Value |
| --- | --- | --- |
| \`.tilburg-small\` | \`--tilburg-fix-button-small-baseline-offset\` | \`2px\` |
| \`.tilburg-medium\` | \`--tilburg-fix-button-medium-baseline-offset\` | \`2px\` |
| \`.tilburg-large\` | \`--tilburg-fix-button-large-baseline-offset\` | \`4px\` |

Small and medium buttons need a smaller shift because their padding-block budget is smaller — the same 4px that optically centres a large button visibly skews a small one.

Adjust the values in \`button.tokens.json\` and rebuild the design-tokens package (\`pnpm pack:dist\`) if the optical centre still feels off after a font change.`;

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

const rowStyle = 'align-items:center;display:flex;flex-wrap:wrap;gap:0.75rem';

const btn = (size: string, label: string, appearance?: string, disabled = false) => {
  const classes = ['utrecht-button', size];
  if (appearance) classes.push(`utrecht-button--${appearance}`);
  return `<button type="button" class="${classes.join(' ')}"${disabled ? ' disabled' : ''}>${label}</button>`;
};

export const examples = {
  sizes: {
    name: 'Sizes (small / medium / large)',
    html: `<div style="${rowStyle}">
  ${btn('tilburg-small', 'Small')}
  ${btn('tilburg-medium', 'Medium')}
  ${btn('tilburg-large', 'Large')}
</div>`,
  },
  primaryAction: {
    name: 'Primary action',
    html: `<div style="${rowStyle}">
  ${btn('tilburg-small', 'Small', 'primary-action')}
  ${btn('tilburg-medium', 'Medium', 'primary-action')}
  ${btn('tilburg-large', 'Large', 'primary-action')}
</div>`,
  },
  secondaryAction: {
    name: 'Secondary action',
    html: `<div style="${rowStyle}">
  ${btn('tilburg-small', 'Small', 'secondary-action')}
  ${btn('tilburg-medium', 'Medium', 'secondary-action')}
  ${btn('tilburg-large', 'Large', 'secondary-action')}
</div>`,
  },
  subtle: {
    name: 'Subtle',
    html: `<div style="${rowStyle}">
  ${btn('tilburg-small', 'Small', 'subtle')}
  ${btn('tilburg-medium', 'Medium', 'subtle')}
  ${btn('tilburg-large', 'Large', 'subtle')}
</div>`,
  },
  disabled: {
    name: 'Disabled (each size)',
    html: `<div style="${rowStyle}">
  ${btn('tilburg-small', 'Small', 'primary-action', true)}
  ${btn('tilburg-medium', 'Medium', 'primary-action', true)}
  ${btn('tilburg-large', 'Large', 'primary-action', true)}
</div>`,
  },
} satisfies Record<string, Example>;
