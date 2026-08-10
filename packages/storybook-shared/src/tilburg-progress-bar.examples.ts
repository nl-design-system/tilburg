/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg progress bar. Imported
   by both the React storybook (`packages/storybook`) and the Angular
   storybook (`packages/storybook-angular`) so the HTML lives in one place. */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Fprogress-bar';

const intro = `Step-progress indicator with optional back link, title, and "Stap X van Y" label.`;

const usageAngular = `### Angular

\`\`\`html
<tilburg-progress-bar
  [value]="currentStep"
  [total]="totalSteps"
  title="Adresgegevens"
  label="Stap 2 van 4"
  [showBack]="true"
  backLabel="Vorige stap"
  (backClick)="goBack()"
/>
\`\`\`

Inputs: \`value\`, \`total\`, \`label\`, \`title\`, \`backLabel\`, \`showBack\`, \`ariaLabel\`. Output: \`(backClick)\`. The percentage is computed from \`value / total\` and clamped to 0–100.`;

const usageReact = `### React

\`\`\`tsx
import { ProgressBar } from '@gemeente-tilburg/components-react';

export function AddressStep({ goBack }: { goBack: () => void }) {
  return (
    <ProgressBar
      value={2}
      total={4}
      title="Adresgegevens"
      label="Stap 2 van 4"
      showBack
      backLabel="Vorige stap"
      onBackClick={() => goBack()}
    />
  );
}
\`\`\`

The back link is an \`<a href="#">\`, and \`onBackClick\` runs after \`preventDefault()\` — so route yourself, don't rely on the href. The \`backIcon\` prop sets the arrow in front of the back label; it defaults to \`<span aria-hidden="true">←</span>\` and accepts \`null\` for no arrow:

\`\`\`tsx
<ProgressBar value={3} total={4} title="Bevestiging" label="Stap 3 van 4" showBack backLabel="Vorige stap" backIcon={<ChevronLeft />} />
\`\`\`

Props: \`value\` (default \`0\`), \`total\` (default \`0\`), \`label\`, \`title\`, \`backLabel\`, \`showBack\` (default \`false\`), \`backIcon\` (\`ReactNode\`), \`onBackClick\` (\`(event: MouseEvent<HTMLAnchorElement>) => void\`), plus any \`<div>\` attribute and a forwarded \`ref\`. \`ProgressBarProps\` is exported as a type. Write the native \`aria-label\` attribute to name the bar; it lands on the \`role="progressbar"\` track and falls back to \`title\`, then to \`'Voortgang'\`. The percentage is \`value / total\` clamped to 0–100, and \`label\` doubles as the track's \`aria-valuetext\`.`;

const usagePlainHtml = `### Plain HTML / CSS

\`\`\`html
<a class="tilburg-progress-bar__back utrecht-link utrecht-link--html-a" href="#" >
  <span aria-hidden="true">←</span>
  <span class="tilburg-progress-bar__back-label">Vorige stap</span>
</a>
<div class="tilburg-progress-bar__header">
  <h2 class="tilburg-progress-bar__title tilburg-step-title">Adresgegevens</h2>
  <div class="tilburg-progress-bar__label">Stap 2 van 4</div>
</div>
<div
  class="tilburg-progress-bar__track"
  role="progressbar"
  aria-label="Voortgang"
  aria-valuemin="0"
  aria-valuemax="100"
  aria-valuenow="50"
  aria-valuetext="Stap 2 van 4"
>
  <div class="tilburg-progress-bar__indicator progress-bar-indicator" style="width: 50%"></div>
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

export const descriptionHtml = `${intro}

## Usage

${usagePlainHtml}
`;

export interface Example {
  name: string;
  html: string;
}

const renderHeader = (title: string, label: string): string => `<div class="tilburg-progress-bar__header">
  <h2 class="tilburg-progress-bar__title tilburg-step-title">${title}</h2>
  <div class="tilburg-progress-bar__label">${label}</div>
</div>`;

const renderTrack = (
  percent: number,
  valueText: string,
): string => `<div class="tilburg-progress-bar__track" role="progressbar" aria-label="Voortgang" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${percent}" aria-valuetext="${valueText}">
  <div class="tilburg-progress-bar__indicator progress-bar-indicator" style="width:${percent}%"></div>
</div>`;

export const examples = {
  quarter: {
    name: '25% complete',
    html: `${renderHeader('Persoonlijke gegevens', 'Stap 1 van 4')}
${renderTrack(25, 'Stap 1 van 4')}`,
  },
  half: {
    name: '50% complete',
    html: `${renderHeader('Adresgegevens', 'Stap 2 van 4')}
${renderTrack(50, 'Stap 2 van 4')}`,
  },
  threeQuarter: {
    name: '75% complete',
    html: `${renderHeader('Bevestiging', 'Stap 3 van 4')}
${renderTrack(75, 'Stap 3 van 4')}`,
  },
  complete: {
    name: '100% complete',
    html: `${renderHeader('Klaar', 'Stap 4 van 4')}
${renderTrack(100, 'Stap 4 van 4')}`,
  },
  withBackLink: {
    name: 'With back link',
    html: `<a class="tilburg-progress-bar__back utrecht-link utrecht-link--html-a" href="#">
  <span aria-hidden="true">&larr;</span>
  <span class="tilburg-progress-bar__back-label">Vorige stap</span>
</a>
${renderHeader('Adresgegevens', 'Stap 2 van 4')}
${renderTrack(50, 'Stap 2 van 4')}`,
  },
} satisfies Record<string, Example>;
