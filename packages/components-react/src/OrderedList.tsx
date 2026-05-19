import '@gemeente-tilburg/components-css/ordered-list/index.scss';
import clsx from 'clsx';
import { ForwardedRef, forwardRef, OlHTMLAttributes, PropsWithChildren } from 'react';

export interface OrderedListProps extends OlHTMLAttributes<HTMLOListElement> {
  byLetter?: boolean;
}

export const OrderedList = forwardRef(
  (
    { byLetter, className, children, ...restProps }: PropsWithChildren<OrderedListProps>,
    ref: ForwardedRef<HTMLOListElement>,
  ) => (
    <ol
      ref={ref}
      className={clsx(
        'utrecht-ordered-list',
        'utrecht-ordered-list--html-ol',
        'tilburg-ordered-list',
        byLetter && 'tilburg-ordered-list--by-letter',
        className,
      )}
      {...restProps}
    >
      {children}
    </ol>
  ),
);

OrderedList.displayName = 'OrderedList';
