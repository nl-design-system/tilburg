import { render } from '@testing-library/react';
import { createRef } from 'react';
import { Figure } from './Figure';
import '@testing-library/jest-dom';

describe('Figure', () => {
  it('renders a figure with its content and a caption', () => {
    const { container } = render(
      <Figure caption="Het logo" className="extra">
        <img alt="Logo" />
      </Figure>,
    );
    const figure = container.querySelector('figure')!;
    expect(figure).toHaveClass('utrecht-figure', 'extra');
    expect(figure.firstElementChild?.tagName).toBe('IMG');
    expect(figure.lastElementChild).toHaveClass('utrecht-figure__caption');
    expect(figure.lastElementChild?.tagName).toBe('FIGCAPTION');
    expect(figure.lastElementChild).toHaveTextContent('Het logo');
  });

  it('renders no figcaption without a caption', () => {
    const { container } = render(<Figure>Inhoud</Figure>);
    expect(container.querySelector('figcaption')).toBeNull();
  });

  it('supports ForwardRef', () => {
    const ref = createRef<HTMLElement>();
    render(<Figure ref={ref} />);
    expect(ref.current?.tagName).toBe('FIGURE');
  });
});
