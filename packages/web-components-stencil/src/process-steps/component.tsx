/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, Element, FunctionalComponent, h, Prop, State } from '@stencil/core';
import { AttributeInheritor, inheritAttributes, InheritedAttributes } from '../utils/inherit-attributes';

export type TilburgWbcProcessStepStatus = 'checked' | 'current' | 'not-checked';

export interface TilburgWbcProcessSubStep {
  title: string;
  status?: TilburgWbcProcessStepStatus;
  date?: string;
}

export interface TilburgWbcProcessStep extends TilburgWbcProcessSubStep {
  /** Text in the marker; defaults to the step number. A checked step shows a check instead. */
  marker?: string;
  meta?: string;
  steps?: TilburgWbcProcessSubStep[];
}

const DEFAULT_LABELS: Record<TilburgWbcProcessStepStatus, string> = {
  checked: 'Afgerond',
  current: 'Huidige stap',
  'not-checked': 'Nog niet gestart',
};

/* A JS value, or (in plain HTML) a JSON string attribute; anything else falls back. */
const parseJson = <T,>(value: T | string | null | undefined, fallback: T): T => {
  if (typeof value !== 'string') return value ?? fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
};

/* Den Haag's connector rule: dashed (`not-checked`) towards a step that is not checked yet, else the own status. */
const line = (status: TilburgWbcProcessStepStatus, next?: TilburgWbcProcessStepStatus): TilburgWbcProcessStepStatus =>
  !next || next === 'not-checked' ? 'not-checked' : status;

const Connector: FunctionalComponent<{ appearance: TilburgWbcProcessStepStatus; from: string; to: string }> = ({
  appearance,
  from,
  to,
}) => (
  <div
    class={`denhaag-step-marker__connector denhaag-step-marker__connector--${appearance} denhaag-step-marker__connector--${from}-to-${to}`}
    aria-hidden="true"
  ></div>
);

const CheckIcon: FunctionalComponent = () => (
  <svg
    class="denhaag-icon"
    aria-hidden="true"
    focusable="false"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="3"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

@Component({
  tag: 'tilburg-wbc-process-steps',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWbcProcessSteps {
  @Element() host!: HTMLElement;

  /** The steps. Property, or a JSON array attribute: `steps='[{"title":"Aanvraag ontvangen","status":"checked"}]'`. */
  @Prop() steps?: TilburgWbcProcessStep[] | string;
  /** Visually hidden text read before each heading. Property, or a JSON object attribute. */
  @Prop() statusLabels?: Record<TilburgWbcProcessStepStatus, string> | string;

  /* `aria-label` is written on the host and moved onto the `<ol>`. */
  @State() inherited: InheritedAttributes = {};
  private inheritor?: AttributeInheritor;

  connectedCallback() {
    this.inheritor = inheritAttributes(this.host, ['aria-label'], (attributes) => {
      this.inherited = attributes;
    });
  }

  disconnectedCallback() {
    this.inheritor?.disconnect();
  }

  render() {
    const parsed = parseJson<TilburgWbcProcessStep[]>(this.steps, []);
    const steps = Array.isArray(parsed) ? parsed : [];
    const labels = parseJson(this.statusLabels, DEFAULT_LABELS);
    const hidden = (status: TilburgWbcProcessStepStatus) => (
      <span class="utrecht-visually-hidden">{`${labels[status]}: `}</span>
    );
    return (
      <ol class="denhaag-process-steps" aria-label={this.inherited['aria-label']}>
        {steps.map((step, index) => {
          const status = step.status ?? 'not-checked';
          const next = steps[index + 1];
          const subSteps = step.steps ?? [];
          return (
            <li
              class={`denhaag-process-steps__step denhaag-process-steps__step--${status}`}
              aria-current={status === 'current' ? 'step' : undefined}
            >
              <div class="denhaag-process-steps__step-header">
                <div class={`denhaag-step-marker denhaag-step-marker--${status}`} aria-hidden="true">
                  {status === 'checked' ? <CheckIcon /> : (step.marker ?? String(index + 1))}
                </div>
                <p class={`denhaag-process-steps__step-heading denhaag-process-steps__step-heading--${status}`}>
                  {hidden(status)}
                  {step.title}
                </p>
              </div>
              <div class="denhaag-process-steps__step-body">
                {(next || subSteps.length > 0) && (
                  <Connector
                    appearance={line(
                      status,
                      subSteps.length ? (subSteps[0].status ?? 'not-checked') : (next?.status ?? 'not-checked'),
                    )}
                    from="main"
                    to={subSteps.length ? 'nested' : 'main'}
                  />
                )}
                {step.meta && <div class="denhaag-process-steps__step-meta">{step.meta}</div>}
                {step.date && (
                  <div class="denhaag-process-steps__step-meta denhaag-process-steps__step-meta--date">{step.date}</div>
                )}
              </div>
              {subSteps.length > 0 && (
                <div class="denhaag-process-steps__step-details">
                  <ol class="denhaag-process-steps">
                    {subSteps.map((sub, subIndex) => {
                      const subStatus = sub.status ?? 'not-checked';
                      const nextSub = subSteps[subIndex + 1];
                      return (
                        <li class={`denhaag-process-steps__sub-step denhaag-process-steps__sub-step--${subStatus}`}>
                          <div class="denhaag-process-steps__step-header denhaag-process-steps__step-header--nested">
                            <div
                              class={`denhaag-step-marker denhaag-step-marker--${subStatus} denhaag-step-marker--nested`}
                              aria-hidden="true"
                            >
                              {subStatus === 'checked' && <CheckIcon />}
                            </div>
                            <p class="denhaag-process-steps__sub-step-heading">
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
                            <div class="denhaag-process-steps__step-meta denhaag-process-steps__step-meta--nested">
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
  }
}
