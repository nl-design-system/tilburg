import { render } from '@testing-library/react';
import { createRef } from 'react';
import { UnorderedList, UnorderedListItem } from './UnorderedList';
import '@testing-library/jest-dom';

describe('UnorderedList markup parity', () => {
  it('emits the same classes as the HTML/CSS reference `<ul>`', () => {
    const { container } = render(
      <UnorderedList>
        <UnorderedListItem>a</UnorderedListItem>
      </UnorderedList>,
    );
    const ul = container.querySelector('ul');
    expect(ul).toHaveClass('tilburg-unordered-list', 'utrecht-unordered-list', 'utrecht-unordered-list--html-ul');
  });

  it('keeps a custom className on the list', () => {
    const { container } = render(<UnorderedList className="custom" />);
    expect(container.querySelector('ul')).toHaveClass('tilburg-unordered-list', 'custom');
  });
});

describe('UnorderedListItem', () => {
  it('renders an LI with the utrecht item class', () => {
    const { container } = render(
      <UnorderedList>
        <UnorderedListItem>Vergunningen</UnorderedListItem>
      </UnorderedList>,
    );
    const li = container.querySelector('li');
    expect(li).toBeInTheDocument();
    expect(li).toHaveClass('utrecht-unordered-list__item');
    expect(li).toHaveTextContent('Vergunningen');
  });

  it('keeps a custom className', () => {
    const { container } = render(<UnorderedListItem className="custom" />);
    expect(container.querySelector('li')).toHaveClass('utrecht-unordered-list__item', 'custom');
  });

  it('forwards standard LI attributes', () => {
    const { container } = render(<UnorderedListItem id="first" value={3} />);
    const li = container.querySelector('li');
    expect(li).toHaveAttribute('id', 'first');
    expect(li).toHaveAttribute('value', '3');
  });

  it('supports ForwardRef', () => {
    const ref = createRef<HTMLLIElement>();
    render(<UnorderedListItem ref={ref} />);
    expect(ref.current?.tagName).toBe('LI');
  });

  it('supports nesting a list inside an item', () => {
    const { container } = render(
      <UnorderedList>
        <UnorderedListItem>
          Aanvragen
          <UnorderedList>
            <UnorderedListItem>Subsidies</UnorderedListItem>
          </UnorderedList>
        </UnorderedListItem>
      </UnorderedList>,
    );
    expect(container.querySelectorAll('ul.tilburg-unordered-list')).toHaveLength(2);
    expect(container.querySelectorAll('li.utrecht-unordered-list__item')).toHaveLength(2);
  });
});
