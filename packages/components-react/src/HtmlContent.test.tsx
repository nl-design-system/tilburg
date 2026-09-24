import { render, screen } from '@testing-library/react';
import { HtmlContent } from './HtmlContent';
import '@testing-library/jest-dom';

describe('HtmlContent', () => {
  it('renders children', () => {
    render(<HtmlContent>hello</HtmlContent>);
    expect(screen.getByText('hello')).toBeInTheDocument();
  });

  it('renders rich text children', () => {
    const { container } = render(
      <HtmlContent>
        <p>
          one <strong>two</strong>
        </p>
      </HtmlContent>,
    );
    expect(container.querySelector('strong')).toBeInTheDocument();
  });

  it('forwards lang attribute', () => {
    const { container } = render(<HtmlContent lang="nl">x</HtmlContent>);
    expect(container.firstChild).toHaveAttribute('lang', 'nl');
  });
});
