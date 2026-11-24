import clsx from 'clsx';
import { ForwardedRef, forwardRef, HTMLAttributes, PropsWithChildren } from 'react';

export type MarkProps = HTMLAttributes<HTMLElement>;

export const Mark = forwardRef(
  ({ className, children, ...restProps }: PropsWithChildren<MarkProps>, ref: ForwardedRef<HTMLElement>) => (
    <mark ref={ref} className={clsx('utrecht-mark', className)} {...restProps}>
      {children}
    </mark>
  ),
);

Mark.displayName = 'Mark';
