import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { Note } from './Note';
import '@testing-library/jest-dom';

describe('Note', () => {
  it('renders a neutral <section role="note"> by default', () => {
    const { container } = render(<Note className="extra">Tekst</Note>);
    const note = screen.getByRole('note');
    expect(note).toBe(container.firstElementChild);
    expect(note.tagName).toBe('SECTION');
    expect(note.className).toBe('utrecht-note extra');
  });

  it.each([
    ['info', 'info'],
    ['success', 'success'],
    ['warning', 'warning'],
    ['danger', 'error'],
  ] as const)('maps variant %s to the utrecht --%s modifier', (variant, modifier) => {
    render(<Note variant={variant}>x</Note>);
    expect(screen.getByRole('note')).toHaveClass(`utrecht-note--${modifier}`);
  });

  it('renders an <aside> without role="note" with aside', () => {
    const { container } = render(
      <Note aside aria-labelledby="t">
        <h3 id="t">Goed om te weten</h3>
      </Note>,
    );
    const aside = container.firstElementChild!;
    expect(aside.tagName).toBe('ASIDE');
    expect(aside).not.toHaveAttribute('role');
    expect(screen.getByRole('complementary', { name: 'Goed om te weten' })).toBe(aside);
  });

  it('forwards the ref', () => {
    const ref = createRef<HTMLElement>();
    render(<Note ref={ref}>x</Note>);
    expect(ref.current).toHaveClass('utrecht-note');
  });
});
