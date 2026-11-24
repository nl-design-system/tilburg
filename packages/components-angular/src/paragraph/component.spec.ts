import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UtrechtComponentsModule } from '@utrecht/component-library-angular';
import { TilburgParagraph } from './component';

@Component({
  template: `<tilburg-paragraph [lead]="lead" [small]="small">Tekst</tilburg-paragraph>`,
  standalone: false,
})
class HostComponent {
  lead = false;
  small = false;
}

describe('TilburgParagraph', () => {
  let fixture: ComponentFixture<HostComponent>;
  const host = () => fixture.nativeElement as HTMLElement;
  const set = (values: Partial<HostComponent>) => {
    Object.assign(fixture.componentInstance, values);
    fixture.detectChanges();
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TilburgParagraph, HostComponent],
      imports: [UtrechtComponentsModule],
    });
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  const paragraph = () => host().querySelector('tilburg-paragraph > p') as HTMLElement;

  it('renders p.utrecht-paragraph around its content', () => {
    expect(paragraph().classList).toContain('utrecht-paragraph');
    expect(paragraph().classList).not.toContain('utrecht-paragraph--lead');
    expect(paragraph().textContent!.trim()).toBe('Tekst');
  });

  it('maps lead and small', () => {
    set({ lead: true });
    expect(paragraph().classList).toContain('utrecht-paragraph--lead');
    set({ lead: false, small: true });
    expect(paragraph().classList).toContain('utrecht-paragraph--small');
  });
});
