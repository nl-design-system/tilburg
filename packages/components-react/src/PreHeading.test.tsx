import { render } from '@testing-library/react';
import { createRef } from 'react';
import { PreHeading } from './PreHeading';
import '@testing-library/jest-dom';

describe('PreHeading', () => {
  it('renders <p class="utrecht-pre-heading"> around its children', () => {
    const { container } = render(<PreHeading className="extra">tekst</PreHeading>);
    const element = container.firstElementChild!;
    expect(element.tagName).toBe('P');
    expect(element).toHaveClass('utrecht-pre-heading', 'extra');
    expect(element).toHaveTextContent('tekst');
  });

  it('passes attributes through and forwards the ref', () => {
    const ref = createRef<HTMLParagraphElement>();
    render(
      <PreHeading ref={ref} id="x" lang="en">
        tekst
      </PreHeading>,
    );
    expect(ref.current?.tagName).toBe('P');
    expect(ref.current).toHaveAttribute('id', 'x');
    expect(ref.current).toHaveAttribute('lang', 'en');
  });
});
