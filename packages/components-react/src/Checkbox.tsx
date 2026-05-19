import '@gemeente-tilburg/components-css/checkbox/index.scss';
import clsx from 'clsx';
import { ForwardedRef, forwardRef, InputHTMLAttributes, useEffect, useImperativeHandle, useRef } from 'react';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  invalid?: boolean;
  indeterminate?: boolean;
}

export const Checkbox = forwardRef(
  (
    { invalid, indeterminate = false, required, disabled, className, ...restProps }: CheckboxProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement, []);
    useEffect(() => {
      if (inputRef.current) inputRef.current.indeterminate = indeterminate;
    }, [indeterminate]);

    return (
      <input
        ref={inputRef}
        type="checkbox"
        required={required}
        disabled={disabled}
        aria-checked={indeterminate ? 'mixed' : undefined}
        aria-invalid={invalid ? 'true' : undefined}
        aria-required={required ? 'true' : undefined}
        className={clsx(
          'utrecht-checkbox',
          'utrecht-checkbox--html-input',
          'utrecht-checkbox--custom',
          disabled && 'utrecht-checkbox--disabled',
          indeterminate && 'utrecht-checkbox--indeterminate',
          invalid && 'utrecht-checkbox--invalid',
          required && 'utrecht-checkbox--required',
          className,
        )}
        {...restProps}
      />
    );
  },
);

Checkbox.displayName = 'Checkbox';
