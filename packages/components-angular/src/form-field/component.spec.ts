import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UtrechtComponentsModule } from '@utrecht/component-library-angular';
import { TilburgFormField } from './component';

@Component({
  template: `<tilburg-form-field [type]="type" [invalid]="invalid" [warning]="warning"
    ><label>Naam</label></tilburg-form-field
  >`,
  standalone: false,
})
class HostComponent {
  type?: 'checkbox' | 'radio' | 'text';
  invalid = false;
  warning = false;
}

describe('TilburgFormField', () => {
  let fixture: ComponentFixture<HostComponent>;
  const host = () => fixture.nativeElement as HTMLElement;
  const set = (values: Partial<HostComponent>) => {
    Object.assign(fixture.componentInstance, values);
    fixture.detectChanges();
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TilburgFormField, HostComponent],
      imports: [UtrechtComponentsModule],
    });
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  const field = () => host().querySelector('tilburg-form-field > utrecht-form-field') as HTMLElement;

  const inner = () => field().querySelector(':scope > div.utrecht-form-field') as HTMLElement;

  it('renders a Utrecht form field around its content', () => {
    expect(inner().className).toBe('utrecht-form-field');
    expect(field().classList).not.toContain('tilburg-warning');
    expect(inner().querySelector('label')!.textContent).toBe('Naam');
  });

  it('maps type, invalid and warning to classes', () => {
    set({ type: 'checkbox', invalid: true, warning: true });
    expect(inner().classList).toContain('utrecht-form-field--checkbox');
    expect(inner().classList).toContain('utrecht-form-field--invalid');
    expect(field().classList).toContain('tilburg-warning');
  });
});
