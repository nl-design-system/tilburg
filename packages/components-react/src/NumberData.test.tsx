import { render } from '@testing-library/react';
import { NumberData } from './NumberData';
import '@testing-library/jest-dom';

describe('NumberData', () => {
  it('renders <data class="utrecht-number-data"> with the number as value', () => {
    const { container } = render(<NumberData value={226000}>226.000</NumberData>);
    const data = container.firstElementChild!;
    expect(data.tagName).toBe('DATA');
    expect(data.className).toBe('utrecht-number-data');
    expect(data).toHaveAttribute('value', '226000');
    expect(data).toHaveTextContent('226.000');
  });

  it('maps variant to the positive/negative modifier', () => {
    const { container, rerender } = render(
      <NumberData value="-1.5" variant="negative">
        −1,5
      </NumberData>,
    );
    expect(container.firstElementChild).toHaveClass('utrecht-number-data--negative');
    rerender(
      <NumberData value="1.8" variant="positive">
        +1,8
      </NumberData>,
    );
    expect(container.firstElementChild).toHaveClass('utrecht-number-data--positive');
  });

  it('leaves value off when it is not set', () => {
    const { container } = render(<NumberData>12</NumberData>);
    expect(container.firstElementChild).not.toHaveAttribute('value');
  });
});
