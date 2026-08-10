/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg HTML content wrapper.
   Imported by both the React storybook (`packages/storybook`) and the Angular
   storybook (`packages/storybook-angular`) so the HTML lives in one place. */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Fhtml-content';

const intro = `Wraps arbitrary HTML (typically CMS-authored) so Tilburg typography and link styling apply to the rendered tags (\`<p>\`, \`<ul>\`, \`<a>\`, \`<strong>\`, etc.) without requiring per-tag class names.`;

const usageAngular = `### Angular

\`\`\`html
<!-- CMS-geleverde HTML-string -->
<tilburg-html-content [lang]="'nl'" [html]="cmsHtml"></tilburg-html-content>

<!-- Of gewoon geprojecteerde inhoud -->
<tilburg-html-content [lang]="'nl'">
  <p>CMS-geleverde HTML krijgt automatisch de Tilburg-typografie.</p>
</tilburg-html-content>
\`\`\`

Inputs: \`lang\` (BCP-47 language tag for the content), \`html\` (CMS-authored HTML string).

Use \`[html]\`, not \`[innerHTML]\`. Binding \`[innerHTML]\` on the \`<tilburg-html-content>\` host writes over the component's own template, so the content ends up outside the styled \`.utrecht-html-content\` div and never picks up the Tilburg typography chain. The \`[html]\` input renders inside that div and is sanitized by Angular's \`DomSanitizer\`.`;

const usageReact = `### React

\`\`\`tsx
import { HtmlContent } from '@gemeente-tilburg/components-react';

/* CMS-geleverde HTML: het React-equivalent van Angulars [html]-input. */
export function CmsBlok({ cmsHtml }: { cmsHtml: string }) {
  return <HtmlContent lang="nl" dangerouslySetInnerHTML={{ __html: cmsHtml }} />;
}

/* Of gewoon JSX-children, als de inhoud in de app zelf staat. */
export function Uitleg() {
  return (
    <HtmlContent lang="nl">
      <p>CMS-geleverde HTML krijgt automatisch de Tilburg-typografie.</p>
      <ul>
        <li>Punt één</li>
        <li>Punt twee</li>
      </ul>
    </HtmlContent>
  );
}
\`\`\`

Pass either \`children\` or \`dangerouslySetInnerHTML\`, never both — React throws when both are set. As the prop name warns, \`dangerouslySetInnerHTML\` injects the string unescaped: only feed it HTML you have sanitised (server-side, or with something like DOMPurify), otherwise the CMS becomes an XSS vector.

Props: no component-specific props. \`HtmlContentProps\` is an exported type alias of \`HTMLAttributes<HTMLDivElement>\`, so \`lang\` is simply the native attribute rather than a declared input like in Angular. Everything else you pass — \`children\`, \`className\` (merged after \`utrecht-html-content\`), \`dangerouslySetInnerHTML\`, \`id\`, \`aria-*\` — is spread onto the rendered \`<div>\`, which is also what the forwarded \`ref\` points at.`;

const usagePlainHtml = `### Plain HTML / CSS

\`\`\`html
<div class="utrecht-html-content" lang="nl">
  <p>CMS-geleverde HTML krijgt automatisch de Tilburg-typografie.</p>
  <ul><li>Punt één</li><li>Punt twee</li></ul>
</div>
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
