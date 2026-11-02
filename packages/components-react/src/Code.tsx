import clsx from 'clsx';
import { ForwardedRef, forwardRef, HTMLAttributes, PropsWithChildren } from 'react';

export type CodeProps = HTMLAttributes<HTMLElement>;

export const Code = forwardRef(
  ({ className, children, ...restProps }: PropsWithChildren<CodeProps>, ref: ForwardedRef<HTMLElement>) => (
    <code ref={ref} className={clsx('utrecht-code', className)} {...restProps}>
      {children}
    </code>
  ),
);

Code.displayName = 'Code';
