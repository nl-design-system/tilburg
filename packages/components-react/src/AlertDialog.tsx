import '@gemeente-tilburg/components-css/modal/index.scss';
import clsx from 'clsx';
import React, { useState } from 'react';
import { Button } from './Button';
import { Heading2 } from './Heading2';

/* Matches the modal CSS-class storybook reference (thin-stroke X). */
const CloseIcon = () => (
  <svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
    <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export interface AlertDialogProps {
  id?: string;
  title: string;
  children: React.ReactNode;
  customFooter?: React.ReactNode;
}

export const AlertDialog = React.forwardRef<HTMLDialogElement, AlertDialogProps>(
  ({ id, title, children, customFooter }, ref) => {
    const [isOpen, setIsOpen] = useState(false);

    const onCloseHandler = () => {
      setIsOpen(false);
      (ref as React.RefObject<HTMLDialogElement>)?.current?.close();
    };

    const onBackdropClick = (event: React.MouseEvent<HTMLDialogElement>) => {
      if (event.target !== (ref as React.RefObject<HTMLDialogElement>).current) {
        return;
      }
      setIsOpen(false);
      (ref as React.RefObject<HTMLDialogElement>)?.current?.close();
    };

    return (
      <dialog id={id} className={clsx('tilburg-modal', isOpen && 'open')} ref={ref} onClick={onBackdropClick}>
        <div className="tilburg-modal__header">
          <Heading2>{title}</Heading2>
          <button type="button" className="tilburg-modal__close-button" onClick={onCloseHandler}>
            <CloseIcon />
            Close
          </button>
        </div>
        <div className="tilburg-modal__content">{children}</div>
        {customFooter ? (
          customFooter
        ) : (
          <div className="tilburg-modal__footer">
            <Button appearance="primary-action-button" onClick={onCloseHandler}>
              Close
            </Button>
          </div>
        )}
      </dialog>
    );
  },
);

AlertDialog.displayName = 'AlertDialog';
