import { render } from '@testing-library/react';
import { createRef } from 'react';
import { Icon } from './Icon';
import '@testing-library/jest-dom';

describe('Icon', () => {
  it('renders a hidden utrecht-icon span around the svg', () => {
    const { container } = render(
      <Icon className="extra">
        <svg />
      </Icon>,
    );
    const span = container.querySelector('span')!;
    expect(span).toHaveClass('utrecht-icon', 'extra');
    expect(span).toHaveAttribute('aria-hidden', 'true');
    expect(span.querySelector('svg')).not.toBeNull();
  });

  it('supports ForwardRef', () => {
    const ref = createRef<HTMLSpanElement>();
    render(<Icon ref={ref} />);
    expect(ref.current?.tagName).toBe('SPAN');
  });
});
