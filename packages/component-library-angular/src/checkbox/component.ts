import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'tilburg-checkbox',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
})
export class TilburgCheckboxAttr {
  @Input() formContext?: FormControl;
  @Input() invalid?: boolean = false;
  @Input() disabled?: boolean = false;
  @Input() checked: boolean = false;
  @Output() checkChanged = new EventEmitter<Event>();
  constructor() {
    console.log('TilburgCheckboxAttr');
  }
  onCheckChange(event: Event) {
    this.checkChanged.emit(event);
  }
}
