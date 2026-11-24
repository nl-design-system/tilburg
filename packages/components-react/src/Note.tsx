import '@gemeente-tilburg/components-css/note/index.scss';
import clsx from 'clsx';
import { ForwardedRef, forwardRef, HTMLAttributes, PropsWithChildren } from 'react';

export type NoteVariant = 'info' | 'success' | 'warning' | 'danger';

/* Same API values as Alert; the DOM uses Utrecht's note modifiers (danger → error). */
const VARIANT_TO_UTRECHT: Record<NoteVariant, string> = {
  info: 'info',
  success: 'success',
  warning: 'warning',
  danger: 'error',
};

export interface NoteProps extends HTMLAttributes<HTMLElement> {
  /** Feedback colour; none gives the neutral grey note. */
  variant?: NoteVariant;
  /** Render `<aside>` (a complementary landmark) instead of `<section role="note">`. */
  aside?: boolean;
}

export const Note = forwardRef(
  (
    { variant, aside = false, className, children, ...restProps }: PropsWithChildren<NoteProps>,
    ref: ForwardedRef<HTMLElement>,
  ) => {
    const Element = aside ? 'aside' : 'section';
    return (
      <Element
        ref={ref}
        role={aside ? undefined : 'note'}
        className={clsx('utrecht-note', variant && `utrecht-note--${VARIANT_TO_UTRECHT[variant]}`, className)}
        {...restProps}
      >
        {children}
      </Element>
    );
  },
);

Note.displayName = 'Note';
