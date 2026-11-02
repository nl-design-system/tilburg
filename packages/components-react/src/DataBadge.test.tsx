import { render } from '@testing-library/react';
import { createRef } from 'react';
import { DataBadge } from './DataBadge';
import '@testing-library/jest-dom';

describe('DataBadge', () => {
  it('renders a span with the utrecht-data-badge class by default', () => {
    const { container } = render(<DataBadge className="extra">Energielabel A</DataBadge>);
    const badge = container.firstElementChild!;
    expect(badge.tagName).toBe('SPAN');
    expect(badge).toHaveClass('utrecht-data-badge', 'extra');
    expect(badge).toHaveTextContent('Energielabel A');
  });

  it('renders <data value> for a value and <time datetime> for a dateTime (which wins)', () => {
    const { container, rerender } = render(<DataBadge value="259">≥ 250㎡</DataBadge>);
    expect(container.firstElementChild!.tagName).toBe('DATA');
    expect(container.firstElementChild).toHaveAttribute('value', '259');
    rerender(
      <DataBadge dateTime="2026-12-24" value="x">
        24 december 2026
      </DataBadge>,
    );
    expect(container.firstElementChild!.tagName).toBe('TIME');
    expect(container.firstElementChild).toHaveAttribute('datetime', '2026-12-24');
    expect(container.firstElementChild).not.toHaveAttribute('value');
  });

  it('forwards the ref', () => {
    const ref = createRef<HTMLElement>();
    const { container } = render(<DataBadge ref={ref}>x</DataBadge>);
    expect(ref.current).toBe(container.firstElementChild);
  });
});
