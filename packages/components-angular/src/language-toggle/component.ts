import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface TilburgLanguageOption {
  code: string;
  label: string;
}

const DEFAULT_OPTIONS: TilburgLanguageOption[] = [
  { code: 'NL', label: 'NL' },
  { code: 'EN', label: 'EN' },
];

@Component({
  selector: 'tilburg-language-toggle',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  standalone: false,
})
export class TilburgLanguageToggle {
  @Input() options: TilburgLanguageOption[] = DEFAULT_OPTIONS;
  @Input() active: string | null | undefined = 'NL';
  @Input() ariaLabel: string | null | undefined = 'Switch language';

  @Output() toggle = new EventEmitter<string>();

  onClick(): void {
    this.emitNext();
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.emitNext();
    }
  }

  isActive(option: TilburgLanguageOption): boolean {
    return option.code === this.active;
  }

  private emitNext(): void {
    if (!this.options?.length) {
      return;
    }
    const index = this.options.findIndex((opt) => opt.code === this.active);
    const nextIndex = (index + 1) % this.options.length;
    const next = this.options[nextIndex] ?? this.options[0];
    this.toggle.emit(next.code);
  }
}
