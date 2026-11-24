/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, Element, h, Prop } from '@stencil/core';
import { hasSlot } from '../utils/slots';

export type CardHeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

/**
 * @slot - The body text (rendered in `.utrecht-card__body`).
 * @slot image - The image, shown above the heading; `.utrecht-card__image` is rendered only when used.
 */
@Component({
  tag: 'tilburg-wbc-card',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWbcCard {
  @Element() host!: HTMLElement;

  /** Heading text; with `href` it is the link text and the card's accessible name. */
  @Prop() heading?: string;
  @Prop() headingLevel: CardHeadingLevel = 3;
  /** Makes the heading a link that covers the whole card. */
  @Prop() href?: string;

  private hasImage = false;

  componentWillLoad() {
    this.hasImage = hasSlot(this.host, 'image');
  }

  render() {
    const level = [1, 2, 3, 4, 5, 6].includes(Number(this.headingLevel)) ? Number(this.headingLevel) : 3;
    const Heading = `h${level}`;
    return (
      <div class={{ 'utrecht-card': true, 'utrecht-card--link': !!this.href }}>
        <div class="utrecht-card__content">
          <div class="utrecht-card__heading">
            <Heading class={`utrecht-heading-${level}`}>
              {this.href ? (
                <a class="utrecht-link utrecht-link--html-a utrecht-card__link" href={this.href}>
                  {this.heading}
                </a>
              ) : (
                this.heading
              )}
            </Heading>
          </div>
          {this.hasImage && (
            <div class="utrecht-card__image">
              <slot name="image" />
            </div>
          )}
          <div class="utrecht-card__body">
            <slot />
          </div>
        </div>
      </div>
    );
  }
}
