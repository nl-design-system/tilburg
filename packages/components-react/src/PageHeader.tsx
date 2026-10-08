import '@gemeente-tilburg/components-css/page-header/index.scss';
import clsx from 'clsx';
import { Children, ForwardedRef, forwardRef, HTMLAttributes, PropsWithChildren } from 'react';

/** Alt text of a logo shown without a title, when no `logoAlt` is given. */
export const DEFAULT_LOGO_ALT = 'Gemeente Tilburg';

export interface PageHeaderProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  logoSrc?: string | null;
  logoAlt?: string;
  title?: string | null;
  titleHref?: string | null;
}

export const PageHeader = forwardRef(
  (
    {
      logoSrc,
      logoAlt = '',
      title,
      titleHref = '/',
      className,
      children,
      ...restProps
    }: PropsWithChildren<PageHeaderProps>,
    ref: ForwardedRef<HTMLElement>,
  ) => {
    const hasActions = Children.count(children) > 0;
    return (
      <header ref={ref} className={clsx('tilburg-page-header', className)} {...restProps}>
        <div className="tilburg-page-header__container">
          {(logoSrc || title) && (
            <a className="tilburg-page-header__brand" href={titleHref ?? '/'}>
              {logoSrc && (
                <img
                  className="tilburg-page-header__logo"
                  src={logoSrc}
                  /* Without a title the logo is the link's only content, so its alt is the link name (TIL-89). */
                  alt={logoAlt || (title ? '' : DEFAULT_LOGO_ALT)}
                />
              )}
              {title && <span className="tilburg-page-header__title">{title}</span>}
            </a>
          )}
          {hasActions && <div className="tilburg-page-header__actions">{children}</div>}
        </div>
      </header>
    );
  },
);

PageHeader.displayName = 'PageHeader';
