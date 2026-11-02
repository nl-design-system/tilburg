import '@gemeente-tilburg/components-css/nav-bar/index.scss';
import clsx from 'clsx';
import { ForwardedRef, forwardRef, HTMLAttributes, PropsWithChildren } from 'react';

export interface NavBarProps extends Omit<HTMLAttributes<HTMLElement>, 'aria-label'> {
  ariaLabel?: string;
}

export const NavBar = forwardRef(
  (
    { ariaLabel = 'Hoofdmenu', className, children, ...restProps }: PropsWithChildren<NavBarProps>,
    ref: ForwardedRef<HTMLElement>,
  ) => (
    <nav ref={ref} aria-label={ariaLabel} className={clsx('utrecht-nav-bar', className)} {...restProps}>
      <div className="utrecht-nav-bar__content">{children}</div>
    </nav>
  ),
);

NavBar.displayName = 'NavBar';
