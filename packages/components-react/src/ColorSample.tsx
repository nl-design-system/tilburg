import clsx from 'clsx';
import { ForwardedRef, forwardRef, HTMLAttributes } from 'react';

export interface ColorSampleProps extends HTMLAttributes<HTMLDataElement> {
  color?: string;
}

export const ColorSample = forwardRef(
  ({ color, className, style, ...restProps }: ColorSampleProps, ref: ForwardedRef<HTMLDataElement>) => (
    <data
      ref={ref}
      className={clsx('utrecht-color-sample', className)}
      value={color}
      style={{ ...style, color }}
      {...restProps}
    />
  ),
);

ColorSample.displayName = 'ColorSample';
