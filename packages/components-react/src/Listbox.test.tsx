import { fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';
import { Listbox } from './Listbox';
import '@testing-library/jest-dom';

const items = [
  { value: 'centrum', label: 'Centrum' },
  { value: 'noord', label: 'Noord' },
  { value: 'reeshof', label: 'Reeshof' },
];

describe('Listbox', () => {
  it('renders the reference DOM', () => {
    render(<Listbox id="sd" aria-label="Stadsdeel" items={items} defaultValue="noord" />);
    const listbox = screen.getByRole('listbox', { name: 'Stadsdeel' });
    expect(listbox).toHaveClass('utrecht-listbox', 'utrecht-listbox--html-div');
    expect(listbox).toHaveAttribute('tabindex', '0');
    expect(listbox.querySelector('ul')).toHaveClass('utrecht-listbox__list');
    expect(listbox.querySelector('ul')).toHaveAttribute('role', 'presentation');
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(3);
    expect(options[0]).toHaveClass('utrecht-listbox__option', 'utrecht-listbox__option--html-li');
    expect(options[0]).toHaveAttribute('id', 'sd-opt-0');
    expect(options[0]).toHaveAttribute('aria-selected', 'false');
    expect(options[1]).toHaveAttribute('aria-selected', 'true');
    expect(options[1]).toHaveClass('utrecht-listbox__option--selected');
  });

  it('maps multiple, invalid, required and disabled to ARIA and modifiers', () => {
    render(<Listbox aria-label="x" items={items} multiple invalid required disabled />);
    const listbox = screen.getByRole('listbox');
    expect(listbox).toHaveAttribute('aria-multiselectable', 'true');
    expect(listbox).toHaveAttribute('aria-invalid', 'true');
    expect(listbox).toHaveAttribute('aria-required', 'true');
    expect(listbox).toHaveAttribute('aria-disabled', 'true');
    expect(listbox).toHaveClass('utrecht-listbox--invalid', 'utrecht-listbox--disabled');
    fireEvent.click(screen.getAllByRole('option')[0]);
    expect(screen.getAllByRole('option')[0]).toHaveAttribute('aria-selected', 'false');
  });

  it('moves the active option with the keyboard and selects with Space/Enter', () => {
    const onChange = jest.fn();
    render(<Listbox id="kb" aria-label="x" items={items} onChange={onChange} />);
    const listbox = screen.getByRole('listbox');
    fireEvent.focus(listbox);
    expect(listbox).toHaveAttribute('aria-activedescendant', 'kb-opt-0');
    fireEvent.keyDown(listbox, { key: 'ArrowDown' });
    expect(listbox).toHaveAttribute('aria-activedescendant', 'kb-opt-1');
    expect(screen.getAllByRole('option')[1]).toHaveAttribute('data-active', 'true');
    fireEvent.keyDown(listbox, { key: 'End' });
    expect(listbox).toHaveAttribute('aria-activedescendant', 'kb-opt-2');
    fireEvent.keyDown(listbox, { key: 'ArrowDown' });
    expect(listbox).toHaveAttribute('aria-activedescendant', 'kb-opt-2');
    fireEvent.keyDown(listbox, { key: ' ' });
    expect(onChange).toHaveBeenLastCalledWith('reeshof');
    fireEvent.keyDown(listbox, { key: 'Home' });
    fireEvent.keyDown(listbox, { key: 'Enter' });
    expect(onChange).toHaveBeenLastCalledWith('centrum');
    expect(screen.getAllByRole('option')[0]).toHaveAttribute('aria-selected', 'true');
    fireEvent.blur(listbox);
    expect(listbox).not.toHaveAttribute('aria-activedescendant');
  });

  it('starts on the selected option when focused', () => {
    render(<Listbox id="sel" aria-label="x" items={items} defaultValue="reeshof" />);
    const listbox = screen.getByRole('listbox');
    fireEvent.focus(listbox);
    expect(listbox).toHaveAttribute('aria-activedescendant', 'sel-opt-2');
  });

  it('toggles options in multiple mode', () => {
    const onChange = jest.fn();
    render(<Listbox aria-label="x" items={items} multiple defaultValue={['noord']} onChange={onChange} />);
    fireEvent.click(screen.getAllByRole('option')[0]);
    expect(onChange).toHaveBeenLastCalledWith(['noord', 'centrum']);
    fireEvent.click(screen.getAllByRole('option')[1]);
    expect(onChange).toHaveBeenLastCalledWith(['centrum']);
  });

  it('is controlled by value', () => {
    const Controlled = () => {
      const [value, setValue] = useState<string | null>('centrum');
      return (
        <Listbox
          aria-label="x"
          items={items}
          value={value}
          onChange={(next) => setValue(next === 'noord' ? 'reeshof' : next)}
        />
      );
    };
    render(<Controlled />);
    fireEvent.click(screen.getAllByRole('option')[1]);
    expect(screen.getAllByRole('option')[2]).toHaveAttribute('aria-selected', 'true');
    expect(screen.getAllByRole('option')[1]).toHaveAttribute('aria-selected', 'false');
  });
});
