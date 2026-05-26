/* @license CC0-1.0 */

/* Canonical HTML/CSS reference markup for the Tilburg pagination. Imported
   by both the React storybook (`packages/storybook`) and the Angular
   storybook (`packages/storybook-angular`) so the HTML lives in one place.

   The original React story used `useState` to drive interactivity. Because
   the shared HTML is static, each example here renders the canonical snapshot
   that matches the original React story's initial state. */

export const bugs = 'https://github.com/nl-design-system/tilburg/labels/component%2Fpagination';

export const description = `Compact pagination bar with first / previous / next / last chevron controls. Optionally renders either a numeric page button list (with leading/trailing ellipsis when total pages > 7) **or** a plain range text like "Pagina 3 van 12" when no \`pageCount\`/\`currentPage\` is provided. The Angular wrapper takes plain inputs so any controller can drive it.

## Usage

### Angular

\`\`\`html
<!-- Numeric variant -->
<tilburg-pagination
  feedback="Toont 21–30 van 117"
  [pageCount]="12"
  [currentPage]="3"
  (navigate)="onNavigate($event)"
/>

<!-- Range-text variant (no page list) -->
<tilburg-pagination feedback="Toont 1–10 van 47" range="Pagina 1 van 5" />
\`\`\`

Inputs: \`ariaLabel\` (default \`'Paginering'\`), \`feedback\`, \`range\`, \`pageCount\`, \`currentPage\`, \`firstDisabled\` / \`previousDisabled\` / \`nextDisabled\` / \`lastDisabled\`, plus button \`*Label\` overrides and a \`pageLabel\` function (\`(n) => 'Pagina ' + n\` by default).

Output: \`(navigate)\` emits \`{ step: 'first' | 'previous' | 'next' | 'last' | 'page', page?: number }\` — the \`page\` field is set only on numeric clicks.

### Plain HTML / CSS

\`\`\`html
<nav class="tilburg-pagination" aria-label="Paginering">
  <div class="tilburg-pagination__feedback">Toont 21–30 van 117</div>
  <div class="tilburg-pagination__controls">
    <button type="button" class="tilburg-pagination__button" aria-label="Vorige pagina">‹</button>

    <ul class="tilburg-pagination__pages">
      <li><button class="tilburg-pagination__page">1</button></li>
      <li><span class="tilburg-pagination__ellipsis" aria-hidden="true">…</span></li>
      <li>
        <button class="tilburg-pagination__page tilburg-pagination__page--current" aria-current="page" disabled>3</button>
      </li>
      <li><button class="tilburg-pagination__page">4</button></li>
      <li><button class="tilburg-pagination__page">5</button></li>
      <li><span class="tilburg-pagination__ellipsis" aria-hidden="true">…</span></li>
      <li><button class="tilburg-pagination__page">12</button></li>
    </ul>

    <button type="button" class="tilburg-pagination__button" aria-label="Volgende pagina">›</button>
  </div>
</nav>
\`\`\`
`;

export interface Example {
  name: string;
  html: string;
}

type PageSlot = { kind: 'page'; value: number } | { kind: 'ellipsis'; key: string };

const computePages = (pageCount: number, currentPage: number): PageSlot[] => {
  if (pageCount <= 0) return [];
  if (pageCount <= 7) {
    return Array.from({ length: pageCount }, (_, i) => ({ kind: 'page', value: i + 1 }) as PageSlot);
  }
  const slots: PageSlot[] = [{ kind: 'page', value: 1 }];
  const start = Math.max(2, currentPage - 1);
  const end = Math.min(pageCount - 1, currentPage + 1);
  if (start > 2) slots.push({ kind: 'ellipsis', key: 'lead' });
  for (let p = start; p <= end; p += 1) slots.push({ kind: 'page', value: p });
  if (end < pageCount - 1) slots.push({ kind: 'ellipsis', key: 'trail' });
  slots.push({ kind: 'page', value: pageCount });
  return slots;
};

const chevronsLeft = `<svg class="tilburg-pagination__icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="11 17 6 12 11 7" /><polyline points="18 17 13 12 18 7" /></svg>`;
const chevronLeft = `<svg class="tilburg-pagination__icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6" /></svg>`;
const chevronRight = `<svg class="tilburg-pagination__icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6" /></svg>`;
const chevronsRight = `<svg class="tilburg-pagination__icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="13 17 18 12 13 7" /><polyline points="6 17 11 12 6 7" /></svg>`;

interface PaginationProps {
  feedback?: string;
  range?: string;
  pageCount?: number;
  currentPage?: number;
  firstDisabled?: boolean;
  previousDisabled?: boolean;
  nextDisabled?: boolean;
  lastDisabled?: boolean;
}

const renderPagination = ({
  feedback,
  range,
  pageCount,
  currentPage,
  firstDisabled = false,
  previousDisabled = false,
  nextDisabled = false,
  lastDisabled = false,
}: PaginationProps): string => {
  const pages = pageCount && currentPage ? computePages(pageCount, currentPage) : [];

  const pagesMarkup = pages.length
    ? `<ul class="tilburg-pagination__pages">${pages
        .map((slot) =>
          slot.kind === 'ellipsis'
            ? `<li><span class="tilburg-pagination__ellipsis" aria-hidden="true">…</span></li>`
            : `<li><button type="button" class="${
                slot.value === currentPage
                  ? 'tilburg-pagination__page tilburg-pagination__page--current'
                  : 'tilburg-pagination__page'
              }" aria-label="Pagina ${slot.value}"${
                slot.value === currentPage ? ' aria-current="page" disabled' : ''
              }>${slot.value}</button></li>`,
        )
        .join('')}</ul>`
    : range
      ? `<div class="tilburg-pagination__range">${range}</div>`
      : '';

  return `<nav class="tilburg-pagination" aria-label="Paginering">
  ${feedback ? `<div class="tilburg-pagination__feedback">${feedback}</div>` : ''}
  <div class="tilburg-pagination__controls">
    <button type="button" class="tilburg-pagination__button" aria-label="Eerste pagina"${firstDisabled ? ' disabled' : ''}>${chevronsLeft}</button>
    <button type="button" class="tilburg-pagination__button" aria-label="Vorige pagina"${previousDisabled ? ' disabled' : ''}>${chevronLeft}</button>
    ${pagesMarkup}
    <button type="button" class="tilburg-pagination__button" aria-label="Volgende pagina"${nextDisabled ? ' disabled' : ''}>${chevronRight}</button>
    <button type="button" class="tilburg-pagination__button" aria-label="Laatste pagina"${lastDisabled ? ' disabled' : ''}>${chevronsRight}</button>
  </div>
</nav>`;
};

export const examples = {
  numericFirst: {
    name: 'Numeric — first page',
    html: renderPagination({
      feedback: 'Toont 1–10 van 117',
      pageCount: 12,
      currentPage: 1,
      firstDisabled: true,
      previousDisabled: true,
    }),
  },
  numericMiddle: {
    name: 'Numeric — middle (with ellipsis)',
    html: renderPagination({ feedback: 'Toont 41–50 van 117', pageCount: 12, currentPage: 5 }),
  },
  numericNearEnd: {
    name: 'Numeric — near the end',
    html: renderPagination({ feedback: 'Toont 101–110 van 117', pageCount: 12, currentPage: 11 }),
  },
  numericLast: {
    name: 'Numeric — last page',
    html: renderPagination({
      feedback: 'Toont 111–117 van 117',
      pageCount: 12,
      currentPage: 12,
      nextDisabled: true,
      lastDisabled: true,
    }),
  },
  numericSmall: {
    name: 'Numeric — total ≤ 7 (no ellipsis)',
    html: renderPagination({ feedback: 'Toont 21–30 van 47', pageCount: 5, currentPage: 3 }),
  },
  rangeOnly: {
    name: 'Range text only (no numeric list)',
    html: renderPagination({ feedback: 'Toont 41–50 van 117', range: 'Pagina 5 van 12' }),
  },
  noFeedback: {
    name: 'Without feedback / range / numeric',
    html: renderPagination({}),
  },
} satisfies Record<string, Example>;
