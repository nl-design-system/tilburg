import { Component, ViewEncapsulation } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TilburgPageHeader } from './component';

@Component({
  template: `<tilburg-page-header title="Mijn omgeving"
    ><span class="tilburg-page-header__user">Jan</span></tilburg-page-header
  >`,
  standalone: false,
})
class HostComponent {}

describe('TilburgPageHeader', () => {
  it('projects the actions into the actions slot', () => {
    TestBed.configureTestingModule({ declarations: [TilburgPageHeader, HostComponent] });
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    expect(
      (fixture.nativeElement as HTMLElement).querySelector('.tilburg-page-header__actions > .tilburg-page-header__user')
        ?.textContent,
    ).toBe('Jan');
  });

  /* Emulated encapsulation would scope the action rules (`.tilburg-page-header__user`, the white subtle button) away from
     projected content and a projected `<tilburg-button>`: an app that only loads the utrecht CSS globally would lose them. */
  it('does not encapsulate its styles', () => {
    expect((TilburgPageHeader as unknown as { ɵcmp: { encapsulation: ViewEncapsulation } }).ɵcmp.encapsulation).toBe(
      ViewEncapsulation.None,
    );
  });
});
