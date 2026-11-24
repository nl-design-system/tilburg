/* The page frame of the example pages: skip link, page header with the Tilburg logo and a language toggle, the main
   content and the page footer. Only Tilburg components. The layout around them is the React Storybook's
   `examples.css` (a readable width for forms, spacing between sections), so both Storybooks show the same pages. */
import { Component, signal, ViewEncapsulation } from '@angular/core';
import { TilburgComponentsModule } from '@gemeente-tilburg/components-angular';

export const MAIN_ID = 'tilburg-example-main';

@Component({
  selector: 'tilburg-example-page',
  imports: [TilburgComponentsModule],
  /* Not emulated: the layout classes sit on elements in the pages' own templates. */
  encapsulation: ViewEncapsulation.None,
  styleUrl: '../../../storybook/src/examples/examples.css',
  styles: [
    /* What Angular needs on top: a component's host element is inline unless it says otherwise, and margins between
       the blocks of a page only work on blocks. `:where()` keeps it below every component's own `display`. */
    ':where(.tilburg-example__stack > *) { display: block; }',
    /* The class sits on the host here, with the `<main>` inside it: one padding, not two. */
    '.tilburg-example__content > .utrecht-page-content { padding: 0; }',
  ],
  template: `
    <tilburg-page class="tilburg-example">
      <tilburg-skip-link [href]="'#' + mainId">Direct naar de inhoud</tilburg-skip-link>
      <tilburg-page-header logoSrc="logo-on-dark.svg" logoAlt="Open Tilburg, naar de homepage" titleHref="#">
        <tilburg-language-toggle [options]="languages" [active]="language()" (toggle)="language.set($event)" />
      </tilburg-page-header>
      <tilburg-page-content [id]="mainId" tabindex="-1" class="tilburg-example__content">
        <ng-content />
      </tilburg-page-content>
      <tilburg-page-footer [links]="footerLinks" [primaryLink]="primaryLink" />
    </tilburg-page>
  `,
})
export class ExamplePage {
  readonly mainId = MAIN_ID;
  readonly language = signal('nl');

  readonly languages = [
    { code: 'nl', label: 'NL' },
    { code: 'en', label: 'EN' },
  ];

  readonly footerLinks = [
    { label: 'Privacyverklaring', href: '#' },
    { label: 'Toegankelijkheid', href: '#' },
    { label: 'Cookies', href: '#' },
    { label: 'Proclaimer', href: '#' },
  ];

  readonly primaryLink = { label: 'Contact', href: '#' };
}
