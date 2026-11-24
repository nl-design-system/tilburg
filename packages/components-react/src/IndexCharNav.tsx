import '@gemeente-tilburg/components-css/button-link/index.scss';
import '@gemeente-tilburg/components-css/index-char-nav/index.scss';
import clsx from 'clsx';
import { ForwardedRef, forwardRef, HTMLAttributes, MouseEvent } from 'react';

export interface IndexCharNavCharacter {
  char: string;
  href?: string | null;
  disabled?: boolean;
}

export interface IndexCharNavProps extends Omit<HTMLAttributes<HTMLElement>, 'aria-label' | 'onClick'> {
  characters?: IndexCharNavCharacter[];
  currentChar?: string | null;
  ariaLabel?: string;
  onCharClick?: (payload: { character: IndexCharNavCharacter; event: MouseEvent<HTMLAnchorElement> }) => void;
}

/* utrecht-only: `.utrecht-index-char-nav*` comes from the utrecht base CSS and the theme tokens; the characters
   are Tilburg button links. Renders the HTML reference by hand: utrecht's React `IndexCharNav` renders a
   `<div role="group">`. */
export const IndexCharNav = forwardRef(
  (
    {
      characters = [],
      currentChar,
      ariaLabel = 'Alfabetische index',
      onCharClick,
      className,
      ...restProps
    }: IndexCharNavProps,
    ref: ForwardedRef<HTMLElement>,
  ) => {
    if (!characters.length) return null;
    return (
      <nav ref={ref} aria-label={ariaLabel} className={clsx('utrecht-index-char-nav', className)} {...restProps}>
        {characters.map((character) => {
          const current = character.char === currentChar;
          const { disabled } = character;
          return (
            <a
              key={character.char}
              className={clsx(
                'utrecht-button-link utrecht-button-link--html-a',
                current ? 'utrecht-button-link--primary-action' : 'utrecht-button-link--secondary-action',
                disabled && 'utrecht-button-link--placeholder',
                'utrecht-index-char-nav__link',
                current && 'utrecht-index-char-nav__link--current',
                disabled && 'utrecht-index-char-nav__link--disabled',
              )}
              href={disabled ? undefined : character.href || '#'}
              role={disabled ? 'link' : undefined}
              aria-disabled={disabled ? 'true' : undefined}
              aria-current={current ? 'page' : undefined}
              onClick={disabled ? undefined : (event) => onCharClick?.({ character, event })}
            >
              {character.char}
            </a>
          );
        })}
      </nav>
    );
  },
);

IndexCharNav.displayName = 'IndexCharNav';
