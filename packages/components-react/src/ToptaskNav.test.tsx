import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { ToptaskNav } from './ToptaskNav';
import '@testing-library/jest-dom';

describe('ToptaskNav', () => {
  it('renders a <nav> named "Veelgevraagd" by default', () => {
    render(<ToptaskNav>x</ToptaskNav>);
    const nav = screen.getByRole('navigation', { name: 'Veelgevraagd' });
    expect(nav).toHaveClass('utrecht-toptask-nav');
    expect(nav).not.toHaveClass('utrecht-toptask-nav--grid');
  });

  it('maps grid, aria-label, className and ref', () => {
    const ref = createRef<HTMLElement>();
    render(
      <ToptaskNav ref={ref} grid aria-label="Snel naar" className="extra">
        x
      </ToptaskNav>,
    );
    const nav = screen.getByRole('navigation', { name: 'Snel naar' });
    expect(nav).toBe(ref.current);
    expect(nav).toHaveClass('utrecht-toptask-nav', 'utrecht-toptask-nav--grid', 'extra');
  });
});
