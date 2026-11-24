import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { ToptaskLink } from './ToptaskLink';
import '@testing-library/jest-dom';

describe('ToptaskLink', () => {
  it('renders the icon and title spans of the HTML reference', () => {
    render(
      <ToptaskLink href="/afval" icon={<svg aria-hidden="true" data-testid="icon" />}>
        Afval
      </ToptaskLink>,
    );
    const link = screen.getByRole('link', { name: 'Afval' });
    expect(link).toHaveClass('utrecht-toptask-link');
    expect(link).toHaveAttribute('href', '/afval');
    const [icon, title] = Array.from(link.children);
    expect(icon).toHaveClass('utrecht-toptask-link__icon');
    expect(icon).toContainElement(screen.getByTestId('icon'));
    expect(title).toHaveClass('utrecht-toptask-link__title');
    expect(title).toHaveTextContent('Afval');
  });

  it('leaves the icon wrapper out without an icon', () => {
    render(<ToptaskLink href="/afspraak">Afspraak maken</ToptaskLink>);
    const link = screen.getByRole('link');
    expect(link.querySelector('.utrecht-toptask-link__icon')).toBeNull();
    expect(link.children).toHaveLength(1);
  });

  it('forwards the ref and extra attributes', () => {
    const ref = createRef<HTMLAnchorElement>();
    render(
      <ToptaskLink ref={ref} href="/x" className="extra" aria-describedby="hint">
        x
      </ToptaskLink>,
    );
    expect(ref.current).toBe(screen.getByRole('link'));
    expect(ref.current).toHaveClass('utrecht-toptask-link', 'extra');
    expect(ref.current).toHaveAttribute('aria-describedby', 'hint');
  });
});
