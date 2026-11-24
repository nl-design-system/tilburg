import '@gemeente-tilburg/components-css/toptask-link/index.scss';
import clsx from 'clsx';
import { AnchorHTMLAttributes, ForwardedRef, forwardRef, PropsWithChildren, ReactNode } from 'react';

export interface ToptaskLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  icon?: ReactNode;
}

export const ToptaskLink = forwardRef(
  (
    { icon, className, children, ...restProps }: PropsWithChildren<ToptaskLinkProps>,
    ref: ForwardedRef<HTMLAnchorElement>,
  ) => (
    <a ref={ref} className={clsx('utrecht-toptask-link', className)} {...restProps}>
      {icon && <span className="utrecht-toptask-link__icon">{icon}</span>}
      <span className="utrecht-toptask-link__title">{children}</span>
    </a>
  ),
);

ToptaskLink.displayName = 'ToptaskLink';
