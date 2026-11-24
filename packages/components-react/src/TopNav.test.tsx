import { fireEvent, render, screen } from '@testing-library/react';
import { TopNav, TopNavItem } from './TopNav';
import '@testing-library/jest-dom';

const ITEMS: TopNavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Aanvragen', href: '/aanvragen', current: true },
];

describe('TopNav', () => {
  it('renders the utrecht topnav with the current page', () => {
    render(<TopNav items={ITEMS} />);
    const nav = screen.getByRole('navigation', { name: 'Hoofdmenu' });
    expect(nav).toHaveClass('utrecht-topnav');
    expect(nav.querySelector('ul')).toHaveClass('utrecht-topnav__list');
    expect(nav.querySelectorAll('li.utrecht-topnav__item')).toHaveLength(2);
    const home = screen.getByRole('link', { name: 'Home' });
    expect(home).toHaveClass('utrecht-topnav__link');
    expect(home).not.toHaveClass('utrecht-topnav__link--current');
    const current = screen.getByRole('link', { name: 'Aanvragen' });
    expect(current).toHaveClass('utrecht-topnav__link', 'utrecht-topnav__link--current');
    expect(current).toHaveAttribute('aria-current', 'page');
  });

  it('takes a custom aria-label, renders nothing without items and reports clicks', () => {
    const onItemClick = jest.fn();
    const { container, rerender } = render(<TopNav items={ITEMS} ariaLabel="Menu" onItemClick={onItemClick} />);
    fireEvent.click(screen.getByRole('link', { name: 'Home' }));
    expect(screen.getByRole('navigation', { name: 'Menu' })).toBeInTheDocument();
    expect(onItemClick).toHaveBeenCalledWith(expect.objectContaining({ item: ITEMS[0] }));
    rerender(<TopNav items={[]} />);
    expect(container.firstChild).toBeNull();
  });
});
