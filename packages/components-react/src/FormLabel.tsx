import '@gemeente-tilburg/components-css/form-label/index.scss';
import clsx from 'clsx';
import { ForwardedRef, forwardRef, LabelHTMLAttributes, PropsWithChildren } from 'react';

export type FormLabelType = 'checkbox' | 'radio' | 'text';

export interface FormLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  type?: FormLabelType;
  checked?: boolean;
  disabled?: boolean;
}

export const FormLabel = forwardRef(
  (
    { type, checked, disabled, className, children, ...restProps }: PropsWithChildren<FormLabelProps>,
    ref: ForwardedRef<HTMLLabelElement>,
  ) => (
    <label
      ref={ref}
      className={clsx(
        'utrecht-form-label',
        type && `utrecht-form-label--${type}`,
        checked && 'utrecht-form-label--checked',
        disabled && 'utrecht-form-label--disabled',
        className,
      )}
      {...restProps}
    >
      {children}
    </label>
  ),
);

FormLabel.displayName = 'FormLabel';
