import { render } from '@testing-library/react';
import { BadgeList } from './BadgeList';
import { DataBadge } from './DataBadge';
import '@testing-library/jest-dom';

describe('BadgeList', () => {
  it('renders a ul[role=list] with each badge in an li, like the HTML reference', () => {
    const { container } = render(
      <BadgeList className="extra" id="onderwerpen">
        <DataBadge>Parkeren</DataBadge>
        {false}
        <DataBadge>Afval</DataBadge>
      </BadgeList>,
    );
    const list = container.firstElementChild!;
    expect(list.tagName).toBe('UL');
    expect(list).toHaveAttribute('role', 'list');
    expect(list).toHaveClass('utrecht-badge-list', 'extra');
    expect(list).toHaveAttribute('id', 'onderwerpen');
    const items = list.querySelectorAll(':scope > li');
    expect(items).toHaveLength(2);
    expect(items[0].firstElementChild).toHaveClass('utrecht-data-badge');
    expect(items[1]).toHaveTextContent('Afval');
  });
});
