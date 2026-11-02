/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg datetime value. Imported
   by both the React storybook (`packages/storybook`) and the Angular
   storybook (`packages/storybook-angular`) so the HTML lives in one place. */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Fdatetime-value';

const intro = `A date, a time or a date and time as a \`<time>\` element, so software can read it (WCAG 1.3.6): the \`datetime\` attribute holds the machine-readable value (\`2026-11-02\`, \`09:30\`, \`2026-11-02T09:30\`), the content is the date written out for people ("2 november 2026"). The class \`utrecht-value-datetime\` is a hook only: Utrecht ships no CSS for it, so the text looks like the surrounding text.`;

const usageAngular = `### Angular

\`\`\`html
<tilburg-datetime-value dateTime="2026-11-02T09:30">2 november 2026 om 09:30</tilburg-datetime-value>
\`\`\`

Inputs: \`dateTime\` (\`string\`, the machine-readable value). The content is the written-out date; the component does not format it.`;

const usageReact = `### React

\`\`\`tsx
import { DatetimeValue, Paragraph } from '@gemeente-tilburg/components-react';

export function Afspraak() {
  return (
    <Paragraph>
      Uw afspraak is op <DatetimeValue dateTime="2026-11-02T09:30">2 november 2026 om 09:30</DatetimeValue>.
    </Paragraph>
  );
}
\`\`\`

Props: \`dateTime\` (\`string\`), plus any standard \`<time>\` attribute (\`className\` is merged after \`utrecht-value-datetime\`). \`DatetimeValueProps\` is exported as a type. The \`ref\` is forwarded to the \`<time>\`.`;

const usageWebComponents = `### Web Components (Stencil)

\`\`\`html
<tilburg-wbc-datetime-value date-time="2026-11-02T09:30">2 november 2026 om 09:30</tilburg-wbc-datetime-value>
\`\`\`

Attribute: \`date-time\`, as in Angular. \`id\` and \`title\` move from the host to the \`<time>\`. The default slot is the written-out date.`;

const usagePlainHtml = `### Plain HTML / CSS

\`\`\`html
<time class="utrecht-value-datetime" datetime="2026-11-02T09:30">2 november 2026 om 09:30</time>
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
    name: 'Date and time',
    html: `<p class="utrecht-paragraph">Uw afspraak is op <time class="utrecht-value-datetime" datetime="2026-11-02T09:30">2 november 2026 om 09:30</time>.</p>`,
  },
  date: {
    name: 'Date',
    html: `<p class="utrecht-paragraph">Ingediend op <time class="utrecht-value-datetime" datetime="2026-10-12">12 oktober 2026</time></p>`,
  },
  time: {
    name: 'Time',
    html: `<p class="utrecht-paragraph">Het Stadswinkel-loket sluit om <time class="utrecht-value-datetime" datetime="17:00">17:00 uur</time>.</p>`,
  },
} satisfies Record<string, Example>;
