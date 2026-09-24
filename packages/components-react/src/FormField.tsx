import '@gemeente-tilburg/components-css/form-field/index.scss';
import clsx from 'clsx';
import { ForwardedRef, forwardRef, HTMLAttributes, PropsWithChildren } from 'react';

export type FormFieldType = 'checkbox' | 'radio' | 'text';

export interface FormFieldProps extends HTMLAttributes<HTMLDivElement> {
  invalid?: boolean;
  warning?: boolean;
  type?: FormFieldType;
}

export const FormField = forwardRef(
  (
    { invalid, warning, type, className, children, ...restProps }: PropsWithChildren<FormFieldProps>,
    ref: ForwardedRef<HTMLDivElement>,
  ) => (
    <div
      ref={ref}
      className={clsx(
        'utrecht-form-field',
        type && `utrecht-form-field--${type}`,
        invalid && 'utrecht-form-field--invalid',
        warning && 'tilburg-warning',
        className,
      )}
      {...restProps}
    >
      {children}
    </div>
  ),
);

FormField.displayName = 'FormField';
