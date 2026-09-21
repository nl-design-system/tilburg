import { forwardRef, MouseEvent, ReactNode } from 'react';
import { Button } from './Button';
import { Modal } from './Modal';

export interface AlertDialogProps {
  id?: string;
  title: string;
  children: ReactNode;
  customFooter?: ReactNode;
}

const closeClosestDialog = (event: MouseEvent<HTMLElement>) => event.currentTarget.closest('dialog')?.close();

/**
 * @deprecated Use `Modal`. Kept for backwards compatibility: same props as
 * before, rendered through `Modal`. Without `customFooter` it keeps the old
 * default footer with a single close button.
 */
export const AlertDialog = forwardRef<HTMLDialogElement, AlertDialogProps>(
  ({ id, title, children, customFooter }, ref) => (
    <Modal
      ref={ref}
      id={id}
      title={title}
      footer={
        customFooter ?? (
          <Button appearance="primary-action-button" onClick={closeClosestDialog}>
            Sluiten
          </Button>
        )
      }
    >
      {children}
    </Modal>
  ),
);

AlertDialog.displayName = 'AlertDialog';
