import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TilburgModal } from './component';

/* jsdom has <dialog> but not showModal()/close(); polyfill just enough. */
beforeAll(() => {
  // eslint-disable-next-line no-unused-vars
  HTMLDialogElement.prototype.showModal = function showModal(this: HTMLDialogElement) {
    this.setAttribute('open', '');
  };
  // eslint-disable-next-line no-unused-vars
  HTMLDialogElement.prototype.close = function close(this: HTMLDialogElement) {
    if (!this.hasAttribute('open')) return;
    this.removeAttribute('open');
    this.dispatchEvent(new Event('close'));
  };
});

@Component({
  template: `
    <tilburg-modal [title]="title" [open]="open" [closeOnBackdropClick]="backdrop" (closed)="onClosed()">
      <p class="utrecht-paragraph">Inhoud</p>
      <button slot="footer" type="button">Bevestigen</button>
    </tilburg-modal>
  `,
  standalone: false,
})
class HostComponent {
  title = 'Aanvraag bevestigen';
  open = false;
  backdrop = true;
  closedCount = 0;
  onClosed() {
    this.closedCount++;
    this.open = false;
  }
}

describe('TilburgModal', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HostComponent;
  const dialog = () => fixture.nativeElement.querySelector('dialog') as HTMLDialogElement;

  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [TilburgModal, HostComponent] });
    fixture = TestBed.createComponent(HostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders the HTML/CSS reference structure', () => {
    const d = dialog();
    expect(d.classList).toContain('tilburg-modal');
    expect(d.querySelector(':scope > header.tilburg-modal__header > h2')?.textContent?.trim()).toBe(
      'Aanvraag bevestigen',
    );
    expect(d.querySelector('.tilburg-modal__close-button > span')?.textContent?.trim()).toBe('Sluiten');
    expect(d.querySelector(':scope > .tilburg-modal__content p')?.textContent).toBe('Inhoud');
    expect(d.querySelector(':scope > footer.tilburg-modal__footer > button')?.textContent).toBe('Bevestigen');
  });

  it('names the dialog after its heading', () => {
    const d = dialog();
    const id = d.getAttribute('aria-labelledby')!;
    expect(d.querySelector('h2')?.id).toBe(id);
  });

  it('opens and closes with the open input', () => {
    host.open = true;
    fixture.detectChanges();
    expect(dialog().hasAttribute('open')).toBe(true);
    host.open = false;
    fixture.detectChanges();
    expect(dialog().hasAttribute('open')).toBe(false);
    expect(host.closedCount).toBe(1);
  });

  it('closes via the close button and emits closed', () => {
    host.open = true;
    fixture.detectChanges();
    (dialog().querySelector('.tilburg-modal__close-button') as HTMLButtonElement).click();
    expect(dialog().hasAttribute('open')).toBe(false);
    expect(host.closedCount).toBe(1);
  });

  it('closes on a backdrop click unless disabled', () => {
    host.open = true;
    fixture.detectChanges();
    (dialog().querySelector('.tilburg-modal__content') as HTMLElement).click();
    expect(dialog().hasAttribute('open')).toBe(true);
    dialog().click();
    expect(dialog().hasAttribute('open')).toBe(false);
    fixture.detectChanges();

    host.backdrop = false;
    host.open = true;
    fixture.detectChanges();
    dialog().click();
    expect(dialog().hasAttribute('open')).toBe(true);
  });
});
