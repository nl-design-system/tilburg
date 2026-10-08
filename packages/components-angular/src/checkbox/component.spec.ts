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

@Component({ template: `<tilburg-checkbox name="los"></tilburg-checkbox>`, standalone: false })
class NoIdHostComponent {}

@Component({ template: `<tilburg-checkbox [control]="control"></tilburg-checkbox>`, standalone: false })
class ArrayHostComponent {
  control = new FormControl(['optie-1']);
}

describe('TilburgCheckbox', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HostComponent;
  const input = (id: string) => fixture.nativeElement.querySelector(`input#${id}`) as HTMLInputElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TilburgCheckbox, HostComponent, NoIdHostComponent, ArrayHostComponent],
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

  it('does not write id="undefined" when no id is given', () => {
    const f = TestBed.createComponent(NoIdHostComponent);
    f.detectChanges();
    expect(f.nativeElement.querySelector('input').hasAttribute('id')).toBe(false);
  });

  it('warns in dev mode when the control holds an array (a checkbox group needs checked + checkChanged)', () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const f = TestBed.createComponent(ArrayHostComponent);
    f.detectChanges();
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('holds an array'));
    expect(f.nativeElement.querySelector('input').hasAttribute('checked')).toBe(false);
    warn.mockRestore();
  });
});
