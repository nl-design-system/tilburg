import { render } from '@testing-library/react';
import { UrlData } from './UrlData';
import '@testing-library/jest-dom';

describe('UrlData', () => {
  it('renders <bdi class="utrecht-url-data" translate="no">', () => {
    const { container } = render(<UrlData className="extra">https://www.tilburg.nl/afval</UrlData>);
    const bdi = container.firstElementChild!;
    expect(bdi.tagName).toBe('BDI');
    expect(bdi).toHaveClass('utrecht-url-data', 'extra');
    expect(bdi).toHaveAttribute('translate', 'no');
    expect(bdi).toHaveTextContent('https://www.tilburg.nl/afval');
  });
});
