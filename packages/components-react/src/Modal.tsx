import '@gemeente-tilburg/components-css/modal/index.scss';
import clsx from 'clsx';
import {
  DialogHTMLAttributes,
  ForwardedRef,
  forwardRef,
  MouseEvent,
  PropsWithChildren,
  ReactNode,
  SyntheticEvent,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
} from 'react';

/* Matches the modal CSS-class storybook reference (thin-stroke X). */
const CloseIcon = () => (
  <svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
    <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export interface ModalProps extends Omit<DialogHTMLAttributes<HTMLDialogElement>, 'title' | 'open' | 'onClose'> {
  /** Heading text; also the dialog's accessible name (`aria-labelledby`). */
  title: string;
  /** Controlled open state: `true` opens the dialog modally (`showModal()`), `false` closes it. */
  open?: boolean;
  /** Visible text of the close button in the header. */
  closeLabel?: string;
  /** Close when the backdrop (the area outside the dialog box) is clicked. */
  closeOnBackdropClick?: boolean;
  /** Rendered inside `<footer class="tilburg-modal__footer">`; omit for no footer. */
  footer?: ReactNode;
  /** Fired after the dialog closed — close button, Escape, backdrop click or `dialog.close()`. */
  onClose?: () => void;
}

/* Tilburg modal on the native `<dialog>`, rendering exactly the HTML/CSS
   reference markup (`tilburg-modal.examples.ts`). The forwarded ref is the
   `<dialog>` element, so `ref.current.showModal()` / `.close()` keep working
   next to the controlled `open` prop. */
export const Modal = forwardRef(
  (
    {
      id,
      title,
      open,
      closeLabel = 'Sluiten',
      closeOnBackdropClick = true,
      footer,
      onClose,
      onClick,
      className,
      children,
      ...restProps
    }: PropsWithChildren<ModalProps>,
    ref: ForwardedRef<HTMLDialogElement>,
  ) => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    useImperativeHandle(ref, () => dialogRef.current as HTMLDialogElement);

    const generatedId = useId();
    const titleId = `${id ?? `tilburg-modal-${generatedId.replace(/:/g, '')}`}-title`;

    useEffect(() => {
      const dialog = dialogRef.current;
      if (!dialog || open === undefined) return;
      if (open && !dialog.open) dialog.showModal();
      if (!open && dialog.open) dialog.close();
    }, [open]);

    const close = () => dialogRef.current?.close();

    const handleClick = (event: MouseEvent<HTMLDialogElement>) => {
      onClick?.(event);
      /* A click whose target is the <dialog> itself landed on the backdrop:
         the box's own padding is covered by its children. */
      if (closeOnBackdropClick && event.target === event.currentTarget) close();
    };

    const handleClose = (event: SyntheticEvent<HTMLDialogElement>) => {
      if (event.target === event.currentTarget) onClose?.();
    };

    return (
      <dialog
        {...restProps}
        ref={dialogRef}
        id={id}
        className={clsx('tilburg-modal', className)}
        aria-labelledby={titleId}
        onClick={handleClick}
        onClose={handleClose}
      >
        <header className="tilburg-modal__header">
          <h2 id={titleId}>{title}</h2>
          <button type="button" className="tilburg-modal__close-button" onClick={close}>
            <span>{closeLabel}</span>
            <CloseIcon />
          </button>
        </header>
        <div className="tilburg-modal__content">{children}</div>
        {footer && <footer className="tilburg-modal__footer">{footer}</footer>}
      </dialog>
    );
  },
);

Modal.displayName = 'Modal';
