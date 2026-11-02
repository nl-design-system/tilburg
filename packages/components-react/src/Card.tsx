import '@gemeente-tilburg/components-css/card/index.scss';
import clsx from 'clsx';
import { ForwardedRef, forwardRef, HTMLAttributes, PropsWithChildren, ReactNode } from 'react';

export type CardHeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Heading text; with `href` it is the link text and the card's accessible name. */
  heading: ReactNode;
  /** Heading level, default 3. */
  headingLevel?: CardHeadingLevel;
  /** Makes the heading a link that covers the whole card. */
  href?: string;
  /** Shown above the heading (CSS order), after it in the source. */
  image?: ReactNode;
}

export const Card = forwardRef(
  (
    { heading, headingLevel = 3, href, image, className, children, ...restProps }: PropsWithChildren<CardProps>,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const Heading = `h${headingLevel}` as const;
    return (
      <div ref={ref} className={clsx('utrecht-card', href && 'utrecht-card--link', className)} {...restProps}>
        <div className="utrecht-card__content">
          <div className="utrecht-card__heading">
            <Heading className={`utrecht-heading-${headingLevel}`}>
              {href ? (
                <a className="utrecht-link utrecht-link--html-a utrecht-card__link" href={href}>
                  {heading}
                </a>
              ) : (
                heading
              )}
            </Heading>
          </div>
          {image && <div className="utrecht-card__image">{image}</div>}
          {children && <div className="utrecht-card__body">{children}</div>}
        </div>
      </div>
    );
  },
);

Card.displayName = 'Card';
