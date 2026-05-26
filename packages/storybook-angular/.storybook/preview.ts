/* Global styles are wired via `angular.json` → architect.build.options.styles
   (see `src/styles.scss`). Angular's SCSS pipeline handles them; importing
   SCSS directly here would route through Storybook's Webpack which doesn't
   ship a css-loader for raw SCSS by default. */

import { applicationConfig, componentWrapperDecorator, moduleMetadata, type Preview } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { TilburgComponentsModule } from '@gemeente-tilburg/components-angular';
import { theme } from './theme';

/* Opt-in accordion enhancement (toggle + keyboard nav) for the HTML/CSS
   reference stories. The Angular wrapper stories aren't affected — the
   script only enhances `.utrecht-accordion[data-tilburg-accordion-enhance]`,
   and the wrapper's template never emits that attribute. */
import { enhanceAccordion } from '@gemeente-tilburg/components-css/accordion';
/* Token-resolver enhancement: fills the `<td data-token="…">` cells in the
   token reference tables with `getComputedStyle()` output at runtime. */
import { resolveTokens } from '@gemeente-tilburg/components-css/tokens/resolve';

if (typeof document !== 'undefined' && typeof MutationObserver !== 'undefined') {
  const reenhance = () => {
    enhanceAccordion(document);
    resolveTokens(document);
  };
  new MutationObserver(reenhance).observe(document.body, { childList: true, subtree: true });
  reenhance();
}

/* Compodoc is disabled (`compodoc: false` in angular.json), so we deliberately
   do not call `setCompodocJson` — passing a null/stub value to it makes
   Storybook's `extractArgTypes` throw "Invalid compodoc JSON". Without
   compodoc the autodocs Controls panel won't auto-populate from component
   metadata; explicit `argTypes` on each story's meta supplies the types. */

const preview: Preview = {
  decorators: [
    applicationConfig({
      providers: [provideAnimations()],
    }),
    moduleMetadata({
      imports: [TilburgComponentsModule],
    }),
    /* Mirror the React Storybook decorator (see
       `packages/storybook/config/ParametersArgsDecorator.tsx`): design tokens
       are scoped under `.tilburg-theme`, and `tilburg-document` applies the
       Utrecht document defaults that components inherit from. */
    componentWrapperDecorator(
      (story) => `<div class="tilburg-theme"><tilburg-document>${story}</tilburg-document></div>`,
    ),
  ],
  parameters: {
    controls: { expanded: false },
    options: {
      storySort: {
        /* `Tokens` at the top (foundation), then this Storybook's Angular
           wrappers with their Intro pinned, then the shared `Tilburg HTML/…`
           reference. */
        order: ['Tokens', ['Intro', '*'], 'Tilburg Angular', ['Intro', '*'], 'Tilburg HTML'],
      },
    },
    docs: {
      toc: true,
      theme: theme,
    },
  },
  tags: ['autodocs'],
};

export default preview;
