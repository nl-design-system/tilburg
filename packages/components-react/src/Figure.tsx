import '@gemeente-tilburg/components-css/figure/index.scss';
import clsx from 'clsx';
import { ForwardedRef, forwardRef, HTMLAttributes, PropsWithChildren, ReactNode } from 'react';

export interface FigureProps extends HTMLAttributes<HTMLElement> {
  caption?: ReactNode;
}

export const Figure = forwardRef(
  ({ caption, className, children, ...restProps }: PropsWithChildren<FigureProps>, ref: ForwardedRef<HTMLElement>) => (
    <figure ref={ref} className={clsx('utrecht-figure', className)} {...restProps}>
      {children}
      {caption && <figcaption className="utrecht-figure__caption">{caption}</figcaption>}
    </figure>
  ),
);

Figure.displayName = 'Figure';
