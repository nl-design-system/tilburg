import { fireEvent, render, screen } from '@testing-library/react';
import { NavList, NavListItem } from './NavList';
import '@testing-library/jest-dom';

const ITEMS: NavListItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Wonen', href: '/wonen', current: true },
  { label: 'Afval' },
];

describe('NavList', () => {
  it('renders the utrecht nav list with link classes and the current page', () => {
    const { container } = render(<NavList items={ITEMS} />);
    const list = container.querySelector('ul')!;
    expect(list).toHaveClass('utrecht-nav-list');
    expect(list).not.toHaveClass('utrecht-nav-list--center');
    expect(list).toHaveAttribute('role', 'list');
    expect(list.querySelectorAll('li.utrecht-nav-list__item')).toHaveLength(3);
    const home = screen.getByRole('link', { name: 'Home' });
    expect(home).toHaveClass('utrecht-link', 'utrecht-link--html-a', 'utrecht-nav-list__link');
    expect(home).not.toHaveAttribute('aria-current');
    const current = screen.getByRole('link', { name: 'Wonen' });
    expect(current).toHaveAttribute('aria-current', 'page');
    expect(current).toHaveClass('utrecht-link--current');
    expect(screen.getByRole('link', { name: 'Afval' })).toHaveAttribute('href', '#');
  });

  it('adds the center modifier', () => {
    const { container } = render(<NavList items={ITEMS} center />);
    expect(container.querySelector('ul')).toHaveClass('utrecht-nav-list--center');
  });

  it('renders nothing without items', () => {
    const { container } = render(<NavList items={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('calls onItemClick with the item and the event', () => {
    const onItemClick = jest.fn();
    render(<NavList items={ITEMS} onItemClick={onItemClick} />);
    fireEvent.click(screen.getByRole('link', { name: 'Home' }));
    expect(onItemClick).toHaveBeenCalledWith(expect.objectContaining({ item: ITEMS[0] }));
  });
});
