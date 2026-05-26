import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'tilburg-paragraph',
  templateUrl: 'index.html',
  styles: [':host { display: block; }'],
  standalone: false,
})
export class TilburgParagraph implements OnInit {
  @Input() lead = false;
  @Input() small = false;

  ngOnInit(): void {}
}
