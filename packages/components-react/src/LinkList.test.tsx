import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { LinkList } from './LinkList';
import '@testing-library/jest-dom';

const links = [
  { label: 'Afvalkalender', href: '/afval/afvalkalender', current: 'page' as const },
  { label: 'Afvalscheiding', href: 'https://www.milieucentraal.nl', external: true },
];

describe('LinkList', () => {
  it('renders the HTML reference structure', () => {
    render(<LinkList aria-label="Meer over afval" links={links} />);
    const list = screen.getByRole('list', { name: 'Meer over afval' });
    expect(list.tagName).toBe('UL');
    expect(list).toHaveClass('utrecht-link-list', 'utrecht-link-list--html-ul');
    const items = list.querySelectorAll(':scope > li.utrecht-link-list__item');
    expect(items).toHaveLength(2);
    const link = screen.getByRole('link', { name: 'Afvalkalender' });
    expect(link).toHaveClass('utrecht-link', 'utrecht-link--html-a', 'utrecht-link-list__link');
    expect(link).toHaveAttribute('href', '/afval/afvalkalender');
    expect(link.querySelector('svg.utrecht-icon')).toHaveAttribute('aria-hidden', 'true');
    expect(link.querySelector('.utrecht-link-list__link-text')).toHaveTextContent('Afvalkalender');
  });

  it('maps current and external per link', () => {
    render(<LinkList links={links} />);
    expect(screen.getByRole('link', { name: 'Afvalkalender' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: 'Afvalscheiding' })).toHaveAttribute('rel', 'external noopener noreferrer');
  });

  it('renders nothing without links', () => {
    const { container } = render(<LinkList />);
    expect(container).toBeEmptyDOMElement();
  });

  it('forwards the ref and className', () => {
    const ref = createRef<HTMLUListElement>();
    render(<LinkList ref={ref} className="extra" links={links} />);
    expect(ref.current).toHaveClass('utrecht-link-list', 'extra');
  });
});
