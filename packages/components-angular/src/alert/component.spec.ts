import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
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

describe('TilburgAlert', () => {
  let fixture: ComponentFixture<HostComponent>;
  const alert = () => fixture.nativeElement.querySelector('.utrecht-alert') as HTMLElement;

  beforeEach(() => {
    document.getElementById('tilburg-announcer-assertive')?.remove();
    TestBed.configureTestingModule({ declarations: [TilburgAlert, HostComponent], schemas: [CUSTOM_ELEMENTS_SCHEMA] });
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
});
