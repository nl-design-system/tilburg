import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TilburgEmphasis } from './component';

@Component({
  template: `<tilburg-emphasis [strong]="strong">niet</tilburg-emphasis>`,
  standalone: false,
})
class HostComponent {
  strong = false;
}

describe('TilburgEmphasis', () => {
  const render = () => {
    TestBed.configureTestingModule({ declarations: [TilburgEmphasis, HostComponent] });
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    return fixture;
  };

  it('renders a stressed <em> by default', () => {
    const em = render().nativeElement.querySelector('tilburg-emphasis > em') as HTMLElement;
    expect(em.className).toBe('utrecht-emphasis utrecht-emphasis--stressed');
    expect(em.textContent).toBe('niet');
  });

  it('renders <strong> with the strong modifier when strong is set', () => {
    const fixture = render();
    fixture.componentInstance.strong = true;
    fixture.detectChanges();
    const host = fixture.nativeElement.querySelector('tilburg-emphasis') as HTMLElement;
    expect(host.querySelector('em')).toBeNull();
    const strong = host.querySelector(':scope > strong') as HTMLElement;
    expect(strong.className).toBe('utrecht-emphasis utrecht-emphasis--strong');
    expect(strong.textContent).toBe('niet');
  });

  it('renders <strong> for a bare strong attribute', () => {
    TestBed.configureTestingModule({ declarations: [TilburgEmphasis] });
    const fixture = TestBed.createComponent(TilburgEmphasis);
    fixture.componentRef.setInput('strong', ''); // bare attribute: `<tilburg-emphasis strong>`
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('strong')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('em')).toBeNull();
  });
});
