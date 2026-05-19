import '@gemeente-tilburg/components-css/progress-bar/index.scss';
import { ForwardedRef, forwardRef, HTMLAttributes, MouseEvent, ReactNode } from 'react';
import { Heading2 } from './Heading2';

export interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  value?: number;
  total?: number;
  label?: string;
  title?: string;
  backLabel?: string;
  showBack?: boolean;
  backIcon?: ReactNode;
  // eslint-disable-next-line no-unused-vars
  onBackClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
}

export const ProgressBar = forwardRef(
  (
    {
      value = 0,
      total = 0,
      label,
      title,
      backLabel,
      showBack = false,
      backIcon,
      onBackClick,
      'aria-label': ariaLabel,
      ...restProps
    }: ProgressBarProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const percentage = total <= 0 ? 0 : Math.max(0, Math.min(100, (value / total) * 100));
    const handleBack = (event: MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      onBackClick?.(event);
    };

    return (
      <div ref={ref} {...restProps}>
        {showBack && (
          <a className="tilburg-progress-bar__back utrecht-link utrecht-link--html-a" href="" onClick={handleBack}>
            {backIcon}
            <span className="tilburg-progress-bar__back-label">{backLabel}</span>
          </a>
        )}
        <div className="tilburg-progress-bar__header">
          {title && <Heading2 className="tilburg-progress-bar__title tilburg-step-title">{title}</Heading2>}
          {label && <div className="tilburg-progress-bar__label">{label}</div>}
        </div>
        <div
          className="tilburg-progress-bar__track"
          role="progressbar"
          aria-label={ariaLabel ?? title ?? undefined}
          aria-valuemin={0}
          aria-valuemax={total}
          aria-valuenow={value}
          aria-valuetext={label ?? undefined}
        >
          <div className="tilburg-progress-bar__indicator progress-bar-indicator" style={{ width: `${percentage}%` }} />
        </div>
      </div>
    );
  },
);

ProgressBar.displayName = 'ProgressBar';
