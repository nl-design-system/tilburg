import clsx from 'clsx';
import {
  DialogHTMLAttributes,
  ForwardedRef,
  forwardRef,
  MouseEvent,
  PropsWithChildren,
  SyntheticEvent,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';

export type DrawerAlign = 'inline-start' | 'inline-end' | 'block-start' | 'block-end';

export interface DrawerProps extends Omit<DialogHTMLAttributes<HTMLDialogElement>, 'open' | 'onClose'> {
  /** The edge the drawer slides in from. */
  align?: DrawerAlign;
  /** Controlled open state: `true` opens the drawer modally (`showModal()`), `false` closes it. */
  open?: boolean;
  /** Close when the backdrop (the area outside the drawer) is clicked. */
  closeOnBackdropClick?: boolean;
  /** Fired after the drawer closed — Escape, backdrop click, a `method="dialog"` form or `dialog.close()`. */
  onClose?: () => void;
}

/* Utrecht drawer on the native `<dialog>`, with the open/close behaviour of
   `Modal`. The forwarded ref is the `<dialog>`, so `ref.current.showModal()` /
   `.close()` keep working next to the controlled `open` prop. */
export const Drawer = forwardRef(
  (
    {
      align = 'inline-start',
      open,
      closeOnBackdropClick = true,
      onClose,
      onClick,
      className,
      children,
      ...restProps
    }: PropsWithChildren<DrawerProps>,
    ref: ForwardedRef<HTMLDialogElement>,
  ) => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    useImperativeHandle(ref, () => dialogRef.current as HTMLDialogElement);

    useEffect(() => {
      const dialog = dialogRef.current;
      if (!dialog || open === undefined) return;
      if (open && !dialog.open) dialog.showModal();
      if (!open && dialog.open) dialog.close();
    }, [open]);

    const handleClick = (event: MouseEvent<HTMLDialogElement>) => {
      onClick?.(event);
      /* The backdrop belongs to the <dialog>: a click on it targets the dialog, but lands outside its box. (A click
         on the drawer's own padding targets the dialog too, and must not close it.) */
      const box = event.currentTarget.getBoundingClientRect();
      const outside =
        event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom;
      if (closeOnBackdropClick && event.target === event.currentTarget && outside) event.currentTarget.close();
    };

    const handleClose = (event: SyntheticEvent<HTMLDialogElement>) => {
      if (event.target === event.currentTarget) onClose?.();
    };

    return (
      <dialog
        {...restProps}
        ref={dialogRef}
        className={clsx('utrecht-drawer', `utrecht-drawer--${align}`, className)}
        onClick={handleClick}
        onClose={handleClose}
      >
        {children}
      </dialog>
    );
  },
);

Drawer.displayName = 'Drawer';
