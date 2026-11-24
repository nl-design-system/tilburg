import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TilburgLinkSocial, TilburgListSocial } from './component';

@Component({
  template: `<tilburg-list-social ariaLabel="Sociale media">
    <li class="utrecht-list-social__item">
      <tilburg-link-social
        href="https://www.facebook.com/gemeentetilburg"
        ariaLabel="Gemeente Tilburg op Facebook"
        [external]="external"
      >
        <svg aria-hidden="true"></svg>
      </tilburg-link-social>
    </li>
  </tilburg-list-social>`,
  standalone: false,
})
class HostComponent {
  external = true;
}

describe('TilburgLinkSocial / TilburgListSocial', () => {
  let fixture: ComponentFixture<HostComponent>;
  const link = () => fixture.nativeElement.querySelector('a') as HTMLAnchorElement;

  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [TilburgLinkSocial, TilburgListSocial, HostComponent] });
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('renders the external social link with its accessible name and icon', () => {
    expect(link().className).toBe('utrecht-link-social');
    expect(link().getAttribute('href')).toBe('https://www.facebook.com/gemeentetilburg');
    expect(link().getAttribute('rel')).toBe('external noopener noreferrer');
    expect(link().getAttribute('aria-label')).toBe('Gemeente Tilburg op Facebook');
    expect(link().querySelector('svg')).not.toBeNull();
  });

  it('leaves rel off when external is false', () => {
    fixture.componentInstance.external = false;
    fixture.detectChanges();
    expect(link().hasAttribute('rel')).toBe(false);
  });

  it('projects the <li> items as direct children of the utrecht-list-social <ul>', () => {
    const list = fixture.nativeElement.querySelector('ul') as HTMLElement;
    expect(list.className).toBe('utrecht-list-social');
    expect(list.getAttribute('role')).toBe('list');
    expect(list.getAttribute('aria-label')).toBe('Sociale media');
    expect(list.querySelector(':scope > li.utrecht-list-social__item')).not.toBeNull();
  });
});
