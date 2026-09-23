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

/* CMS-geleverde HTML als string: injecteer die met dangerouslySetInnerHTML. */
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

Props: no component-specific props. \`HtmlContentProps\` is an exported type alias of \`HTMLAttributes<HTMLDivElement>\`, so \`lang\` is simply the native attribute. Everything else you pass — \`children\`, \`className\` (merged after \`utrecht-html-content\`), \`dangerouslySetInnerHTML\`, \`id\`, \`aria-*\` — is spread onto the rendered \`<div>\`, which is also what the forwarded \`ref\` points at.`;

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

const usageWebComponents = `### Web Components (Stencil)

\`\`\`html
<!-- Inhoud via de default slot -->
<tilburg-wbc-html-content lang="nl">
  <p>CMS-geleverde HTML krijgt automatisch de Tilburg-typografie.</p>
  <ul><li>Punt één</li><li>Punt twee</li></ul>
</tilburg-wbc-html-content>

<!-- CMS-geleverde HTML-string via de html-property -->
<tilburg-wbc-html-content lang="nl"></tilburg-wbc-html-content>
<script type="module">
  document.querySelector('tilburg-wbc-html-content').html = cmsHtml;
</script>
\`\`\`

Attributes: \`html\` (CMS-authored HTML string, rendered inside the styled \`.utrecht-html-content\` div — set it as a property for long strings) and \`lang\` (moved from the host onto the \`.utrecht-html-content\` div, like Angular's \`[attr.lang]\`). Slot: default (content used when \`html\` is not set). No events. Pass either \`html\` or slotted content, not both.

The \`html\` string is run through a built-in allowlist sanitizer (the counterpart of Angular's \`DomSanitizer\`): script-like elements (\`script\`, \`style\`, \`iframe\`, \`form\`, \`svg\`, …) are dropped, unknown elements are unwrapped, \`on*\` handlers and \`style\` attributes are removed, and \`href\` / \`src\` must be relative or use \`http(s)\`, \`mailto\`, \`tel\`, \`ftp\` or \`sms\`. Treat it as defence in depth: still sanitise CMS output server-side. Slotted content is not sanitised — it is your own DOM.`;

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
  default: {
    name: 'Default',
    /* The `max-width` lives on an unclassed demo wrapper: it frames the
       example, it is not part of the component. */
    html: `<div style="max-width:32rem">
<div class="utrecht-html-content" lang="nl">
  <p>CMS-geleverde HTML krijgt automatisch de Tilburg-typografie zonder per tag een class te zetten.</p>
  <ul>
    <li>Eerste item</li>
    <li>Tweede item</li>
  </ul>
  <p>Inline <strong>nadruk</strong> en <a href="#">links</a> werken zoals verwacht.</p>
</div>
</div>`,
  },
} satisfies Record<string, Example>;
