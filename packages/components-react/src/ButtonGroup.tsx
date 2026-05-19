import clsx from 'clsx';
import { ForwardedRef, forwardRef, HTMLAttributes, PropsWithChildren } from 'react';

export interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
  role?: string;
}

export const ButtonGroup = forwardRef(
  (
    { role = 'group', className, children, ...restProps }: PropsWithChildren<ButtonGroupProps>,
    ref: ForwardedRef<HTMLDivElement>,
  ) => (
    <div ref={ref} role={role} className={clsx('utrecht-button-group', className)} {...restProps}>
      {children}
    </div>
  ),
);

ButtonGroup.displayName = 'ButtonGroup';
