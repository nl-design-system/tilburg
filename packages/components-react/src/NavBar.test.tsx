import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { NavBar } from './NavBar';
import { NavList } from './NavList';
import '@testing-library/jest-dom';

describe('NavBar', () => {
  it('renders a named nav landmark with the content wrapper around its children', () => {
    const ref = createRef<HTMLElement>();
    render(
      <NavBar ref={ref} className="extra">
        <NavList items={[{ label: 'Home', href: '/' }]} />
      </NavBar>,
    );
    const nav = screen.getByRole('navigation', { name: 'Hoofdmenu' });
    expect(nav).toBe(ref.current);
    expect(nav).toHaveClass('utrecht-nav-bar', 'extra');
    const content = nav.firstElementChild!;
    expect(content).toHaveClass('utrecht-nav-bar__content');
    expect(content.firstElementChild).toHaveClass('utrecht-nav-list');
  });

  it('takes a custom aria-label', () => {
    render(<NavBar ariaLabel="Menu">x</NavBar>);
    expect(screen.getByRole('navigation', { name: 'Menu' })).toBeInTheDocument();
  });
});
