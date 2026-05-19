import '@gemeente-tilburg/components-css/alert/index.scss';
import clsx from 'clsx';
import { ForwardedRef, forwardRef, HTMLAttributes, PropsWithChildren, ReactNode } from 'react';
import { Heading1 } from './Heading1';
import { Heading2 } from './Heading2';
import { Heading3 } from './Heading3';
import { Heading4 } from './Heading4';
import { Heading5 } from './Heading5';
import { Heading6 } from './Heading6';

export type AlertVariant = 'info' | 'success' | 'warning' | 'danger';
export type AlertLiveRegion = 'polite' | 'assertive' | 'off';

const VARIANT_TO_UTRECHT: Record<AlertVariant, string> = {
  info: 'info',
  success: 'ok',
  warning: 'warning',
  danger: 'error',
};

const HEADINGS = { 1: Heading1, 2: Heading2, 3: Heading3, 4: Heading4, 5: Heading5, 6: Heading6 } as const;

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  variant?: AlertVariant;
  title?: string;
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  closable?: boolean;
  liveRegion?: AlertLiveRegion;
  closeButtonAriaLabel?: string;
  icon?: ReactNode;
  closeIcon?: ReactNode;
  onClose?: () => void;
}

export const Alert = forwardRef(
  (
    {
      variant = 'info',
      title,
      headingLevel = 3,
      closable = false,
      liveRegion = 'polite',
      closeButtonAriaLabel = 'sluit alert',
      icon,
      closeIcon,
      onClose,
      className,
      children,
      ...restProps
    }: PropsWithChildren<AlertProps>,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const HeadingTag = HEADINGS[headingLevel];
    return (
      <div
        ref={ref}
        role="status"
        aria-live={liveRegion}
        aria-atomic="true"
        className={clsx('utrecht-alert', 'tilburg-alert', `utrecht-alert--${VARIANT_TO_UTRECHT[variant]}`, className)}
        {...restProps}
      >
        <div className="utrecht-alert__icon">{icon}</div>
        <div className="utrecht-alert__content">
          {title && <HeadingTag className="tilburg-alert__title">{title}</HeadingTag>}
          <div className="utrecht-alert__message">{children}</div>
        </div>
        {closable && (
          <button type="button" className="tilburg-alert__close" aria-label={closeButtonAriaLabel} onClick={onClose}>
            {closeIcon}
          </button>
        )}
      </div>
    );
  },
);

Alert.displayName = 'Alert';
