/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, Element, h, Prop } from '@stencil/core';
import { addDescribedBy, attachTooltip } from '../utils/attach-tooltip';

export type TilburgWbcTooltipPlacement = 'above' | 'below';

let tooltipCount = 0;

/**
 * A short description of a control, shown on hover and focus (Tilburg component, bq-tlb-frontend TIL-53/54). The first
 * child element is the trigger: it gets the tooltip's id added to its `aria-describedby`. Escape closes the tooltip,
 * the pointer can move onto it, a tap toggles it on touch screens (WCAG 1.4.13).
 */
@Component({
  tag: 'tilburg-wbc-tooltip',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWbcTooltip {
  @Element() host!: HTMLElement;

  /** The tooltip text: a short description of the trigger. */
  @Prop() text = '';
  @Prop() placement: TilburgWbcTooltipPlacement = 'above';

  private readonly popupId = `tilburg-wbc-tooltip-${++tooltipCount}`;
  private detach?: () => void;

  componentDidLoad() {
    const root = this.host.querySelector<HTMLElement>('.tilburg-tooltip');
    if (!root) return;
    const trigger = Array.from(root.children).find((child) => !child.classList.contains('tilburg-tooltip__popup'));
    if (trigger) addDescribedBy(trigger, this.popupId);
    this.detach = attachTooltip(root);
  }

  disconnectedCallback() {
    this.detach?.();
  }

  render() {
    return (
      <span class={{ 'tilburg-tooltip': true, 'tilburg-tooltip--below': this.placement === 'below' }}>
        <slot />
        <span class="tilburg-tooltip__popup" id={this.popupId} role="tooltip">
          {this.text}
        </span>
      </span>
    );
  }
}
