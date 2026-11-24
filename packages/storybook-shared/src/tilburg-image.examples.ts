/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg image. Imported by
   both the React storybook (`packages/storybook`) and the Angular storybook
   (`packages/storybook-angular`). The CSS is in `packages/components-css/image`. */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Fimage';

const intro = `Image rendered as \`<img class="utrecht-img">\`. Always describe the image in \`alt\`; use \`alt=""\` only for purely decorative images. Don't use \`title\`: browsers show it as a tooltip over the image. \`photo\` adds \`utrecht-img--photo\`, which scales the image down to fit its container. \`width\` and \`height\` set the rendered size (Tilburg CSS undoes Utrecht's \`width: auto; height: auto\`, which made the image render at its intrinsic size); the image never grows wider than its container, and with only \`width\` set the height follows the aspect ratio.`;

const usageAngular = `### Angular

\`\`\`html
<tilburg-image src="logo.svg" alt="Logo van Gemeente Tilburg" [photo]="true"></tilburg-image>
\`\`\`

Inputs: \`src\`, \`alt\` (no default: leave it out and the \`<img>\` has no \`alt\`, so set it, \`''\` for decorative images), \`width\`, \`height\`, \`photo\` (default \`false\`; adds \`utrecht-img--photo\`).`;

const usageReact = `### React

\`\`\`tsx
import { Image } from '@gemeente-tilburg/components-react';

export function Logo() {
  return <Image src="logo.svg" alt="Logo van Gemeente Tilburg" width={240} photo />;
}
\`\`\`

Props: \`photo\` (\`boolean\`, default \`false\`; adds \`utrecht-img--photo\`), plus any standard \`<img>\` attribute (\`src\`, \`alt\`, \`width\`, \`height\`, \`srcSet\`, \`loading\`, \`className\`, merged after \`utrecht-img\`, …). \`ImageProps\` is exported as a type. The \`ref\` is forwarded to the \`<img>\`.`;

const usageWebComponents = `### Web Components (Stencil)

\`\`\`html
<tilburg-wbc-image src="logo.svg" alt="Logo van Gemeente Tilburg" width="240" photo></tilburg-wbc-image>
\`\`\`

Renders \`<img class="utrecht-img">\`. Attributes: \`src\`, \`alt\`, \`width\`, \`height\`, \`photo\` (boolean, default \`false\`; adds \`utrecht-img--photo\`). \`id\` written on the host is moved onto the \`<img>\`. No slots or events.`;

const usagePlainHtml = `### Plain HTML / CSS

\`\`\`html
<img class="utrecht-img" src="logo.svg" alt="Logo van Gemeente Tilburg" />
<img class="utrecht-img utrecht-img--photo" src="foto.jpg" alt="De Spoorzone in Tilburg" />
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
    html: `<img class="utrecht-img" src="logo.svg" alt="Logo van Gemeente Tilburg" width="240" />`,
  },
  photo: {
    name: 'Photo (scales down to its container)',
    /* The narrow wrapper shows the scaling: the image is wider than 12rem. */
    html: `<div style="max-width:12rem">
  <img class="utrecht-img utrecht-img--photo" src="logo.svg" alt="Logo van Gemeente Tilburg" width="480" />
</div>`,
  },
  decorative: {
    name: 'Decorative (empty alt)',
    html: `<img class="utrecht-img" src="favicon.svg" alt="" width="48" height="48" />`,
  },
} satisfies Record<string, Example>;
