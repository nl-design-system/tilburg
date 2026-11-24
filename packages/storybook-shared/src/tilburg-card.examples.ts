/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg card. Imported by both
   the React storybook (`packages/storybook`) and the Angular storybook
   (`packages/storybook-angular`). */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Fcard';

const intro = `Teaser for a page or topic, with a heading, an optional image and a short text: \`<div class="utrecht-card">\`. Utrecht 5.2.0 has no card yet, so Tilburg ships a port of Utrecht's card CSS (same \`utrecht-card\` classes and \`--utrecht-card-*\` properties) with Tilburg fallbacks: a white block with a small shadow. The image is shown above the heading (CSS \`order\`), but in the source the heading comes first, so screen readers announce the heading before the image. With a link (\`href\`) the heading text becomes the link and \`utrecht-card--link\` stretches it over the whole card, so the whole card is clickable while there is one link, one tab stop and the heading as its accessible name. (Deviation from Utrecht React, which puts \`role="link"\` and \`tabindex="0"\` on the card around that link.) Keep other links and buttons out of a linked card. The image is usually decorative next to the heading: give it \`alt=""\`.`;

const usageAngular = `### Angular

\`\`\`html
<tilburg-card heading="Afval en containers" href="/afval" [headingLevel]="3">
  <img slot="image" src="afval.jpg" alt="" />
  <tilburg-paragraph>Wanneer wordt je afval opgehaald, en waar breng je grof afval naartoe?</tilburg-paragraph>
</tilburg-card>
\`\`\`

Inputs: \`heading\` (heading text), \`headingLevel\` (1–6, default 3), \`href\` (makes the heading a link stretched over the card and adds \`utrecht-card--link\`). Content: default projection for the body, \`slot="image"\` for the image (the image and body blocks collapse when empty).`;

const usageReact = `### React

\`\`\`tsx
import { Card, Paragraph } from '@gemeente-tilburg/components-react';

export function AfvalCard() {
  return (
    <Card heading="Afval en containers" href="/afval" image={<img src="afval.jpg" alt="" />}>
      <Paragraph>Wanneer wordt je afval opgehaald, en waar breng je grof afval naartoe?</Paragraph>
    </Card>
  );
}
\`\`\`

Props: \`heading\` (\`ReactNode\`), \`headingLevel\` (1–6, default 3), \`href\`, \`image\` (\`ReactNode\`), \`children\` (the body), plus any \`<div>\` attribute (\`className\` is merged after the utrecht classes). \`CardProps\` is exported as a type. The \`ref\` is forwarded to the outer \`<div>\`. Utrecht React's \`body\` and \`Link\` props are not taken over: the body is \`children\`, and the link is a plain \`<a>\`.`;

const usageWebComponents = `### Web Components (Stencil)

\`\`\`html
<tilburg-wbc-card heading="Afval en containers" href="/afval" heading-level="3">
  <img slot="image" src="afval.jpg" alt="" />
  <p class="utrecht-paragraph">Wanneer wordt je afval opgehaald, en waar breng je grof afval naartoe?</p>
</tilburg-wbc-card>
\`\`\`

Attributes: \`heading\`, \`heading-level\` (1–6, default 3), \`href\`. Slots: default (body), \`image\` (rendered only when used). No events.`;

const usagePlainHtml = `### Plain HTML / CSS

\`\`\`html
<div class="utrecht-card utrecht-card--link">
  <div class="utrecht-card__content">
    <div class="utrecht-card__heading">
      <h3 class="utrecht-heading-3">
        <a class="utrecht-link utrecht-link--html-a utrecht-card__link" href="/afval">Afval en containers</a>
      </h3>
    </div>
    <div class="utrecht-card__image"><img src="afval.jpg" alt="" /></div>
    <div class="utrecht-card__body">
      <p class="utrecht-paragraph">Wanneer wordt je afval opgehaald, en waar breng je grof afval naartoe?</p>
    </div>
  </div>
</div>
\`\`\`

Without a link, leave out \`utrecht-card--link\` and the \`<a>\`; the heading text goes straight into the \`<h3>\`.`;

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

/* Placeholder photo: a light grey 2:1 block, so the examples need no image file. */
export const cardImageSrc = `data:image/svg+xml;utf8,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="640" height="320" viewBox="0 0 640 320"><rect width="640" height="320" fill="#e6e6e6"/><circle cx="320" cy="160" r="56" fill="#cccccc"/></svg>',
)}`;

const wrapStyle = 'max-inline-size:22rem';

export const examples = {
  default: {
    name: 'Default',
    html: `<div style="${wrapStyle}">
  <div class="utrecht-card">
    <div class="utrecht-card__content">
      <div class="utrecht-card__heading">
        <h3 class="utrecht-heading-3">Openingstijden Stadskantoor</h3>
      </div>
      <div class="utrecht-card__body">
        <p class="utrecht-paragraph">Maandag tot en met vrijdag van 9.00 tot 17.00 uur, alleen op afspraak.</p>
      </div>
    </div>
  </div>
</div>`,
  },
  link: {
    name: 'With link',
    html: `<div style="${wrapStyle}">
  <div class="utrecht-card utrecht-card--link">
    <div class="utrecht-card__content">
      <div class="utrecht-card__heading">
        <h3 class="utrecht-heading-3">
          <a class="utrecht-link utrecht-link--html-a utrecht-card__link" href="#">Afval en containers</a>
        </h3>
      </div>
      <div class="utrecht-card__body">
        <p class="utrecht-paragraph">Wanneer wordt je afval opgehaald, en waar breng je grof afval naartoe?</p>
      </div>
    </div>
  </div>
</div>`,
  },
  image: {
    name: 'With image and link',
    html: `<div style="${wrapStyle}">
  <div class="utrecht-card utrecht-card--link">
    <div class="utrecht-card__content">
      <div class="utrecht-card__heading">
        <h3 class="utrecht-heading-3">
          <a class="utrecht-link utrecht-link--html-a utrecht-card__link" href="#">Parkeren in de binnenstad</a>
        </h3>
      </div>
      <div class="utrecht-card__image"><img src="${cardImageSrc}" alt="" /></div>
      <div class="utrecht-card__body">
        <p class="utrecht-paragraph">Vraag een parkeervergunning aan of bekijk waar je met je auto terechtkunt.</p>
      </div>
    </div>
  </div>
</div>`,
  },
} satisfies Record<string, Example>;
