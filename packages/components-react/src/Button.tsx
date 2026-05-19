import '@gemeente-tilburg/components-css/button/index.scss';
import clsx from 'clsx';
import { ButtonHTMLAttributes, ForwardedRef, forwardRef, PropsWithChildren } from 'react';

export type ButtonAppearance = 'primary-action-button' | 'secondary-action-button' | 'subtle-button';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  appearance?: ButtonAppearance;
  size?: ButtonSize;
  pressed?: boolean;
  busy?: boolean;
}

const APPEARANCE_CLASS: Record<ButtonAppearance, string> = {
  'primary-action-button': 'utrecht-button--primary-action',
  'secondary-action-button': 'utrecht-button--secondary-action',
  'subtle-button': 'utrecht-button--subtle',
};

export const Button = forwardRef(
  (
    {
      appearance,
      size = 'medium',
      pressed,
      busy,
      disabled,
      type = 'button',
      title,
      'aria-label': ariaLabel,
      className,
      children,
      ...restProps
    }: PropsWithChildren<ButtonProps>,
    ref: ForwardedRef<HTMLButtonElement>,
  ) => (
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      title={title}
      /* Matches Angular's `aria-label || title || null` cascade: if the
         consumer hasn't provided an explicit aria-label, fall back to the
         visible title so icon-only buttons get an accessible name. */
      aria-label={ariaLabel ?? title}
      aria-pressed={pressed === undefined ? undefined : pressed ? 'true' : 'false'}
      className={clsx(
        'utrecht-button',
        `tilburg-${size}`,
        appearance && APPEARANCE_CLASS[appearance],
        busy && 'utrecht-button--busy',
        disabled && 'utrecht-button--disabled',
        pressed === true && 'utrecht-button--pressed',
        type === 'submit' && 'utrecht-button--submit',
        className,
      )}
      {...restProps}
    >
      {children}
    </button>
  ),
);

Button.displayName = 'Button';
