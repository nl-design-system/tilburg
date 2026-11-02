import { render } from '@testing-library/react';
import { createRef } from 'react';
import { Backdrop } from './Backdrop';
import '@testing-library/jest-dom';

describe('Backdrop', () => {
  it('renders the HTML/CSS reference markup', () => {
    const { container } = render(<Backdrop className="extra">x</Backdrop>);
    const backdrop = container.firstElementChild!;
    expect(backdrop.tagName).toBe('DIV');
    expect(backdrop).toHaveClass('utrecht-backdrop', 'extra');
    expect(backdrop).not.toHaveClass('utrecht-backdrop--viewport');
    expect(backdrop).toHaveTextContent('x');
  });

  it('covers the viewport with viewport', () => {
    const { container } = render(<Backdrop viewport />);
    expect(container.firstElementChild).toHaveClass('utrecht-backdrop--viewport');
  });

  it('forwards the ref', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Backdrop ref={ref} />);
    expect(ref.current).toHaveClass('utrecht-backdrop');
  });
});
