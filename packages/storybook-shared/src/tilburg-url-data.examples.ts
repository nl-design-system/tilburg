/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg URL data. Imported
   by both the React storybook (`packages/storybook`) and the Angular
   storybook (`packages/storybook-angular`) so the HTML lives in one place. */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Furl-data';

const intro = `Shows a URL as text (not a link), for example a web address someone has to type over from a letter. A \`<bdi>\` keeps the address left-to-right inside right-to-left text, \`translate="no"\` stops translation tools from changing it, and the Utrecht CSS lets a long address wrap anywhere without hyphens or ligatures. Use a Link when people should be able to click it.`;

const usageAngular = `### Angular

\`\`\`html
<tilburg-url-data>https://www.tilburg.nl/afval</tilburg-url-data>
\`\`\`

No inputs; the content is the URL.`;

const usageReact = `### React

\`\`\`tsx
import { Paragraph, UrlData } from '@gemeente-tilburg/components-react';

export function Afvalwijzer() {
  return (
    <Paragraph>
      Kijk op <UrlData>https://www.tilburg.nl/afval</UrlData> voor de afvalkalender.
    </Paragraph>
  );
}
\`\`\`

Props: any standard HTML attribute (\`className\` is merged after \`utrecht-url-data\`; \`translate\` defaults to \`"no"\`). \`UrlDataProps\` is exported as a type. The \`ref\` is forwarded to the \`<bdi>\`.`;

const usageWebComponents = `### Web Components (Stencil)

\`\`\`html
<tilburg-wbc-url-data>https://www.tilburg.nl/afval</tilburg-wbc-url-data>
\`\`\`

No attributes; \`id\` and \`title\` move from the host to the \`<bdi>\`. The default slot is the URL.`;

const usagePlainHtml = `### Plain HTML / CSS

\`\`\`html
<bdi class="utrecht-url-data" translate="no">https://www.tilburg.nl/afval</bdi>
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
    html: `<p class="utrecht-paragraph">Kijk op <bdi class="utrecht-url-data" translate="no">https://www.tilburg.nl/afval</bdi> voor de afvalkalender.</p>`,
  },
  long: {
    name: 'Long URL (wraps anywhere)',
    html: `<div style="max-inline-size:16rem">
  <p class="utrecht-paragraph">Uw aanvraag volgen: <bdi class="utrecht-url-data" translate="no">https://www.tilburg.nl/inwoners/mijn-tilburg/aanvragen/status?zaak=ZAAK-2026-004211</bdi></p>
</div>`,
  },
} satisfies Record<string, Example>;
