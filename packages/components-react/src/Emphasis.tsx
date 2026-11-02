import clsx from 'clsx';
import { ForwardedRef, forwardRef, HTMLAttributes, PropsWithChildren } from 'react';

export interface EmphasisProps extends HTMLAttributes<HTMLElement> {
  strong?: boolean;
}

export const Emphasis = forwardRef(
  ({ strong, className, children, ...restProps }: PropsWithChildren<EmphasisProps>, ref: ForwardedRef<HTMLElement>) => {
    const Tag = strong ? 'strong' : 'em';
    return (
      <Tag
        ref={ref}
        className={clsx(
          'utrecht-emphasis',
          strong ? 'utrecht-emphasis--strong' : 'utrecht-emphasis--stressed',
          className,
        )}
        {...restProps}
      >
        {children}
      </Tag>
    );
  },
);

Emphasis.displayName = 'Emphasis';
