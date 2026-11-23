import '@gemeente-tilburg/components-css/file-input/index.scss';
import clsx from 'clsx';
import { ChangeEvent, ForwardedRef, forwardRef, InputHTMLAttributes, useState } from 'react';

export interface FileInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'value'> {
  invalid?: boolean;
  /** The text in the drop zone, above the button. */
  dropLabel?: string;
  /** The text on the button. Also the accessible name when there is no `id` (for a `<label>`) or `aria-label(ledby)`. */
  buttonLabel?: string;
  /** List the chosen files under the drop zone. Turn it off when you upload a file right away and show it elsewhere:
   *  the input is then emptied after each choice, so the same file can be chosen again. */
  showFiles?: boolean;
  /** Uploading: a spinner with `busyLabel` covers the drop zone and no file can be added. */
  busy?: boolean;
  /** The text under the spinner, also announced to screen readers. */
  busyLabel?: string;
  /** The chosen or dropped files. */
  onFilesChange?: (files: File[]) => void;
}

/** A drop zone to add files to a form. `className` goes to the wrapper; every other attribute, and the `ref`, to the
 *  `<input type="file">`. The children are shown in the drop zone, under the button: what may be uploaded. */
export const FileInput = forwardRef(
  (
    {
      className,
      children,
      id,
      multiple,
      disabled,
      required,
      invalid,
      dropLabel = multiple ? 'Sleep uw bestanden hierheen of' : 'Sleep uw bestand hierheen of',
      buttonLabel = multiple ? 'Bestanden kiezen' : 'Bestand kiezen',
      showFiles = true,
      busy,
      busyLabel = 'Bezig met uploaden…',
      onChange,
      onFilesChange,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      ...restProps
    }: FileInputProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const [files, setFiles] = useState<File[]>([]);
    const [dragOver, setDragOver] = useState(false);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      onChange?.(event);
      const chosen = Array.from(event.target.files ?? []);
      onFilesChange?.(chosen);
      if (showFiles) setFiles(chosen);
      else event.target.value = '';
    };

    return (
      <div
        className={clsx(
          'tilburg-file-input',
          dragOver && 'tilburg-file-input--drag-over',
          busy && 'tilburg-file-input--busy',
          className,
        )}
      >
        {/* The drop itself is the browser's: it lands in the input, which covers the drop zone. */}
        <div
          className="tilburg-file-input__dropzone"
          aria-busy={busy ? 'true' : undefined}
          onDragEnter={() => setDragOver(!disabled && !busy)}
          onDragLeave={() => setDragOver(false)}
          onDrop={() => setDragOver(false)}
        >
          <span className="tilburg-file-input__text">{dropLabel}</span>
          <span
            className="tilburg-file-input__button utrecht-button utrecht-button--secondary-action"
            aria-hidden="true"
          >
            {buttonLabel}
          </span>
          {children}
          <input
            ref={ref}
            className="tilburg-file-input__input"
            type="file"
            id={id}
            multiple={multiple}
            disabled={disabled || busy}
            required={required}
            aria-invalid={invalid ? 'true' : undefined}
            aria-required={required ? 'true' : undefined}
            aria-label={ariaLabel ?? (id || ariaLabelledBy ? undefined : buttonLabel)}
            aria-labelledby={ariaLabelledBy}
            onChange={handleChange}
            {...restProps}
          />
          <div className="tilburg-file-input__busy" role="status">
            {busy && (
              <>
                <span className="tilburg-file-input__spinner" aria-hidden="true" />
                <span>{busyLabel}</span>
              </>
            )}
          </div>
        </div>
        <div className="tilburg-file-input__files" role="status">
          {files.length > 0 && (
            <ul>
              {files.map((file) => (
                <li key={file.name} className="tilburg-file-input__file">
                  {file.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  },
);

FileInput.displayName = 'FileInput';
