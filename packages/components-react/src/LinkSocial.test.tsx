import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { LinkSocial, ListSocial, ListSocialItem } from './LinkSocial';
import '@testing-library/jest-dom';

describe('LinkSocial', () => {
  it('renders an external utrecht-link-social anchor named by aria-label', () => {
    render(
      <LinkSocial href="https://www.facebook.com/gemeentetilburg" aria-label="Gemeente Tilburg op Facebook">
        <svg aria-hidden="true" />
      </LinkSocial>,
    );
    const link = screen.getByRole('link', { name: 'Gemeente Tilburg op Facebook' });
    expect(link).toHaveClass('utrecht-link-social');
    expect(link).toHaveAttribute('rel', 'external noopener noreferrer');
    expect(link).toHaveAttribute('href', 'https://www.facebook.com/gemeentetilburg');
  });

  it('keeps the caller rel when external is false', () => {
    render(
      <LinkSocial href="/x" external={false} rel="me" aria-label="X">
        x
      </LinkSocial>,
    );
    expect(screen.getByRole('link')).toHaveAttribute('rel', 'me');
  });

  it('forwards the ref', () => {
    const ref = createRef<HTMLAnchorElement>();
    render(<LinkSocial ref={ref} href="/x" aria-label="X" />);
    expect(ref.current).toBe(screen.getByRole('link'));
  });
});

describe('ListSocial', () => {
  it('renders the utrecht-list-social <ul> with <li> items', () => {
    const ref = createRef<HTMLUListElement>();
    render(
      <ListSocial ref={ref} aria-label="Sociale media">
        <ListSocialItem className="extra">
          <LinkSocial href="/x" aria-label="X" />
        </ListSocialItem>
      </ListSocial>,
    );
    const list = screen.getByRole('list', { name: 'Sociale media' });
    expect(list).toBe(ref.current);
    expect(list).toHaveClass('utrecht-list-social');
    expect(list).toHaveAttribute('role', 'list');
    const item = list.querySelector(':scope > li')!;
    expect(item).toHaveClass('utrecht-list-social__item', 'extra');
    expect(item.querySelector(':scope > a.utrecht-link-social')).not.toBeNull();
  });
});
