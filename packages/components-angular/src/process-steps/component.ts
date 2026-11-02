import { Component, Input } from '@angular/core';

export type TilburgProcessStepStatus = 'checked' | 'current' | 'not-checked';

export interface TilburgProcessSubStep {
  title: string;
  status?: TilburgProcessStepStatus;
  date?: string;
}

export interface TilburgProcessStep extends TilburgProcessSubStep {
  /** Text in the marker; defaults to the step number. A checked step shows a check instead. */
  marker?: string;
  meta?: string;
  steps?: TilburgProcessSubStep[];
}

/* Den Haag's connector rule: dashed (`not-checked`) towards a step that is not checked yet, else the own status. */
const line = (status: TilburgProcessStepStatus, next?: TilburgProcessStepStatus): TilburgProcessStepStatus =>
  !next || next === 'not-checked' ? 'not-checked' : status;

@Component({
  selector: 'tilburg-process-steps',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  standalone: false,
})
export class TilburgProcessSteps {
  @Input() steps: TilburgProcessStep[] | null | undefined = [];
  /** Visually hidden text read before each heading. */
  @Input() statusLabels: Record<TilburgProcessStepStatus, string> = {
    checked: 'Afgerond',
    current: 'Huidige stap',
    'not-checked': 'Nog niet gestart',
  };

  status(step: TilburgProcessSubStep): TilburgProcessStepStatus {
    return step.status ?? 'not-checked';
  }

  /** Connector classes below step `index`, or `null` for the last step. */
  stepConnector(index: number): string | null {
    const steps = this.steps ?? [];
    const step = steps[index];
    const next = steps[index + 1];
    if (!next) return null;
    const subSteps = step.steps ?? [];
    return this.connector(
      line(this.status(step), subSteps[0]?.status ?? next.status ?? 'not-checked'),
      'main',
      subSteps.length ? 'nested' : 'main',
    );
  }

  /** Connector classes below sub-step `subIndex` of step `index`, or `null` when nothing follows. */
  subStepConnector(index: number, subIndex: number): string | null {
    const steps = this.steps ?? [];
    const subSteps = steps[index].steps ?? [];
    const nextSub = subSteps[subIndex + 1];
    const next = steps[index + 1];
    if (!nextSub && !next) return null;
    return this.connector(
      line(this.status(subSteps[subIndex]), nextSub ? this.status(nextSub) : this.status(next)),
      'nested',
      nextSub ? 'nested' : 'main',
    );
  }

  private connector(appearance: TilburgProcessStepStatus, from: string, to: string): string {
    return `denhaag-step-marker__connector denhaag-step-marker__connector--${appearance} denhaag-step-marker__connector--${from}-to-${to}`;
  }
}
