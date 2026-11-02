import { render } from '@testing-library/react';
import { IbanData } from './IbanData';
import { formatIban, normalizeIban } from './utils/data-format';
import '@testing-library/jest-dom';

describe('IbanData', () => {
  it('renders <data> with the normalized IBAN as value and groups of four as text', () => {
    const { container } = render(<IbanData value=" nl91 abna-0417 1643 00 " className="extra" />);
    const data = container.firstElementChild!;
    expect(data.tagName).toBe('DATA');
    expect(data).toHaveClass('utrecht-iban-data', 'extra');
    expect(data).toHaveAttribute('value', 'NL91ABNA0417164300');
    expect(data).toHaveAttribute('translate', 'no');
    expect(data.textContent).toBe('NL91 ABNA 0417 1643 00');
  });
});

describe('IBAN formatting (utils/data-format)', () => {
  it('normalizes to upper-case letters and digits only', () => {
    expect(normalizeIban(' mu43 BOMM 0101 1234 5678 9101 000-MUR\r\n')).toBe('MU43BOMM0101123456789101000MUR');
  });

  it('puts a space after every four characters, not at the end', () => {
    expect(formatIban('NL91ABNA0417164300')).toBe('NL91 ABNA 0417 1643 00');
    expect(formatIban('MU43BOMM0101123456789101000MUR')).toBe('MU43 BOMM 0101 1234 5678 9101 000M UR');
    expect(formatIban('NL91ABNA')).toBe('NL91 ABNA');
  });
});
