import '@gemeente-tilburg/components-css/nav-list/index.scss';
import clsx from 'clsx';
import { ForwardedRef, forwardRef, HTMLAttributes, MouseEvent } from 'react';

export interface NavListItem {
  label: string | null | undefined;
  href?: string | null;
  current?: boolean;
  data?: unknown;
}

export interface NavListProps extends Omit<HTMLAttributes<HTMLUListElement>, 'onClick'> {
  items?: NavListItem[];
  center?: boolean;
  onItemClick?: (payload: { item: NavListItem; event: MouseEvent<HTMLAnchorElement> }) => void;
}

export const NavList = forwardRef(
  ({ items = [], center, onItemClick, className, ...restProps }: NavListProps, ref: ForwardedRef<HTMLUListElement>) => {
    if (!items.length) return null;
    return (
      <ul
        ref={ref}
        role="list"
        className={clsx('utrecht-nav-list', center && 'utrecht-nav-list--center', className)}
        {...restProps}
      >
        {items.map((item, index) => (
          <li key={`${item.label ?? ''}-${index}`} className="utrecht-nav-list__item">
            <a
              className={clsx(
                'utrecht-link utrecht-link--html-a utrecht-nav-list__link',
                item.current && 'utrecht-link--current',
              )}
              href={item.href || '#'}
              aria-current={item.current ? 'page' : undefined}
              onClick={(event) => onItemClick?.({ item, event })}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    );
  },
);

NavList.displayName = 'NavList';
