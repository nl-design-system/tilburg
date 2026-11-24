import { fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';
import { FormToggle } from './FormToggle';
import '@testing-library/jest-dom';

describe('FormToggle', () => {
  it('renders the reference DOM: a switch checkbox and a track label pointing at it', () => {
    const { container } = render(<FormToggle id="meldingen" name="meldingen" aria-label="E-mailmeldingen" />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('utrecht-form-toggle', 'utrecht-form-toggle--html-checkbox');
    const input = screen.getByRole('switch', { name: 'E-mailmeldingen' });
    expect(input).toHaveAttribute('type', 'checkbox');
    expect(input).toHaveClass('utrecht-form-toggle__checkbox');
    expect(input).toHaveAttribute('name', 'meldingen');
    const track = wrapper.querySelector('label')!;
    expect(track).toHaveClass('utrecht-form-toggle__track', 'utrecht-form-toggle__track--html-label');
    expect(track).toHaveAttribute('for', 'meldingen');
    expect(track.querySelector('span.utrecht-form-toggle__thumb')).toBeInTheDocument();
  });

  it('generates an id when none is given, so the track label still works', () => {
    const { container } = render(<FormToggle aria-label="x" />);
    const input = screen.getByRole('switch');
    expect(input.id).not.toBe('');
    fireEvent.click(container.querySelector('label')!);
    expect(input).toBeChecked();
  });

  it('maps invalid, required and disabled to ARIA, attributes and modifiers', () => {
    const { container } = render(<FormToggle aria-label="x" invalid required disabled />);
    expect(container.firstChild).toHaveClass(
      'utrecht-form-toggle--invalid',
      'utrecht-form-toggle--required',
      'utrecht-form-toggle--disabled',
    );
    const input = screen.getByRole('switch');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-required', 'true');
    expect(input).toBeRequired();
    expect(input).toBeDisabled();
  });

  it('works uncontrolled with defaultChecked', () => {
    render(<FormToggle aria-label="x" defaultChecked />);
    const input = screen.getByRole('switch');
    expect(input).toBeChecked();
    fireEvent.click(input);
    expect(input).not.toBeChecked();
  });

  it('works controlled with checked + onChange', () => {
    const Controlled = () => {
      const [on, setOn] = useState(false);
      return (
        <>
          <FormToggle aria-label="x" checked={on} onChange={(event) => setOn(event.target.checked)} />
          <output>{on ? 'aan' : 'uit'}</output>
        </>
      );
    };
    render(<Controlled />);
    fireEvent.click(screen.getByRole('switch'));
    expect(screen.getByRole('switch')).toBeChecked();
    expect(screen.getByText('aan')).toBeInTheDocument();
  });

  it('forwards the ref to the input and puts className on the wrapper', () => {
    const ref = { current: null as HTMLInputElement | null };
    const { container } = render(<FormToggle ref={ref} aria-label="x" className="extra" />);
    expect(ref.current).toBe(screen.getByRole('switch'));
    expect(container.firstChild).toHaveClass('extra');
  });
});
