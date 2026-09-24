import { act, render, screen } from '@testing-library/react';
import { LoadingSpinner } from './LoadingSpinner';
import '@testing-library/jest-dom';

describe('LoadingSpinner', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders nothing when not visible', () => {
    const { container } = render(<LoadingSpinner />);
    expect(container.firstChild).toBeNull();
  });

  it('renders immediately when delayMs is 0', () => {
    render(<LoadingSpinner visible delayMs={0} title="Loading" message="please wait" />);
    expect(screen.getByText('Loading')).toBeInTheDocument();
    expect(screen.getByText('please wait')).toBeInTheDocument();
  });

  it('reveals after the delay when visible becomes true', () => {
    const { container, rerender } = render(<LoadingSpinner visible={false} delayMs={500} />);
    expect(container.firstChild).toBeNull();
    rerender(<LoadingSpinner visible delayMs={500} />);
    expect(container.firstChild).toBeNull();
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(container.querySelector('.tilburg-loading-spinner__overlay')).toBeInTheDocument();
  });

  it('hides immediately when visible becomes false', () => {
    const { container, rerender } = render(<LoadingSpinner visible delayMs={0} />);
    expect(container.querySelector('.tilburg-loading-spinner__overlay')).toBeInTheDocument();
    rerender(<LoadingSpinner visible={false} delayMs={0} />);
    expect(container.firstChild).toBeNull();
  });

  /* The <svg> is aria-hidden, so the live region has to cover the title and
     message or the spinner announces nothing when it appears. */
  it('announces the title and message from inside the live region', () => {
    render(<LoadingSpinner visible delayMs={0} title="Bezig met laden" message="Even geduld" />);
    const status = screen.getByRole('status');
    expect(status).toHaveTextContent('Bezig met laden');
    expect(status).toHaveTextContent('Even geduld');
    expect(status.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
  });
});
