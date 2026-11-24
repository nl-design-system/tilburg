import '@gemeente-tilburg/components-css/side-nav/index.scss';
import clsx from 'clsx';
import { ForwardedRef, forwardRef, HTMLAttributes, MouseEvent } from 'react';

export interface SideNavItem {
  label: string | null | undefined;
  href?: string | null;
  current?: boolean;
  data?: unknown;
  /** One nested level; children of children are not rendered. */
  children?: SideNavItem[];
}

export interface SideNavProps extends Omit<HTMLAttributes<HTMLElement>, 'aria-label' | 'onClick'> {
  items?: SideNavItem[];
  ariaLabel?: string;
  onItemClick?: (payload: { item: SideNavItem; event: MouseEvent<HTMLAnchorElement> }) => void;
}

export const SideNav = forwardRef(
  (
    { items = [], ariaLabel = 'Submenu', onItemClick, className, ...restProps }: SideNavProps,
    ref: ForwardedRef<HTMLElement>,
  ) => {
    if (!items.length) return null;
    const link = (item: SideNavItem, className: string) => (
      <a
        className={className}
        href={item.href || '#'}
        aria-current={item.current ? 'page' : undefined}
        onClick={(event) => onItemClick?.({ item, event })}
      >
        {item.label}
      </a>
    );
    return (
      <nav
        ref={ref}
        aria-label={ariaLabel}
        className={clsx('utrecht-sidenav utrecht-sidenav--pseudo-elements', className)}
        {...restProps}
      >
        <ul className="utrecht-sidenav__list">
          {items.map((item, index) => {
            const children = item.children ?? [];
            return (
              <li
                key={`${item.label ?? ''}-${index}`}
                className={clsx('utrecht-sidenav__item', index === items.length - 1 && 'utrecht-sidenav__item--last')}
              >
                {link(
                  item,
                  clsx(
                    'utrecht-sidenav__link',
                    item.current && 'utrecht-sidenav__link--current',
                    children.length && 'utrecht-sidenav__link--parent',
                  ),
                )}
                {children.length ? (
                  <ul className="utrecht-sidenav__list utrecht-sidenav__list--child">
                    {children.map((child, childIndex) => (
                      <li
                        key={`${child.label ?? ''}-${childIndex}`}
                        className="utrecht-sidenav__item utrecht-sidenav__item--child"
                      >
                        {link(
                          child,
                          clsx(
                            'utrecht-sidenav__link utrecht-sidenav__link--child',
                            child.current && 'utrecht-sidenav__link--current utrecht-sidenav__link--current-child',
                          ),
                        )}
                      </li>
                    ))}
                  </ul>
                ) : null}
                <div className="utrecht-sidenav__item-separator"></div>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  },
);

SideNav.displayName = 'SideNav';
