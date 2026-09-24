import '@gemeente-tilburg/components-css/link/index.scss';
import clsx from 'clsx';
import { AnchorHTMLAttributes, AriaAttributes, ForwardedRef, forwardRef, PropsWithChildren } from 'react';

export type AriaCurrent = 'page' | 'step' | 'location' | 'date' | 'time' | true | false;

export interface LinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'aria-current'> {
  external?: boolean;
  current?: AriaCurrent;
}

export const Link = forwardRef(
  (
    { external, rel, current, className, children, ...restProps }: PropsWithChildren<LinkProps>,
    ref: ForwardedRef<HTMLAnchorElement>,
  ) => (
    <a
      ref={ref}
      rel={external ? 'external noopener noreferrer' : rel}
      aria-current={current === undefined ? undefined : (current as AriaAttributes['aria-current'])}
      className={clsx('utrecht-link', 'utrecht-link--html-a', className)}
      {...restProps}
    >
      {children}
    </a>
  ),
);

Link.displayName = 'Link';
