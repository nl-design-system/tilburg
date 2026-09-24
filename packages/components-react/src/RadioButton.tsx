import '@gemeente-tilburg/components-css/radio-button/index.scss';
import clsx from 'clsx';
import { ForwardedRef, forwardRef, InputHTMLAttributes } from 'react';

export interface RadioButtonProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  invalid?: boolean;
}

export const RadioButton = forwardRef(
  ({ invalid, required, disabled, className, ...restProps }: RadioButtonProps, ref: ForwardedRef<HTMLInputElement>) => (
    <input
      ref={ref}
      type="radio"
      required={required}
      disabled={disabled}
      aria-invalid={invalid ? 'true' : undefined}
      aria-required={required ? 'true' : undefined}
      className={clsx(
        'utrecht-radio-button',
        'utrecht-radio-button--html-input',
        disabled && 'utrecht-radio-button--disabled',
        invalid && 'utrecht-radio-button--invalid',
        required && 'utrecht-radio-button--required',
        className,
      )}
      {...restProps}
    />
  ),
);

RadioButton.displayName = 'RadioButton';
