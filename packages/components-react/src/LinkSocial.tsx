import clsx from 'clsx';
import {
  AnchorHTMLAttributes,
  ForwardedRef,
  forwardRef,
  HTMLAttributes,
  LiHTMLAttributes,
  PropsWithChildren,
} from 'react';

export interface LinkSocialProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  external?: boolean;
}

export const LinkSocial = forwardRef(
  (
    { external = true, rel, className, children, ...restProps }: PropsWithChildren<LinkSocialProps>,
    ref: ForwardedRef<HTMLAnchorElement>,
  ) => (
    <a
      ref={ref}
      rel={external ? 'external noopener noreferrer' : rel}
      className={clsx('utrecht-link-social', className)}
      {...restProps}
    >
      {children}
    </a>
  ),
);

LinkSocial.displayName = 'LinkSocial';

export type ListSocialProps = HTMLAttributes<HTMLUListElement>;

export const ListSocial = forwardRef(
  (
    { role = 'list', className, children, ...restProps }: PropsWithChildren<ListSocialProps>,
    ref: ForwardedRef<HTMLUListElement>,
  ) => (
    <ul ref={ref} role={role} className={clsx('utrecht-list-social', className)} {...restProps}>
      {children}
    </ul>
  ),
);

ListSocial.displayName = 'ListSocial';

export type ListSocialItemProps = LiHTMLAttributes<HTMLLIElement>;

export const ListSocialItem = forwardRef(
  ({ className, children, ...restProps }: PropsWithChildren<ListSocialItemProps>, ref: ForwardedRef<HTMLLIElement>) => (
    <li ref={ref} className={clsx('utrecht-list-social__item', className)} {...restProps}>
      {children}
    </li>
  ),
);

ListSocialItem.displayName = 'ListSocialItem';
