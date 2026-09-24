import { Component, Input } from '@angular/core';

@Component({
  selector: 'tilburg-ordered-list',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  standalone: false,
})
export class TilburgOrderedList {
  @Input() byLetter = false;
}
