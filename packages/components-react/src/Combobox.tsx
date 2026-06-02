import '@gemeente-tilburg/components-css/combobox/index.scss';
import clsx from 'clsx';
import {
  ForwardedRef,
  forwardRef,
  type JSX,
  KeyboardEvent,
  MouseEvent as ReactMouseEvent,
  Ref,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';

export interface ComboboxItem<V = unknown> {
  value: V;
  label: string;
  disabled?: boolean;
}

type SingleValue<V> = V | null | undefined;
type MultiValue<V> = readonly V[];

export interface ComboboxBaseProps<V> {
  items: ReadonlyArray<ComboboxItem<V>>;
  id?: string;
  placeholder?: string;
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
  clearable?: boolean;
  'aria-label'?: string;
  'aria-describedby'?: string;
  className?: string;
}

export interface SingleComboboxProps<V> extends ComboboxBaseProps<V> {
  multiple?: false;
  value: SingleValue<V>;
  /* eslint-disable-next-line no-unused-vars -- callback param in a type-only signature */
  onChange: (value: SingleValue<V>) => void;
}

export interface MultiComboboxProps<V> extends ComboboxBaseProps<V> {
  multiple: true;
  value: MultiValue<V>;
  /* eslint-disable-next-line no-unused-vars -- callback param in a type-only signature */
  onChange: (value: V[]) => void;
}

export type ComboboxProps<V = unknown> = SingleComboboxProps<V> | MultiComboboxProps<V>;

/**
 * Tilburg combobox — hand-rolled React composite over the WAI-ARIA combobox
 * pattern. Renders the same DOM as the HTML/CSS reference, so the styling in
 * `@gemeente-tilburg/components-css/combobox` applies as-is.
 *
 * Two visual modes share the same outer `.utrecht-combobox` host:
 *  - Normal (`multiple` omitted/false): single value, single-line text input + chevron.
 *  - Chiplist (`multiple={true}`): selected options render as removable chips
 *    inside the host before the input.
 */
function ComboboxImpl<V>(props: ComboboxProps<V>, ref: ForwardedRef<HTMLInputElement>): JSX.Element {
  const {
    items,
    placeholder,
    disabled,
    invalid,
    required,
    clearable,
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedBy,
    className,
  } = props;

  const reactId = useId();
  const id = props.id ?? `tilburg-combobox-${reactId}`;
  const listboxId = `${id}-listbox`;
  const optionId = (index: number) => `${id}-opt-${index}`;

  const [isOpen, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);

  // expose the input ref to forwardRef callers
  useEffect(() => {
    if (typeof ref === 'function') ref(inputRef.current);
    else if (ref) (ref as { current: HTMLInputElement | null }).current = inputRef.current;
  }, [ref]);

  const selectedValues: V[] = useMemo(() => {
    if (props.multiple) return [...props.value];
    return props.value === null || props.value === undefined ? [] : [props.value];
  }, [props.multiple, props.value]);

  const isSelected = useCallback((v: V) => selectedValues.includes(v), [selectedValues]);

  const open = useCallback(() => {
    if (disabled) return;
    setOpen(true);
    /* No auto-mark on open: the freshly-opened popover starts with no active
       option so the currently-selected option shows only the soft blue-50
       "selected" tone, not the marked+selected blue-400 stripe. The active
       stripe appears once the user pointer-hovers or keyboard-navigates.
       ArrowDown on activeIndex=-1 still lands on index 0 in handleKeyDown. */
    setActiveIndex(-1);
  }, [disabled]);

  const close = useCallback(() => {
    setOpen(false);
    setActiveIndex(-1);
  }, []);

  const toggle = useCallback(() => {
    if (isOpen) close();
    else open();
  }, [isOpen, close, open]);

  const selectAt = useCallback(
    (index: number) => {
      const item = items[index];
      if (!item || item.disabled) return;
      if (props.multiple) {
        const next = isSelected(item.value)
          ? selectedValues.filter((v) => v !== item.value)
          : [...selectedValues, item.value];
        props.onChange(next);
      } else {
        props.onChange(item.value);
        close();
        inputRef.current?.focus();
      }
    },
    [items, props, selectedValues, isSelected, close],
  );

  const removeChip = useCallback(
    (v: V, event?: ReactMouseEvent) => {
      event?.stopPropagation();
      if (!props.multiple) return;
      props.onChange(selectedValues.filter((x) => x !== v));
    },
    [props, selectedValues],
  );

  const handleClear = useCallback(
    (event?: ReactMouseEvent) => {
      event?.stopPropagation();
      if (props.multiple) props.onChange([]);
      else props.onChange(null);
    },
    [props],
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (disabled) return;
      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          if (!isOpen) open();
          else setActiveIndex((i) => Math.min(i + 1, items.length - 1));
          break;
        case 'ArrowUp':
          event.preventDefault();
          if (!isOpen) open();
          else setActiveIndex((i) => Math.max(i - 1, 0));
          break;
        case 'Home':
          if (isOpen) {
            event.preventDefault();
            setActiveIndex(0);
          }
          break;
        case 'End':
          if (isOpen) {
            event.preventDefault();
            setActiveIndex(items.length - 1);
          }
          break;
        case 'Enter':
          if (isOpen && activeIndex >= 0) {
            event.preventDefault();
            selectAt(activeIndex);
          }
          break;
        case 'Escape':
          if (isOpen) {
            event.preventDefault();
            close();
          }
          break;
        case 'Backspace':
          if (props.multiple && (event.currentTarget.value ?? '') === '' && selectedValues.length > 0) {
            removeChip(selectedValues[selectedValues.length - 1] as V);
          }
          break;
      }
    },
    [disabled, isOpen, open, items.length, activeIndex, close, props, selectedValues, removeChip, selectAt],
  );

  // close on outside click
  useEffect(() => {
    if (!isOpen) return undefined;
    const onDocClick = (e: MouseEvent) => {
      if (!hostRef.current?.contains(e.target as Node)) close();
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [isOpen, close]);

  const selectedItems = useMemo(
    () => selectedValues.map((v) => items.find((it) => it.value === v)).filter((x): x is ComboboxItem<V> => !!x),
    [selectedValues, items],
  );

  const displayValue = useMemo(() => {
    if (props.multiple) return '';
    const sel = items.find((it) => it.value === props.value);
    return sel?.label ?? '';
  }, [props, items]);

  return (
    <div ref={hostRef} className={clsx('utrecht-combobox', props.multiple && 'tilburg-combobox--multiple', className)}>
      {/* Click anywhere on the value container (empty space, around the input,
          on the chevron) toggles the popover. chip-remove and clear handlers
          stopPropagation so they don't double-toggle. */}
      <div className="tilburg-combobox__value-container" onClick={toggle}>
        {props.multiple
          ? selectedItems.map((item) => (
              <span key={String(item.value)} className="tilburg-combobox__chip">
                {item.label}
                <button
                  type="button"
                  className="tilburg-combobox__chip-remove"
                  aria-label={`Verwijder ${item.label}`}
                  disabled={disabled}
                  onClick={(e) => removeChip(item.value, e)}
                >
                  ×
                </button>
              </span>
            ))
          : null}
        <input
          ref={inputRef}
          id={id}
          className="tilburg-combobox__input"
          type="text"
          role="combobox"
          readOnly
          value={displayValue}
          placeholder={props.multiple && selectedValues.length > 0 ? undefined : placeholder}
          disabled={disabled}
          aria-label={ariaLabel}
          aria-describedby={ariaDescribedBy}
          aria-expanded={isOpen}
          aria-controls={listboxId}
          aria-activedescendant={isOpen && activeIndex >= 0 ? optionId(activeIndex) : undefined}
          aria-invalid={invalid ? 'true' : undefined}
          aria-required={required ? 'true' : undefined}
          onKeyDown={handleKeyDown}
          /* React DOM doesn't read `value` changes for readOnly inputs back from
             user typing, but we still need onChange for type-safety + future
             searchable mode. */
          onChange={() => undefined}
        />
        {clearable &&
        (props.multiple ? selectedValues.length > 0 : props.value !== null && props.value !== undefined) ? (
          <button
            type="button"
            className="tilburg-combobox__clear"
            aria-label="Wis selectie"
            disabled={disabled}
            onClick={handleClear}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        ) : null}
        <button
          type="button"
          className="tilburg-combobox__chevron"
          aria-label={isOpen ? 'Sluit opties' : 'Toon opties'}
          tabIndex={-1}
          disabled={disabled}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
      </div>
      <ul
        id={listboxId}
        role="listbox"
        aria-multiselectable={props.multiple ? true : undefined}
        className={clsx(
          'utrecht-listbox',
          'utrecht-combobox__popover',
          'utrecht-combobox__popover--block-end',
          !isOpen && 'utrecht-combobox__popover--hidden',
        )}
      >
        {items.map((item, i) => (
          <li
            key={String(item.value)}
            id={optionId(i)}
            role="option"
            className="utrecht-listbox__option"
            data-active={activeIndex === i ? 'true' : undefined}
            aria-selected={isSelected(item.value)}
            aria-disabled={item.disabled ? 'true' : undefined}
            onMouseEnter={() => setActiveIndex(i)}
            onMouseDown={(e) => {
              e.preventDefault();
              selectAt(i);
            }}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

export const Combobox = forwardRef(ComboboxImpl) as <V = unknown>(
  /* eslint-disable-next-line no-unused-vars -- callable signature for the forwardRef cast */
  props: ComboboxProps<V> & { ref?: Ref<HTMLInputElement> },
) => JSX.Element;

(Combobox as unknown as { displayName: string }).displayName = 'Combobox';
