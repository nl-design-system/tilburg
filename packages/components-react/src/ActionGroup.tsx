import '@gemeente-tilburg/components-css/action-group/index.scss';
import clsx from 'clsx';
import { ForwardedRef, forwardRef, HTMLAttributes, PropsWithChildren } from 'react';

export type ActionGroupDirection = 'row' | 'column' | 'column-stretch';

export interface ActionGroupProps extends HTMLAttributes<HTMLParagraphElement> {
  direction?: ActionGroupDirection;
}

export const ActionGroup = forwardRef(
  (
    { direction = 'row', role = 'group', className, children, ...restProps }: PropsWithChildren<ActionGroupProps>,
    ref: ForwardedRef<HTMLParagraphElement>,
  ) => (
    <p
      ref={ref}
      role={role}
      className={clsx('utrecht-action-group', `utrecht-action-group--${direction}`, className)}
      {...restProps}
    >
      {children}
    </p>
  ),
);

ActionGroup.displayName = 'ActionGroup';
