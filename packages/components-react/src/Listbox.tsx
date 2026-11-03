import '@gemeente-tilburg/components-css/combobox/index.scss';
import '@gemeente-tilburg/components-css/listbox/index.scss';
import clsx from 'clsx';
import {
  ForwardedRef,
  forwardRef,
  HTMLAttributes,
  type JSX,
  KeyboardEvent,
  Ref,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';

export interface ListboxItem<V = unknown> {
  value: V;
  label: string;
}

interface ListboxBaseProps<V> extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  items: ReadonlyArray<ListboxItem<V>>;
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
}

export interface SingleListboxProps<V> extends ListboxBaseProps<V> {
  multiple?: false;
  value?: V | null;
  defaultValue?: V | null;
  onChange?: (value: V | null) => void;
}

export interface MultiListboxProps<V> extends ListboxBaseProps<V> {
  multiple: true;
  value?: readonly V[];
  defaultValue?: readonly V[];
  onChange?: (value: V[]) => void;
}

export type ListboxProps<V = unknown> = SingleListboxProps<V> | MultiListboxProps<V>;

const toArray = <V,>(value: V | null | undefined | readonly V[]): V[] =>
  Array.isArray(value) ? [...value] : value === null || value === undefined ? [] : [value as V];

/**
 * Standalone WAI-ARIA listbox. Focus stays on the `role="listbox"` element; `aria-activedescendant` and
 * `data-active` mark the active option (the combobox convention, so the combobox option styling applies).
 */
function ListboxImpl<V>(props: ListboxProps<V>, ref: ForwardedRef<HTMLDivElement>): JSX.Element {
  const {
    items,
    multiple,
    value,
    defaultValue,
    onChange,
    disabled,
    invalid,
    required,
    id,
    className,
    onKeyDown,
    onFocus,
    onBlur,
    ...restProps
  } = props;
  const generatedId = useId();
  const listboxId = id ?? `tilburg-listbox-${generatedId}`;
  const optionId = (index: number) => `${listboxId}-opt-${index}`;

  const [ownValue, setOwnValue] = useState(defaultValue);
  const selected = toArray<V>(value !== undefined ? value : ownValue);
  const [rawActiveIndex, setActiveIndex] = useState(-1);
  /* Clamped so `aria-activedescendant` never points at an option that `items` no longer has. */
  const activeIndex = Math.min(rawActiveIndex, items.length - 1);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (activeIndex >= 0) listRef.current?.children[activeIndex]?.scrollIntoView?.({ block: 'nearest' });
  }, [activeIndex]);

  const select = (index: number) => {
    const item = items[index];
    if (!item || disabled) return;
    if (multiple) {
      const next = selected.includes(item.value) ? selected.filter((v) => v !== item.value) : [...selected, item.value];
      setOwnValue(next);
      (onChange as MultiListboxProps<V>['onChange'])?.(next);
    } else {
      setOwnValue(item.value);
      (onChange as SingleListboxProps<V>['onChange'])?.(item.value);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event);
    if (disabled || items.length === 0) return;
    const last = items.length - 1;
    const moves: Record<string, number> = {
      ArrowDown: Math.min(activeIndex + 1, last),
      ArrowUp: Math.max(activeIndex - 1, 0),
      Home: 0,
      End: last,
    };
    if (event.key in moves) {
      event.preventDefault();
      setActiveIndex(moves[event.key]);
    } else if ((event.key === ' ' || event.key === 'Enter') && activeIndex >= 0) {
      event.preventDefault();
      select(activeIndex);
    }
  };

  return (
    <div
      ref={ref}
      id={listboxId}
      className={clsx(
        'utrecht-listbox',
        'utrecht-listbox--html-div',
        disabled && 'utrecht-listbox--disabled',
        invalid && 'utrecht-listbox--invalid',
        className,
      )}
      role="listbox"
      tabIndex={0}
      aria-activedescendant={activeIndex >= 0 ? optionId(activeIndex) : undefined}
      aria-disabled={disabled ? 'true' : undefined}
      aria-invalid={invalid ? 'true' : undefined}
      aria-multiselectable={multiple ? 'true' : undefined}
      aria-required={required ? 'true' : undefined}
      onKeyDown={handleKeyDown}
      onFocus={(event) => {
        onFocus?.(event);
        /* WAI-ARIA: focus lands on the first selected option, or the first option. */
        if (activeIndex < 0 && !disabled && items.length > 0) {
          setActiveIndex(
            Math.max(
              items.findIndex((item) => selected.includes(item.value)),
              0,
            ),
          );
        }
      }}
      onBlur={(event) => {
        onBlur?.(event);
        setActiveIndex(-1);
      }}
      {...restProps}
    >
      <ul ref={listRef} className="utrecht-listbox__list" role="presentation">
        {items.map((item, index) => {
          const isSelected = selected.includes(item.value);
          return (
            <li
              key={optionId(index)}
              id={optionId(index)}
              className={clsx(
                'utrecht-listbox__option',
                'utrecht-listbox__option--html-li',
                isSelected && 'utrecht-listbox__option--selected',
              )}
              role="option"
              aria-selected={isSelected ? 'true' : 'false'}
              data-active={index === activeIndex ? 'true' : undefined}
              onClick={() => {
                if (disabled) return;
                setActiveIndex(index);
                select(index);
              }}
            >
              {item.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* Overloads so `multiple` narrows `value` / `onChange` (same approach as `Combobox`). */
export const Listbox = forwardRef(ListboxImpl) as {
  <V = unknown>(props: MultiListboxProps<V> & { ref?: Ref<HTMLDivElement> }): JSX.Element;
  <V = unknown>(props: SingleListboxProps<V> & { ref?: Ref<HTMLDivElement> }): JSX.Element;
};

(Listbox as unknown as { displayName: string }).displayName = 'Listbox';
