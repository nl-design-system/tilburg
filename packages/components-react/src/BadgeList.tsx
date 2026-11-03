import '@gemeente-tilburg/components-css/badge-list/index.scss';
import clsx from 'clsx';
import { Children, ForwardedRef, forwardRef, HTMLAttributes, PropsWithChildren } from 'react';

export type BadgeListProps = HTMLAttributes<HTMLUListElement>;

/* Each child becomes one `<li>`, like the HTML/CSS reference. `role="list"` keeps the
   list role in Safari, which drops it when the bullets are gone. */
export const BadgeList = forwardRef(
  ({ className, children, ...restProps }: PropsWithChildren<BadgeListProps>, ref: ForwardedRef<HTMLUListElement>) => (
    <ul ref={ref} className={clsx('utrecht-badge-list', className)} role="list" {...restProps}>
      {Children.map(children, (child) =>
        child === null || child === undefined || typeof child === 'boolean' ? null : <li>{child}</li>,
      )}
    </ul>
  ),
);

BadgeList.displayName = 'BadgeList';
