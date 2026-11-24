import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { type AppearanceType, TilburgButtonLink } from './component';

@Component({
  template: `<a tilburg-button-link href="/aanvraag" [appearance]="appearance" [external]="external">Aanvragen</a>`,
  standalone: false,
})
class HostComponent {
  appearance?: AppearanceType;
  external = false;
}

describe('TilburgButtonLink', () => {
  let fixture: ComponentFixture<HostComponent>;
  const host = () => fixture.nativeElement as HTMLElement;
  const set = (values: Partial<HostComponent>) => {
    Object.assign(fixture.componentInstance, values);
    fixture.detectChanges();
  };

  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [TilburgButtonLink, HostComponent] });
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  const link = () => host().querySelector('a') as HTMLAnchorElement;

  it('adds the button-link classes to the <a> itself', () => {
    expect(Array.from(link().classList).sort()).toEqual(['utrecht-button-link', 'utrecht-button-link--html-a']);
    expect(link().getAttribute('href')).toBe('/aanvraag');
    expect(link().getAttribute('rel')).toBe('');
    expect(link().textContent).toBe('Aanvragen');
  });

  it.each([
    ['primary-action-button', 'utrecht-button-link--primary-action'],
    ['secondary-action-button', 'utrecht-button-link--secondary-action'],
    ['subtle-button', 'utrecht-button-link--subtle'],
  ] as const)('maps appearance %s', (appearance, className) => {
    set({ appearance });
    expect(link().classList).toContain(className);
  });

  it('marks an external link with rel', () => {
    set({ external: true });
    expect(link().getAttribute('rel')).toBe('external noopener noreferrer');
  });
});
