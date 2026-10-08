import '@gemeente-tilburg/components-css/form-fieldset/index.scss';
import clsx from 'clsx';
import { FieldsetHTMLAttributes, ForwardedRef, forwardRef, PropsWithChildren } from 'react';

export interface FieldsetProps extends FieldsetHTMLAttributes<HTMLFieldSetElement> {
  invalid?: boolean;
}

export const Fieldset = forwardRef(
  (
    { invalid, disabled, className, children, ...restProps }: PropsWithChildren<FieldsetProps>,
    ref: ForwardedRef<HTMLFieldSetElement>,
  ) => (
    <fieldset
      ref={ref}
      disabled={disabled}
      aria-invalid={invalid ? 'true' : undefined}
      className={clsx(
        'utrecht-fieldset',
        disabled && 'utrecht-fieldset--disabled',
        invalid && 'utrecht-fieldset--invalid',
        className,
      )}
      {...restProps}
    >
      {children}
    </fieldset>
  ),
);

Fieldset.displayName = 'Fieldset';
