import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface TilburgIndexCharNavCharacter {
  char: string;
  href?: string | null;
  disabled?: boolean;
}

@Component({
  selector: 'tilburg-index-char-nav',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  standalone: false,
})
export class TilburgIndexCharNav {
  @Input() ariaLabel: string | null | undefined = 'Alfabetische index';
  @Input() characters: TilburgIndexCharNavCharacter[] | null | undefined = [];
  @Input() currentChar: string | null | undefined;
  @Output() charClick = new EventEmitter<{ character: TilburgIndexCharNavCharacter; event: MouseEvent }>();

  onClick(character: TilburgIndexCharNavCharacter, event: MouseEvent): void {
    if (!character.disabled) this.charClick.emit({ character, event });
  }
}
