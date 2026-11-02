import { render } from '@testing-library/react';
import { createRef } from 'react';
import { CodeBlock } from './CodeBlock';
import '@testing-library/jest-dom';

describe('CodeBlock', () => {
  it('renders <pre class="utrecht-code-block"><code class="utrecht-code-block__content">', () => {
    const { container } = render(<CodeBlock className="extra">{'regel 1\n  regel 2'}</CodeBlock>);
    const pre = container.firstElementChild!;
    expect(pre.tagName).toBe('PRE');
    expect(pre).toHaveClass('utrecht-code-block', 'extra');
    const code = pre.querySelector(':scope > code.utrecht-code-block__content')!;
    expect(code.textContent).toBe('regel 1\n  regel 2');
  });

  it('puts attributes on the <pre> and forwards the ref to it', () => {
    const ref = createRef<HTMLPreElement>();
    render(
      <CodeBlock ref={ref} id="x">
        x
      </CodeBlock>,
    );
    expect(ref.current?.tagName).toBe('PRE');
    expect(ref.current).toHaveAttribute('id', 'x');
  });
});
