import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TilburgToptaskNav } from './component';

@Component({
  template: `<tilburg-toptask-nav [grid]="grid"
    ><a class="utrecht-toptask-link" href="/afval">Afval</a></tilburg-toptask-nav
  >`,
  standalone: false,
})
class HostComponent {
  grid = false;
}

describe('TilburgToptaskNav', () => {
  let fixture: ComponentFixture<HostComponent>;
  const nav = () => fixture.nativeElement.querySelector('nav') as HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [TilburgToptaskNav, HostComponent] });
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('renders a <nav> named "Veelgevraagd" around the links', () => {
    expect(nav().className).toBe('utrecht-toptask-nav');
    expect(nav().getAttribute('aria-label')).toBe('Veelgevraagd');
    expect(nav().querySelector('a.utrecht-toptask-link')).not.toBeNull();
  });

  it('adds the grid modifier', () => {
    fixture.componentInstance.grid = true;
    fixture.detectChanges();
    expect(nav().classList).toContain('utrecht-toptask-nav--grid');
  });
});
