import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { Button } from './Button';
import '@testing-library/jest-dom';

describe('Button', () => {
  it('renders a button role element', () => {
    render(<Button>OK</Button>);
    const button = screen.getByRole('button', { name: 'OK' });
    expect(button).toBeInTheDocument();
    expect(button).toBeVisible();
  });

  it('renders an HTML button element', () => {
    const { container } = render(<Button />);
    expect(container.querySelector('button:only-child')).toBeInTheDocument();
  });

  it('renders labels that contain HTML rich text content', () => {
    const { container } = render(
      <Button>
        Order <strong>now</strong>
      </Button>,
    );
    expect(container.querySelector('strong')).toBeInTheDocument();
  });

  it('supports ForwardRef in React', () => {
    const ref = createRef<HTMLButtonElement>();
    const { container } = render(<Button ref={ref} />);
    expect(ref.current).toBe(container.querySelector(':only-child'));
  });

  it('applies the default medium size class', () => {
    render(<Button>OK</Button>);
    expect(screen.getByRole('button')).toHaveClass('tilburg-medium');
  });

  it('applies the size class for the chosen size', () => {
    render(<Button size="small">OK</Button>);
    expect(screen.getByRole('button')).toHaveClass('tilburg-small');
  });

  it('applies the appearance class for the chosen appearance', () => {
    render(<Button appearance="primary-action-button">OK</Button>);
    expect(screen.getByRole('button')).toHaveClass('utrecht-button--primary-action');
  });

  it('forwards aria-pressed when pressed is set', () => {
    render(<Button pressed>OK</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
  });

  it('omits aria-pressed when pressed is undefined', () => {
    render(<Button>OK</Button>);
    expect(screen.getByRole('button')).not.toHaveAttribute('aria-pressed');
  });

  it('merges custom className', () => {
    render(<Button className="custom">OK</Button>);
    expect(screen.getByRole('button')).toHaveClass('custom');
  });

  it('falls back to title for aria-label (Angular parity)', () => {
    render(<Button title="Sluiten" />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Sluiten');
  });

  it('prefers explicit aria-label over title', () => {
    render(<Button title="Sluiten" aria-label="Sluit het dialoogvenster" />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Sluit het dialoogvenster');
  });

  it('omits aria-label when neither aria-label nor title is provided', () => {
    render(<Button>OK</Button>);
    expect(screen.getByRole('button')).not.toHaveAttribute('aria-label');
  });
});
