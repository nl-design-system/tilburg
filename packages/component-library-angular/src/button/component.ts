import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef, Input,
  OnInit, Renderer2
} from "@angular/core";

@Component({
  selector: 'tilburg-button',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  host: {
    'utrecht-button': ''
  }
})
export class TilburgButtonAttr implements OnInit, AfterViewInit {

  @Input() type = 'button';
  @Input() disabled = false;
  @Input() small = false;

  constructor(private elementRef: ElementRef, private changeDetector: ChangeDetectorRef) {
    // this.elementRef.nativeElement.setAttribute('utrecht-button', '');
  }

  ngOnInit(): void {
    // this.elementRef.nativeElement.setAttribute('utrecht-button', '');
  }

  ngAfterViewInit(): void {
    this.changeDetector.detectChanges();
  }
}
