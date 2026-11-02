import { fireEvent, render } from '@testing-library/react';
import { createRef } from 'react';
import { Drawer } from './Drawer';
import '@testing-library/jest-dom';

/* jsdom has <dialog> but not showModal()/close(); polyfill just enough. */
beforeAll(() => {
  HTMLDialogElement.prototype.showModal = function showModal(this: HTMLDialogElement) {
    this.setAttribute('open', '');
  };
  HTMLDialogElement.prototype.close = function close(this: HTMLDialogElement) {
    if (!this.hasAttribute('open')) return;
    this.removeAttribute('open');
    this.dispatchEvent(new Event('close'));
  };
});

const getDialog = (container: HTMLElement) => container.querySelector('dialog') as HTMLDialogElement;
/* jsdom lays nothing out: the dialog's box is 0×0 at the origin, so any positive point is "outside" it. */
const backdropClick = { clientX: 500, clientY: 10 };

describe('Drawer', () => {
  it('renders the HTML/CSS reference markup', () => {
    const { container } = render(
      <Drawer aria-labelledby="menu-title" className="extra">
        <h2 id="menu-title">Menu</h2>
      </Drawer>,
    );
    const dialog = getDialog(container);
    expect(dialog.className).toBe('utrecht-drawer utrecht-drawer--inline-start extra');
    expect(dialog).toHaveAttribute('aria-labelledby', 'menu-title');
    expect(dialog).not.toHaveAttribute('open');
    expect(dialog.querySelector(':scope > h2')).toHaveTextContent('Menu');
  });

  it.each(['inline-end', 'block-start', 'block-end'] as const)('aligns to %s', (align) => {
    const { container } = render(<Drawer align={align}>x</Drawer>);
    expect(getDialog(container)).toHaveClass(`utrecht-drawer--${align}`);
    expect(getDialog(container)).not.toHaveClass('utrecht-drawer--inline-start');
  });

  it('opens and closes with the controlled open prop and reports onClose', () => {
    const onClose = jest.fn();
    const { container, rerender } = render(
      <Drawer open onClose={onClose}>
        x
      </Drawer>,
    );
    expect(getDialog(container)).toHaveAttribute('open');
    rerender(
      <Drawer open={false} onClose={onClose}>
        x
      </Drawer>,
    );
    expect(getDialog(container)).not.toHaveAttribute('open');
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('closes on a backdrop click, but not on a click inside the drawer', () => {
    const onClose = jest.fn();
    const { container } = render(
      <Drawer open onClose={onClose}>
        <p>Inhoud</p>
      </Drawer>,
    );
    const dialog = getDialog(container);
    fireEvent.click(dialog.querySelector('p')!, backdropClick);
    fireEvent.click(dialog, { clientX: 0, clientY: 0 });
    expect(dialog).toHaveAttribute('open');
    fireEvent.click(dialog, backdropClick);
    expect(dialog).not.toHaveAttribute('open');
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('stays open on a backdrop click with closeOnBackdropClick={false}', () => {
    const { container } = render(
      <Drawer open closeOnBackdropClick={false}>
        x
      </Drawer>,
    );
    fireEvent.click(getDialog(container), backdropClick);
    expect(getDialog(container)).toHaveAttribute('open');
  });

  it('forwards the ref to the <dialog>', () => {
    const ref = createRef<HTMLDialogElement>();
    render(<Drawer ref={ref}>x</Drawer>);
    ref.current!.showModal();
    expect(ref.current).toHaveAttribute('open');
  });
});
