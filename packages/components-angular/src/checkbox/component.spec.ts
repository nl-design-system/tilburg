import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { UtrechtComponentsModule } from '@utrecht/component-library-angular';
import { TilburgCheckbox } from './component';

@Component({
  template: `
    <label for="plain">Akkoord</label>
    <tilburg-checkbox id="plain" name="akkoord" [invalid]="invalid" [required]="true"></tilburg-checkbox>
    <tilburg-checkbox id="reactive" [control]="control" [invalid]="invalid"></tilburg-checkbox>
  `,
  standalone: false,
})
class HostComponent {
  invalid = false;
  control = new FormControl(false);
}

describe('TilburgCheckbox', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HostComponent;
  const input = (id: string) => fixture.nativeElement.querySelector(`input#${id}`) as HTMLInputElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TilburgCheckbox, HostComponent],
      imports: [ReactiveFormsModule, UtrechtComponentsModule],
    });
    fixture = TestBed.createComponent(HostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('is not marked invalid until invalid is set, and then keeps aria-invalid across change detection', () => {
    expect(input('plain').hasAttribute('aria-invalid')).toBe(false);
    host.invalid = true;
    fixture.detectChanges();
    fixture.detectChanges();
    expect(input('plain').getAttribute('aria-invalid')).toBe('true');
    expect(input('plain').classList).toContain('utrecht-checkbox--invalid');
    expect(input('reactive').getAttribute('aria-invalid')).toBe('true');
  });

  it('puts the id on the input only and keeps the label working', () => {
    expect(fixture.nativeElement.querySelectorAll('#plain')).toHaveLength(1);
    const label = fixture.nativeElement.querySelector('label') as HTMLLabelElement;
    expect(label.control).toBe(input('plain'));
    expect(input('plain').required).toBe(true);
  });

  it('binds a FormControl both ways, including the disabled state', () => {
    input('reactive').click();
    fixture.detectChanges();
    expect(host.control.value).toBe(true);
    host.control.setValue(false);
    fixture.detectChanges();
    expect(input('reactive').checked).toBe(false);
    host.control.disable();
    fixture.detectChanges();
    fixture.detectChanges();
    expect(input('reactive').disabled).toBe(true);
    expect(host.control.disabled).toBe(true);
  });
});
