import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { UtrechtComponentsModule } from '@utrecht/component-library-angular';
import { TilburgRadioButton } from './component';

@Component({
  template: `
    <tilburg-radio-button
      id="ja"
      name="keuze"
      value="ja"
      [control]="control"
      [invalid]="invalid"
    ></tilburg-radio-button>
    <tilburg-radio-button
      id="nee"
      name="keuze"
      value="nee"
      [control]="control"
      [invalid]="invalid"
    ></tilburg-radio-button>
    <tilburg-radio-button id="plain" name="los" value="x" [checked]="true" [disabled]="true"></tilburg-radio-button>
    <tilburg-radio-button class="no-id" name="los" value="y"></tilburg-radio-button>
  `,
  standalone: false,
})
class HostComponent {
  invalid = false;
  control = new FormControl<string | null>(null);
}

describe('TilburgRadioButton', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HostComponent;
  let warn: jest.SpyInstance;
  const input = (id: string) => fixture.nativeElement.querySelector(`input#${id}`) as HTMLInputElement;

  beforeEach(() => {
    warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    TestBed.configureTestingModule({
      declarations: [TilburgRadioButton, HostComponent],
      imports: [ReactiveFormsModule, UtrechtComponentsModule],
    });
    fixture = TestBed.createComponent(HostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => warn.mockRestore());

  it('passes invalid to the utrecht directive, so aria-invalid and the class stay set', () => {
    expect(input('ja').hasAttribute('aria-invalid')).toBe(false);
    host.invalid = true;
    fixture.detectChanges();
    fixture.detectChanges();
    expect(input('ja').getAttribute('aria-invalid')).toBe('true');
    expect(input('ja').classList).toContain('utrecht-radio-button--invalid');
  });

  it('binds the FormControl', () => {
    input('nee').click();
    fixture.detectChanges();
    expect(host.control.value).toBe('nee');
  });

  it('renders without a FormControl, driven by checked and disabled', () => {
    expect(input('plain').checked).toBe(true);
    expect(input('plain').disabled).toBe(true);
  });

  it('does not write id="undefined" when no id is given', () => {
    expect(fixture.nativeElement.querySelector('tilburg-radio-button.no-id input').hasAttribute('id')).toBe(false);
  });

  it("does not trigger Angular's reactive-forms disabled warning", () => {
    expect(warn).not.toHaveBeenCalled();
  });
});
