import { render } from '@testing-library/react';
import { createRef } from 'react';
import { Superscript } from './Superscript';
import '@testing-library/jest-dom';

describe('Superscript', () => {
  it('renders <sup class="utrecht-superscript"> around its children', () => {
    const { container } = render(<Superscript className="extra">tekst</Superscript>);
    const element = container.firstElementChild!;
    expect(element.tagName).toBe('SUP');
    expect(element).toHaveClass('utrecht-superscript', 'extra');
    expect(element).toHaveTextContent('tekst');
  });

  it('passes attributes through and forwards the ref', () => {
    const ref = createRef<HTMLElement>();
    render(
      <Superscript ref={ref} id="x" lang="en">
        tekst
      </Superscript>,
    );
    expect(ref.current?.tagName).toBe('SUP');
    expect(ref.current).toHaveAttribute('id', 'x');
    expect(ref.current).toHaveAttribute('lang', 'en');
  });
});

describe('Superscript openType', () => {
  it('adds the open-type modifier only when set', () => {
    const { container, rerender } = render(<Superscript>2</Superscript>);
    expect(container.firstElementChild).not.toHaveClass('utrecht-superscript--open-type');
    rerender(<Superscript openType>2</Superscript>);
    expect(container.firstElementChild).toHaveClass('utrecht-superscript', 'utrecht-superscript--open-type');
  });
});
