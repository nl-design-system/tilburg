/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';
import type { ReactNode } from 'react';

const meta = {
  title: 'Tilburg/Pagination',
  id: 'tilburg-pagination',
  tags: ['autodocs'],
  parameters: {
    bugs: 'https://github.com/nl-design-system/tilburg/labels/component%2Fpagination',
    docs: {
      description: {
        component: `Compact pagination bar with first / previous / next / last chevron controls. Optionally renders either a numeric page button list (with leading/trailing ellipsis when total pages > 7) **or** a plain range text like "Pagina 3 van 12" when no \`pageCount\`/\`currentPage\` is provided. The Angular wrapper takes plain inputs so any controller can drive it.

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
`,
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

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

const Chevrons = ({ children }: { children: ReactNode }) => (
  <svg
    className="tilburg-pagination__icon"
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {children}
  </svg>
);

const ChevronsLeft = () => (
  <Chevrons>
    <polyline points="11 17 6 12 11 7" />
    <polyline points="18 17 13 12 18 7" />
  </Chevrons>
);
const ChevronLeft = () => (
  <Chevrons>
    <polyline points="15 18 9 12 15 6" />
  </Chevrons>
);
const ChevronRight = () => (
  <Chevrons>
    <polyline points="9 18 15 12 9 6" />
  </Chevrons>
);
const ChevronsRight = () => (
  <Chevrons>
    <polyline points="13 17 18 12 13 7" />
    <polyline points="6 17 11 12 6 7" />
  </Chevrons>
);

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

const Pagination = ({
  feedback,
  range,
  pageCount,
  currentPage,
  firstDisabled = false,
  previousDisabled = false,
  nextDisabled = false,
  lastDisabled = false,
}: PaginationProps) => {
  const pages = pageCount && currentPage ? computePages(pageCount, currentPage) : [];
  return (
    <nav className="tilburg-pagination" aria-label="Paginering">
      {feedback && <div className="tilburg-pagination__feedback">{feedback}</div>}
      <div className="tilburg-pagination__controls">
        <button
          type="button"
          className="tilburg-pagination__button"
          aria-label="Eerste pagina"
          disabled={firstDisabled}
        >
          <ChevronsLeft />
        </button>
        <button
          type="button"
          className="tilburg-pagination__button"
          aria-label="Vorige pagina"
          disabled={previousDisabled}
        >
          <ChevronLeft />
        </button>

        {pages.length ? (
          <ul className="tilburg-pagination__pages">
            {pages.map((slot) =>
              slot.kind === 'ellipsis' ? (
                <li key={slot.key}>
                  <span className="tilburg-pagination__ellipsis" aria-hidden="true">
                    …
                  </span>
                </li>
              ) : (
                <li key={slot.value}>
                  <button
                    type="button"
                    className={
                      slot.value === currentPage
                        ? 'tilburg-pagination__page tilburg-pagination__page--current'
                        : 'tilburg-pagination__page'
                    }
                    aria-label={`Pagina ${slot.value}`}
                    aria-current={slot.value === currentPage ? 'page' : undefined}
                    disabled={slot.value === currentPage}
                  >
                    {slot.value}
                  </button>
                </li>
              ),
            )}
          </ul>
        ) : (
          range && <div className="tilburg-pagination__range">{range}</div>
        )}

        <button
          type="button"
          className="tilburg-pagination__button"
          aria-label="Volgende pagina"
          disabled={nextDisabled}
        >
          <ChevronRight />
        </button>
        <button
          type="button"
          className="tilburg-pagination__button"
          aria-label="Laatste pagina"
          disabled={lastDisabled}
        >
          <ChevronsRight />
        </button>
      </div>
    </nav>
  );
};

export const NumericFirst: Story = {
  name: 'Numeric — first page',
  render: () => (
    <Pagination feedback="Toont 1–10 van 117" pageCount={12} currentPage={1} firstDisabled previousDisabled />
  ),
};

export const NumericMiddle: Story = {
  name: 'Numeric — middle (with ellipsis)',
  render: () => <Pagination feedback="Toont 41–50 van 117" pageCount={12} currentPage={5} />,
};

export const NumericNearEnd: Story = {
  name: 'Numeric — near the end',
  render: () => <Pagination feedback="Toont 101–110 van 117" pageCount={12} currentPage={11} />,
};

export const NumericLast: Story = {
  name: 'Numeric — last page',
  render: () => (
    <Pagination feedback="Toont 111–117 van 117" pageCount={12} currentPage={12} nextDisabled lastDisabled />
  ),
};

export const NumericSmall: Story = {
  name: 'Numeric — total ≤ 7 (no ellipsis)',
  render: () => <Pagination feedback="Toont 21–30 van 47" pageCount={5} currentPage={3} />,
};

export const RangeOnly: Story = {
  name: 'Range text only (no numeric list)',
  render: () => <Pagination feedback="Toont 41–50 van 117" range="Pagina 5 van 12" />,
};

export const NoFeedback: Story = {
  name: 'Without feedback / range / numeric',
  render: () => <Pagination />,
};
