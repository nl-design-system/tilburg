/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg skip link. Imported
   by both the React storybook (`packages/storybook`) and the Angular
   storybook (`packages/storybook-angular`) so the HTML lives in one place. */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Fskip-link';

export const description = `A **skip link** is a hidden anchor placed at the very top of a page so keyboard and screen-reader users can jump straight to the main content, bypassing the header, navigation, language toggles, cookie banners, and anything else that comes before the page's actual content. It's the first focusable element on the page, becomes visible the moment it receives keyboard focus, and disappears again when focus moves away.

It's one of the cheapest, highest-impact a11y wins you can ship — WCAG 2.4.1 *Bypass Blocks* (Level A) basically requires this pattern, and once it exists the entire site becomes navigable by people who can't (or don't want to) tab through the navigation on every page.

## Why every page needs one

For a sighted mouse user, a skip link is invisible. For everyone else:

- **Keyboard users** Tab through every focusable element in source order. Without a skip link, that means re-tabbing through the header (logo, every navigation item, language toggle, search…) before reaching the content — on every page. With a skip link, the first Tab reveals it; pressing Enter jumps focus to the main content; the second Tab lands in the main content.
- **Screen-reader users** can also navigate by landmark (\`<main>\`, \`<nav>\`) once they know the page exists, but the skip link is faster and works before any landmark exploration.
- **Switch-control / voice users** benefit for the same reason: fewer activations to reach what they care about.

Browsers ship no skip link by default. You have to put one in.

## How to use it

1. **Render it as the very first element inside \`<body>\`** — before the header, nav, or anything else. If something focusable comes before it, the link no longer works as a "bypass blocks" entry point.
2. **Point \`href\` at the id of the main-content landmark**, e.g. \`href="#main"\`, and make sure that landmark has the matching id and is focusable. \`<main id="main" tabindex="-1">\` is the typical shape — \`tabindex="-1"\` lets focus land there without making it a tab stop.
3. **Use the production modifier** \`utrecht-skip-link--visible-on-focus\` so it stays hidden until a keyboard user tabs to it. Sighted mouse users never see it.
4. **Write the link text in plain Dutch**, e.g. *"Sla over en ga naar de hoofdinhoud"*. Avoid jargon.

\`\`\`html
<body>
  <a class="utrecht-skip-link utrecht-skip-link--visible-on-focus" href="#main">
    Sla over en ga naar de hoofdinhoud
  </a>

  <header class="utrecht-page-header">…</header>
  <nav class="utrecht-nav">…</nav>

  <main id="main" tabindex="-1">
    …
  </main>
</body>
\`\`\`

## Modifiers

The four \`.utrecht-skip-link--*\` modifier classes select the visibility behaviour. utrecht ships the rules; Tilburg's design tokens paint the colours.

| Modifier | When to use | Behaviour |
|---|---|---|
| \`--visible-on-focus\` | Production. The standard a11y pattern. | Off-screen by default; slides into the top-left corner the moment the link receives keyboard focus. |
| \`--visible\` | Demos, narrow internal admin tools where every user benefits from seeing it. | Always rendered in place. |
| \`--hidden\` | When you want the link in the DOM but never visible (e.g. screen-reader-only labelled regions). | Kept off-screen unconditionally. |
| \`--focus\` | Storybook screenshots, internal previews. | Forces the focused appearance so the link is visible without an actual \`:focus\`. |

## Theming

Theming runs entirely through utrecht tokens that Tilburg's design-tokens package already wires:

- \`--utrecht-skip-link-background-color\` → \`--tilburg-document-inverse-background-color\` (dark)
- \`--utrecht-skip-link-color\` → \`--tilburg-document-inverse-color\` (white)
- \`--utrecht-skip-link-focus-{background-color,color,text-decoration}\` → focus-ring tokens
- \`--utrecht-skip-link-padding-{block,inline}-{start,end}\` → \`--tilburg-space-{block,inline}-{snail,mouse}\`
- \`--utrecht-skip-link-min-{block,inline}-size\` → \`--utrecht-pointer-target-min-size\` (44px touch-target floor)

You can override any of these per page or per consumer by re-declaring the token; the link picks up the new value with no further config.

## Usage

### Plain HTML / CSS

Drop the markup above into the first child of \`<body>\`. No JS, no React, no Angular needed — utrecht's CSS provides the off-screen / on-focus / on-screen behaviour, Tilburg's design tokens provide the colours.

### React

\`\`\`tsx
import { SkipLink } from '@gemeente-tilburg/components-react';

export function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SkipLink href="#main">Sla over en ga naar de hoofdinhoud</SkipLink>
      <header>…</header>
      <main id="main" tabIndex={-1}>{children}</main>
    </>
  );
}
\`\`\`

Props: \`href\`, \`visibility\` (default \`'visible-on-focus'\`), plus any standard anchor attribute (\`aria-label\`, \`className\`, etc.). \`SkipLinkVisibility\` is exported as a type alias.

### Angular

\`\`\`html
<tilburg-skip-link href="#main">
  Sla over en ga naar de hoofdinhoud
</tilburg-skip-link>

<header>…</header>
<main id="main" tabindex="-1">…</main>
\`\`\`

Inputs: \`href\`, \`visibility\` (default \`'visible-on-focus'\`), \`ariaLabel\`. Selector \`tilburg-skip-link\`.
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
