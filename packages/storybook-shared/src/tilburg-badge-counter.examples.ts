/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg counter badge. */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Fbadge-counter';

export const description = `Small inline counter for unread notifications, message counts, or cart items. Tilburg theme paints it in the brand pink accent (\`--tilburg-color-pink-300\`) with white text for a vibrant notification dot.

## Usage

### Plain HTML / CSS

\`\`\`html
<a class="utrecht-link" href="/berichten">
  Berichten
  <span class="utrecht-badge-counter" aria-label="9 ongelezen berichten">9</span>
</a>
\`\`\`

Pair the badge with an \`aria-label\` so screen readers announce what the number means. The badge itself is just visual decoration on top of a link / button / nav-item.
`;

export interface Example {
  name: string;
  html: string;
}

export const examples = {
  single: {
    name: 'Single digit',
    html: `<span class="utrecht-badge-counter">9</span>`,
  },
  double: {
    name: 'Double digits',
    html: `<span class="utrecht-badge-counter">42</span>`,
  },
  triple: {
    name: 'Triple digits',
    html: `<span class="utrecht-badge-counter">128</span>`,
  },
  overflow: {
    name: 'Overflow (99+)',
    html: `<span class="utrecht-badge-counter">99+</span>`,
  },
  inContext: {
    name: 'On a link (with aria-label)',
    html: `<a class="utrecht-link utrecht-link--html-a" href="#">Berichten <span class="utrecht-badge-counter" aria-label="9 ongelezen berichten">9</span></a>`,
  },
} satisfies Record<string, Example>;
