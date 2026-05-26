import '@gemeente-tilburg/components-css/page-footer/index.scss';
import clsx from 'clsx';
import { ForwardedRef, forwardRef, HTMLAttributes, PropsWithChildren } from 'react';

export interface PageFooterLink {
  label: string;
  href: string;
}

export interface PageFooterProps extends HTMLAttributes<HTMLElement> {
  links?: PageFooterLink[];
  primaryLink?: PageFooterLink | null;
}

export const PageFooter = forwardRef(
  (
    { links = [], primaryLink, className, children, ...restProps }: PropsWithChildren<PageFooterProps>,
    ref: ForwardedRef<HTMLElement>,
  ) => (
    <footer ref={ref} className={clsx('tilburg-page-footer', className)} {...restProps}>
      <div className="tilburg-page-footer__container">
        {children}
        {primaryLink && (
          <ul className="tilburg-page-footer__primary">
            <li>
              <a className="tilburg-page-footer__primary-link" href={primaryLink.href}>
                {primaryLink.label}
              </a>
            </li>
          </ul>
        )}
        {links.length > 0 && (
          <ul className="tilburg-page-footer__list">
            {links.map((link) => (
              <li key={`${link.label}|${link.href}`}>
                <a className="tilburg-page-footer__link" href={link.href}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </footer>
  ),
);

PageFooter.displayName = 'PageFooter';
