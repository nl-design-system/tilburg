import '@gemeente-tilburg/components-css/language-toggle/index.scss';
import clsx from 'clsx';
import { ButtonHTMLAttributes, ForwardedRef, forwardRef, KeyboardEvent, MouseEvent } from 'react';

export interface LanguageOption {
  code: string;
  label: string;
}

export interface LanguageToggleProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange' | 'onToggle'> {
  options?: LanguageOption[];
  active?: string | null;
  // eslint-disable-next-line no-unused-vars
  onToggle?: (code: string) => void;
}

const DEFAULT_OPTIONS: LanguageOption[] = [
  { code: 'NL', label: 'NL' },
  { code: 'EN', label: 'EN' },
];

export const LanguageToggle = forwardRef(
  (
    {
      options = DEFAULT_OPTIONS,
      active = 'NL',
      onToggle,
      onClick,
      onKeyDown,
      'aria-label': ariaLabel = 'Switch language',
      className,
      ...restProps
    }: LanguageToggleProps,
    ref: ForwardedRef<HTMLButtonElement>,
  ) => {
    const emitNext = () => {
      if (!options.length || !onToggle) {
        return;
      }
      const idx = options.findIndex((opt) => opt.code === active);
      const nextIdx = (idx + 1) % options.length;
      onToggle(options[nextIdx]?.code ?? options[0].code);
    };

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
      if (event.defaultPrevented) return;
      emitNext();
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
      onKeyDown?.(event);
      if (event.defaultPrevented) return;
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        emitNext();
      }
    };

    const lastIsActive = options.length > 0 && options[options.length - 1].code === active;

    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-label={ariaLabel}
        aria-checked={lastIsActive ? 'true' : 'false'}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={clsx(
          'tilburg-language-toggle',
          'utrecht-button',
          'utrecht-button--html-button',
          'utrecht-button--secondary-action',
          className,
        )}
        {...restProps}
      >
        {options.map((option) => (
          <span
            key={option.code}
            className={clsx(
              'tilburg-language-toggle__option',
              option.code === active && 'tilburg-language-toggle__option--active',
            )}
          >
            {option.label}
          </span>
        ))}
      </button>
    );
  },
);

LanguageToggle.displayName = 'LanguageToggle';
