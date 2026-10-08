import '@gemeente-tilburg/components-css/validation-message/index.scss';
import clsx from 'clsx';
import { ForwardedRef, forwardRef, HTMLAttributes, PropsWithChildren, ReactNode } from 'react';

export type ValidationMessageType = 'error' | 'warning';
export type ValidationLiveRegion = 'polite' | 'assertive' | 'off';

/* Default per-type glyphs that match the CSS-class storybook reference. */
const CircleIcon = () => (
  <svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
    <path d="M10 1a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm1 13H9v-2h2v2Zm0-4H9V5h2v5Z" />
  </svg>
);
const TriangleIcon = () => (
  <svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
    <path d="M10 1 1 19h18L10 1Zm0 5 1 7h-2l1-7Zm0 9a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z" />
  </svg>
);

const TYPE_GLYPH: Record<ValidationMessageType, ReactNode> = {
  error: <CircleIcon />,
  warning: <TriangleIcon />,
};

/* The role follows the live region, so they never contradict each other: `assertive` (default, as in bq-tlb-frontend) is an
   alert, `polite` a status, `off` no live role at all. */
const LIVE_ROLE: Record<ValidationLiveRegion, 'alert' | 'status' | undefined> = {
  assertive: 'alert',
  polite: 'status',
  off: undefined,
};

export interface ValidationMessageProps extends HTMLAttributes<HTMLDivElement> {
  type?: ValidationMessageType;
  ariaLive?: ValidationLiveRegion;
  /** Override the default per-type icon. Pass `null` to render no icon. */
  icon?: ReactNode;
}

export const ValidationMessage = forwardRef(
  (
    {
      type = 'error',
      ariaLive = 'assertive',
      icon,
      className,
      children,
      ...restProps
    }: PropsWithChildren<ValidationMessageProps>,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const isError = type === 'error';
    const isWarning = type === 'warning';
    const renderedIcon = icon === undefined ? TYPE_GLYPH[type] : icon;
    return (
      <div
        ref={ref}
        role={LIVE_ROLE[ariaLive]}
        aria-live={ariaLive}
        className={clsx(
          'tilburg-validation-message',
          isError && 'utrecht-form-field-error-message',
          isError && 'tilburg-validation-message--error',
          isWarning && 'utrecht-form-field-description',
          isWarning && 'utrecht-form-field-description--warning',
          isWarning && 'tilburg-validation-message--warning',
          className,
        )}
        {...restProps}
      >
        <span className="tilburg-validation-message__icon" aria-hidden="true">
          {renderedIcon}
        </span>
        <span>{children}</span>
      </div>
    );
  },
);

ValidationMessage.displayName = 'ValidationMessage';
