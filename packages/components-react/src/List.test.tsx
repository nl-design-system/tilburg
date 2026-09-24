import { render } from '@testing-library/react';
import { createRef } from 'react';
import { OrderedList } from './OrderedList';
import { Separator } from './Separator';
import { UnorderedList } from './UnorderedList';
import '@testing-library/jest-dom';

describe('OrderedList', () => {
  it('renders an OL with the tilburg base class', () => {
    const { container } = render(
      <OrderedList>
        <li>a</li>
      </OrderedList>,
    );
    const ol = container.querySelector('ol');
    expect(ol).toBeInTheDocument();
    expect(ol).toHaveClass('tilburg-ordered-list');
  });

  it('adds the by-letter modifier when byLetter is true', () => {
    const { container } = render(
      <OrderedList byLetter>
        <li>a</li>
      </OrderedList>,
    );
    expect(container.querySelector('ol')).toHaveClass('tilburg-ordered-list--by-letter');
  });

  it('supports ForwardRef', () => {
    const ref = createRef<HTMLOListElement>();
    render(<OrderedList ref={ref} />);
    expect(ref.current?.tagName).toBe('OL');
  });
});

describe('UnorderedList', () => {
  it('renders a UL with the tilburg base class', () => {
    const { container } = render(
      <UnorderedList>
        <li>a</li>
      </UnorderedList>,
    );
    const ul = container.querySelector('ul');
    expect(ul).toBeInTheDocument();
    expect(ul).toHaveClass('tilburg-unordered-list');
  });

  it('supports ForwardRef', () => {
    const ref = createRef<HTMLUListElement>();
    render(<UnorderedList ref={ref} />);
    expect(ref.current?.tagName).toBe('UL');
  });
});

describe('Separator', () => {
  it('renders without crashing', () => {
    const { container } = render(<Separator />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('sets aria-hidden when decorative', () => {
    const { container } = render(<Separator decorative />);
    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true');
  });

  it('omits aria-hidden when not decorative', () => {
    const { container } = render(<Separator />);
    expect(container.firstChild).not.toHaveAttribute('aria-hidden');
  });
});
