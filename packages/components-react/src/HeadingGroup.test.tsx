import { render } from '@testing-library/react';
import { createRef } from 'react';
import { Heading1 } from './Heading1';
import { HeadingGroup } from './HeadingGroup';
import { PreHeading } from './PreHeading';
import '@testing-library/jest-dom';

describe('HeadingGroup', () => {
  it('renders <hgroup class="utrecht-heading-group"> around its children', () => {
    const { container } = render(<HeadingGroup className="extra">tekst</HeadingGroup>);
    const element = container.firstElementChild!;
    expect(element.tagName).toBe('HGROUP');
    expect(element).toHaveClass('utrecht-heading-group', 'extra');
    expect(element).toHaveTextContent('tekst');
  });

  it('passes attributes through and forwards the ref', () => {
    const ref = createRef<HTMLElement>();
    render(
      <HeadingGroup ref={ref} id="x" lang="en">
        tekst
      </HeadingGroup>,
    );
    expect(ref.current?.tagName).toBe('HGROUP');
    expect(ref.current).toHaveAttribute('id', 'x');
    expect(ref.current).toHaveAttribute('lang', 'en');
  });
});

describe('HeadingGroup composition', () => {
  it('holds the heading first and the pre-heading after it, as in the HTML reference', () => {
    const { container } = render(
      <HeadingGroup>
        <Heading1>Afvalkalender</Heading1>
        <PreHeading>Afval en recycling</PreHeading>
      </HeadingGroup>,
    );
    const hgroup = container.querySelector('hgroup.utrecht-heading-group')!;
    expect(hgroup.children[0].tagName).toBe('UTRECHT-HEADING-1');
    expect(hgroup.children[0].querySelector('h1.utrecht-heading-1')).toHaveTextContent('Afvalkalender');
    expect(hgroup.children[1]).toBe(hgroup.querySelector('p.utrecht-pre-heading'));
  });
});
