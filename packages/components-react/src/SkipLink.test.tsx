import { render } from '@testing-library/react';
import { SkipLink } from './SkipLink';
import '@testing-library/jest-dom';

describe('SkipLink', () => {
  it('renders the production visible-on-focus link by default', () => {
    const { container } = render(<SkipLink href="#main">Naar inhoud</SkipLink>);
    expect(container.querySelector('a')!.className).toBe('utrecht-skip-link utrecht-skip-link--visible-on-focus');
  });

  it('renders visibility="focus" as --focus with --visible, like the HTML reference', () => {
    const { container } = render(<SkipLink visibility="focus">X</SkipLink>);
    expect(container.querySelector('a')!.className).toBe(
      'utrecht-skip-link utrecht-skip-link--focus utrecht-skip-link--visible',
    );
  });
});
