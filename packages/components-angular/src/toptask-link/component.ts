import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';

@Component({
  selector: 'tilburg-toptask-link',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  standalone: false,
})
export class TilburgToptaskLink implements AfterViewInit, OnDestroy {
  @Input() href?: string;
  @Input() ariaLabel?: string;
  @Input() ariaDescribedBy?: string;

  @ViewChild('icon', { static: true }) private icon!: ElementRef<HTMLElement>;
  @ViewChild('title', { static: true }) private title!: ElementRef<HTMLElement>;
  private observer?: MutationObserver;

  /* Like the HTML reference (and React/Stencil), a link without an icon has no icon wrapper. Angular keeps
     projecting into the detached wrapper (a conditional icon leaves an anchor comment, so test for elements), so
     watch it and put it back when an icon appears. */
  ngAfterViewInit(): void {
    this.syncIcon();
    this.observer = new MutationObserver(() => this.syncIcon());
    this.observer.observe(this.icon.nativeElement, { childList: true });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private syncIcon(): void {
    const icon = this.icon.nativeElement;
    if (!icon.childElementCount) icon.remove();
    else if (!icon.parentNode) this.title.nativeElement.before(icon);
  }
}
