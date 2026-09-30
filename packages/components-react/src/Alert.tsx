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

/* Per-variant default SVG glyphs that match the CSS-class storybook reference. */
const InfoGlyph = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 15h-2v-6h2v6Zm0-8h-2V7h2v2Z" />
  </svg>
);
const CheckGlyph = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm-1.4 14.6L6 12l1.4-1.4 3.2 3.2 6-6L18 9.2l-7.4 7.4Z" />
  </svg>
);
const WarnGlyph = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M1 21h22L12 2 1 21Zm12-3h-2v-2h2v2Zm0-4h-2v-4h2v4Z" />
  </svg>
);
const ErrorGlyph = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm5 13.6L15.6 17 12 13.4 8.4 17 7 15.6 10.6 12 7 8.4 8.4 7 12 10.6 15.6 7 17 8.4 13.4 12 17 15.6Z" />
  </svg>
);
const CloseGlyph = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="m18.3 5.71-1.42-1.42L12 9.17 7.12 4.29 5.71 5.71 10.59 10.59 5.71 15.46l1.41 1.42L12 12l4.88 4.88 1.42-1.42-4.88-4.87 4.87-4.88Z" />
  </svg>
);

const VARIANT_GLYPH: Record<AlertVariant, ReactNode> = {
  info: <InfoGlyph />,
  success: <CheckGlyph />,
  warning: <WarnGlyph />,
  danger: <ErrorGlyph />,
};

/* Wrap each icon glyph in an `<i>` so the SCSS rule
   `.utrecht-alert__icon i { line-height: var(--utrecht-heading-3-line-height) }`
   applies and the icon vertically centers with the heading's first line. */
const IconWrap = ({ children }: { children: ReactNode }) => (
  <i
    aria-hidden="true"
    style={{
      alignItems: 'center',
      display: 'inline-flex',
      fontSize: 'var(--utrecht-alert-icon-size, 1.5rem)',
      fontStyle: 'normal',
      justifyContent: 'center',
    }}
  >
    {children}
  </i>
);

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  variant?: AlertVariant;
  title?: string;
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  closable?: boolean;
  liveRegion?: AlertLiveRegion;
  closeButtonAriaLabel?: string;
  /** Override the default per-variant icon. Pass `null` to render no icon. */
  icon?: ReactNode;
  /** Override the default close icon (× glyph). */
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
      liveRegion,
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
    const renderedIcon = icon === undefined ? VARIANT_GLYPH[variant] : icon;
    const renderedCloseIcon = closeIcon === undefined ? <CloseGlyph /> : closeIcon;
    const role = variant === 'danger' ? 'alert' : 'status';
    const resolvedLiveRegion = liveRegion ?? (variant === 'danger' ? 'assertive' : 'polite');
    return (
      <div
        ref={ref}
        role={role}
        aria-live={resolvedLiveRegion}
        aria-atomic="true"
        className={clsx('utrecht-alert', 'tilburg-alert', `utrecht-alert--${VARIANT_TO_UTRECHT[variant]}`, className)}
        {...restProps}
      >
        <div className="utrecht-alert__icon">{renderedIcon && <IconWrap>{renderedIcon}</IconWrap>}</div>
        <div className="utrecht-alert__content">
          {title && <HeadingTag className="tilburg-alert__title">{title}</HeadingTag>}
          <div className="utrecht-alert__message">{children}</div>
        </div>
        {closable && (
          <button type="button" className="tilburg-alert__close" aria-label={closeButtonAriaLabel} onClick={onClose}>
            {renderedCloseIcon && <IconWrap>{renderedCloseIcon}</IconWrap>}
          </button>
        )}
      </div>
    );
  },
);

Alert.displayName = 'Alert';
