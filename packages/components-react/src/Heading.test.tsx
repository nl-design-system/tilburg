import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { Heading1 } from './Heading1';
import { Heading2 } from './Heading2';
import { Heading3 } from './Heading3';
import { Heading4 } from './Heading4';
import { Heading5 } from './Heading5';
import { Heading6 } from './Heading6';
import '@testing-library/jest-dom';

describe('Heading1', () => {
  it('renders an h1 element', () => {
    render(<Heading1>x</Heading1>);
    expect(screen.getByRole('heading', { level: 1, name: 'x' })).toBeInTheDocument();
  });
  it('supports ForwardRef', () => {
    const ref = createRef<HTMLHeadingElement>();
    render(<Heading1 ref={ref}>x</Heading1>);
    expect(ref.current?.tagName).toBe('H1');
  });
});

describe('Heading2', () => {
  it('renders an h2 element', () => {
    render(<Heading2>x</Heading2>);
    expect(screen.getByRole('heading', { level: 2, name: 'x' })).toBeInTheDocument();
  });
});

describe('Heading3', () => {
  it('renders an h3 element', () => {
    render(<Heading3>x</Heading3>);
    expect(screen.getByRole('heading', { level: 3, name: 'x' })).toBeInTheDocument();
  });
});

describe('Heading4', () => {
  it('renders an h4 element', () => {
    render(<Heading4>x</Heading4>);
    expect(screen.getByRole('heading', { level: 4, name: 'x' })).toBeInTheDocument();
  });
});

describe('Heading5', () => {
  it('renders an h5 element', () => {
    render(<Heading5>x</Heading5>);
    expect(screen.getByRole('heading', { level: 5, name: 'x' })).toBeInTheDocument();
  });
});

describe('Heading6', () => {
  it('renders an h6 element', () => {
    render(<Heading6>x</Heading6>);
    expect(screen.getByRole('heading', { level: 6, name: 'x' })).toBeInTheDocument();
  });

  it('renders rich text children', () => {
    const { container } = render(
      <Heading6>
        a <strong>b</strong>
      </Heading6>,
    );
    expect(container.querySelector('strong')).toBeInTheDocument();
  });
});

describe('Heading wrapper class', () => {
  it.each([
    [1, Heading1],
    [2, Heading2],
    [3, Heading3],
    [4, Heading4],
    [5, Heading5],
    [6, Heading6],
  ] as const)('puts className on the utrecht-heading-%i element as a class', (level, Heading) => {
    const { container } = render(<Heading className="tilburg-alert__title">x</Heading>);
    const wrapper = container.querySelector(`utrecht-heading-${level}`);
    expect(wrapper).toHaveClass('tilburg-alert__title');
    expect(wrapper).not.toHaveAttribute('classname');
  });
});
