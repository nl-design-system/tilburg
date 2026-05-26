/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg skip link. Imported
   by both the React storybook (`packages/storybook`) and the Angular
   storybook (`packages/storybook-angular`) so the HTML lives in one place. */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Fskip-link';

export const description = `Anchor placed at the very top of the page so keyboard users can jump straight to the main content (bypassing the header / nav). Visually hidden by default; revealed when focused. The Tilburg theme paints it with the inverse document palette (dark background, white text) so it stands out against any page background.

## Usage

### Plain HTML / CSS

\`\`\`html
<a class="utrecht-skip-link utrecht-skip-link--visible-on-focus" href="#main">
  Sla over en ga naar de hoofdinhoud
</a>
…
<main id="main">…</main>
\`\`\`

Modifier classes:
- \`--visible-on-focus\` — hidden until \`:focus\` (the standard a11y pattern)
- \`--visible\` — always rendered (useful for demos)
- \`--hidden\` — never rendered
- \`--focus\` — force the focus appearance (for screenshot / Storybook demos)

Theming runs through \`--utrecht-skip-link-{background-color,color,focus-background-color,focus-color,padding-*,text-decoration}\` — Tilburg theme already wires these to the inverse document tokens, so no per-app CSS is required.
`;

export interface Example {
  name: string;
  html: string;
}

export const examples = {
  visibleOnFocus: {
    name: 'Visible on focus (production pattern)',
    html: `<a class="utrecht-skip-link utrecht-skip-link--visible-on-focus" href="#main">
  Sla over en ga naar de hoofdinhoud
</a>
<main id="main" style="padding:1rem">
  <p class="utrecht-paragraph">Hoofdinhoud van de pagina. Tab in dit canvas om de skip-link te zien.</p>
</main>`,
  },
  forceVisible: {
    name: 'Force visible (demo)',
    html: `<a class="utrecht-skip-link utrecht-skip-link--focus utrecht-skip-link--visible" href="#main">
  Sla over en ga naar de hoofdinhoud
</a>`,
  },
} satisfies Record<string, Example>;
