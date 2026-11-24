import { fireEvent, render, screen } from '@testing-library/react';
import { IndexCharNav, IndexCharNavCharacter } from './IndexCharNav';
import '@testing-library/jest-dom';

const CHARACTERS: IndexCharNavCharacter[] = [
  { char: 'A', href: '#A' },
  { char: 'B', href: '#B' },
  { char: 'C', disabled: true },
  { char: 'D' },
];

describe('IndexCharNav', () => {
  it('renders button links in a named nav, the current one primary with aria-current', () => {
    render(<IndexCharNav characters={CHARACTERS} currentChar="B" />);
    const nav = screen.getByRole('navigation', { name: 'Alfabetische index' });
    expect(nav).toHaveClass('utrecht-index-char-nav');
    const a = screen.getByRole('link', { name: 'A' });
    expect(a).toHaveClass(
      'utrecht-button-link',
      'utrecht-button-link--html-a',
      'utrecht-button-link--secondary-action',
      'utrecht-index-char-nav__link',
    );
    expect(a).toHaveAttribute('href', '#A');
    expect(a).not.toHaveAttribute('aria-current');
    const b = screen.getByRole('link', { name: 'B' });
    expect(b).toHaveClass('utrecht-button-link--primary-action', 'utrecht-index-char-nav__link--current');
    expect(b).not.toHaveClass('utrecht-button-link--secondary-action');
    expect(b).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: 'D' })).toHaveAttribute('href', '#');
  });

  it('renders a disabled character as a placeholder link without href and does not report its clicks', () => {
    const onCharClick = jest.fn();
    render(<IndexCharNav characters={CHARACTERS} onCharClick={onCharClick} />);
    const c = screen.getByRole('link', { name: 'C' });
    expect(c).not.toHaveAttribute('href');
    expect(c).toHaveAttribute('aria-disabled', 'true');
    expect(c).toHaveClass('utrecht-button-link--placeholder', 'utrecht-index-char-nav__link--disabled');
    fireEvent.click(c);
    expect(onCharClick).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('link', { name: 'A' }));
    expect(onCharClick).toHaveBeenCalledWith(expect.objectContaining({ character: CHARACTERS[0] }));
  });

  it('renders nothing without characters and takes a custom aria-label', () => {
    const { container, rerender } = render(<IndexCharNav characters={[]} />);
    expect(container.firstChild).toBeNull();
    rerender(<IndexCharNav characters={CHARACTERS} ariaLabel="Index" />);
    expect(screen.getByRole('navigation', { name: 'Index' })).toBeInTheDocument();
  });
});
