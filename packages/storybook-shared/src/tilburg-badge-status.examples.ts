/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg status badge. */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Fbadge-status';

const intro = `Small inline badge that conveys a status (info / success / warning / error). Renders an \`aria-live\` region so screen readers announce the status when it changes.`;

const usageAngular = `### Angular

\`\`\`html
<tilburg-badge-status status="success">Goedgekeurd</tilburg-badge-status>
\`\`\`

Inputs: \`status\` (\`'info' | 'success' | 'warning' | 'error'\`), \`liveRegion\`, \`ariaLabel\`.`;

const usageReact = `### React

\`\`\`tsx
import { BadgeStatus } from '@gemeente-tilburg/components-react';

export function AanvraagStatus() {
  return <BadgeStatus status="success">Goedgekeurd</BadgeStatus>;
}
\`\`\`

Props: \`status\` (\`string\`, appended as the \`utrecht-badge-status--{status}\` modifier — \`'info' | 'success' | 'warning' | 'error'\`, plus the utrecht feedback aliases \`'safe' | 'danger' | 'invalid' | 'inactive' | 'neutral'\`), \`liveRegion\` (\`'polite' | 'assertive' | 'off'\`, default \`'polite'\`), plus any standard \`<span>\` attribute (\`aria-label\`, \`className\`, …). \`BadgeStatusProps\` is exported as a type alias.

\`role="status"\` and \`aria-live\` are set for you. If you don't pass an \`aria-label\`, the \`status\` value is used as the accessible name.`;

const usagePlainHtml = `### Plain HTML / CSS

\`\`\`html
<span class="utrecht-badge-status utrecht-badge-status--success" role="status">Goedgekeurd</span>
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

\`\`\`html
<tilburg-wbc-badge-status status="success">Goedgekeurd</tilburg-wbc-badge-status>
<tilburg-wbc-badge-status status="error" aria-label="Aanvraag afgewezen" live-region="assertive">
  Afgewezen
</tilburg-wbc-badge-status>
\`\`\`

Attributes: \`status\` (appended as the \`utrecht-badge-status--{status}\` modifier — \`'info' | 'success' | 'warning' | 'error'\`, plus the utrecht feedback aliases \`'safe' | 'danger' | 'invalid' | 'inactive' | 'neutral'\`), \`live-region\` (\`'polite' | 'assertive' | 'off'\`, default \`'polite'\`), and \`aria-label\` / \`aria-describedby\` / \`title\`, moved onto the inner badge. Angular's \`ariaLabel\` input is the plain \`aria-label\` attribute here; without it the \`status\` value is the accessible name. \`role="status"\` and \`aria-live\` are set for you. Slot: default (the badge text). No events.`;

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
  all: {
    name: 'All four status types',
    html: `<div style="display:flex;gap:0.75rem;flex-wrap:wrap">
  <span class="utrecht-badge-status utrecht-badge-status--info" role="status">In behandeling</span>
  <span class="utrecht-badge-status utrecht-badge-status--success" role="status">Goedgekeurd</span>
  <span class="utrecht-badge-status utrecht-badge-status--warning" role="status">Aandacht vereist</span>
  <span class="utrecht-badge-status utrecht-badge-status--error" role="status">Afgewezen</span>
</div>`,
  },
} satisfies Record<string, Example>;
