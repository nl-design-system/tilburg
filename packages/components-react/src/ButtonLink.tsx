import '@gemeente-tilburg/components-css/button-link/index.scss';
import clsx from 'clsx';
import { AnchorHTMLAttributes, ForwardedRef, forwardRef, PropsWithChildren } from 'react';

export type ButtonLinkAppearance = 'primary-action-button' | 'secondary-action-button' | 'subtle-button';

export interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  appearance?: ButtonLinkAppearance;
  external?: boolean;
  placeholder?: boolean;
}

const APPEARANCE_CLASS: Record<ButtonLinkAppearance, string> = {
  'primary-action-button': 'utrecht-button-link--primary-action',
  'secondary-action-button': 'utrecht-button-link--secondary-action',
  'subtle-button': 'utrecht-button-link--subtle',
};

export const ButtonLink = forwardRef(
  (
    { appearance, external, placeholder, rel, className, children, ...restProps }: PropsWithChildren<ButtonLinkProps>,
    ref: ForwardedRef<HTMLAnchorElement>,
  ) => (
    <a
      ref={ref}
      rel={external ? 'external noopener noreferrer' : rel}
      aria-disabled={placeholder ? 'true' : undefined}
      className={clsx(
        'utrecht-button-link',
        'utrecht-button-link--html-a',
        appearance && APPEARANCE_CLASS[appearance],
        placeholder && 'utrecht-button-link--placeholder',
        className,
      )}
      {...restProps}
    >
      {children}
    </a>
  ),
);

ButtonLink.displayName = 'ButtonLink';
