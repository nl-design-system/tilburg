import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TilburgToptaskLink } from './component';

@Component({
  template: `<tilburg-toptask-link href="/afval"><svg slot="icon" aria-hidden="true"></svg>Afval</tilburg-toptask-link>
    <tilburg-toptask-link href="/afspraak" ariaDescribedBy="hint">Afspraak maken</tilburg-toptask-link>`,
  standalone: false,
})
class HostComponent {}

describe('TilburgToptaskLink', () => {
  let fixture: ComponentFixture<HostComponent>;
  const links = () => Array.from(fixture.nativeElement.querySelectorAll('a')) as HTMLAnchorElement[];

  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [TilburgToptaskLink, HostComponent] });
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('renders the icon and title spans of the HTML reference', () => {
    const [link] = links();
    expect(link.className).toBe('utrecht-toptask-link');
    expect(link.getAttribute('href')).toBe('/afval');
    expect(link.querySelector('.utrecht-toptask-link__icon > svg')).not.toBeNull();
    expect(link.querySelector('.utrecht-toptask-link__title')!.textContent).toBe('Afval');
  });

  it('renders no icon wrapper without an icon, and maps aria inputs', () => {
    const [, link] = links();
    expect(link.querySelector('.utrecht-toptask-link__icon')).toBeNull();
    expect(link.getAttribute('aria-describedby')).toBe('hint');
    expect(link.hasAttribute('aria-label')).toBe(false);
  });

  it('shows the icon wrapper only while a conditional icon is projected', async () => {
    @Component({
      template: `<tilburg-toptask-link href="/afval">
        @if (icon) {
          <svg slot="icon" aria-hidden="true"></svg>
        }
        Afval</tilburg-toptask-link
      >`,
      standalone: false,
    })
    class ConditionalHost {
      icon = false;
    }
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({ declarations: [TilburgToptaskLink, ConditionalHost] });
    const host = TestBed.createComponent(ConditionalHost);
    host.detectChanges();
    const wrapper = () => host.nativeElement.querySelector('.utrecht-toptask-link__icon');
    expect(wrapper()).toBeNull();

    host.componentInstance.icon = true;
    host.detectChanges();
    await Promise.resolve();
    expect(wrapper()!.querySelector('svg')).not.toBeNull();
    expect(wrapper()!.nextElementSibling!.className).toBe('utrecht-toptask-link__title');

    host.componentInstance.icon = false;
    host.detectChanges();
    await Promise.resolve();
    expect(wrapper()).toBeNull();
  });
});
