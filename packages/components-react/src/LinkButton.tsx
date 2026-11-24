import '@gemeente-tilburg/components-css/link-button/index.scss';
import clsx from 'clsx';
import { ButtonHTMLAttributes, ForwardedRef, forwardRef, PropsWithChildren } from 'react';

export interface LinkButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  inline?: boolean;
  pressed?: boolean;
}

export const LinkButton = forwardRef(
  (
    {
      inline,
      pressed,
      disabled,
      type = 'button',
      className,
      children,
      ...restProps
    }: PropsWithChildren<LinkButtonProps>,
    ref: ForwardedRef<HTMLButtonElement>,
  ) => (
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      aria-pressed={typeof pressed === 'boolean' ? pressed : undefined}
      className={clsx(
        'utrecht-link-button',
        'utrecht-link-button--html-button',
        {
          'utrecht-link-button--inline': inline,
          'utrecht-link-button--pressed': pressed,
          'utrecht-link-button--disabled': disabled,
        },
        className,
      )}
      {...restProps}
    >
      {children}
    </button>
  ),
);

LinkButton.displayName = 'LinkButton';
