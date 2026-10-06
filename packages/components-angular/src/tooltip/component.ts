import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { addDescribedBy, attachTooltip } from '../utils/attach-tooltip';

let nextId = 0;

export type TilburgTooltipPlacement = 'above' | 'below';

/**
 * A short description of a control, shown on hover and focus (Tilburg component, bq-tlb-frontend TIL-53/54). The first
 * projected element is the trigger: it gets the tooltip's id added to its `aria-describedby`. Escape closes the tooltip,
 * the pointer can move onto it, a tap toggles it on touch screens (WCAG 1.4.13).
 */
@Component({
  selector: 'tilburg-tooltip',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  standalone: false,
})
export class TilburgTooltip implements AfterViewInit, OnDestroy {
  /** The tooltip text: a short description of the trigger. */
  @Input() text = '';
  @Input() placement: TilburgTooltipPlacement = 'above';

  @ViewChild('root', { static: true }) private readonly root!: ElementRef<HTMLElement>;

  readonly popupId = `tilburg-tooltip-${++nextId}`;
  private detach?: () => void;

  ngAfterViewInit(): void {
    const root = this.root.nativeElement;
    const trigger = Array.from(root.children).find((child) => !child.classList.contains('tilburg-tooltip__popup'));
    if (trigger) addDescribedBy(trigger, this.popupId);
    this.detach = attachTooltip(root);
  }

  ngOnDestroy(): void {
    this.detach?.();
  }
}
