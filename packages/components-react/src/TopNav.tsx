import '@gemeente-tilburg/components-css/top-nav/index.scss';
import clsx from 'clsx';
import { ForwardedRef, forwardRef, HTMLAttributes, MouseEvent } from 'react';

export interface TopNavItem {
  label: string | null | undefined;
  href?: string | null;
  current?: boolean;
  data?: unknown;
}

export interface TopNavProps extends Omit<HTMLAttributes<HTMLElement>, 'aria-label' | 'onClick'> {
  items?: TopNavItem[];
  ariaLabel?: string;
  onItemClick?: (payload: { item: TopNavItem; event: MouseEvent<HTMLAnchorElement> }) => void;
}

/* utrecht-only: `.utrecht-topnav*` comes from the utrecht base CSS and the theme tokens, there is no components-css folder. */
export const TopNav = forwardRef(
  (
    { items = [], ariaLabel = 'Hoofdmenu', onItemClick, className, ...restProps }: TopNavProps,
    ref: ForwardedRef<HTMLElement>,
  ) => {
    if (!items.length) return null;
    return (
      <nav ref={ref} aria-label={ariaLabel} className={clsx('utrecht-topnav', className)} {...restProps}>
        <ul className="utrecht-topnav__list">
          {items.map((item, index) => (
            <li key={`${item.label ?? ''}-${index}`} className="utrecht-topnav__item">
              <a
                className={clsx('utrecht-topnav__link', item.current && 'utrecht-topnav__link--current')}
                href={item.href || '#'}
                aria-current={item.current ? 'page' : undefined}
                onClick={(event) => onItemClick?.({ item, event })}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  },
);

TopNav.displayName = 'TopNav';
