import '@gemeente-tilburg/components-css/form/index.scss';
import clsx from 'clsx';
import { FormHTMLAttributes, ForwardedRef, forwardRef, PropsWithChildren } from 'react';

export type FormProps = FormHTMLAttributes<HTMLFormElement>;

export const Form = forwardRef(
  ({ className, children, ...restProps }: PropsWithChildren<FormProps>, ref: ForwardedRef<HTMLFormElement>) => (
    <form ref={ref} className={clsx('utrecht-form', className)} {...restProps}>
      {children}
    </form>
  ),
);

Form.displayName = 'Form';
