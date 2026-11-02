import { render } from '@testing-library/react';
import { createRef } from 'react';
import { Mark } from './Mark';
import '@testing-library/jest-dom';

describe('Mark', () => {
  it('renders <mark class="utrecht-mark"> around its children', () => {
    const { container } = render(<Mark className="extra">tekst</Mark>);
    const element = container.firstElementChild!;
    expect(element.tagName).toBe('MARK');
    expect(element).toHaveClass('utrecht-mark', 'extra');
    expect(element).toHaveTextContent('tekst');
  });

  it('passes attributes through and forwards the ref', () => {
    const ref = createRef<HTMLElement>();
    render(
      <Mark ref={ref} id="x" lang="en">
        tekst
      </Mark>,
    );
    expect(ref.current?.tagName).toBe('MARK');
    expect(ref.current).toHaveAttribute('id', 'x');
    expect(ref.current).toHaveAttribute('lang', 'en');
  });
});
