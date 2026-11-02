import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { LinkButton } from './LinkButton';
import '@testing-library/jest-dom';

describe('LinkButton', () => {
  it('renders a type="button" <button> with the link-button classes', () => {
    render(<LinkButton>Vorige stap</LinkButton>);
    const button = screen.getByRole('button', { name: 'Vorige stap' });
    expect(button).toHaveAttribute('type', 'button');
    expect(button).toHaveClass('utrecht-link-button', 'utrecht-link-button--html-button');
    expect(button).not.toHaveAttribute('aria-pressed');
    expect(button.className).not.toMatch(/--inline|--pressed|--disabled/);
  });

  it('maps inline, pressed and disabled', () => {
    render(
      <LinkButton inline pressed disabled type="submit">
        Verberg details
      </LinkButton>,
    );
    const button = screen.getByRole('button');
    expect(button).toHaveClass(
      'utrecht-link-button--inline',
      'utrecht-link-button--pressed',
      'utrecht-link-button--disabled',
    );
    expect(button).toHaveAttribute('aria-pressed', 'true');
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('type', 'submit');
  });

  it('renders aria-pressed="false" for pressed={false}', () => {
    render(<LinkButton pressed={false}>Toon details</LinkButton>);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-pressed', 'false');
    expect(button).not.toHaveClass('utrecht-link-button--pressed');
  });

  it('forwards the ref and extra attributes', () => {
    const ref = createRef<HTMLButtonElement>();
    render(
      <LinkButton ref={ref} aria-label="Terug" className="extra">
        x
      </LinkButton>,
    );
    expect(ref.current).toBe(screen.getByRole('button', { name: 'Terug' }));
    expect(ref.current).toHaveClass('extra');
  });
});
