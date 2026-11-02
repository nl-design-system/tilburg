import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TilburgDrawer, TilburgDrawerAlign } from './component';

/* jsdom has <dialog> but not showModal()/close(); polyfill just enough. */
beforeAll(() => {
  HTMLDialogElement.prototype.showModal = function showModal(this: HTMLDialogElement) {
    this.setAttribute('open', '');
  };
  HTMLDialogElement.prototype.close = function close(this: HTMLDialogElement) {
    if (!this.hasAttribute('open')) return;
    this.removeAttribute('open');
    this.dispatchEvent(new Event('close'));
  };
});

@Component({
  template: `
    <tilburg-drawer
      [align]="align"
      [(open)]="open"
      [closeOnBackdropClick]="backdrop"
      ariaLabelledBy="menu-title"
      (closed)="closedCount = closedCount + 1"
    >
      <h2 id="menu-title">Menu</h2>
    </tilburg-drawer>
  `,
  standalone: false,
})
class HostComponent {
  align: TilburgDrawerAlign = 'inline-start';
  open = false;
  backdrop = true;
  closedCount = 0;
}

/* jsdom lays nothing out: the dialog's box is 0×0 at the origin, so any positive point is "outside" it. */
const click = (target: Element, offset: number) =>
  target.dispatchEvent(new MouseEvent('click', { bubbles: true, clientX: offset, clientY: offset }));

describe('TilburgDrawer', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HostComponent;
  const dialog = () => fixture.nativeElement.querySelector('dialog') as HTMLDialogElement;

  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [TilburgDrawer, HostComponent] });
    fixture = TestBed.createComponent(HostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders the HTML/CSS reference markup', () => {
    expect(dialog().className).toBe('utrecht-drawer utrecht-drawer--inline-start');
    expect(dialog().getAttribute('aria-labelledby')).toBe('menu-title');
    expect(dialog().hasAttribute('open')).toBe(false);
    expect(dialog().querySelector(':scope > h2')?.textContent).toBe('Menu');
  });

  it('maps align to the modifier', () => {
    host.align = 'block-end';
    fixture.detectChanges();
    expect(dialog().className).toBe('utrecht-drawer utrecht-drawer--block-end');
  });

  it('opens and closes with [(open)] and emits closed', () => {
    host.open = true;
    fixture.detectChanges();
    expect(dialog().hasAttribute('open')).toBe(true);
    dialog().close();
    fixture.detectChanges();
    expect(host.open).toBe(false);
    expect(host.closedCount).toBe(1);
    host.open = true;
    fixture.detectChanges();
    expect(dialog().hasAttribute('open')).toBe(true);
  });

  it('closes on a backdrop click, not on a click inside the drawer, unless disabled', () => {
    host.open = true;
    fixture.detectChanges();
    click(dialog().querySelector('h2')!, 500);
    click(dialog(), 0);
    expect(dialog().hasAttribute('open')).toBe(true);
    click(dialog(), 500);
    expect(dialog().hasAttribute('open')).toBe(false);
    fixture.detectChanges();

    host.backdrop = false;
    host.open = true;
    fixture.detectChanges();
    click(dialog(), 500);
    expect(dialog().hasAttribute('open')).toBe(true);
  });
});
