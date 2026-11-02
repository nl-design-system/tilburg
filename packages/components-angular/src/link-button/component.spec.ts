import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TilburgLinkButton } from './component';

@Component({
  template: `<tilburg-link-button [inline]="inline" [pressed]="pressed" [disabled]="disabled" ariaLabel="Terug"
    >Vorige stap</tilburg-link-button
  >`,
  standalone: false,
})
class HostComponent {
  inline = false;
  pressed?: boolean;
  disabled = false;
}

describe('TilburgLinkButton', () => {
  let fixture: ComponentFixture<HostComponent>;
  const button = () => fixture.nativeElement.querySelector('button') as HTMLButtonElement;

  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [TilburgLinkButton, HostComponent] });
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('renders a type="button" <button> with the link-button classes', () => {
    expect(button().className).toBe('utrecht-link-button utrecht-link-button--html-button');
    expect(button().getAttribute('type')).toBe('button');
    expect(button().hasAttribute('aria-pressed')).toBe(false);
    expect(button().getAttribute('aria-label')).toBe('Terug');
    expect(button().textContent!.trim()).toBe('Vorige stap');
  });

  it('maps inline, pressed and disabled', () => {
    Object.assign(fixture.componentInstance, { inline: true, pressed: true, disabled: true });
    fixture.detectChanges();
    expect(button().classList).toContain('utrecht-link-button--inline');
    expect(button().classList).toContain('utrecht-link-button--pressed');
    expect(button().classList).toContain('utrecht-link-button--disabled');
    expect(button().getAttribute('aria-pressed')).toBe('true');
    expect(button().disabled).toBe(true);
  });

  it('renders aria-pressed="false" for pressed=false', () => {
    fixture.componentInstance.pressed = false;
    fixture.detectChanges();
    expect(button().getAttribute('aria-pressed')).toBe('false');
    expect(button().classList).not.toContain('utrecht-link-button--pressed');
  });
});
