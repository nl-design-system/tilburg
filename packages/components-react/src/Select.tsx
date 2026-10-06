import '@gemeente-tilburg/components-css/select/index.scss';
import clsx from 'clsx';
import { ForwardedRef, forwardRef, PropsWithChildren, SelectHTMLAttributes } from 'react';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  invalid?: boolean;
}

/** A styled native `<select>`; put `<option>` (and `<optgroup>`) elements inside it. */
export const Select = forwardRef(
  (
    { invalid, required, disabled, className, children, ...restProps }: PropsWithChildren<SelectProps>,
    ref: ForwardedRef<HTMLSelectElement>,
  ) => (
    <select
      ref={ref}
      required={required}
      disabled={disabled}
      aria-invalid={invalid ? 'true' : undefined}
      aria-required={required ? 'true' : undefined}
      className={clsx(
        'utrecht-select',
        'utrecht-select--html-select',
        disabled && 'utrecht-select--disabled',
        invalid && 'utrecht-select--invalid',
        className,
      )}
      {...restProps}
    >
      {children}
    </select>
  ),
);

Select.displayName = 'Select';
