import '@gemeente-tilburg/components-css/page-header/index.scss';
import { ForwardedRef, forwardRef, HTMLAttributes, PropsWithChildren } from 'react';

export interface PageHeaderProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  logoSrc?: string | null;
  logoAlt?: string;
  title?: string | null;
  titleHref?: string | null;
}

export const PageHeader = forwardRef(
  (
    { logoSrc, logoAlt = '', title, titleHref = '/', children, ...restProps }: PropsWithChildren<PageHeaderProps>,
    ref: ForwardedRef<HTMLElement>,
  ) => (
    <header ref={ref} className="tilburg-page-header" {...restProps}>
      <div className="tilburg-page-header__container">
        {(logoSrc || title) && (
          <a className="tilburg-page-header__brand" href={titleHref ?? '/'}>
            {logoSrc && <img className="tilburg-page-header__logo" src={logoSrc} alt={logoAlt} />}
            {title && <span className="tilburg-page-header__title">{title}</span>}
          </a>
        )}
        <div className="tilburg-page-header__actions">{children}</div>
      </div>
    </header>
  ),
);

PageHeader.displayName = 'PageHeader';
