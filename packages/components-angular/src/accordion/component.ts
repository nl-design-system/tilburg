import { Component, ElementRef, EventEmitter, HostListener, inject, Input, Output } from '@angular/core';

const ACCORDION_NAV_KEYS = ['ArrowDown', 'ArrowUp', 'Home', 'End'] as const;
type AccordionNavKey = (typeof ACCORDION_NAV_KEYS)[number];

@Component({
  selector: 'tilburg-accordion',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  standalone: false,
})
export class TilburgAccordion {
  @Input() ariaLabel?: string | null;
  @Input() headingLevel: 1 | 2 | 3 | 4 | 5 | 6 = 2;
  @Input() displayName?: string | null;

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (!ACCORDION_NAV_KEYS.includes(event.key as AccordionNavKey)) {
      return;
    }

    const target = event.target as HTMLElement | null;
    if (!(target instanceof HTMLButtonElement)) {
      return;
    }
    if (!target.classList.contains('utrecht-accordion__button')) {
      return;
    }
    // Skip nested accordions: only handle buttons that belong to this one.
    if (target.closest('tilburg-accordion') !== this.host.nativeElement) {
      return;
    }

    const buttons = Array.from(
      this.host.nativeElement.querySelectorAll<HTMLButtonElement>(
        'tilburg-accordion-section button.utrecht-accordion__button',
      ),
    ).filter((button) => !button.disabled);

    const idx = buttons.indexOf(target);
    if (idx === -1 || buttons.length === 0) {
      return;
    }

    let next: number;
    switch (event.key as AccordionNavKey) {
      case 'ArrowDown':
        next = (idx + 1) % buttons.length;
        break;
      case 'ArrowUp':
        next = (idx - 1 + buttons.length) % buttons.length;
        break;
      case 'Home':
        next = 0;
        break;
      case 'End':
        next = buttons.length - 1;
        break;
    }

    event.preventDefault();
    buttons[next].focus();
  }
}

@Component({
  selector: 'tilburg-accordion-section',
  templateUrl: 'section.html',
  styleUrls: ['index.scss'],
  standalone: false,
})
export class TilburgAccordionSection {
  @Input() key?: string | null;
  @Input() label?: string | null;
  @Input() expanded = false;
  @Input() disabled = false;
  @Input() autoToggle = false;
  @Output() toggled = new EventEmitter<boolean>();

  get panelId(): string {
    return `utrecht-accordion-${this.key ?? ''}-panel`;
  }

  get buttonId(): string {
    return `utrecht-accordion-${this.key ?? ''}-button`;
  }

  onToggle(): void {
    if (this.disabled) {
      return;
    }
    const next = !this.expanded;
    if (this.autoToggle) {
      this.expanded = next;
    }
    this.toggled.emit(next);
  }
}
