import {
  ChangeDetectorRef,
  Component,
  HostBinding,
  inject,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'tilburg-loading-spinner',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  standalone: false,
})
export class TilburgLoadingSpinner implements OnChanges, OnDestroy {
  @Input() visible: boolean | null | undefined = false;
  @Input() title?: string | null;
  /** `title` is an input here, but a static `title="…"` would also land on the host element as the native
   *  attribute (a browser tooltip and an extra accessible description). Keep it off the host. */
  @HostBinding('attr.title') readonly hostTitle = null;
  @Input() message?: string | null;
  @Input() delayMs = 1000;
  @Input() ariaLabel?: string | null;

  showLoader = false;
  private revealTimer?: ReturnType<typeof setTimeout>;
  private readonly changeDetector = inject(ChangeDetectorRef);

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
      // The timer fires outside any input change; an OnPush or zoneless host would not re-render otherwise.
      this.changeDetector.markForCheck();
    }, this.delayMs);
  }

  ngOnDestroy(): void {
    clearTimeout(this.revealTimer);
  }
}
