import { fireEvent, render, screen } from '@testing-library/react';
import { LanguageToggle } from './LanguageToggle';
import '@testing-library/jest-dom';

describe('LanguageToggle', () => {
  it('renders a role="switch" button with default options', () => {
    render(<LanguageToggle />);
    const btn = screen.getByRole('switch');
    expect(btn).toBeInTheDocument();
    expect(screen.getByText('NL')).toBeInTheDocument();
    expect(screen.getByText('EN')).toBeInTheDocument();
  });

  it('marks the active option with the active modifier class', () => {
    render(<LanguageToggle active="EN" />);
    expect(screen.getByText('EN')).toHaveClass('tilburg-language-toggle__option--active');
    expect(screen.getByText('NL')).not.toHaveClass('tilburg-language-toggle__option--active');
  });

  it('cycles to the next option on click', () => {
    const onToggle = jest.fn();
    render(<LanguageToggle active="NL" onToggle={onToggle} />);
    fireEvent.click(screen.getByRole('switch'));
    expect(onToggle).toHaveBeenCalledWith('EN');
  });

  it('cycles back to first option after the last', () => {
    const onToggle = jest.fn();
    render(<LanguageToggle active="EN" onToggle={onToggle} />);
    fireEvent.click(screen.getByRole('switch'));
    expect(onToggle).toHaveBeenCalledWith('NL');
  });

  it('cycles on Enter and Space keys', () => {
    const onToggle = jest.fn();
    render(<LanguageToggle active="NL" onToggle={onToggle} />);
    const btn = screen.getByRole('switch');
    fireEvent.keyDown(btn, { key: 'Enter' });
    fireEvent.keyDown(btn, { key: ' ' });
    expect(onToggle).toHaveBeenCalledTimes(2);
  });

  it('aria-checked reflects whether the last option is active', () => {
    const { rerender } = render(<LanguageToggle active="NL" />);
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');
    rerender(<LanguageToggle active="EN" />);
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
  });
});
