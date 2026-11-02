import { render } from '@testing-library/react';
import { createRef } from 'react';
import { Blockquote } from './Blockquote';
import '@testing-library/jest-dom';

describe('Blockquote', () => {
  it('renders the content without an attribution by default', () => {
    const { container } = render(
      <Blockquote className="extra">
        <p>Citaat</p>
      </Blockquote>,
    );
    const blockquote = container.firstElementChild!;
    expect(blockquote.tagName).toBe('BLOCKQUOTE');
    expect(blockquote).toHaveClass('utrecht-blockquote', 'extra');
    expect(blockquote.querySelector(':scope > .utrecht-blockquote__content > p')).toHaveTextContent('Citaat');
    expect(blockquote.querySelector('.utrecht-blockquote__attribution')).toBeNull();
  });

  it('renders the attribution after the content', () => {
    const { container } = render(<Blockquote attribution="Inwoner van de Reeshof">Citaat</Blockquote>);
    const children = container.firstElementChild!.children;
    expect(children[0]).toHaveClass('utrecht-blockquote__content');
    expect(children[1]).toHaveClass('utrecht-blockquote__attribution');
    expect(children[1]).toHaveTextContent('Inwoner van de Reeshof');
  });

  it('passes cite and lang through and forwards the ref', () => {
    const ref = createRef<HTMLQuoteElement>();
    render(
      <Blockquote ref={ref} cite="https://www.tilburg.nl" lang="en">
        Quote
      </Blockquote>,
    );
    expect(ref.current?.tagName).toBe('BLOCKQUOTE');
    expect(ref.current).toHaveAttribute('cite', 'https://www.tilburg.nl');
    expect(ref.current).toHaveAttribute('lang', 'en');
  });
});
