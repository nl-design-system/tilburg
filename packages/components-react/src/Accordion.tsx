import '@gemeente-tilburg/components-css/accordion/index.scss';
import clsx from 'clsx';
import { ForwardedRef, forwardRef, HTMLAttributes, PropsWithChildren, ReactNode, useCallback, useState } from 'react';
import { Heading1 } from './Heading1';
import { Heading2 } from './Heading2';
import { Heading3 } from './Heading3';
import { Heading4 } from './Heading4';
import { Heading5 } from './Heading5';
import { Heading6 } from './Heading6';

const HEADINGS = { 1: Heading1, 2: Heading2, 3: Heading3, 4: Heading4, 5: Heading5, 6: Heading6 } as const;

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
      ...restProps
    }: PropsWithChildren<AccordionProps>,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const HeadingTag = HEADINGS[headingLevel];
    return (
      <div
        ref={ref}
        className={clsx('utrecht-accordion', className)}
        aria-label={ariaLabel}
        role={ariaLabel ? 'region' : undefined}
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
