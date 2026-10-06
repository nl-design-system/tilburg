import { fireEvent, render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { Select } from './Select';
import '@testing-library/jest-dom';

const options = (
  <>
    <option value="">Maak een keuze</option>
    <option value="centrum">Tilburg-Centrum</option>
    <option value="noord">Tilburg-Noord</option>
  </>
);

describe('Select', () => {
  it('renders a native select with the utrecht classes and its options', () => {
    render(<Select aria-label="Stadsdeel">{options}</Select>);
    const select = screen.getByRole('combobox', { name: 'Stadsdeel' });
    expect(select.tagName).toBe('SELECT');
    expect(select).toHaveClass('utrecht-select', 'utrecht-select--html-select');
    expect(screen.getAllByRole('option')).toHaveLength(3);
    expect(select).not.toHaveAttribute('aria-invalid');
  });

  it('maps invalid, required and disabled to attributes, ARIA and modifier classes', () => {
    render(
      <Select aria-label="Stadsdeel" invalid required disabled>
        {options}
      </Select>,
    );
    const select = screen.getByRole('combobox');
    expect(select).toHaveAttribute('aria-invalid', 'true');
    expect(select).toHaveAttribute('aria-required', 'true');
    expect(select).toBeRequired();
    expect(select).toBeDisabled();
    expect(select).toHaveClass('utrecht-select--invalid', 'utrecht-select--disabled');
  });

  it('forwards the ref and native props, and reports changes', () => {
    const ref = createRef<HTMLSelectElement>();
    const onChange = jest.fn();
    render(
      <Select ref={ref} aria-label="Stadsdeel" name="stadsdeel" defaultValue="" className="extra" onChange={onChange}>
        {options}
      </Select>,
    );
    expect(ref.current).toBeInstanceOf(HTMLSelectElement);
    expect(ref.current).toHaveAttribute('name', 'stadsdeel');
    expect(ref.current).toHaveClass('extra');
    fireEvent.change(ref.current!, { target: { value: 'noord' } });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(ref.current!.value).toBe('noord');
  });
});
