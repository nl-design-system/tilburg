import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TilburgArticle } from './component';

@Component({
  template: `<tilburg-article><p>Tekst</p></tilburg-article>`,
  standalone: false,
})
class HostComponent {}

describe('TilburgArticle', () => {
  let fixture: ComponentFixture<HostComponent>;
  const host = () => fixture.nativeElement as HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [TilburgArticle, HostComponent] });
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('renders article.utrecht-article around its content', () => {
    expect(host().querySelector('tilburg-article > article.utrecht-article > p')!.textContent).toBe('Tekst');
  });
});
