/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg HTML content wrapper.
   Imported by both the React storybook (`packages/storybook`) and the Angular
   storybook (`packages/storybook-angular`) so the HTML lives in one place. */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Fhtml-content';

export const description = `Wraps arbitrary HTML (typically CMS-authored) so Tilburg typography and link styling apply to the rendered tags (\`<p>\`, \`<ul>\`, \`<a>\`, \`<strong>\`, etc.) without requiring per-tag class names.

## Usage

### Angular

\`\`\`html
<tilburg-html-content [lang]="'nl'" [innerHTML]="cmsHtml"></tilburg-html-content>
\`\`\`

Inputs: \`lang\` (BCP-47 language tag for the content).

### Plain HTML / CSS

\`\`\`html
<div class="utrecht-html-content" lang="nl">
  <p>CMS-geleverde HTML krijgt automatisch de Tilburg-typografie.</p>
  <ul><li>Punt één</li><li>Punt twee</li></ul>
</div>
\`\`\`
`;

export interface Example {
  name: string;
  html: string;
}

export const examples = {
  default: {
    name: 'Default',
    html: `<div class="utrecht-html-content" lang="nl" style="max-width:32rem">
  <p>CMS-geleverde HTML krijgt automatisch de Tilburg-typografie zonder per tag een class te zetten.</p>
  <ul>
    <li>Eerste item</li>
    <li>Tweede item</li>
  </ul>
  <p>Inline <strong>nadruk</strong> en <a href="#">links</a> werken zoals verwacht.</p>
</div>`,
  },
} satisfies Record<string, Example>;
