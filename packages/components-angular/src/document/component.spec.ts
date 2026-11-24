import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UtrechtComponentsModule } from '@utrecht/component-library-angular';
import { TilburgDocument } from './component';

@Component({
  template: `<tilburg-document><p>Tekst</p></tilburg-document>`,
  standalone: false,
})
class HostComponent {}

describe('TilburgDocument', () => {
  let fixture: ComponentFixture<HostComponent>;
  const host = () => fixture.nativeElement as HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TilburgDocument, HostComponent],
      imports: [UtrechtComponentsModule],
    });
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('renders div.utrecht-document around its content', () => {
    expect(host().querySelector('tilburg-document > div.utrecht-document p')!.textContent).toBe('Tekst');
  });
});
