import '@gemeente-tilburg/components-css/separator/index.scss';
import clsx from 'clsx';
import { ForwardedRef, forwardRef, HTMLAttributes } from 'react';

export interface SeparatorProps extends HTMLAttributes<HTMLHRElement> {
  decorative?: boolean;
}

export const Separator = forwardRef(
  ({ decorative, className, ...restProps }: SeparatorProps, ref: ForwardedRef<HTMLHRElement>) => (
    <hr
      ref={ref}
      aria-hidden={decorative ? 'true' : undefined}
      className={clsx('utrecht-separator', className)}
      {...restProps}
    />
  ),
);

Separator.displayName = 'Separator';
