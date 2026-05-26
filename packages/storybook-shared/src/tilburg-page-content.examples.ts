/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg page content.
   Imported by both the React storybook (`packages/storybook`) and the Angular
   storybook (`packages/storybook-angular`) so the HTML lives in one place. */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Fpage-content';

export const description = `Main content region of a page. Sits inside \`<tilburg-page>\` between the header and footer; provides a constrained max-inline-size and consistent inline padding.

## Usage

### Angular

\`\`\`html
<tilburg-page-content>
  <tilburg-heading-1>Aanvraag indienen</tilburg-heading-1>
  <tilburg-paragraph>Vul de gegevens in om de aanvraag te starten.</tilburg-paragraph>
</tilburg-page-content>
\`\`\`

### Plain HTML / CSS

\`\`\`html
<main class="utrecht-page-content">
  <!-- main content -->
</main>
\`\`\`
`;

export interface Example {
  name: string;
  html: string;
}

export const examples = {
  default: {
    name: 'Default',
    html: `<main class="utrecht-page-content" style="max-width:1150px;margin-inline:auto;padding:1rem">
  <utrecht-heading-1><h1 class="utrecht-heading-1">Aanvraag indienen</h1></utrecht-heading-1>
  <p class="utrecht-paragraph">Vul de gegevens in om de aanvraag te starten.</p>
</main>`,
  },
} satisfies Record<string, Example>;
