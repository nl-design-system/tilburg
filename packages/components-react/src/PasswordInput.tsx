import '@gemeente-tilburg/components-css/password-input/index.scss';
import clsx from 'clsx';
import { ForwardedRef, forwardRef, useId, useState } from 'react';
import { Textbox, TextboxProps } from './Textbox';

export interface PasswordInputProps extends Omit<TextboxProps, 'type'> {
  /** Label of the show/hide button; it stays the same, `aria-pressed` reports the state. */
  toggleLabel?: string;
  /** Status line read out after showing the password. */
  statusShown?: string;
  /** Status line read out after hiding the password. */
  statusHidden?: string;
  /** Class on the wrapper; `className` goes to the `<input>`, like on `Textbox`. */
  wrapperClassName?: string;
}

const EyeIcon = () => (
  <svg
    className="tilburg-password-input__icon tilburg-password-input__icon--show"
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg
    className="tilburg-password-input__icon tilburg-password-input__icon--hide"
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17.94 17.94A10 10 0 0 1 12 20c-7 0-11-8-11-8a18.5 18.5 0 0 1 5.06-5.94M9.9 4.24A9.1 9.1 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19M14.12 14.12a3 3 0 1 1-4.24-4.24" />
    <path d="M1 1l22 22" />
  </svg>
);

/** A password textbox with a show/hide toggle (Tilburg component, bq-tlb-frontend TIL-72). */
export const PasswordInput = forwardRef(
  (
    {
      id,
      toggleLabel = 'Wachtwoord tonen',
      statusShown = 'Wachtwoord is zichtbaar.',
      statusHidden = 'Wachtwoord is verborgen.',
      wrapperClassName,
      disabled,
      ...restProps
    }: PasswordInputProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const fallbackId = useId();
    const inputId = id ?? fallbackId;
    const [visible, setVisible] = useState(false);
    /* Empty until the first click, so nothing is announced on page load. */
    const [status, setStatus] = useState('');

    const toggle = () => {
      setVisible(!visible);
      setStatus(visible ? statusHidden : statusShown);
    };

    return (
      <div className={clsx('tilburg-password-input', wrapperClassName)}>
        <Textbox ref={ref} id={inputId} type={visible ? 'text' : 'password'} disabled={disabled} {...restProps} />
        <button
          type="button"
          className="tilburg-password-input__toggle"
          aria-pressed={visible}
          aria-controls={inputId}
          aria-label={toggleLabel}
          disabled={disabled}
          onClick={toggle}
        >
          <EyeIcon />
          <EyeOffIcon />
        </button>
        <span className="tilburg-password-input__status" aria-live="polite">
          {status}
        </span>
      </div>
    );
  },
);

PasswordInput.displayName = 'PasswordInput';
