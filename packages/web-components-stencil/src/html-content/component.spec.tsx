import { newSpecPage } from '@stencil/core/testing';
import { TilburgWbcHtmlContent } from './component';
import { sanitizeHtml } from './sanitize';

const render = (html: string) => newSpecPage({ components: [TilburgWbcHtmlContent], html });

describe('tilburg-wbc-html-content', () => {
  it('wraps slotted content in the styled utrecht-html-content div', async () => {
    const page = await render('<tilburg-wbc-html-content><p>Tekst</p><ul><li>Een</li></ul></tilburg-wbc-html-content>');
    expect(page.root!.shadowRoot).toBeNull();
    const div = page.root!.querySelector('div.utrecht-html-content')!;
    expect(Array.from(div.children).map((child) => child.tagName)).toEqual(['P', 'UL']);
    expect(div.querySelector('ul > li')!.textContent).toBe('Een');
    expect(div.hasAttribute('lang')).toBe(false);
  });

  it('moves lang from the host onto the content div', async () => {
    const page = await render('<tilburg-wbc-html-content lang="nl"><p>Tekst</p></tilburg-wbc-html-content>');
    expect(page.root!.hasAttribute('lang')).toBe(false);
    expect(page.root!.querySelector('.utrecht-html-content')!.getAttribute('lang')).toBe('nl');
  });

  it('renders the html prop inside the styled div', async () => {
    const page = await newSpecPage({ components: [TilburgWbcHtmlContent], html: '<div></div>' });
    const el = page.doc.createElement('tilburg-wbc-html-content') as HTMLElement & { html?: string };
    el.html = '<p>Van het <strong>CMS</strong></p>';
    page.body.appendChild(el);
    await page.waitForChanges();
    const div = el.querySelector('div.utrecht-html-content')!;
    expect(div.children[0].tagName).toBe('P');
    expect(div.querySelector('p > strong')!.textContent).toBe('CMS');
  });

  it('sanitizes the html prop', async () => {
    const page = await render(
      `<tilburg-wbc-html-content html='<p onclick="x()">Hoi</p><script>alert(1)</script>'></tilburg-wbc-html-content>`,
    );
    const div = page.root!.querySelector('.utrecht-html-content')!;
    expect(div.innerHTML).toBe('<p>Hoi</p>');
  });
});

describe('sanitizeHtml', () => {
  it('keeps content markup and safe attributes', () => {
    expect(sanitizeHtml('<h2 id="a">Kop</h2><p>Een <a href="/pad" title="t">link</a></p>')).toBe(
      '<h2 id="a">Kop</h2><p>Een <a href="/pad" title="t">link</a></p>',
    );
  });

  it('drops script-like elements with their content', () => {
    expect(sanitizeHtml('<p>a</p><script>alert(1)</script><style>p{}</style><iframe src="x"></iframe>')).toBe(
      '<p>a</p>',
    );
  });

  it('unwraps unknown elements but keeps their text', () => {
    expect(sanitizeHtml('<p><blink>tekst</blink></p>')).toBe('<p>tekst</p>');
  });

  it('removes event handlers and style attributes', () => {
    expect(sanitizeHtml('<img src="a.png" alt="" onerror="x()" style="color:red">')).toBe('<img src="a.png" alt="">');
  });

  it('removes unsafe URLs', () => {
    expect(sanitizeHtml('<a href="javascript:alert(1)">x</a>')).toBe('<a>x</a>');
    expect(sanitizeHtml('<a href=" JaVaScRiPt:alert(1)">x</a>')).toBe('<a>x</a>');
    expect(sanitizeHtml('<a href="https://www.tilburg.nl">x</a>')).toBe('<a href="https://www.tilburg.nl">x</a>');
    expect(sanitizeHtml('<a href="mailto:info@tilburg.nl">x</a>')).toBe('<a href="mailto:info@tilburg.nl">x</a>');
  });

  it('keeps aria attributes', () => {
    expect(sanitizeHtml('<span aria-hidden="true">*</span>')).toBe('<span aria-hidden="true">*</span>');
  });
});
