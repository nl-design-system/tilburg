import '@gemeente-tilburg/components-css/breadcrumb/index.scss';
import { ForwardedRef, forwardRef, HTMLAttributes, MouseEvent } from 'react';

export interface BreadcrumbItem {
  label: string | null | undefined;
  href?: string | null;
  current?: boolean;
  data?: unknown;
}

export interface BreadcrumbProps extends Omit<HTMLAttributes<HTMLElement>, 'aria-label' | 'onClick'> {
  items?: BreadcrumbItem[];
  ariaLabel?: string;
  // eslint-disable-next-line no-unused-vars
  onItemClick?: (payload: { item: BreadcrumbItem; event: MouseEvent<HTMLAnchorElement> }) => void;
}

export const Breadcrumb = forwardRef(
  (
    { items = [], ariaLabel = 'Kruimelpad', onItemClick, ...restProps }: BreadcrumbProps,
    ref: ForwardedRef<HTMLElement>,
  ) => {
    if (!items.length) return null;
    return (
      <nav ref={ref} aria-label={ariaLabel} className="utrecht-breadcrumb-nav tilburg-breadcrumb" {...restProps}>
        <ol className="utrecht-breadcrumb-nav__list utrecht-breadcrumb-nav__list--html-ol">
          {items.map((item, idx) => {
            const last = idx === items.length - 1;
            const showLink = !last && !item.current;
            return (
              <li key={`${item.label ?? ''}-${idx}`} className="utrecht-breadcrumb-nav__item">
                {showLink ? (
                  <>
                    <a
                      className="utrecht-breadcrumb-nav__link"
                      href={item.href ?? '#'}
                      onClick={(event) => onItemClick?.({ item, event })}
                    >
                      {item.label}
                    </a>
                    <span className="utrecht-breadcrumb-nav__separator" aria-hidden="true">
                      &rsaquo;
                    </span>
                  </>
                ) : (
                  <span
                    aria-current="page"
                    className="utrecht-breadcrumb-nav__link utrecht-breadcrumb-nav__link--current"
                  >
                    {item.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  },
);

Breadcrumb.displayName = 'Breadcrumb';
