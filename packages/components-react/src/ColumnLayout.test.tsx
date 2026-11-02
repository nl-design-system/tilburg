import { render } from '@testing-library/react';
import { createRef } from 'react';
import { ColumnLayout } from './ColumnLayout';
import '@testing-library/jest-dom';

describe('ColumnLayout', () => {
  it('renders the HTML/CSS reference markup', () => {
    const { container } = render(
      <ColumnLayout className="extra">
        <p>Tekst</p>
      </ColumnLayout>,
    );
    const layout = container.firstElementChild!;
    expect(layout.tagName).toBe('DIV');
    expect(layout).toHaveClass('utrecht-column-layout', 'extra');
    expect(layout).not.toHaveClass('utrecht-column-layout--rule');
    expect(layout.querySelector('p')).toHaveTextContent('Tekst');
  });

  it('draws a rule with rule', () => {
    const { container } = render(<ColumnLayout rule>x</ColumnLayout>);
    expect(container.firstElementChild).toHaveClass('utrecht-column-layout--rule');
  });

  it('forwards the ref', () => {
    const ref = createRef<HTMLDivElement>();
    render(<ColumnLayout ref={ref}>x</ColumnLayout>);
    expect(ref.current).toHaveClass('utrecht-column-layout');
  });
});
