import '@gemeente-tilburg/components-css/heading-4/index.scss';
import { createElement, ForwardedRef, forwardRef, HTMLAttributes, PropsWithChildren } from 'react';

export type Heading4Props = HTMLAttributes<HTMLHeadingElement>;

export const Heading4 = forwardRef(
  ({ className, children, ...restProps }: PropsWithChildren<Heading4Props>, ref: ForwardedRef<HTMLHeadingElement>) =>
    createElement(
      'utrecht-heading-4',
      { className },
      <h4 ref={ref} className="utrecht-heading-4" {...restProps}>
        {children}
      </h4>,
    ),
);

Heading4.displayName = 'Heading4';
