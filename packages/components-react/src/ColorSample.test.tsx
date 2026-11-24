import { render } from '@testing-library/react';
import { createRef } from 'react';
import { ColorSample } from './ColorSample';
import '@testing-library/jest-dom';

describe('ColorSample', () => {
  it('renders a data element with the colour as value and inline color', () => {
    const { container } = render(<ColorSample color="#e00078" className="extra" style={{ margin: 0 }} />);
    const data = container.querySelector('data')!;
    expect(data).toHaveClass('utrecht-color-sample', 'extra');
    expect(data).toHaveAttribute('value', '#e00078');
    expect(data.style.color).toBe('rgb(224, 0, 120)');
    expect(data.style.margin).toBe('0px');
  });

  it('supports ForwardRef', () => {
    const ref = createRef<HTMLDataElement>();
    render(<ColorSample ref={ref} />);
    expect(ref.current?.tagName).toBe('DATA');
  });
});
