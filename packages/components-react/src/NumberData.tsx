import clsx from 'clsx';
import { DataHTMLAttributes, ForwardedRef, forwardRef, PropsWithChildren } from 'react';

export type NumberDataVariant = 'positive' | 'negative';

export interface NumberDataProps extends DataHTMLAttributes<HTMLDataElement> {
  /** The machine-readable number (valid floating-point number notation). */
  value?: number | string;
  /** Colours the number; still write the sign in the text. */
  variant?: NumberDataVariant;
}

export const NumberData = forwardRef(
  (
    { value, variant, className, children, ...restProps }: PropsWithChildren<NumberDataProps>,
    ref: ForwardedRef<HTMLDataElement>,
  ) => (
    <data
      ref={ref}
      value={value === undefined ? undefined : String(value)}
      className={clsx('utrecht-number-data', variant && `utrecht-number-data--${variant}`, className)}
      {...restProps}
    >
      {children}
    </data>
  ),
);

NumberData.displayName = 'NumberData';
