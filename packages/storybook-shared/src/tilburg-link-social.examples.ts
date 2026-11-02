/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg social media link and
   its list container (List Social). Imported by both the React storybook
   (`packages/storybook`) and the Angular storybook
   (`packages/storybook-angular`) so the HTML lives in one place. */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Flink-social';

const intro = `A round icon link to one of the municipality's social media accounts, in the Tilburg interaction colour. The link has only an icon, so it **must** get an accessible name with \`aria-label\` (for example "Gemeente Tilburg op Facebook"); the icon itself is \`aria-hidden\`. Social links are external, so \`rel="external noopener noreferrer"\` is set by default. Several links go in a List Social (\`<ul class="utrecht-list-social">\`, one \`<li class="utrecht-list-social__item">\` per link), which is part of this component. The list has \`role="list"\`: Safari drops the list semantics of a list without bullets.`;

const usageAngular = `### Angular

\`\`\`html
<tilburg-list-social ariaLabel="Gemeente Tilburg op sociale media">
  <li class="utrecht-list-social__item">
    <tilburg-link-social href="https://www.facebook.com/gemeentetilburg" ariaLabel="Gemeente Tilburg op Facebook">
      <svg class="utrecht-icon" aria-hidden="true"><!-- icon --></svg>
    </tilburg-link-social>
  </li>
</tilburg-list-social>
\`\`\`

\`tilburg-link-social\` inputs: \`href\`, \`ariaLabel\` (required in practice), \`external\` (default \`true\`; \`false\` leaves \`rel\` off). Content: the icon. \`tilburg-list-social\` inputs: \`ariaLabel\`, \`ariaLabelledBy\`; content: the \`<li class="utrecht-list-social__item">\` items (plain elements, so they stay direct children of the \`<ul>\`).`;

const usageReact = `### React

\`\`\`tsx
import { LinkSocial, ListSocial, ListSocialItem } from '@gemeente-tilburg/components-react';

export function SocialeMedia() {
  return (
    <ListSocial aria-label="Gemeente Tilburg op sociale media">
      <ListSocialItem>
        <LinkSocial href="https://www.facebook.com/gemeentetilburg" aria-label="Gemeente Tilburg op Facebook">
          <FacebookIcon className="utrecht-icon" aria-hidden />
        </LinkSocial>
      </ListSocialItem>
    </ListSocial>
  );
}
\`\`\`

\`LinkSocial\` props: \`external\` (default \`true\`), plus any \`<a>\` attribute (\`href\`, \`aria-label\`, \`className\`, …); the \`ref\` goes to the \`<a>\`. \`ListSocial\` (\`<ul>\`) and \`ListSocialItem\` (\`<li>\`) take any attribute of their element and forward their \`ref\`. \`LinkSocialProps\`, \`ListSocialProps\` and \`ListSocialItemProps\` are exported as types.`;

const usageWebComponents = `### Web Components (Stencil)

\`\`\`html
<tilburg-wbc-list-social aria-label="Gemeente Tilburg op sociale media">
  <li class="utrecht-list-social__item">
    <tilburg-wbc-link-social href="https://www.facebook.com/gemeentetilburg" aria-label="Gemeente Tilburg op Facebook">
      <svg class="utrecht-icon" aria-hidden="true"><!-- icon --></svg>
    </tilburg-wbc-link-social>
  </li>
</tilburg-wbc-list-social>
\`\`\`

\`tilburg-wbc-link-social\` attributes: \`href\`, \`external\` (default \`true\`; \`external="false"\` leaves \`rel\` off), and \`aria-label\` / \`title\` / \`lang\` (moved onto the inner \`<a>\`); slot: default (the icon). \`tilburg-wbc-list-social\`: \`aria-label\` / \`aria-labelledby\` (moved onto the \`<ul>\`); slot: the \`<li>\` items. No events.`;

const usagePlainHtml = `### Plain HTML / CSS

\`\`\`html
<ul class="utrecht-list-social" role="list" aria-label="Gemeente Tilburg op sociale media">
  <li class="utrecht-list-social__item">
    <a class="utrecht-link-social" href="https://www.facebook.com/gemeentetilburg" rel="external noopener noreferrer" aria-label="Gemeente Tilburg op Facebook">
      <svg class="utrecht-icon" aria-hidden="true" viewBox="0 0 24 24"><!-- icon --></svg>
    </a>
  </li>
</ul>
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

const svg = (paths: string) =>
  `<svg class="utrecht-icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`;

/** Social media glyphs (Tabler brand icons, MIT) for the examples and stories. */
export const icons = {
  facebook: svg('<path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" />'),
  instagram: svg(
    '<path d="M4 8a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" /><path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" /><path d="M16.5 7.5v.01" />',
  ),
  linkedin: svg(
    '<path d="M8 11v5" /><path d="M8 8v.01" /><path d="M12 16v-5" /><path d="M16 16v-3a2 2 0 1 0 -4 0" /><path d="M3 7a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4z" />',
  ),
  x: svg('<path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />'),
};

/** The accounts shown in the examples: [href, accessible name, icon]. */
export const accounts: [string, string, string][] = [
  ['https://www.facebook.com/gemeentetilburg', 'Gemeente Tilburg op Facebook', icons.facebook],
  ['https://www.instagram.com/gemeentetilburg', 'Gemeente Tilburg op Instagram', icons.instagram],
  ['https://www.linkedin.com/company/gemeente-tilburg', 'Gemeente Tilburg op LinkedIn', icons.linkedin],
  ['https://x.com/gemeentetilburg', 'Gemeente Tilburg op X', icons.x],
];

const link = ([href, label, icon]: [string, string, string]) =>
  `<a class="utrecht-link-social" href="${href}" rel="external noopener noreferrer" aria-label="${label}">${icon}</a>`;

export const examples = {
  single: {
    name: 'Single link',
    html: link(accounts[0]),
  },
  list: {
    name: 'List Social',
    html: `<ul class="utrecht-list-social" role="list" aria-label="Gemeente Tilburg op sociale media">
${accounts.map((account) => `  <li class="utrecht-list-social__item">${link(account)}</li>`).join('\n')}
</ul>`,
  },
} satisfies Record<string, Example>;
