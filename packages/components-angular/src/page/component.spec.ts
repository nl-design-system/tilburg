import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UtrechtComponentsModule } from '@utrecht/component-library-angular';
import { TilburgPage } from './component';

@Component({
  template: `<tilburg-page><p>Tekst</p></tilburg-page>`,
  standalone: false,
})
class HostComponent {}

describe('TilburgPage', () => {
  let fixture: ComponentFixture<HostComponent>;
  const host = () => fixture.nativeElement as HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [TilburgPage, HostComponent], imports: [UtrechtComponentsModule] });
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('renders a Utrecht page around its content', () => {
    const page = host().querySelector('tilburg-page > utrecht-page > div.utrecht-page')!;
    expect(page.querySelector(':scope > p')!.textContent).toBe('Tekst');
  });
});
