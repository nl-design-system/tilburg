import '@gemeente-tilburg/components-css/unordered-list/index.scss';
import clsx from 'clsx';
import { ForwardedRef, forwardRef, HTMLAttributes, LiHTMLAttributes, PropsWithChildren } from 'react';

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

export type UnorderedListItemProps = LiHTMLAttributes<HTMLLIElement>;

/* Optional typed convenience — not required. The item spacing, the `1ch`
   marker gap and the Tilburg marker colour are applied by the CSS layer to
   `.utrecht-unordered-list--html-ul > li`, a modifier `UnorderedList` always
   emits, so plain `<li>` children are styled without any class. This component
   just adds the explicit `.utrecht-unordered-list__item` for consumers who
   prefer a component per item. */
export const UnorderedListItem = forwardRef(
  (
    { className, children, ...restProps }: PropsWithChildren<UnorderedListItemProps>,
    ref: ForwardedRef<HTMLLIElement>,
  ) => (
    <li ref={ref} className={clsx('utrecht-unordered-list__item', className)} {...restProps}>
      {children}
    </li>
  ),
);

UnorderedListItem.displayName = 'UnorderedListItem';
