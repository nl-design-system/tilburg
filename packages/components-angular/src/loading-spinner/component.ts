import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'tilburg-loading-spinner',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  standalone: false,
})
export class TilburgLoadingSpinner implements OnChanges {
  @Input() visible: boolean | null | undefined = false;
  @Input() title?: string | null;
  @Input() message?: string | null;
  @Input() delayMs = 1000;
  @Input() ariaLabel?: string | null;

  showLoader = false;
  private revealTimer?: ReturnType<typeof setTimeout>;

  ngOnChanges(changes: SimpleChanges): void {
    if (!('visible' in changes)) {
      return;
    }
    if (this.revealTimer) {
      clearTimeout(this.revealTimer);
      this.revealTimer = undefined;
    }
    if (!this.visible) {
      this.showLoader = false;
      return;
    }
    if (this.delayMs <= 0) {
      this.showLoader = true;
      return;
    }
    this.revealTimer = setTimeout(() => {
      this.showLoader = true;
    }, this.delayMs);
  }
}
