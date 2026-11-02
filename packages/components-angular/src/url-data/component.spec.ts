import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TilburgUrlData } from './component';

@Component({
  template: `<tilburg-url-data>https://www.tilburg.nl/afval</tilburg-url-data>`,
  standalone: false,
})
class HostComponent {}

describe('TilburgUrlData', () => {
  it('renders <bdi class="utrecht-url-data" translate="no">', () => {
    TestBed.configureTestingModule({ declarations: [TilburgUrlData, HostComponent] });
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const bdi = fixture.nativeElement.querySelector('bdi.utrecht-url-data') as HTMLElement;
    expect(bdi.getAttribute('translate')).toBe('no');
    expect(bdi.textContent).toBe('https://www.tilburg.nl/afval');
  });
});
