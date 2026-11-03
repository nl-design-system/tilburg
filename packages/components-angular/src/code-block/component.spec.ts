import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TilburgCodeBlock } from './component';

@Component({
  template: `<tilburg-code-block>{{ snippet }}</tilburg-code-block>`,
  standalone: false,
})
class HostComponent {
  snippet = 'regel 1\n  regel 2';
}

describe('TilburgCodeBlock', () => {
  const render = () => {
    TestBed.configureTestingModule({ declarations: [TilburgCodeBlock, HostComponent] });
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    return fixture;
  };

  it('renders <pre class="utrecht-code-block"><code class="utrecht-code-block__content"> and keeps whitespace', () => {
    const fixture = render();
    const code = fixture.nativeElement.querySelector(
      'tilburg-code-block > pre.utrecht-code-block > code.utrecht-code-block__content',
    ) as HTMLElement;
    expect(code.textContent).toBe('regel 1\n  regel 2');
    expect(code.parentElement!.getAttribute('tabindex')).toBe('0'); // Safari: keyboard users can scroll a long line
  });
});
