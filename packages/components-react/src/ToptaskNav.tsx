import clsx from 'clsx';
import { ForwardedRef, forwardRef, HTMLAttributes, PropsWithChildren } from 'react';

export interface ToptaskNavProps extends HTMLAttributes<HTMLElement> {
  grid?: boolean;
}

export const ToptaskNav = forwardRef(
  (
    {
      grid,
      'aria-label': ariaLabel = 'Veelgevraagd',
      className,
      children,
      ...restProps
    }: PropsWithChildren<ToptaskNavProps>,
    ref: ForwardedRef<HTMLElement>,
  ) => (
    <nav
      ref={ref}
      aria-label={ariaLabel}
      className={clsx('utrecht-toptask-nav', { 'utrecht-toptask-nav--grid': grid }, className)}
      {...restProps}
    >
      {children}
    </nav>
  ),
);

ToptaskNav.displayName = 'ToptaskNav';
