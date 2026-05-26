import { Component } from '@angular/core';

@Component({
  selector: 'tilburg-page-content',
  templateUrl: 'index.html',
  styles: [':host { display: block; }'],
  standalone: false,
})
export class TilburgPageContent {
  constructor() {}
}
