import { fireEvent, render, screen } from '@testing-library/react';
import { SideNav, SideNavItem } from './SideNav';
import '@testing-library/jest-dom';

const ITEMS: SideNavItem[] = [
  { label: 'Afval', href: '/afval' },
  {
    label: 'Parkeren',
    href: '/parkeren',
    children: [
      { label: 'Bewonersvergunning', href: '/b', current: true },
      { label: 'Bezoekersvergunning', href: '/v' },
    ],
  },
  { label: 'Paspoort', current: true },
];

describe('SideNav', () => {
  it('renders the utrecht sidenav (pseudo-element markers) as a named landmark', () => {
    render(<SideNav items={ITEMS} />);
    const nav = screen.getByRole('navigation', { name: 'Submenu' });
    expect(nav).toHaveClass('utrecht-sidenav', 'utrecht-sidenav--pseudo-elements');
    const top = nav.querySelectorAll(':scope > ul.utrecht-sidenav__list > li.utrecht-sidenav__item');
    expect(top).toHaveLength(3);
    expect(top[2]).toHaveClass('utrecht-sidenav__item--last');
    expect(top[0]).not.toHaveClass('utrecht-sidenav__item--last');
    expect(nav.querySelectorAll('.utrecht-sidenav__item-separator')).toHaveLength(3);
  });

  it('marks parents, children and the current page', () => {
    render(<SideNav items={ITEMS} />);
    expect(screen.getByRole('link', { name: 'Parkeren' })).toHaveClass(
      'utrecht-sidenav__link',
      'utrecht-sidenav__link--parent',
    );
    const child = screen.getByRole('link', { name: 'Bewonersvergunning' });
    expect(child).toHaveClass(
      'utrecht-sidenav__link--child',
      'utrecht-sidenav__link--current',
      'utrecht-sidenav__link--current-child',
    );
    expect(child).toHaveAttribute('aria-current', 'page');
    expect(child.closest('ul')).toHaveClass('utrecht-sidenav__list', 'utrecht-sidenav__list--child');
    expect(child.closest('li')).toHaveClass('utrecht-sidenav__item', 'utrecht-sidenav__item--child');
    expect(screen.getByRole('link', { name: 'Bezoekersvergunning' })).not.toHaveAttribute('aria-current');
    const current = screen.getByRole('link', { name: 'Paspoort' });
    expect(current).toHaveClass('utrecht-sidenav__link--current');
    expect(current).not.toHaveClass('utrecht-sidenav__link--current-child');
    expect(current).toHaveAttribute('href', '#');
  });

  it('reports clicks on child links and renders nothing without items', () => {
    const onItemClick = jest.fn();
    const { container, rerender } = render(<SideNav items={ITEMS} onItemClick={onItemClick} />);
    fireEvent.click(screen.getByRole('link', { name: 'Bezoekersvergunning' }));
    expect(onItemClick).toHaveBeenCalledWith(expect.objectContaining({ item: ITEMS[1].children![1] }));
    rerender(<SideNav items={[]} />);
    expect(container.firstChild).toBeNull();
  });
});
