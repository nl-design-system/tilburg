import { fireEvent, render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { AlertDialog } from './AlertDialog';
import { Modal } from './Modal';
import '@testing-library/jest-dom';

/* jsdom has <dialog> but not showModal()/close(); polyfill just enough. */
beforeAll(() => {
  // eslint-disable-next-line no-unused-vars
  HTMLDialogElement.prototype.showModal = function showModal(this: HTMLDialogElement) {
    this.setAttribute('open', '');
  };
  // eslint-disable-next-line no-unused-vars
  HTMLDialogElement.prototype.close = function close(this: HTMLDialogElement) {
    if (!this.hasAttribute('open')) return;
    this.removeAttribute('open');
    this.dispatchEvent(new Event('close'));
  };
});

const getDialog = (container: HTMLElement) => container.querySelector('dialog') as HTMLDialogElement;

describe('Modal', () => {
  it('renders the HTML/CSS reference structure', () => {
    const { container } = render(
      <Modal title="Aanvraag bevestigen" footer={<button type="button">Bevestigen</button>}>
        <p>Inhoud</p>
      </Modal>,
    );
    const dialog = getDialog(container);
    expect(dialog).toHaveClass('tilburg-modal');
    expect(dialog.querySelector(':scope > header.tilburg-modal__header > h2')).toHaveTextContent('Aanvraag bevestigen');
    expect(dialog.querySelector('.tilburg-modal__close-button > span')).toHaveTextContent('Sluiten');
    expect(dialog.querySelector(':scope > .tilburg-modal__content')).toHaveTextContent('Inhoud');
    expect(dialog.querySelector(':scope > footer.tilburg-modal__footer')).toHaveTextContent('Bevestigen');
  });

  it('names the dialog after its heading', () => {
    const { container } = render(
      <Modal id="confirm" title="Aanvraag bevestigen">
        x
      </Modal>,
    );
    const dialog = getDialog(container);
    expect(dialog.getAttribute('aria-labelledby')).toBe('confirm-title');
    expect(container.querySelector('#confirm-title')).toHaveTextContent('Aanvraag bevestigen');
  });

  it('generates a heading id without an id prop', () => {
    const { container } = render(<Modal title="T">x</Modal>);
    const labelledBy = getDialog(container).getAttribute('aria-labelledby')!;
    expect(container.querySelector(`[id="${labelledBy}"]`)).toHaveTextContent('T');
  });

  it('omits the footer when none is given', () => {
    const { container } = render(<Modal title="T">x</Modal>);
    expect(container.querySelector('.tilburg-modal__footer')).toBeNull();
  });

  it('opens and closes with the controlled open prop and reports onClose', () => {
    const onClose = jest.fn();
    const { container, rerender } = render(
      <Modal title="T" open onClose={onClose}>
        x
      </Modal>,
    );
    expect(getDialog(container)).toHaveAttribute('open');
    rerender(
      <Modal title="T" open={false} onClose={onClose}>
        x
      </Modal>,
    );
    expect(getDialog(container)).not.toHaveAttribute('open');
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('closes via the close button', () => {
    const onClose = jest.fn();
    const { container } = render(
      <Modal title="T" open onClose={onClose} closeLabel="Close">
        x
      </Modal>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Close', hidden: true }));
    expect(getDialog(container)).not.toHaveAttribute('open');
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('closes on a backdrop click unless disabled', () => {
    const { container, rerender } = render(
      <Modal title="T" open>
        x
      </Modal>,
    );
    fireEvent.click(container.querySelector('.tilburg-modal__content')!);
    expect(getDialog(container)).toHaveAttribute('open');
    fireEvent.click(getDialog(container));
    expect(getDialog(container)).not.toHaveAttribute('open');

    rerender(
      <Modal title="T" open closeOnBackdropClick={false}>
        x
      </Modal>,
    );
    getDialog(container).showModal();
    fireEvent.click(getDialog(container));
    expect(getDialog(container)).toHaveAttribute('open');
  });

  it('forwards the ref to the dialog element', () => {
    const ref = createRef<HTMLDialogElement>();
    const { container } = render(
      <Modal ref={ref} title="T">
        x
      </Modal>,
    );
    expect(ref.current).toBe(getDialog(container));
  });
});

describe('AlertDialog (deprecated)', () => {
  it('renders through Modal with a default close footer', () => {
    const ref = createRef<HTMLDialogElement>();
    const { container } = render(
      <AlertDialog ref={ref} title="Oud">
        x
      </AlertDialog>,
    );
    ref.current!.showModal();
    const footerButton = container.querySelector<HTMLButtonElement>('.tilburg-modal__footer button')!;
    expect(footerButton).toHaveTextContent('Sluiten');
    fireEvent.click(footerButton);
    expect(getDialog(container)).not.toHaveAttribute('open');
  });

  it('keeps a custom footer', () => {
    const { container } = render(
      <AlertDialog title="Oud" customFooter={<button type="button">Opslaan</button>}>
        x
      </AlertDialog>,
    );
    expect(container.querySelector('.tilburg-modal__footer')).toHaveTextContent('Opslaan');
  });
});
