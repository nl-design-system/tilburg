import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UtrechtComponentsModule } from '@utrecht/component-library-angular';
import { TilburgHeading1 } from './component';

@Component({
  template: `<tilburg-heading-1>Mijn aanvragen</tilburg-heading-1>`,
  standalone: false,
})
class HostComponent {}

describe('TilburgHeading1', () => {
  let fixture: ComponentFixture<HostComponent>;
  const host = () => fixture.nativeElement as HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TilburgHeading1, HostComponent],
      imports: [UtrechtComponentsModule],
    });
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('renders an <h1> with the Utrecht heading class', () => {
    const heading = host().querySelector('tilburg-heading-1 h1')!;
    expect(heading.classList).toContain('utrecht-heading-1');
    expect(heading.textContent).toBe('Mijn aanvragen');
  });
});
