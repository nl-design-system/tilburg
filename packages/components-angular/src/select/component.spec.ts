import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TilburgSelect, TilburgSelectOption } from './component';

const options: TilburgSelectOption[] = [
  { value: 'centrum', label: 'Tilburg-Centrum' },
  { value: 'noord', label: 'Tilburg-Noord' },
  { value: 'oost', label: 'Tilburg-Oost', disabled: true },
];

@Component({
  template: `
    <label for="plain">Stadsdeel</label>
    <tilburg-select
      id="plain"
      name="stadsdeel"
      [options]="options"
      [value]="value"
      placeholder="Maak een keuze"
      [invalid]="invalid"
      [required]="true"
      (valueChange)="changed = $event"
    ></tilburg-select>
    <tilburg-select id="reactive" [control]="control" [options]="options"></tilburg-select>
  `,
  standalone: false,
})
class HostComponent {
  options = options;
  value?: string;
  invalid = false;
  changed?: string;
  control = new FormControl('noord');
}

describe('TilburgSelect', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HostComponent;
  const select = (id: string) => fixture.nativeElement.querySelector(`select#${id}`) as HTMLSelectElement;

  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [TilburgSelect, HostComponent], imports: [ReactiveFormsModule] });
    fixture = TestBed.createComponent(HostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders a native select with the utrecht classes, the placeholder and the options', () => {
    const el = select('plain');
    expect(el.classList).toContain('utrecht-select');
    expect(el.classList).toContain('utrecht-select--html-select');
    expect(el.getAttribute('name')).toBe('stadsdeel');
    expect(el.required).toBe(true);
    expect(el.getAttribute('aria-required')).toBe('true');
    const labels = Array.from(el.options).map((option) => option.textContent?.trim());
    expect(labels).toEqual(['Maak een keuze', 'Tilburg-Centrum', 'Tilburg-Noord', 'Tilburg-Oost']);
    expect(el.options[0].value).toBe('');
    expect(el.options[3].disabled).toBe(true);
  });

  it('puts the id on the select only, so the label resolves to it', () => {
    expect(fixture.nativeElement.querySelectorAll('#plain')).toHaveLength(1);
    expect(fixture.nativeElement.querySelector('tilburg-select').hasAttribute('id')).toBe(false);
    const label = fixture.nativeElement.querySelector('label') as HTMLLabelElement;
    expect(label.control).toBe(select('plain'));
  });

  it('shows the invalid state', () => {
    host.invalid = true;
    fixture.detectChanges();
    expect(select('plain').getAttribute('aria-invalid')).toBe('true');
    expect(select('plain').classList).toContain('utrecht-select--invalid');
  });

  it('selects the value input and emits valueChange without a FormControl', () => {
    host.value = 'centrum';
    fixture.detectChanges();
    expect(select('plain').value).toBe('centrum');
    select('plain').value = 'noord';
    select('plain').dispatchEvent(new Event('change'));
    expect(host.changed).toBe('noord');
  });

  it('binds a FormControl both ways, including the disabled state', () => {
    expect(select('reactive').value).toBe('noord');
    select('reactive').value = 'centrum';
    select('reactive').dispatchEvent(new Event('change'));
    expect(host.control.value).toBe('centrum');
    host.control.disable();
    fixture.detectChanges();
    expect(select('reactive').disabled).toBe(true);
    expect(select('reactive').classList).toContain('utrecht-select--disabled');
  });
});
