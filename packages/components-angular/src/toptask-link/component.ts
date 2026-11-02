import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'tilburg-toptask-link',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  standalone: false,
})
export class TilburgToptaskLink implements AfterViewInit {
  @Input() href?: string;
  @Input() ariaLabel?: string;
  @Input() ariaDescribedBy?: string;

  @ViewChild('icon', { static: true }) private icon!: ElementRef<HTMLElement>;

  /* Like the HTML reference (and React/Stencil), a link without an icon has no icon wrapper. Checked once, after
     projection, as Stencil does with its `icon` slot. */
  ngAfterViewInit(): void {
    if (!this.icon.nativeElement.hasChildNodes()) this.icon.nativeElement.remove();
  }
}
