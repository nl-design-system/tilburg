import clsx from 'clsx';
import { ForwardedRef, forwardRef, HTMLAttributes, PropsWithChildren } from 'react';

export type PreHeadingProps = HTMLAttributes<HTMLParagraphElement>;

export const PreHeading = forwardRef(
  (
    { className, children, ...restProps }: PropsWithChildren<PreHeadingProps>,
    ref: ForwardedRef<HTMLParagraphElement>,
  ) => (
    <p ref={ref} className={clsx('utrecht-pre-heading', className)} {...restProps}>
      {children}
    </p>
  ),
);

PreHeading.displayName = 'PreHeading';
