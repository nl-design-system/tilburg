import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { Card } from './Card';
import '@testing-library/jest-dom';

describe('Card', () => {
  it('renders the HTML/CSS reference structure', () => {
    const { container } = render(
      <Card heading="Openingstijden" className="extra">
        <p>Op afspraak.</p>
      </Card>,
    );
    const card = container.firstElementChild!;
    expect(card.className).toBe('utrecht-card extra');
    const content = card.querySelector(':scope > .utrecht-card__content')!;
    expect(content.querySelector(':scope > .utrecht-card__heading > h3.utrecht-heading-3')).toHaveTextContent(
      'Openingstijden',
    );
    expect(content.querySelector(':scope > .utrecht-card__body > p')).toHaveTextContent('Op afspraak.');
    expect(content.querySelector('.utrecht-card__image')).toBeNull();
    expect(card.querySelector('a')).toBeNull();
  });

  it('makes the heading a stretched link with href', () => {
    const { container } = render(<Card heading="Afval" href="/afval" />);
    expect(container.firstElementChild).toHaveClass('utrecht-card', 'utrecht-card--link');
    const link = screen.getByRole('link', { name: 'Afval' });
    expect(link).toHaveAttribute('href', '/afval');
    expect(link).toHaveClass('utrecht-link', 'utrecht-link--html-a', 'utrecht-card__link');
    expect(link.parentElement?.tagName).toBe('H3');
    expect(container.firstElementChild).not.toHaveAttribute('role');
    expect(container.querySelector('.utrecht-card__body')).toBeNull();
  });

  it('renders the heading level and the image after the heading', () => {
    const { container } = render(<Card heading="Parkeren" headingLevel={2} image={<img src="x.png" alt="" />} />);
    expect(screen.getByRole('heading', { level: 2, name: 'Parkeren' })).toHaveClass('utrecht-heading-2');
    const parts = Array.from(container.querySelector('.utrecht-card__content')!.children, (el) => el.className);
    expect(parts).toEqual(['utrecht-card__heading', 'utrecht-card__image']);
  });

  it('forwards the ref', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Card ref={ref} heading="x" />);
    expect(ref.current).toHaveClass('utrecht-card');
  });
});
