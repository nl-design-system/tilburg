import clsx from 'clsx';
import { ForwardedRef, forwardRef, HTMLAttributes, PropsWithChildren } from 'react';

export type SpotlightSectionVariant = 'info' | 'success' | 'warning' | 'danger';

/* Same API values as Alert; the DOM uses Utrecht's ok/error modifiers. */
const VARIANT_TO_UTRECHT: Record<SpotlightSectionVariant, string> = {
  info: 'info',
  success: 'ok',
  warning: 'warning',
  danger: 'error',
};

export interface SpotlightSectionProps extends HTMLAttributes<HTMLElement> {
  /** Feedback colour; none gives the neutral grey block. */
  variant?: SpotlightSectionVariant;
  /** Render `<aside>` instead of `<section>`. */
  aside?: boolean;
}

export const SpotlightSection = forwardRef(
  (
    { variant, aside = false, className, children, ...restProps }: PropsWithChildren<SpotlightSectionProps>,
    ref: ForwardedRef<HTMLElement>,
  ) => {
    const Element = aside ? 'aside' : 'section';
    return (
      <Element
        ref={ref}
        className={clsx(
          'utrecht-spotlight-section',
          variant && `utrecht-spotlight-section--${VARIANT_TO_UTRECHT[variant]}`,
          className,
        )}
        {...restProps}
      >
        {children}
      </Element>
    );
  },
);

SpotlightSection.displayName = 'SpotlightSection';
