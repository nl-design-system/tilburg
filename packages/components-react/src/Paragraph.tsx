import clsx from 'clsx';
import { ForwardedRef, forwardRef, HTMLAttributes, PropsWithChildren } from 'react';

export interface ParagraphProps extends HTMLAttributes<HTMLParagraphElement> {
  lead?: boolean;
  small?: boolean;
}

export const Paragraph = forwardRef(
  (
    { lead, small, className, children, ...restProps }: PropsWithChildren<ParagraphProps>,
    ref: ForwardedRef<HTMLParagraphElement>,
  ) => (
    <p
      ref={ref}
      className={clsx(
        'utrecht-paragraph',
        lead && 'utrecht-paragraph--lead',
        small && 'utrecht-paragraph--small',
        className,
      )}
      {...restProps}
    >
      {children}
    </p>
  ),
);

Paragraph.displayName = 'Paragraph';
