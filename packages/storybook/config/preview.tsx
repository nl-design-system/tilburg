import '@gemeente-tilburg/design-tokens/dist/tilburg/theme.css';
// utrecht 5.x base CSS — the foundation Tilburg components cascade on top of.
// Provides `.utrecht-alert { display:flex; padding; border }`,
// `.utrecht-accordion__*`, form-control state rules, etc. Tilburg
// `components-css/<name>/index.scss` rules below cascade on top.
import '@utrecht/component-library-css/dist/index.css';
import '@gemeente-tilburg/components-css/accordion/index.scss';
import '@gemeente-tilburg/components-css/alert/index.scss';
import '@gemeente-tilburg/components-css/badge-counter/index.scss';
import '@gemeente-tilburg/components-css/badge-status/index.scss';
import '@gemeente-tilburg/components-css/breadcrumb/index.scss';
import '@gemeente-tilburg/components-css/button/index.scss';
import '@gemeente-tilburg/components-css/button-link/index.scss';
import '@gemeente-tilburg/components-css/checkbox/index.scss';
import '@gemeente-tilburg/components-css/data-list/index.scss';
import '@gemeente-tilburg/components-css/form-field/index.scss';
import '@gemeente-tilburg/components-css/form-fieldset/index.scss';
import '@gemeente-tilburg/components-css/form-label/index.scss';
import '@gemeente-tilburg/components-css/heading-1/index.scss';
import '@gemeente-tilburg/components-css/heading-2/index.scss';
import '@gemeente-tilburg/components-css/heading-3/index.scss';
import '@gemeente-tilburg/components-css/heading-4/index.scss';
import '@gemeente-tilburg/components-css/heading-5/index.scss';
import '@gemeente-tilburg/components-css/heading-6/index.scss';
import '@gemeente-tilburg/components-css/html-content/index.scss';
import '@gemeente-tilburg/components-css/language-toggle/index.scss';
import '@gemeente-tilburg/components-css/link/index.scss';
import '@gemeente-tilburg/components-css/loading-spinner/index.scss';
import '@gemeente-tilburg/components-css/modal/index.scss';
import '@gemeente-tilburg/components-css/ordered-list/index.scss';
import '@gemeente-tilburg/components-css/page-footer/index.scss';
import '@gemeente-tilburg/components-css/page-header/index.scss';
import '@gemeente-tilburg/components-css/pagination/index.scss';
import '@gemeente-tilburg/components-css/progress-bar/index.scss';
import '@gemeente-tilburg/components-css/radio-button/index.scss';
import '@gemeente-tilburg/components-css/separator/index.scss';
import '@gemeente-tilburg/components-css/table/index.scss';
import '@gemeente-tilburg/components-css/textarea/index.scss';
import '@gemeente-tilburg/components-css/textbox/index.scss';
import '@gemeente-tilburg/components-css/unordered-list/index.scss';
import '@gemeente-tilburg/components-css/validation-message/index.scss';
import '@gemeente-tilburg/font/src/index.scss';
/* Opt-in accordion enhancement (toggle + keyboard nav) for the HTML/CSS
   reference stories. Angular/React wrapper stories aren't affected — the
   script only enhances `.utrecht-accordion[data-tilburg-accordion-enhance]`. */
import { enhanceAccordion } from '@gemeente-tilburg/components-css/accordion';
/* Token-resolver enhancement: fills the `<td data-token="…">` cells in the
   token reference tables with `getComputedStyle()` output at runtime. */
import { resolveTokens } from '@gemeente-tilburg/components-css/tokens/resolve';
import { defineCustomElements } from '@gemeente-tilburg/web-components-stencil/loader/index.js';
import { Controls, Description, Primary, Stories } from '@storybook/addon-docs';
import type { Preview } from '@storybook/react';
import { ParametersArgsDecorator } from './ParametersArgsDecorator';
import { theme } from './theme';

defineCustomElements();

/* Storybook hot-rerenders stories on arg/control changes. Watch the body
   for new accordion roots and enhance them — the script itself is idempotent
   so re-running on the same root is a no-op. */
if (typeof document !== 'undefined' && typeof MutationObserver !== 'undefined') {
  const reenhance = () => {
    enhanceAccordion(document);
    resolveTokens(document);
  };
  new MutationObserver(reenhance).observe(document.body, { childList: true, subtree: true });
  reenhance();
}

const preview: Preview = {
  parameters: {
    controls: { expanded: false },
    options: {
      panelPosition: 'right',
      storySort: {
        /* Pin `Intro` to the top of each section; everything else falls back
           to its default alphabetical position via the `*` wildcard.
           `Tilburg` (the project-wide intro section) sits at the top so the
           cold-start landing story is `Tilburg/Intro`. `Tokens` is demoted to
           the end — still discoverable, but no longer the default landing. */
        order: [
          'Tilburg',
          ['Intro', '*'],
          'Tilburg HTML',
          ['Intro', '*'],
          'Tilburg React',
          ['Intro', '*'],
          'Tokens',
          ['Intro', '*'],
        ],
      },
    },
    docs: {
      page: () => {
        // Exclude `<Title>` because the title comes from the Markdown file
        return (
          <>
            <Description />
            <Primary />
            <Controls />
            <Stories />
          </>
        );
      },
      theme: theme,
    },
  },
  decorators: [ParametersArgsDecorator],
};

export default preview;
