import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { UtrechtComponentsModule } from '@utrecht/component-library-angular';
import { TilburgTextarea } from './component';
import { TilburgTextareaAutoresizeDirective } from './textarea-resize-directive';

@Component({
  template: `
    <tilburg-textarea id="ta-control" name="toelichting" [control]="control" (blur)="blurred = blurred + 1">
    </tilburg-textarea>
    <tilburg-textarea id="ta-plain" name="plain" [disabled]="true" [rows]="6"></tilburg-textarea>
    <tilburg-textarea class="no-id" [control]="control"></tilburg-textarea>
  `,
  standalone: false,
})
class HostComponent {
  control = new FormControl('');
  blurred = 0;
}

describe('TilburgTextarea', () => {
  let fixture: ComponentFixture<HostComponent>;
  let warn: jest.SpyInstance;
  const textarea = (id: string) => fixture.nativeElement.querySelector(`textarea#${id}`) as HTMLTextAreaElement;

  beforeEach(() => {
    warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    TestBed.configureTestingModule({
      declarations: [TilburgTextarea, TilburgTextareaAutoresizeDirective, HostComponent],
      imports: [ReactiveFormsModule, UtrechtComponentsModule],
    });
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  afterEach(() => warn.mockRestore());

  it('keeps the name on the native textarea despite the utrecht directive', () => {
    expect(textarea('ta-control').getAttribute('name')).toBe('toelichting');
    expect(textarea('ta-plain').getAttribute('name')).toBe('plain');
  });

  it('renders without a FormControl', () => {
    expect(textarea('ta-plain').disabled).toBe(true);
    expect(textarea('ta-plain').getAttribute('rows')).toBe('6');
  });

  it('does not write id="undefined" when no id is given', () => {
    expect(fixture.nativeElement.querySelector('tilburg-textarea.no-id textarea').hasAttribute('id')).toBe(false);
  });

  it("does not trigger Angular's reactive-forms disabled warning", () => {
    expect(warn).not.toHaveBeenCalled();
  });

  it('follows a value set from code', () => {
    fixture.componentInstance.control.setValue('regel 1\nregel 2');
    fixture.detectChanges();
    expect(textarea('ta-control').value).toBe('regel 1\nregel 2');
    expect(textarea('ta-control').style.minHeight).toMatch(/px$/);
  });

  it('re-emits blur from the native textarea', () => {
    textarea('ta-control').dispatchEvent(new FocusEvent('blur'));
    expect(fixture.componentInstance.blurred).toBe(1);
  });
});
