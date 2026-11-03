import { fireEvent, render } from '@testing-library/react';
import { Combobox } from './Combobox';
import '@testing-library/jest-dom';

describe('Combobox', () => {
  it('moves focus to the input when the chevron opens the popover', () => {
    const { container } = render(
      <Combobox aria-label="Gemeente" items={[{ value: 'tlb', label: 'Tilburg' }]} value={null} onChange={() => {}} />,
    );
    const chevron = container.querySelector('.tilburg-combobox__chevron') as HTMLButtonElement;
    chevron.focus();
    fireEvent.click(chevron);
    expect(container.querySelector('.tilburg-combobox__input')).toHaveFocus();
    expect(container.querySelector('.tilburg-combobox__input')).toHaveAttribute('aria-expanded', 'true');
  });
});
