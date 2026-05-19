import '@gemeente-tilburg/components-css/unordered-list/index.scss';
import clsx from 'clsx';
import { ForwardedRef, forwardRef, HTMLAttributes, PropsWithChildren } from 'react';

export type UnorderedListProps = HTMLAttributes<HTMLUListElement>;

export const UnorderedList = forwardRef(
  (
    { className, children, ...restProps }: PropsWithChildren<UnorderedListProps>,
    ref: ForwardedRef<HTMLUListElement>,
  ) => (
    <ul
      ref={ref}
      className={clsx('utrecht-unordered-list', 'utrecht-unordered-list--html-ul', 'tilburg-unordered-list', className)}
      {...restProps}
    >
      {children}
    </ul>
  ),
);

UnorderedList.displayName = 'UnorderedList';
