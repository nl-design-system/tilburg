import { render, screen } from '@testing-library/react';
import { DataList, DataListItem, DataListKey, DataListValue } from './DataList';
import '@testing-library/jest-dom';

describe('DataList', () => {
  it('renders a definition list with tilburg base class', () => {
    const { container } = render(
      <DataList>
        <DataListItem>
          <DataListKey>k</DataListKey>
          <DataListValue>v</DataListValue>
        </DataListItem>
      </DataList>,
    );
    expect(container.querySelector('dl')).toHaveClass('tilburg-data-list');
    expect(screen.getByText('k')).toHaveClass('tilburg-data-list__key');
    expect(screen.getByText('v')).toHaveClass('tilburg-data-list__value');
  });

  it('adds the large modifier when large is true', () => {
    const { container } = render(
      <DataList large>
        <DataListItem>x</DataListItem>
      </DataList>,
    );
    expect(container.querySelector('dl')).toHaveClass('tilburg-data-list--large');
  });
});
