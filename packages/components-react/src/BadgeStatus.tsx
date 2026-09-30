import '@gemeente-tilburg/components-css/badge-status/index.scss';
import clsx from 'clsx';
import { ForwardedRef, forwardRef, HTMLAttributes, PropsWithChildren } from 'react';

export interface BadgeStatusProps extends HTMLAttributes<HTMLSpanElement> {
  status?: string;
  liveRegion?: 'polite' | 'assertive' | 'off';
}

export const BadgeStatus = forwardRef(
  (
    {
      status,
      liveRegion = 'polite',
      'aria-label': ariaLabel,
      className,
      children,
      ...restProps
    }: PropsWithChildren<BadgeStatusProps>,
    ref: ForwardedRef<HTMLSpanElement>,
  ) => (
    <span
      ref={ref}
      role="status"
      aria-live={liveRegion}
      aria-label={ariaLabel ?? status ?? undefined}
      className={clsx('utrecht-badge-status', status && `utrecht-badge-status--${status}`, className)}
      {...restProps}
    >
      {children}
    </span>
  ),
);

BadgeStatus.displayName = 'BadgeStatus';
