import { render } from '@testing-library/react';
import { createRef } from 'react';
import { DataPlaceholder } from './DataPlaceholder';
import '@testing-library/jest-dom';

describe('DataPlaceholder', () => {
  it('renders an empty utrecht-data-placeholder span', () => {
    const { container } = render(<DataPlaceholder className="extra" />);
    const span = container.querySelector('span')!;
    expect(span).toHaveClass('utrecht-data-placeholder', 'extra');
    expect(span).not.toHaveClass('utrecht-data-placeholder--loading');
    expect(span).toBeEmptyDOMElement();
  });

  it('adds the loading modifier', () => {
    const { container } = render(<DataPlaceholder loading />);
    expect(container.querySelector('span')).toHaveClass('utrecht-data-placeholder--loading');
  });

  it('supports ForwardRef', () => {
    const ref = createRef<HTMLSpanElement>();
    render(<DataPlaceholder ref={ref} />);
    expect(ref.current?.tagName).toBe('SPAN');
  });
});
