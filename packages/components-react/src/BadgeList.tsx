import clsx from 'clsx';
import { ForwardedRef, forwardRef, HTMLAttributes, PropsWithChildren } from 'react';

export type BadgeListProps = HTMLAttributes<HTMLDivElement>;

export const BadgeList = forwardRef(
  ({ className, children, ...restProps }: PropsWithChildren<BadgeListProps>, ref: ForwardedRef<HTMLDivElement>) => (
    <div ref={ref} className={clsx('utrecht-badge-list', className)} {...restProps}>
      {children}
    </div>
  ),
);

BadgeList.displayName = 'BadgeList';
