import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'tilburg-progress-bar',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  standalone: false,
})
export class TilburgProgressBar {
  @Input() value: number | null | undefined = 0;
  @Input() total: number | null | undefined = 0;
  @Input() label?: string | null;
  @Input() title?: string | null;
  @Input() backLabel?: string | null;
  @Input() showBack = false;
  @Input() ariaLabel?: string | null;

  @Output() backClick = new EventEmitter<MouseEvent>();

  get percentage(): number {
    const total = this.total ?? 0;
    const value = this.value ?? 0;
    if (total <= 0) {
      return 0;
    }
    const ratio = value / total;
    return Math.max(0, Math.min(100, ratio * 100));
  }

  onBack(event: MouseEvent): void {
    event.preventDefault();
    this.backClick.emit(event);
  }
}
