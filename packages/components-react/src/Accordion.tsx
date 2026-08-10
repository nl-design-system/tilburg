import '@gemeente-tilburg/components-css/accordion/index.scss';
import clsx from 'clsx';
import {
  ForwardedRef,
  forwardRef,
  HTMLAttributes,
  KeyboardEvent,
  PropsWithChildren,
  ReactNode,
  useCallback,
  useState,
} from 'react';
import { Heading1 } from './Heading1';
import { Heading2 } from './Heading2';
import { Heading3 } from './Heading3';
import { Heading4 } from './Heading4';
import { Heading5 } from './Heading5';
import { Heading6 } from './Heading6';

const HEADINGS = { 1: Heading1, 2: Heading2, 3: Heading3, 4: Heading4, 5: Heading5, 6: Heading6 } as const;

const ACCORDION_NAV_KEYS = ['ArrowDown', 'ArrowUp', 'Home', 'End'] as const;
type AccordionNavKey = (typeof ACCORDION_NAV_KEYS)[number];

export interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  displayName?: string;
}

/* Tilburg-specific Accordion: matches the Angular template byte-for-byte.
   Does NOT use Utrecht React's `<Accordion>` (which renders `<details>` /
   `<summary>` and therefore shows the browser's native disclosure arrow). */
export const Accordion = forwardRef(
  (
    {
      headingLevel = 2,
      displayName,
      'aria-label': ariaLabel,
      className,
      children,
      onKeyDown,
      ...restProps
    }: PropsWithChildren<AccordionProps>,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const HeadingTag = HEADINGS[headingLevel];

    /* Roving focus across the section headers, mirroring the Angular
       `TilburgAccordion` host listener: Arrow Up/Down wrap between the
       enabled buttons, Home/End jump to the first/last. */
    const handleKeyDown = useCallback(
      (event: KeyboardEvent<HTMLDivElement>) => {
        onKeyDown?.(event);
        if (event.defaultPrevented) return;
        if (!ACCORDION_NAV_KEYS.includes(event.key as AccordionNavKey)) return;

        const target = event.target as HTMLElement | null;
        if (!(target instanceof HTMLButtonElement)) return;
        if (!target.classList.contains('utrecht-accordion__button')) return;

        const root = event.currentTarget;
        /* Skip nested accordions: only handle buttons that belong to this one. */
        if (target.closest('.utrecht-accordion') !== root) return;

        const buttons = Array.from(
          root.querySelectorAll<HTMLButtonElement>('.utrecht-accordion__section button.utrecht-accordion__button'),
        ).filter((button) => !button.disabled && button.closest('.utrecht-accordion') === root);

        const idx = buttons.indexOf(target);
        if (idx === -1 || buttons.length === 0) return;

        let next: number;
        switch (event.key as AccordionNavKey) {
          case 'ArrowDown':
            next = (idx + 1) % buttons.length;
            break;
          case 'ArrowUp':
            next = (idx - 1 + buttons.length) % buttons.length;
            break;
          case 'Home':
            next = 0;
            break;
          case 'End':
            next = buttons.length - 1;
            break;
        }

        event.preventDefault();
        buttons[next].focus();
      },
      [onKeyDown],
    );

    return (
      <div
        ref={ref}
        className={clsx('utrecht-accordion', className)}
        aria-label={ariaLabel}
        role={ariaLabel ? 'region' : undefined}
        onKeyDown={handleKeyDown}
        {...restProps}
      >
        {displayName && <HeadingTag className="tilburg-accordion__display-name">{displayName}</HeadingTag>}
        {children}
      </div>
    );
  },
);

Accordion.displayName = 'Accordion';

export interface AccordionSectionProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onToggle'> {
  /** Unique key for the section. Used to build the panel + button IDs. */
  sectionKey?: string;
  label?: string;
  expanded?: boolean;
  disabled?: boolean;
  /** When true the section manages its own expanded state and only emits onToggle. */
  autoToggle?: boolean;
  iconCollapsed?: ReactNode;
  iconExpanded?: ReactNode;
  // eslint-disable-next-line no-unused-vars
  onToggle?: (nextExpanded: boolean) => void;
}

export const AccordionSection = forwardRef(
  (
    {
      sectionKey,
      label,
      expanded: expandedProp = false,
      disabled = false,
      autoToggle = false,
      iconCollapsed,
      iconExpanded,
      onToggle,
      className,
      children,
      ...restProps
    }: PropsWithChildren<AccordionSectionProps>,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const [internalExpanded, setInternalExpanded] = useState(expandedProp);
    const expanded = autoToggle ? internalExpanded : expandedProp;

    const handleClick = useCallback(() => {
      if (disabled) return;
      const next = !expanded;
      if (autoToggle) setInternalExpanded(next);
      onToggle?.(next);
    }, [disabled, expanded, autoToggle, onToggle]);

    const panelId = `utrecht-accordion-${sectionKey ?? ''}-panel`;
    const buttonId = `utrecht-accordion-${sectionKey ?? ''}-button`;

    return (
      <div ref={ref} className={clsx('utrecht-accordion__section', className)} {...restProps}>
        <span className="utrecht-accordion__header">
          <button
            className="utrecht-button utrecht-button--subtle utrecht-accordion__button"
            id={buttonId}
            type="button"
            disabled={disabled}
            aria-expanded={expanded}
            aria-controls={panelId}
            onClick={handleClick}
          >
            <span className="utrecht-accordion__button-icon" aria-hidden="true">
              {expanded ? (iconExpanded ?? '−') : (iconCollapsed ?? '+')}
            </span>
            <span className="utrecht-accordion__button-label tilburg-accordion__display-name">{label}</span>
          </button>
        </span>
        <div
          className="utrecht-accordion__panel"
          id={panelId}
          aria-labelledby={buttonId}
          hidden={!expanded}
          role="region"
        >
          {children}
        </div>
      </div>
    );
  },
);

AccordionSection.displayName = 'AccordionSection';
