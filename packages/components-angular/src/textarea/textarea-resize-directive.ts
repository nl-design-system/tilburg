import { Directive, DoCheck, ElementRef, HostListener, Input, OnInit } from '@angular/core';

/** Grows a textarea with its content. It starts at the height the CSS and `rows` give it (as the HTML reference, without
 *  `rows` the components-css minimum), only grows from there, and stops at 8 lines (or `rows`, if larger); beyond that
 *  it scrolls. The Web Component does the same. */
@Directive({ selector: '[tilburgTextAreaAutoResize]', standalone: false })
export class TilburgTextareaAutoresizeDirective implements OnInit, DoCheck {
  @Input() rows?: number;

  private lastValue?: string;

  constructor(private readonly elementRef: ElementRef<HTMLTextAreaElement>) {}

  @HostListener('input') onInput() {
    this.resize();
  }

  ngOnInit() {
    if (this.elementRef.nativeElement.scrollHeight) {
      setTimeout(() => this.resize());
    }
  }

  // A value set from code (FormControl.setValue, a reset) fires no `input` event.
  ngDoCheck() {
    const value = this.elementRef.nativeElement.value;
    if (value !== this.lastValue) {
      this.lastValue = value;
      this.resize();
    }
  }

  resize() {
    const element = this.elementRef.nativeElement;
    element.style.height = '';
    const style = window.getComputedStyle(element);
    // The textarea is `box-sizing: border-box`; `scrollHeight` includes the padding but not the border.
    const border = (parseFloat(style.borderTopWidth) || 0) + (parseFloat(style.borderBottomWidth) || 0);
    const padding = (parseFloat(style.paddingTop) || 0) + (parseFloat(style.paddingBottom) || 0);
    // `line-height: normal` has no pixel value; browsers render it at roughly 1.2 × the font size.
    const lineHeight = parseFloat(style.lineHeight) || (parseFloat(style.fontSize) || 16) * 1.2;
    const maxSize = lineHeight * Math.max(8, this.rows ?? 0) + padding + border;
    const contentSize = element.scrollHeight + border;
    if (contentSize > element.offsetHeight) {
      element.style.height = `${Math.max(element.offsetHeight, Math.min(contentSize, maxSize))}px`;
    }
  }
}
