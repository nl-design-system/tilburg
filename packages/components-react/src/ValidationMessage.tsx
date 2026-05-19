import '@gemeente-tilburg/components-css/validation-message/index.scss';
import clsx from 'clsx';
import { ForwardedRef, forwardRef, HTMLAttributes, PropsWithChildren, ReactNode } from 'react';

export type ValidationMessageType = 'error' | 'warning';
export type ValidationLiveRegion = 'polite' | 'assertive' | 'off';

export interface ValidationMessageProps extends HTMLAttributes<HTMLDivElement> {
  type?: ValidationMessageType;
  ariaLive?: ValidationLiveRegion;
  icon?: ReactNode;
}

export const ValidationMessage = forwardRef(
  (
    {
      type = 'error',
      ariaLive = 'polite',
      icon,
      className,
      children,
      ...restProps
    }: PropsWithChildren<ValidationMessageProps>,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const isError = type === 'error';
    const isWarning = type === 'warning';
    return (
      <div
        ref={ref}
        role="alert"
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
        <span className="tilburg-validation-message__icon">{icon}</span>
        <span className="tilburg-validation-message__body">{children}</span>
      </div>
    );
  },
);

ValidationMessage.displayName = 'ValidationMessage';
