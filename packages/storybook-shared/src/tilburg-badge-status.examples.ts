/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg status badge. */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Fbadge-status';

export const description = `Small inline badge that conveys a status (info / success / warning / error). Renders an \`aria-live\` region so screen readers announce the status when it changes.

## Usage

### Angular

\`\`\`html
<tilburg-badge-status status="success">Goedgekeurd</tilburg-badge-status>
\`\`\`

Inputs: \`status\` (\`'info' | 'success' | 'warning' | 'error'\`), \`liveRegion\`, \`ariaLabel\`.

### Plain HTML / CSS

\`\`\`html
<span class="utrecht-badge-status utrecht-badge-status--success" role="status">Goedgekeurd</span>
\`\`\`
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
