import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { Paragraph } from './Paragraph';
import '@testing-library/jest-dom';

describe('Paragraph', () => {
  it('renders a paragraph element', () => {
    render(<Paragraph>hello</Paragraph>);
    expect(screen.getByText('hello').tagName).toBe('P');
  });

  it('renders rich text children', () => {
    const { container } = render(
      <Paragraph>
        hello <strong>world</strong>
      </Paragraph>,
    );
    expect(container.querySelector('strong')).toBeInTheDocument();
  });

  it('supports ForwardRef', () => {
    const ref = createRef<HTMLParagraphElement>();
    render(<Paragraph ref={ref}>x</Paragraph>);
    expect(ref.current?.tagName).toBe('P');
  });
});
