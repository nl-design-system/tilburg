import { render } from '@testing-library/react';
import { createRef } from 'react';
import { Subscript } from './Subscript';
import '@testing-library/jest-dom';

describe('Subscript', () => {
  it('renders <sub class="utrecht-subscript"> around its children', () => {
    const { container } = render(<Subscript className="extra">tekst</Subscript>);
    const element = container.firstElementChild!;
    expect(element.tagName).toBe('SUB');
    expect(element).toHaveClass('utrecht-subscript', 'extra');
    expect(element).toHaveTextContent('tekst');
  });

  it('passes attributes through and forwards the ref', () => {
    const ref = createRef<HTMLElement>();
    render(
      <Subscript ref={ref} id="x" lang="en">
        tekst
      </Subscript>,
    );
    expect(ref.current?.tagName).toBe('SUB');
    expect(ref.current).toHaveAttribute('id', 'x');
    expect(ref.current).toHaveAttribute('lang', 'en');
  });
});

describe('Subscript openType', () => {
  it('adds the open-type modifier only when set', () => {
    const { container, rerender } = render(<Subscript>2</Subscript>);
    expect(container.firstElementChild).not.toHaveClass('utrecht-subscript--open-type');
    rerender(<Subscript openType>2</Subscript>);
    expect(container.firstElementChild).toHaveClass('utrecht-subscript', 'utrecht-subscript--open-type');
  });
});
