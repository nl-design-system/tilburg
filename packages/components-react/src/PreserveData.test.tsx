import { render } from '@testing-library/react';
import { createRef } from 'react';
import { PreserveData } from './PreserveData';
import '@testing-library/jest-dom';

describe('PreserveData', () => {
  it('renders a bdi with translate="no" by default', () => {
    const { container } = render(<PreserveData className="extra">J. de Vries</PreserveData>);
    const bdi = container.firstElementChild!;
    expect(bdi.tagName).toBe('BDI');
    expect(bdi).toHaveClass('utrecht-preserve-data', 'extra');
    expect(bdi).toHaveAttribute('translate', 'no');
    expect(bdi).toHaveTextContent('J. de Vries');
    expect(bdi.children).toHaveLength(0);
  });

  it('renders a data element with value around the bdi', () => {
    const { container } = render(<PreserveData value="5038 AB">5038 AB</PreserveData>);
    const data = container.firstElementChild!;
    expect(data.tagName).toBe('DATA');
    expect(data).toHaveClass('utrecht-preserve-data');
    expect(data).toHaveAttribute('value', '5038 AB');
    expect(data.querySelector('bdi')).toHaveAttribute('translate', 'no');
  });

  it('renders a time element when dateTime is set, also with a value', () => {
    const { container } = render(
      <PreserveData dateTime="2026-05-19" value="x">
        19 mei 2026
      </PreserveData>,
    );
    const time = container.firstElementChild!;
    expect(time.tagName).toBe('TIME');
    expect(time).toHaveAttribute('datetime', '2026-05-19');
    expect(time).not.toHaveAttribute('value');
    expect(time.querySelector('bdi')).toHaveTextContent('19 mei 2026');
  });

  it('supports ForwardRef', () => {
    const ref = createRef<HTMLElement>();
    render(<PreserveData ref={ref}>x</PreserveData>);
    expect(ref.current?.tagName).toBe('BDI');
  });
});
