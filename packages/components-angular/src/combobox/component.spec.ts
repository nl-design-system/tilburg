import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { TilburgCombobox } from './component';

@Component({
  template: `
    <span id="cb-label">Gemeente</span>
    <tilburg-combobox
      id="cb"
      ariaLabelledBy="cb-label"
      [items]="items"
      [control]="control"
      [required]="true"
      (valueChange)="changes.push($event)"
      (change)="legacy.push($event)"
    ></tilburg-combobox>
  `,
  standalone: false,
})
class HostComponent {
  items = [
    { displayValue: 'Tilburg', value: 'tlb' },
    { displayValue: 'Goirle', value: 'goi' },
  ];
  control = new FormControl<string | null>(null, Validators.required);
  changes: unknown[] = [];
  legacy: unknown[] = [];
}

describe('TilburgCombobox', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HostComponent;
  let combobox: TilburgCombobox;
  const input = () => fixture.nativeElement.querySelector('input#cb') as HTMLInputElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TilburgCombobox, HostComponent],
      imports: [ReactiveFormsModule],
    });
    fixture = TestBed.createComponent(HostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
    combobox = fixture.debugElement.children
      .map((d) => d.componentInstance)
      .find((c) => c instanceof TilburgCombobox) as TilburgCombobox;
  });

  it('labels the input with aria-labelledby', () => {
    expect(input().getAttribute('aria-labelledby')).toBe('cb-label');
  });

  it('does not announce an empty required combobox as invalid before the user touched it', () => {
    expect(host.control.invalid).toBe(true);
    expect(input().hasAttribute('aria-invalid')).toBe(false);
    input().dispatchEvent(new FocusEvent('blur'));
    fixture.detectChanges();
    expect(host.control.touched).toBe(true);
    expect(input().getAttribute('aria-invalid')).toBe('true');
  });

  it('sets the control and emits valueChange (and the deprecated change) on selection', () => {
    combobox.selectOption(1);
    fixture.detectChanges();
    expect(host.control.value).toBe('goi');
    expect(host.changes).toEqual(['goi']);
    expect(host.legacy).toEqual(['goi']);
  });
});
