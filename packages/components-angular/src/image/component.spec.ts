import { TestBed } from '@angular/core/testing';
import { TilburgImage } from './component';

describe('TilburgImage', () => {
  beforeEach(() => TestBed.configureTestingModule({ declarations: [TilburgImage] }));

  it('renders an img with the inputs as attributes', () => {
    const fixture = TestBed.createComponent(TilburgImage);
    fixture.componentRef.setInput('src', 'logo.svg');
    fixture.componentRef.setInput('alt', 'Logo');
    fixture.componentRef.setInput('width', 240);
    fixture.detectChanges();
    const img = fixture.nativeElement.querySelector('img') as HTMLImageElement;
    expect(img.className).toBe('utrecht-img');
    expect(img.getAttribute('src')).toBe('logo.svg');
    expect(img.getAttribute('alt')).toBe('Logo');
    expect(img.getAttribute('width')).toBe('240');
    expect(img.hasAttribute('height')).toBe(false);
  });

  it('keeps an empty alt and adds the photo modifier', () => {
    const fixture = TestBed.createComponent(TilburgImage);
    fixture.componentRef.setInput('alt', '');
    fixture.componentRef.setInput('photo', ''); // bare attribute: `<tilburg-image photo>`
    fixture.detectChanges();
    const img = fixture.nativeElement.querySelector('img') as HTMLImageElement;
    expect(img.getAttribute('alt')).toBe('');
    expect(img.classList).toContain('utrecht-img--photo');
  });
});
