import { render } from '@testing-library/react';
import { createRef } from 'react';
import { Code } from './Code';
import '@testing-library/jest-dom';

describe('Code', () => {
  it('renders <code class="utrecht-code"> around its children', () => {
    const { container } = render(<Code className="extra">tekst</Code>);
    const element = container.firstElementChild!;
    expect(element.tagName).toBe('CODE');
    expect(element).toHaveClass('utrecht-code', 'extra');
    expect(element).toHaveTextContent('tekst');
  });

  it('passes attributes through and forwards the ref', () => {
    const ref = createRef<HTMLElement>();
    render(
      <Code ref={ref} id="x" lang="en">
        tekst
      </Code>,
    );
    expect(ref.current?.tagName).toBe('CODE');
    expect(ref.current).toHaveAttribute('id', 'x');
    expect(ref.current).toHaveAttribute('lang', 'en');
  });
});
