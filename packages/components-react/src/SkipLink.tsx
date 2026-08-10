import '@gemeente-tilburg/components-css/skip-link/index.scss';
import clsx from 'clsx';
import { AnchorHTMLAttributes, ForwardedRef, forwardRef, PropsWithChildren } from 'react';

/**
 * Modifier controlling when the skip-link is rendered.
 *  - `visible-on-focus` — the production WCAG 2.4.1 pattern: hidden until the
 *    link receives keyboard focus, then slides into the top-left of the viewport.
 *  - `visible` — always rendered in place (useful for demos / non-standard layouts).
 *  - `hidden` — never rendered (kept off-screen unconditionally).
 *  - `focus` — force the focused appearance regardless of `:focus`; intended for
 *    storybook screenshots.
 */
export type SkipLinkVisibility = 'visible-on-focus' | 'visible' | 'hidden' | 'focus';

export interface SkipLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  visibility?: SkipLinkVisibility;
}

export const SkipLink = forwardRef(
  (
    { visibility = 'visible-on-focus', className, children, ...restProps }: PropsWithChildren<SkipLinkProps>,
    ref: ForwardedRef<HTMLAnchorElement>,
  ) => (
    <a ref={ref} className={clsx('utrecht-skip-link', `utrecht-skip-link--${visibility}`, className)} {...restProps}>
      {children}
    </a>
  ),
);

SkipLink.displayName = 'SkipLink';
