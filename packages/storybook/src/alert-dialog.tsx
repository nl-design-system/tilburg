import { Button, Heading } from '@utrecht/component-library-react/dist/css-module';
import clsx from 'clsx';
import React, { useState } from 'react';
import './styles/modal.css';

const CloseIcon = () => (
  <svg aria-hidden="true" width="14" height="14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M.293.293a1 1 0 0 1 1.414 0L7 5.586 12.293.293a1 1 0 1 1 1.414 1.414L8.414 7l5.293 5.293a1 1 0 0 1-1.414 1.414L7 8.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L5.586 7 .293 1.707a1 1 0 0 1 0-1.414Z"
      fill="currentColor"
    />
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

    const _CLASSES = clsx('tilburg-modal', isOpen && 'open');

    return (
      <dialog id={id} className={_CLASSES} ref={ref} onClick={onBackdropClick}>
        <div className="tilburg-modal__header">
          <Heading level={2}>{title}</Heading>
          <button className="tilburg-modal__close-button" onClick={onCloseHandler}>
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
