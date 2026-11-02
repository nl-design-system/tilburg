import { TestBed } from '@angular/core/testing';
import { TilburgColorSample } from './component';

describe('TilburgColorSample', () => {
  it('renders a data element with the colour as value and inline color', () => {
    TestBed.configureTestingModule({ declarations: [TilburgColorSample] });
    const fixture = TestBed.createComponent(TilburgColorSample);
    fixture.componentRef.setInput('color', '#e00078');
    fixture.detectChanges();
    const data = fixture.nativeElement.querySelector('data.utrecht-color-sample') as HTMLElement;
    expect(data.getAttribute('value')).toBe('#e00078');
    expect(data.style.color).toBe('rgb(224, 0, 120)');
  });
});
