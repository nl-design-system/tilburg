import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { Link } from './Link';
import '@testing-library/jest-dom';

describe('Link', () => {
  it('renders an anchor', () => {
    render(<Link href="/foo">Go</Link>);
    expect(screen.getByRole('link', { name: 'Go' })).toBeInTheDocument();
  });

  it('applies the base utrecht-link class', () => {
    render(<Link href="/foo">Go</Link>);
    expect(screen.getByRole('link')).toHaveClass('utrecht-link');
  });

  it('sets rel="external noopener noreferrer" when external is true', () => {
    render(
      <Link href="https://example.com" external>
        Go
      </Link>,
    );
    expect(screen.getByRole('link')).toHaveAttribute('rel', 'external noopener noreferrer');
  });

  it('preserves caller-provided rel when external is false', () => {
    render(
      <Link href="/foo" rel="nofollow">
        Go
      </Link>,
    );
    expect(screen.getByRole('link')).toHaveAttribute('rel', 'nofollow');
  });

  it('forwards aria-current', () => {
    render(
      <Link href="/foo" current="page">
        Go
      </Link>,
    );
    expect(screen.getByRole('link')).toHaveAttribute('aria-current', 'page');
  });

  it('supports ForwardRef', () => {
    const ref = createRef<HTMLAnchorElement>();
    render(<Link ref={ref} href="/foo" />);
    expect(ref.current?.tagName).toBe('A');
  });
});
