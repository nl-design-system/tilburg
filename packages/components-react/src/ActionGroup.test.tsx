import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { ActionGroup } from './ActionGroup';
import '@testing-library/jest-dom';

describe('ActionGroup', () => {
  it('renders a <p role="group"> with the row modifier by default', () => {
    render(
      <ActionGroup aria-label="Formulierstappen">
        <button type="button">Volgende stap</button>
      </ActionGroup>,
    );
    const group = screen.getByRole('group', { name: 'Formulierstappen' });
    expect(group.tagName).toBe('P');
    expect(group).toHaveClass('utrecht-action-group', 'utrecht-action-group--row');
  });

  it.each(['column', 'column-stretch'] as const)('maps direction="%s" to its modifier', (direction) => {
    render(<ActionGroup direction={direction}>x</ActionGroup>);
    const group = screen.getByRole('group');
    expect(group).toHaveClass(`utrecht-action-group--${direction}`);
    expect(group).not.toHaveClass('utrecht-action-group--row');
  });

  it('accepts a custom role, className and ref', () => {
    const ref = createRef<HTMLParagraphElement>();
    const { container } = render(
      <ActionGroup ref={ref} role="toolbar" className="extra">
        x
      </ActionGroup>,
    );
    const group = container.querySelector('p')!;
    expect(group).toHaveAttribute('role', 'toolbar');
    expect(group).toHaveClass('utrecht-action-group', 'extra');
    expect(ref.current).toBe(group);
  });
});
