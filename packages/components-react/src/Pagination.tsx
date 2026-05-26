import '@gemeente-tilburg/components-css/pagination/index.scss';
import clsx from 'clsx';
import { ForwardedRef, forwardRef, HTMLAttributes, ReactNode } from 'react';

export type PaginationStep = 'first' | 'previous' | 'next' | 'last' | 'page';

export interface PaginationEvent {
  step: PaginationStep;
  page?: number;
}

type PageSlot = { kind: 'page'; value: number } | { kind: 'ellipsis'; key: string };

export interface PaginationProps extends Omit<HTMLAttributes<HTMLElement>, 'onNavigate'> {
  ariaLabel?: string;
  feedback?: string | null;
  range?: string | null;
  pageCount?: number | null;
  currentPage?: number | null;
  firstDisabled?: boolean;
  previousDisabled?: boolean;
  nextDisabled?: boolean;
  lastDisabled?: boolean;
  firstLabel?: string;
  previousLabel?: string;
  nextLabel?: string;
  lastLabel?: string;
  // eslint-disable-next-line no-unused-vars
  pageLabel?: (n: number) => string;
  // eslint-disable-next-line no-unused-vars
  onNavigate?: (event: PaginationEvent) => void;
}

const arrow = (d: string): ReactNode => (
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
    <polyline points={d} />
  </svg>
);

const doubleArrow = (a: string, b: string): ReactNode => (
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
    <polyline points={a} />
    <polyline points={b} />
  </svg>
);

const computeSlots = (total: number, current: number): PageSlot[] => {
  if (total <= 0) return [];
  if (total <= 7) return Array.from({ length: total }, (_, i) => ({ kind: 'page', value: i + 1 }));
  const slots: PageSlot[] = [{ kind: 'page', value: 1 }];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  if (start > 2) slots.push({ kind: 'ellipsis', key: 'lead' });
  for (let p = start; p <= end; p += 1) slots.push({ kind: 'page', value: p });
  if (end < total - 1) slots.push({ kind: 'ellipsis', key: 'trail' });
  slots.push({ kind: 'page', value: total });
  return slots;
};

export const Pagination = forwardRef(
  (
    {
      ariaLabel = 'Paginering',
      feedback,
      range,
      pageCount,
      currentPage,
      firstDisabled = false,
      previousDisabled = false,
      nextDisabled = false,
      lastDisabled = false,
      firstLabel = 'Eerste pagina',
      previousLabel = 'Vorige pagina',
      nextLabel = 'Volgende pagina',
      lastLabel = 'Laatste pagina',
      pageLabel = (n: number) => `Pagina ${n}`,
      onNavigate,
      className,
      ...restProps
    }: PaginationProps,
    ref: ForwardedRef<HTMLElement>,
  ) => {
    const slots = computeSlots(pageCount ?? 0, currentPage ?? 1);
    const step = (s: PaginationStep) => () => onNavigate?.({ step: s });
    const onPage = (page: number) => {
      if (page === currentPage) return;
      onNavigate?.({ step: 'page', page });
    };

    return (
      <nav ref={ref} className={clsx('tilburg-pagination', className)} aria-label={ariaLabel} {...restProps}>
        {feedback && <div className="tilburg-pagination__feedback">{feedback}</div>}
        <div className="tilburg-pagination__controls">
          <button
            type="button"
            className="tilburg-pagination__button"
            disabled={firstDisabled}
            aria-label={firstLabel}
            onClick={step('first')}
          >
            {doubleArrow('11 17 6 12 11 7', '18 17 13 12 18 7')}
          </button>
          <button
            type="button"
            className="tilburg-pagination__button"
            disabled={previousDisabled}
            aria-label={previousLabel}
            onClick={step('previous')}
          >
            {arrow('15 18 9 12 15 6')}
          </button>
          {slots.length > 0 ? (
            <ul className="tilburg-pagination__pages">
              {slots.map((slot, idx) =>
                slot.kind === 'ellipsis' ? (
                  <li key={`e-${slot.key}-${idx}`}>
                    <span className="tilburg-pagination__ellipsis" aria-hidden="true">
                      …
                    </span>
                  </li>
                ) : (
                  <li key={`p-${slot.value}`}>
                    <button
                      type="button"
                      className={
                        'tilburg-pagination__page' +
                        (slot.value === currentPage ? ' tilburg-pagination__page--current' : '')
                      }
                      aria-current={slot.value === currentPage ? 'page' : undefined}
                      aria-label={pageLabel(slot.value)}
                      disabled={slot.value === currentPage}
                      onClick={() => onPage(slot.value)}
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
            disabled={nextDisabled}
            aria-label={nextLabel}
            onClick={step('next')}
          >
            {arrow('9 18 15 12 9 6')}
          </button>
          <button
            type="button"
            className="tilburg-pagination__button"
            disabled={lastDisabled}
            aria-label={lastLabel}
            onClick={step('last')}
          >
            {doubleArrow('13 17 18 12 13 7', '6 17 11 12 6 7')}
          </button>
        </div>
      </nav>
    );
  },
);

Pagination.displayName = 'Pagination';
