import { render } from '@testing-library/react';
import { BadgeList } from './BadgeList';
import { DataBadge } from './DataBadge';
import '@testing-library/jest-dom';

describe('BadgeList', () => {
  it('renders a div with the utrecht-badge-list class around its badges', () => {
    const { container } = render(
      <BadgeList className="extra" id="onderwerpen">
        <DataBadge>Parkeren</DataBadge>
        <DataBadge>Afval</DataBadge>
      </BadgeList>,
    );
    const list = container.firstElementChild!;
    expect(list.tagName).toBe('DIV');
    expect(list).toHaveClass('utrecht-badge-list', 'extra');
    expect(list).toHaveAttribute('id', 'onderwerpen');
    expect(list.querySelectorAll('.utrecht-data-badge')).toHaveLength(2);
  });
});
