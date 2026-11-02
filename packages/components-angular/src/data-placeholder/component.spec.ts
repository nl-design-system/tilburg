import { TestBed } from '@angular/core/testing';
import { TilburgDataPlaceholder } from './component';

describe('TilburgDataPlaceholder', () => {
  beforeEach(() => TestBed.configureTestingModule({ declarations: [TilburgDataPlaceholder] }));

  it('renders an empty utrecht-data-placeholder span', () => {
    const fixture = TestBed.createComponent(TilburgDataPlaceholder);
    fixture.detectChanges();
    const span = fixture.nativeElement.querySelector('span') as HTMLElement;
    expect(span.className).toBe('utrecht-data-placeholder');
    expect(span.childNodes).toHaveLength(0);
  });

  it('adds the loading modifier', () => {
    const fixture = TestBed.createComponent(TilburgDataPlaceholder);
    fixture.componentRef.setInput('loading', ''); // bare attribute: `<tilburg-data-placeholder loading>`
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('span').classList).toContain('utrecht-data-placeholder--loading');
  });
});
