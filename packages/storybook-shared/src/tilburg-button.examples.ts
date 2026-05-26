/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg button. */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Fbutton';

export const description = `Tilburg-specific button variants on top of utrecht: \`.tilburg-small / .tilburg-medium / .tilburg-large\` size classes and \`--secondary-action\` / \`--subtle\` focus overrides.

## Usage

### Angular

\`\`\`html
<tilburg-button appearance="primary-action" size="medium" (click)="submit()">
  Versturen
</tilburg-button>
\`\`\`

Inputs: \`appearance\` (\`'primary-action' | 'secondary-action' | 'subtle'\`), \`size\` (\`'small' | 'medium' | 'large'\`), \`type\`, \`disabled\`, \`title\`, \`ariaLabel\`, \`ariaDescribedBy\`, \`pressed\`.

### Plain HTML / CSS

\`\`\`html
<button type="button" class="utrecht-button utrecht-button--primary-action tilburg-medium">
  Versturen
</button>
\`\`\`

Combine one size class (\`tilburg-small | tilburg-medium | tilburg-large\`) with one appearance modifier (\`utrecht-button--primary-action | utrecht-button--secondary-action | utrecht-button--subtle\`).

## Vertical baseline shift (why button text is nudged down)

Tilburg buttons use **TradeGothicCondensed18**, whose vertical font metrics put more empty descent space below the baseline than ascent space above. With \`line-height: 1\` the line-box still includes that descent zone, and flex-centring the line-box places the visible letters in the upper half of the box — so the text reads as sitting *above* the geometric centre of the button.

We compensate by shifting the line-box downward via **asymmetric padding-block**: more \`padding-block-start\`, less \`padding-block-end\`. Total button height is unchanged; only the letters move down.

The shift amount lives in the design-token layer (\`proprietary/design-tokens/src/patches/button.tokens.json\`), under the \`tilburg-fix\` namespace used for non-systematic visual compensations:

| Size class | Token | Value |
| --- | --- | --- |
| \`.tilburg-small\` | \`--tilburg-fix-button-small-baseline-offset\` | \`2px\` |
| \`.tilburg-medium\` | \`--tilburg-fix-button-medium-baseline-offset\` | \`2px\` |
| \`.tilburg-large\` | \`--tilburg-fix-button-large-baseline-offset\` | \`4px\` |

Small and medium buttons need a smaller shift because their padding-block budget is smaller — the same 4px that optically centres a large button visibly skews a small one.

Adjust the values in \`button.tokens.json\` and rebuild the design-tokens package (\`pnpm pack:dist\`) if the optical centre still feels off after a font change.
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
