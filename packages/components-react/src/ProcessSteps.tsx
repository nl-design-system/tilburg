import '@gemeente-tilburg/components-css/process-steps/index.scss';
import clsx from 'clsx';
import { ForwardedRef, forwardRef, OlHTMLAttributes, ReactNode } from 'react';

export type ProcessStepStatus = 'checked' | 'current' | 'not-checked';

export interface ProcessSubStep {
  title: ReactNode;
  status?: ProcessStepStatus;
  date?: ReactNode;
}

export interface ProcessStep extends ProcessSubStep {
  /** Text in the marker; defaults to the step number. A checked step shows a check instead. */
  marker?: ReactNode;
  meta?: ReactNode;
  steps?: ProcessSubStep[];
}

export interface ProcessStepsProps extends OlHTMLAttributes<HTMLOListElement> {
  steps?: ProcessStep[];
  /** Visually hidden text read before each heading. */
  statusLabels?: Record<ProcessStepStatus, string>;
}

const DEFAULT_LABELS: Record<ProcessStepStatus, string> = {
  checked: 'Afgerond',
  current: 'Huidige stap',
  'not-checked': 'Nog niet gestart',
};

/* Den Haag's connector rule: dashed (`not-checked`) towards a step that is not checked yet, else the own status. */
const line = (status: ProcessStepStatus, next?: ProcessStepStatus): ProcessStepStatus =>
  !next || next === 'not-checked' ? 'not-checked' : status;

const Connector = ({ appearance, from, to }: { appearance: ProcessStepStatus; from: string; to: string }) => (
  <div
    className={clsx(
      'denhaag-step-marker__connector',
      `denhaag-step-marker__connector--${appearance}`,
      `denhaag-step-marker__connector--${from}-to-${to}`,
    )}
    aria-hidden="true"
  />
);

const CheckIcon = () => (
  <svg
    className="denhaag-icon"
    aria-hidden="true"
    focusable="false"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export const ProcessSteps = forwardRef(
  (
    { steps = [], statusLabels = DEFAULT_LABELS, className, ...restProps }: ProcessStepsProps,
    ref: ForwardedRef<HTMLOListElement>,
  ) => {
    const hidden = (status: ProcessStepStatus) => (
      <span className="utrecht-visually-hidden">{`${statusLabels[status]}: `}</span>
    );
    return (
      <ol ref={ref} className={clsx('denhaag-process-steps', className)} {...restProps}>
        {steps.map((step, index) => {
          const status = step.status ?? 'not-checked';
          const next = steps[index + 1];
          const subSteps = step.steps ?? [];
          return (
            <li
              key={index}
              className={clsx('denhaag-process-steps__step', `denhaag-process-steps__step--${status}`)}
              aria-current={status === 'current' ? 'step' : undefined}
            >
              <div className="denhaag-process-steps__step-header">
                <div className={clsx('denhaag-step-marker', `denhaag-step-marker--${status}`)} aria-hidden="true">
                  {status === 'checked' ? <CheckIcon /> : (step.marker ?? index + 1)}
                </div>
                <p
                  className={clsx(
                    'denhaag-process-steps__step-heading',
                    `denhaag-process-steps__step-heading--${status}`,
                  )}
                >
                  {hidden(status)}
                  {step.title}
                </p>
              </div>
              <div className="denhaag-process-steps__step-body">
                {next && (
                  <Connector
                    appearance={line(status, subSteps[0]?.status ?? next.status ?? 'not-checked')}
                    from="main"
                    to={subSteps.length ? 'nested' : 'main'}
                  />
                )}
                {step.meta && <div className="denhaag-process-steps__step-meta">{step.meta}</div>}
                {step.date && (
                  <div className="denhaag-process-steps__step-meta denhaag-process-steps__step-meta--date">
                    {step.date}
                  </div>
                )}
              </div>
              {subSteps.length > 0 && (
                <div className="denhaag-process-steps__step-details">
                  <ol className="denhaag-process-steps">
                    {subSteps.map((sub, subIndex) => {
                      const subStatus = sub.status ?? 'not-checked';
                      const nextSub = subSteps[subIndex + 1];
                      return (
                        <li
                          key={subIndex}
                          className={clsx(
                            'denhaag-process-steps__sub-step',
                            `denhaag-process-steps__sub-step--${subStatus}`,
                          )}
                        >
                          <div className="denhaag-process-steps__step-header denhaag-process-steps__step-header--nested">
                            <div
                              className={clsx(
                                'denhaag-step-marker',
                                `denhaag-step-marker--${subStatus}`,
                                'denhaag-step-marker--nested',
                              )}
                              aria-hidden="true"
                            >
                              {subStatus === 'checked' && <CheckIcon />}
                            </div>
                            <p className="denhaag-process-steps__sub-step-heading">
                              {hidden(subStatus)}
                              {sub.title}
                            </p>
                          </div>
                          {(nextSub || next) && (
                            <Connector
                              appearance={line(
                                subStatus,
                                nextSub ? (nextSub.status ?? 'not-checked') : (next?.status ?? 'not-checked'),
                              )}
                              from="nested"
                              to={nextSub ? 'nested' : 'main'}
                            />
                          )}
                          {sub.date && (
                            <div className="denhaag-process-steps__step-meta denhaag-process-steps__step-meta--nested">
                              {sub.date}
                            </div>
                          )}
                        </li>
                      );
                    })}
                  </ol>
                </div>
              )}
            </li>
          );
        })}
      </ol>
    );
  },
);

ProcessSteps.displayName = 'ProcessSteps';
