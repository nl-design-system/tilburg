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

  afterEach(() => jest.restoreAllMocks());

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

  /* jsdom has no layout: fake an 80px field (the CSS minimum) with 24px lines, 8px padding and 1px borders. */
  const fakeLayout = (element: HTMLTextAreaElement, scrollHeight: () => number) => {
    Object.defineProperty(element, 'offsetHeight', {
      get: () => (element.style.height ? parseFloat(element.style.height) : 80),
    });
    Object.defineProperty(element, 'scrollHeight', { get: scrollHeight });
    jest.spyOn(window, 'getComputedStyle').mockReturnValue({
      lineHeight: '24px',
      paddingTop: '8px',
      paddingBottom: '8px',
      borderTopWidth: '1px',
      borderBottomWidth: '1px',
    } as CSSStyleDeclaration);
  };

  it('follows a value set from code', () => {
    fakeLayout(textarea('ta-control'), () => 150);
    fixture.componentInstance.control.setValue('regel 1\nregel 2');
    fixture.detectChanges();
    expect(textarea('ta-control').value).toBe('regel 1\nregel 2');
    expect(textarea('ta-control').style.height).toBe('152px');
  });

  it('starts at the CSS height and only grows, up to 8 lines', () => {
    let content = 60;
    const element = textarea('ta-control');
    fakeLayout(element, () => content);
    element.dispatchEvent(new Event('input'));
    expect(element.style.height).toBe('');
    content = 150;
    element.dispatchEvent(new Event('input'));
    expect(element.style.height).toBe('152px');
    content = 1000;
    element.dispatchEvent(new Event('input'));
    expect(element.style.height).toBe(`${24 * 8 + 16 + 2}px`);
  });

  it('re-emits blur from the native textarea', () => {
    textarea('ta-control').dispatchEvent(new FocusEvent('blur'));
    expect(fixture.componentInstance.blurred).toBe(1);
  });
});
