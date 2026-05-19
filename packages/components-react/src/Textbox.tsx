import '@gemeente-tilburg/components-css/textbox/index.scss';
import clsx from 'clsx';
import { ForwardedRef, forwardRef, InputHTMLAttributes } from 'react';

export interface TextboxProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

export const Textbox = forwardRef(
  (
    { invalid, required, disabled, readOnly, type = 'text', className, ...restProps }: TextboxProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => (
    <input
      ref={ref}
      type={type}
      required={required}
      disabled={disabled}
      readOnly={readOnly}
      aria-invalid={invalid ? 'true' : undefined}
      aria-required={required ? 'true' : undefined}
      className={clsx(
        'utrecht-textbox',
        'utrecht-textbox--html-input',
        disabled && 'utrecht-textbox--disabled',
        invalid && 'utrecht-textbox--invalid',
        readOnly && 'utrecht-textbox--readonly',
        required && 'utrecht-textbox--required',
        className,
      )}
      {...restProps}
    />
  ),
);

Textbox.displayName = 'Textbox';
