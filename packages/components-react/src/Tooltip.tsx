import '@gemeente-tilburg/components-css/tooltip/index.scss';
import { attachTooltip } from '@gemeente-tilburg/components-css/tooltip/index.js';
import clsx from 'clsx';
import { cloneElement, isValidElement, ReactElement, ReactNode, useEffect, useId, useRef } from 'react';

export type TooltipPlacement = 'above' | 'below';

export interface TooltipProps {
  /** The tooltip text: a short description of the trigger. */
  content: ReactNode;
  /** Where the tooltip opens, relative to the trigger. */
  placement?: TooltipPlacement;
  className?: string;
  /** The trigger: one element that accepts `aria-describedby` (a button, link, or Tilburg component). */
  children: ReactElement<{ 'aria-describedby'?: string }>;
}

/**
 * A short description of a control, shown on hover and focus (Tilburg component, bq-tlb-frontend TIL-53/54). Escape
 * closes it, the pointer can move onto it, a tap toggles it on touch screens (WCAG 1.4.13); the behaviour comes from
 * `attachTooltip()` in `@gemeente-tilburg/components-css/tooltip`, the same as the plain HTML/CSS version.
 */
export const Tooltip = ({ content, placement = 'above', className, children }: TooltipProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const popupId = useId();

  useEffect(() => (ref.current ? attachTooltip(ref.current) : undefined), []);

  /* Add the tooltip to the trigger's description, keeping any ids already there. */
  const trigger: ReactNode = isValidElement(children)
    ? cloneElement(children, {
        'aria-describedby': [children.props['aria-describedby'], popupId].filter(Boolean).join(' '),
      })
    : children;

  return (
    <span ref={ref} className={clsx('tilburg-tooltip', placement === 'below' && 'tilburg-tooltip--below', className)}>
      {trigger}
      <span className="tilburg-tooltip__popup" id={popupId} role="tooltip">
        {content}
      </span>
    </span>
  );
};

Tooltip.displayName = 'Tooltip';
