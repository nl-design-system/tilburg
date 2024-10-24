import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';

@Directive({ selector: '[tilburgTextAreaAutoResize]' })
export class TilburgTextareaAutoresizeDirective implements OnInit {
  private _elementRef: ElementRef;

  constructor(private elementRef: ElementRef) {
    this._elementRef = elementRef;
  }

  @HostListener(':input') onInput() {
    this.resize();
  }

  ngOnInit() {
    if (this._elementRef.nativeElement.scrollHeight) {
      setTimeout(() => this.resize());
    }
  }

  resize() {
    this._elementRef.nativeElement.style.height = '0';
    let style = window.getComputedStyle(this._elementRef.nativeElement);
    const paddingTop = parseInt(style.paddingTop.replace('px', ''), 10);
    const paddingBottom = parseInt(style.paddingBottom.replace('px', ''), 10);
    const lineHeight = parseInt(style.lineHeight.replace('px', ''), 10);
    this._elementRef.nativeElement.style.minHeight = lineHeight * 4 + paddingTop + paddingBottom;
    let maxSize = Math.min(lineHeight * 8 + paddingTop + paddingBottom, this.elementRef.nativeElement.scrollHeight);
    let minSize = lineHeight * 4 + paddingTop + paddingBottom;
    this._elementRef.nativeElement.style.height = Math.max(minSize, maxSize) + 'px';
  }
}
