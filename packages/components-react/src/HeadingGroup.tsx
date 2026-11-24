import clsx from 'clsx';
import { ForwardedRef, forwardRef, HTMLAttributes, PropsWithChildren } from 'react';

export type HeadingGroupProps = HTMLAttributes<HTMLElement>;

export const HeadingGroup = forwardRef(
  ({ className, children, ...restProps }: PropsWithChildren<HeadingGroupProps>, ref: ForwardedRef<HTMLElement>) => (
    <hgroup ref={ref} className={clsx('utrecht-heading-group', className)} {...restProps}>
      {children}
    </hgroup>
  ),
);

HeadingGroup.displayName = 'HeadingGroup';
