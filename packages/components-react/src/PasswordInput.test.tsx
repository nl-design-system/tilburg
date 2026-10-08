import { fireEvent, render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { PasswordInput } from './PasswordInput';
import '@testing-library/jest-dom';

describe('PasswordInput', () => {
  it('renders a password textbox with a toggle button that is not pressed, and an empty status line', () => {
    const { container } = render(
      <>
        <label htmlFor="pw">Wachtwoord</label>
        <PasswordInput id="pw" autoComplete="current-password" />
      </>,
    );
    const input = screen.getByLabelText('Wachtwoord');
    expect(input).toHaveAttribute('type', 'password');
    expect(input).toHaveClass('utrecht-textbox', 'utrecht-textbox--html-input');
    const toggle = screen.getByRole('button', { name: 'Wachtwoord tonen' });
    expect(toggle).toHaveAttribute('aria-pressed', 'false');
    expect(toggle).toHaveAttribute('aria-controls', 'pw');
    expect(container.querySelector('.tilburg-password-input__status')).toHaveTextContent('');
  });

  it('shows and hides the password, keeping the label and reporting the state', () => {
    const { container } = render(<PasswordInput id="pw" aria-label="Wachtwoord" />);
    const toggle = screen.getByRole('button', { name: 'Wachtwoord tonen' });
    const status = container.querySelector('.tilburg-password-input__status')!;
    fireEvent.click(toggle);
    expect(screen.getByLabelText('Wachtwoord')).toHaveAttribute('type', 'text');
    expect(toggle).toHaveAttribute('aria-pressed', 'true');
    expect(toggle).toHaveAccessibleName('Wachtwoord tonen');
    expect(status).toHaveTextContent('Wachtwoord is zichtbaar.');
    fireEvent.click(toggle);
    expect(screen.getByLabelText('Wachtwoord')).toHaveAttribute('type', 'password');
    expect(toggle).toHaveAttribute('aria-pressed', 'false');
    expect(status).toHaveTextContent('Wachtwoord is verborgen.');
  });

  it('forwards the ref and textbox props, disables the toggle with the input and takes other texts', () => {
    const ref = createRef<HTMLInputElement>();
    render(<PasswordInput ref={ref} aria-label="Password" invalid disabled toggleLabel="Show password" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current).toHaveAttribute('aria-invalid', 'true');
    expect(ref.current).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Show password' })).toBeDisabled();
  });
});
