import '@gemeente-tilburg/components-css/badge-status/index.scss';
import clsx from 'clsx';
import { ForwardedRef, forwardRef, HTMLAttributes, PropsWithChildren } from 'react';

export interface BadgeStatusProps extends HTMLAttributes<HTMLSpanElement> {
  status?: string;
  /** Defaults to `assertive` for an urgent status (danger, error, invalid) and `polite` otherwise. */
  liveRegion?: 'polite' | 'assertive' | 'off';
}

/* An urgent status is announced as an alert (bq-tlb-frontend 3b9998c); the rest as a polite status. */
const URGENT_STATUSES = new Set(['danger', 'error', 'invalid']);

export const BadgeStatus = forwardRef(
  (
    { status, liveRegion, className, children, ...restProps }: PropsWithChildren<BadgeStatusProps>,
    ref: ForwardedRef<HTMLSpanElement>,
  ) => {
    const urgent = Boolean(status && URGENT_STATUSES.has(status));
    /* The visible text is the accessible name; the status code ("warning") is not a label. An explicit `aria-label`
       is passed through with the rest of the props. */
    return (
      <span
        ref={ref}
        role={urgent ? 'alert' : 'status'}
        aria-live={liveRegion ?? (urgent ? 'assertive' : 'polite')}
        className={clsx('utrecht-badge-status', status && `utrecht-badge-status--${status}`, className)}
        {...restProps}
      >
        {children}
      </span>
    );
  },
);

BadgeStatus.displayName = 'BadgeStatus';
