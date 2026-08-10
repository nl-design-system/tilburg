import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { RadioButton } from './RadioButton';
import '@testing-library/jest-dom';

describe('RadioButton', () => {
  it('renders the same classes as the HTML/CSS reference markup', () => {
    const { container } = render(<RadioButton />);
    const input = container.querySelector('input[type="radio"]');
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass('utrecht-radio-button');
    expect(input).toHaveClass('utrecht-radio-button--html-input');
  });

  it('renders a radio role element that can be labelled by a sibling label', () => {
    render(
      <>
        <RadioButton id="rb-test" name="delivery" value="email" />
        <label className="utrecht-form-label utrecht-form-label--radio" htmlFor="rb-test">
          E-mail
        </label>
      </>,
    );
    expect(screen.getByRole('radio', { name: 'E-mail' })).toBeInTheDocument();
  });

  it('supports ForwardRef in React', () => {
    const ref = createRef<HTMLInputElement>();
    const { container } = render(<RadioButton ref={ref} />);
    expect(ref.current).toBe(container.querySelector(':only-child'));
  });

  it('marks an invalid radio button for assistive technology', () => {
    render(<RadioButton invalid />);
    const input = screen.getByRole('radio');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveClass('utrecht-radio-button--invalid');
  });

  it('marks a required radio button for assistive technology', () => {
    render(<RadioButton required />);
    const input = screen.getByRole('radio');
    expect(input).toBeRequired();
    expect(input).toHaveAttribute('aria-required', 'true');
    expect(input).toHaveClass('utrecht-radio-button--required');
  });

  it('disables the input and marks it with the disabled modifier', () => {
    render(<RadioButton disabled />);
    const input = screen.getByRole('radio');
    expect(input).toBeDisabled();
    expect(input).toHaveClass('utrecht-radio-button--disabled');
  });

  it('keeps a custom className next to the component classes', () => {
    render(<RadioButton className="custom" />);
    const input = screen.getByRole('radio');
    expect(input).toHaveClass('custom');
    expect(input).toHaveClass('utrecht-radio-button');
  });

  it('spreads remaining input attributes onto the input', () => {
    render(<RadioButton name="delivery" value="email" defaultChecked />);
    const input = screen.getByRole('radio');
    expect(input).toHaveAttribute('name', 'delivery');
    expect(input).toHaveAttribute('value', 'email');
    expect(input).toBeChecked();
  });
});
