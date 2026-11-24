import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TilburgPageContent } from './component';

@Component({
  template: `<tilburg-page-content><p>Tekst</p></tilburg-page-content>`,
  standalone: false,
})
class HostComponent {}

describe('TilburgPageContent', () => {
  let fixture: ComponentFixture<HostComponent>;
  const host = () => fixture.nativeElement as HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [TilburgPageContent, HostComponent] });
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('renders main.utrecht-page-content around its content', () => {
    expect(host().querySelector('tilburg-page-content > main.utrecht-page-content > p')!.textContent).toBe('Tekst');
  });
});
