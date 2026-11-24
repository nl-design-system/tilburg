import { render } from '@testing-library/react';
import { createRef } from 'react';
import { Emphasis } from './Emphasis';
import '@testing-library/jest-dom';

describe('Emphasis', () => {
  it('renders a stressed <em> by default', () => {
    const { container } = render(<Emphasis className="extra">niet</Emphasis>);
    const element = container.firstElementChild!;
    expect(element.tagName).toBe('EM');
    expect(element).toHaveClass('utrecht-emphasis', 'utrecht-emphasis--stressed', 'extra');
  });

  it('renders <strong> with the strong modifier when strong is set', () => {
    const { container } = render(<Emphasis strong>belangrijk</Emphasis>);
    const element = container.firstElementChild!;
    expect(element.tagName).toBe('STRONG');
    expect(element).toHaveClass('utrecht-emphasis', 'utrecht-emphasis--strong');
    expect(element).not.toHaveClass('utrecht-emphasis--stressed');
  });

  it('forwards the ref', () => {
    const ref = createRef<HTMLElement>();
    render(<Emphasis ref={ref}>x</Emphasis>);
    expect(ref.current?.tagName).toBe('EM');
  });
});
