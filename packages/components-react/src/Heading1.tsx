import '@gemeente-tilburg/components-css/heading-1/index.scss';
import { createElement, ForwardedRef, forwardRef, HTMLAttributes, PropsWithChildren } from 'react';

export type Heading1Props = HTMLAttributes<HTMLHeadingElement>;

/* Render `<utrecht-heading-1><h1 class="utrecht-heading-1">…</h1></utrecht-heading-1>`
   to match the canonical HTML/CSS reference. The outer custom element triggers
   the Tilburg `--utrecht-heading-1-font-size` override; the inner `<h1>` carries
   the utrecht typography class. The author-provided className stays on the outer
   wrapper (matching e.g. the Alert reference: `<utrecht-heading-3 class="tilburg-alert__title">`). */
export const Heading1 = forwardRef(
  ({ className, children, ...restProps }: PropsWithChildren<Heading1Props>, ref: ForwardedRef<HTMLHeadingElement>) =>
    createElement(
      'utrecht-heading-1',
      { className },
      <h1 ref={ref} className="utrecht-heading-1" {...restProps}>
        {children}
      </h1>,
    ),
);

Heading1.displayName = 'Heading1';
