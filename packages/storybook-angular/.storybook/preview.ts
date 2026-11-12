/* Global styles are wired via `angular.json` → architect.build.options.styles
   (see `src/styles.scss`). Angular's SCSS pipeline handles them; importing
   SCSS directly here would route through Storybook's Webpack which doesn't
   ship a css-loader for raw SCSS by default. */

import { provideAnimations } from '@angular/platform-browser/animations';
import { TilburgComponentsModule } from '@gemeente-tilburg/components-angular';
/* Opt-in accordion enhancement (toggle + keyboard nav) for the HTML/CSS
   reference stories. The Angular wrapper stories aren't affected — the
   script only enhances `.utrecht-accordion[data-tilburg-accordion-enhance]`,
   and the wrapper's template never emits that attribute. */
import { enhanceAccordion } from '@gemeente-tilburg/components-css/accordion';
/* Opt-in combobox enhancement for the HTML/CSS reference stories.
   `.utrecht-combobox[data-tilburg-combobox-enhance]` only — the Angular
   wrapper template doesn't emit that attribute. */
import { enhanceCombobox } from '@gemeente-tilburg/components-css/combobox';
import { enhanceListbox } from '@gemeente-tilburg/components-css/listbox';
import { enhancePasswordInput } from '@gemeente-tilburg/components-css/password-input';
import { resolveTokens } from '@gemeente-tilburg/components-css/tokens/resolve';
import { enhanceTooltip } from '@gemeente-tilburg/components-css/tooltip';
/* Token-resolver enhancement: fills the `<td data-token="…">` cells in the
   token reference tables with `getComputedStyle()` output at runtime. */
import {
  Controls,
  Description,
  DocsContext,
  Markdown,
  Primary,
  Stories,
  Subtitle,
  Title,
} from '@storybook/addon-docs/blocks';
import { applicationConfig, componentWrapperDecorator, moduleMetadata, type Preview } from '@storybook/angular';
import { createElement, Fragment, useContext } from 'react';
import { theme } from './theme';
import gettingStarted from '../../storybook-shared/src/documentation/getting-started.md?raw';
import layerAngular from '../../storybook-shared/src/documentation/intro-layer-angular.md?raw';
import layerHtml from '../../storybook-shared/src/documentation/intro-layer-html-css.md?raw';
import layerReact from '../../storybook-shared/src/documentation/intro-layer-react.md?raw';
import layerWebComponents from '../../storybook-shared/src/documentation/intro-layer-web-components.md?raw';
import { allSections, componentLinks, type UsageDocs } from '../../storybook-shared/src/usage';

/* The "Gebruik" panel (.storybook/UsagePanel.tsx) reads its install and load steps from these pages. */
/* Every examples file, as webpack's require.context gives them: key './tilburg-alert.examples.ts' → its exports. */
declare const require: {
  context(folder: string, deep: boolean, files: RegExp): { keys(): string[]; (key: string): Record<string, unknown> };
};
const examples = require.context('../../storybook-shared/src', false, /tilburg-[\w-]+\.examples\.ts$/);

const usage: UsageDocs = {
  gettingStarted,
  pages: { html: layerHtml, react: layerReact, angular: layerAngular, webComponents: layerWebComponents },
  /* The snippets of every layer, so the tabs of the layers a story is not about are filled too. */
  sections: allSections(Object.fromEntries(examples.keys().map((key) => [key, examples(key)]))),
};

/* Under the description of every component page: the way to the setup and to related components. No JSX in this
   file: the Angular build does not compile it. */
const ComponentLinks = () =>
  createElement(Markdown, null, componentLinks(useContext(DocsContext).storyById().id, usage.sections));

if (typeof document !== 'undefined' && typeof MutationObserver !== 'undefined') {
  const reenhance = () => {
    enhanceAccordion(document);
    enhanceCombobox(document);
    enhanceListbox(document);
    enhancePasswordInput(document);
    enhanceTooltip(document);
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
    usage,
    options: {
      storySort: {
        /* `Tilburg` (the documentation pages, in reading order) at the top so the cold-start landing story is
           `Tilburg/Intro`, then the Angular components, the shared `Tilburg HTML/…` reference and `Tokens`. The
           documentation has the same titles, and so the same ids, as in the React Storybook: the shared markdown
           links to `?path=/docs/tilburg-…--docs` and that has to work in both. */
        order: [
          'Tilburg',
          [
            'Intro',
            'Aan de slag',
            'Je eerste wijziging',
            'Tips & valkuilen',
            'Implementatiestatus',
            'Open Source License',
            'Toestemming voor gebruik',
            '*',
          ],
          'Tilburg Angular',
          'Tilburg HTML',
          'Tokens',
          ['Intro', '*'],
        ],
      },
    },
    docs: {
      toc: true,
      /* Storybook's default page, with the links under the description. */
      page: () =>
        createElement(
          Fragment,
          null,
          ...[Title, Subtitle, Description, ComponentLinks, Primary, Controls, Stories].map((block, key) =>
            createElement(block, { key }),
          ),
        ),
      theme: theme,
    },
  },
  tags: ['autodocs'],
};

export default preview;
