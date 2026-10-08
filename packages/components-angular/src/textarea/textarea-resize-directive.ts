import { Directive, DoCheck, ElementRef, HostListener, Input, OnInit } from '@angular/core';

/** Grows a textarea with its content: at least `minRows` lines (the `rows` attribute, default 4), at most 8 or
 *  `minRows` if that is larger; beyond that it scrolls. */
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
    element.style.height = '0';
    const style = window.getComputedStyle(element);
    const paddingTop = parseFloat(style.paddingTop) || 0;
    const paddingBottom = parseFloat(style.paddingBottom) || 0;
    // `line-height: normal` has no pixel value; browsers render it at roughly 1.2 × the font size.
    const lineHeight = parseFloat(style.lineHeight) || (parseFloat(style.fontSize) || 16) * 1.2;
    const minRows = this.rows && this.rows > 0 ? this.rows : 4;
    const maxRows = Math.max(8, minRows);
    const minSize = lineHeight * minRows + paddingTop + paddingBottom;
    const maxSize = Math.min(lineHeight * maxRows + paddingTop + paddingBottom, element.scrollHeight);
    element.style.minHeight = `${minSize}px`;
    element.style.height = `${Math.max(minSize, maxSize)}px`;
  }
}
