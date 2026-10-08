import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { ButtonLink } from './ButtonLink';
import '@testing-library/jest-dom';

describe('ButtonLink', () => {
  it('renders an anchor', () => {
    render(<ButtonLink href="/foo">Go</ButtonLink>);
    const link = screen.getByRole('link', { name: 'Go' });
    expect(link).toBeInTheDocument();
    expect(link).toBeVisible();
  });

  it('applies the base button-link classes', () => {
    render(<ButtonLink href="/foo">Go</ButtonLink>);
    const link = screen.getByRole('link');
    expect(link).toHaveClass('utrecht-button-link');
    expect(link).toHaveClass('utrecht-button-link--html-a');
  });

  it('applies the appearance class for the chosen appearance', () => {
    render(
      <ButtonLink href="/foo" appearance="primary-action-button">
        Go
      </ButtonLink>,
    );
    expect(screen.getByRole('link')).toHaveClass('utrecht-button-link--primary-action');
  });

  it('sets rel="external noopener noreferrer" when external is true', () => {
    render(
      <ButtonLink href="https://example.com" external>
        Go
      </ButtonLink>,
    );
    expect(screen.getByRole('link')).toHaveAttribute('rel', 'external noopener noreferrer');
  });

  it('preserves caller-provided rel when external is false', () => {
    render(
      <ButtonLink href="/foo" rel="nofollow">
        Go
      </ButtonLink>,
    );
    expect(screen.getByRole('link')).toHaveAttribute('rel', 'nofollow');
  });

  it('supports ForwardRef in React', () => {
    const ref = createRef<HTMLAnchorElement>();
    const { container } = render(<ButtonLink ref={ref} href="/foo" />);
    expect(ref.current).toBe(container.querySelector(':only-child'));
  });

  it('merges custom className', () => {
    render(
      <ButtonLink href="/foo" className="custom">
        Go
      </ButtonLink>,
    );
    expect(screen.getByRole('link')).toHaveClass('custom');
  });
});
