import clsx from 'clsx';
import { ForwardedRef, forwardRef, HTMLAttributes, PropsWithChildren } from 'react';

export type IconProps = HTMLAttributes<HTMLSpanElement>;

export const Icon = forwardRef(
  ({ className, children, ...restProps }: PropsWithChildren<IconProps>, ref: ForwardedRef<HTMLSpanElement>) => (
    <span ref={ref} className={clsx('utrecht-icon', className)} {...restProps} aria-hidden="true">
      {children}
    </span>
  ),
);

Icon.displayName = 'Icon';
