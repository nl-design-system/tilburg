import clsx from 'clsx';
import { ForwardedRef, forwardRef, HTMLAttributes, PropsWithChildren } from 'react';

export type DocumentProps = HTMLAttributes<HTMLDivElement>;

export const Document = forwardRef(
  ({ className, children, ...restProps }: PropsWithChildren<DocumentProps>, ref: ForwardedRef<HTMLDivElement>) => (
    <div ref={ref} className={clsx('utrecht-document', className)} {...restProps}>
      {children}
    </div>
  ),
);

Document.displayName = 'Document';
