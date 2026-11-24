import { render } from '@testing-library/react';
import { MultilineData } from './MultilineData';
import '@testing-library/jest-dom';

describe('MultilineData', () => {
  it('renders a <pre> with both Utrecht classes and keeps the newlines', () => {
    const { container } = render(
      <MultilineData className="extra">{'Stadhuisplein 130\n5038 TC Tilburg'}</MultilineData>,
    );
    const pre = container.firstElementChild!;
    expect(pre.tagName).toBe('PRE');
    expect(pre.className).toBe('utrecht-multiline-data utrecht-multiline-data--html-pre extra');
    expect(pre.textContent).toBe('Stadhuisplein 130\n5038 TC Tilburg');
  });
});
