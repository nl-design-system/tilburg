import { render } from '@testing-library/react';
import { createRef } from 'react';
import { Image } from './Image';
import '@testing-library/jest-dom';

describe('Image', () => {
  it('renders an img with the utrecht class and passes the attributes on', () => {
    const { container } = render(<Image src="logo.svg" alt="Logo" width={240} className="extra" />);
    const img = container.querySelector('img')!;
    expect(img).toHaveClass('utrecht-img', 'extra');
    expect(img).not.toHaveClass('utrecht-img--photo');
    expect(img).toHaveAttribute('src', 'logo.svg');
    expect(img).toHaveAttribute('alt', 'Logo');
    expect(img).toHaveAttribute('width', '240');
  });

  it('adds the photo modifier', () => {
    const { container } = render(<Image src="logo.svg" alt="" photo />);
    expect(container.querySelector('img')).toHaveClass('utrecht-img--photo');
  });

  it('supports ForwardRef', () => {
    const ref = createRef<HTMLImageElement>();
    render(<Image ref={ref} alt="" />);
    expect(ref.current?.tagName).toBe('IMG');
  });
});
