import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'tilburg-checkbox',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
})
export class TilburgCheckbox {
  @Input() control?: FormControl;
  @Input() ariaLabel: string = '';
  @Input() invalid?: boolean = false;
  @Input() disabled?: boolean = false;
  @Input() checked: boolean = false;
  @Output() checkChanged = new EventEmitter<Event>();
  onCheckChange(event: Event) {
    this.checkChanged.emit(event);
  }
}
