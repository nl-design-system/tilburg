import { render } from '@testing-library/react';
import { IbanData } from './IbanData';
import { ibanGroups, normalizeIban } from './utils/data-format';
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

  it('puts each group of four in a nowrap span, with spaces between the groups', () => {
    const { container } = render(<IbanData value="MU43BOMM0101123456789101000MUR" />);
    const groups = Array.from(container.querySelectorAll('data > span.tilburg-iban-data__group'), (s) => s.textContent);
    expect(groups).toEqual(['MU43', 'BOMM', '0101', '1234', '5678', '9101', '000M', 'UR']);
    expect(container.firstElementChild!.textContent).toBe('MU43 BOMM 0101 1234 5678 9101 000M UR');
  });
});

describe('IBAN formatting (utils/data-format)', () => {
  it('normalizes to upper-case letters and digits only', () => {
    expect(normalizeIban(' mu43 BOMM 0101 1234 5678 9101 000-MUR\r\n')).toBe('MU43BOMM0101123456789101000MUR');
    expect(normalizeIban('NL91_ABNA.0417+1643/00')).toBe('NL91ABNA0417164300');
  });

  it('splits in groups of four, the last one shorter', () => {
    expect(ibanGroups('NL91ABNA0417164300')).toEqual(['NL91', 'ABNA', '0417', '1643', '00']);
    expect(ibanGroups('NL91ABNA')).toEqual(['NL91', 'ABNA']);
    expect(ibanGroups('')).toEqual([]);
  });
});
