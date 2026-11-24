import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { UtrechtComponentsModule } from '@utrecht/component-library-angular';
import { TilburgAlert } from './component';

@Component({
  template: `
    <tilburg-alert variant="danger" title="Er ging iets mis" [announce]="announce">{{ message }}</tilburg-alert>
  `,
  standalone: false,
})
class HostComponent {
  announce = true;
  message = 'Probeer het opnieuw.';
}

@Component({
  template: `
    <tilburg-alert variant="success" [closable]="true"><p class="utrecht-paragraph">Tekst</p></tilburg-alert>
    <tilburg-alert><span slot="icon" id="custom">!</span>Tekst</tilburg-alert>
  `,
  standalone: false,
})
class IconHostComponent {}

@Component({
  template: `
    <tilburg-alert title="Informatie" [closable]="true">Tekst</tilburg-alert>
    <tilburg-alert title="Titel" [headingLevel]="2">Tekst</tilburg-alert>
  `,
  standalone: false,
})
class TitleHostComponent {}

describe('TilburgAlert', () => {
  let fixture: ComponentFixture<HostComponent>;
  const alert = () => fixture.nativeElement.querySelector('.utrecht-alert') as HTMLElement;

  beforeEach(() => {
    document.getElementById('tilburg-announcer-assertive')?.remove();
    TestBed.configureTestingModule({
      declarations: [TilburgAlert, HostComponent, IconHostComponent, TitleHostComponent],
      imports: [UtrechtComponentsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
  });

  it('reads the type before the message by default', () => {
    fixture = TestBed.createComponent(HostComponent);
    fixture.componentInstance.announce = false;
    fixture.detectChanges();
    expect(alert().querySelector('.utrecht-visually-hidden')!.textContent!.trim()).toBe('Fout:');
    expect(alert().getAttribute('role')).toBe('alert');
  });

  it('with announce, reads the alert out through the shared live region once per text', fakeAsync(() => {
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    tick(200);
    const region = document.getElementById('tilburg-announcer-assertive')!;
    expect(alert().hasAttribute('role')).toBe(false);
    expect(alert().hasAttribute('aria-live')).toBe(false);
    expect(region.getAttribute('aria-live')).toBe('assertive');
    expect(region.textContent).toBe('Er ging iets mis Fout: Probeer het opnieuw.');

    region.textContent = '';
    fixture.detectChanges();
    tick(200);
    expect(region.textContent).toBe('');

    fixture.componentInstance.message = 'Het bestand is te groot.';
    fixture.detectChanges();
    tick(200);
    expect(region.textContent).toBe('Er ging iets mis Fout: Het bestand is te groot.');
  }));

  it('renders the default icons of the HTML reference, unless an icon is projected', () => {
    const icons = TestBed.createComponent(IconHostComponent);
    icons.detectChanges();
    const [withDefault, withCustom] = Array.from<HTMLElement>(icons.nativeElement.querySelectorAll('.utrecht-alert'));
    const path = withDefault.querySelector(
      '.utrecht-alert__icon > i[aria-hidden="true"] > svg[aria-hidden="true"] > path',
    );
    expect(path!.getAttribute('d')).toContain('Zm-1.4 14.6L6 12');
    expect(withDefault.querySelector('button.tilburg-alert__close > i > svg')).not.toBeNull();
    expect(
      withDefault.querySelector('.utrecht-alert__message > .utrecht-visually-hidden + p.utrecht-paragraph'),
    ).not.toBeNull();
    expect(withCustom.querySelector('.utrecht-alert__icon #custom')).not.toBeNull();
    expect(withCustom.querySelector('.utrecht-alert__icon svg')).toBeNull();
  });

  it('renders the title as the utrecht heading of the HTML reference, at the requested level', () => {
    const titles = TestBed.createComponent(TitleHostComponent);
    titles.detectChanges();
    const [level3, level2] = Array.from<HTMLElement>(titles.nativeElement.querySelectorAll('.utrecht-alert'));
    expect(
      level3.querySelector('utrecht-heading-3.tilburg-alert__title > h3.utrecht-heading-3')!.textContent!.trim(),
    ).toBe('Informatie');
    expect(level2.querySelector('utrecht-heading-2.tilburg-alert__title > h2.utrecht-heading-2')).not.toBeNull();
    expect(titles.nativeElement.querySelector('tilburg-heading-3, tilburg-heading-2')).toBeNull();
  });

  it('labels the close button "Sluit alert" by default, as the HTML reference', () => {
    const titles = TestBed.createComponent(TitleHostComponent);
    titles.detectChanges();
    expect(titles.nativeElement.querySelector('.tilburg-alert__close').getAttribute('aria-label')).toBe('Sluit alert');
  });
});
