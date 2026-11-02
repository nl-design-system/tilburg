import clsx from 'clsx';
import { ForwardedRef, forwardRef, HTMLAttributes, PropsWithChildren } from 'react';

export type MultilineDataProps = HTMLAttributes<HTMLPreElement>;

export const MultilineData = forwardRef(
  ({ className, children, ...restProps }: PropsWithChildren<MultilineDataProps>, ref: ForwardedRef<HTMLPreElement>) => (
    <pre
      ref={ref}
      className={clsx('utrecht-multiline-data', 'utrecht-multiline-data--html-pre', className)}
      {...restProps}
    >
      {children}
    </pre>
  ),
);

MultilineData.displayName = 'MultilineData';
