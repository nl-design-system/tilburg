import { render } from '@testing-library/react';
import { createRef } from 'react';
import { SpotlightSection } from './SpotlightSection';
import '@testing-library/jest-dom';

describe('SpotlightSection', () => {
  it('renders a neutral <section> by default', () => {
    const { container } = render(<SpotlightSection className="extra">Tekst</SpotlightSection>);
    const section = container.firstElementChild!;
    expect(section.tagName).toBe('SECTION');
    expect(section.className).toBe('utrecht-spotlight-section extra');
  });

  it.each([
    ['info', 'info'],
    ['success', 'ok'],
    ['warning', 'warning'],
    ['danger', 'error'],
  ] as const)('maps variant %s to the utrecht --%s modifier', (variant, modifier) => {
    const { container } = render(<SpotlightSection variant={variant}>x</SpotlightSection>);
    expect(container.firstElementChild).toHaveClass(`utrecht-spotlight-section--${modifier}`);
  });

  it('renders an <aside> with aside and passes attributes through', () => {
    const { container } = render(
      <SpotlightSection aside aria-label="Tip">
        x
      </SpotlightSection>,
    );
    const aside = container.firstElementChild!;
    expect(aside.tagName).toBe('ASIDE');
    expect(aside).toHaveAttribute('aria-label', 'Tip');
  });

  it('forwards the ref', () => {
    const ref = createRef<HTMLElement>();
    render(<SpotlightSection ref={ref}>x</SpotlightSection>);
    expect(ref.current?.tagName).toBe('SECTION');
  });
});
