import '@gemeente-tilburg/components-css/textarea/index.scss';
import clsx from 'clsx';
import { ForwardedRef, forwardRef, TextareaHTMLAttributes } from 'react';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

export const Textarea = forwardRef(
  (
    { invalid, required, disabled, readOnly, className, ...restProps }: TextareaProps,
    ref: ForwardedRef<HTMLTextAreaElement>,
  ) => (
    <textarea
      ref={ref}
      required={required}
      disabled={disabled}
      readOnly={readOnly}
      aria-invalid={invalid ? 'true' : undefined}
      aria-required={required ? 'true' : undefined}
      className={clsx(
        'utrecht-textarea',
        disabled && 'utrecht-textarea--disabled',
        invalid && 'utrecht-textarea--invalid',
        readOnly && 'utrecht-textarea--readonly',
        required && 'utrecht-textarea--required',
        className,
      )}
      {...restProps}
    />
  ),
);

Textarea.displayName = 'Textarea';
