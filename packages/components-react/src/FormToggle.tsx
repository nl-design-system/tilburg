import '@gemeente-tilburg/components-css/form-toggle/index.scss';
import clsx from 'clsx';
import { ForwardedRef, forwardRef, InputHTMLAttributes, useId } from 'react';

export interface FormToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'role'> {
  invalid?: boolean;
}

/** A switch: a native checkbox with `role="switch"` (the browser keeps `checked` and handles Space), plus the track
 *  label that draws it. The track label points at the input by id, so an id is generated when none is given. */
export const FormToggle = forwardRef(
  (
    { invalid, required, disabled, className, id, hidden, ...restProps }: FormToggleProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const generatedId = useId();
    const inputId = id ?? `tilburg-form-toggle-${generatedId}`;
    return (
      <div
        className={clsx(
          'utrecht-form-toggle',
          'utrecht-form-toggle--html-checkbox',
          disabled && 'utrecht-form-toggle--disabled',
          invalid && 'utrecht-form-toggle--invalid',
          required && 'utrecht-form-toggle--required',
          className,
        )}
        hidden={hidden}
      >
        <input
          ref={ref}
          id={inputId}
          type="checkbox"
          role="switch"
          className="utrecht-form-toggle__checkbox"
          disabled={disabled}
          required={required}
          aria-invalid={invalid ? 'true' : undefined}
          aria-required={required ? 'true' : undefined}
          {...restProps}
        />
        <label htmlFor={inputId} className="utrecht-form-toggle__track utrecht-form-toggle__track--html-label">
          <span className="utrecht-form-toggle__thumb" />
        </label>
      </div>
    );
  },
);

FormToggle.displayName = 'FormToggle';
