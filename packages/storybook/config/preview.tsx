import '@gemeente-tilburg/design-tokens/dist/tilburg/theme.css';
// utrecht 5.x base CSS — same foundation bq-tlb-frontend's app + storybook
// load via `src/styles.scss` (the storybook inherits this through its Angular
// browserTarget config). Provides `.utrecht-alert { display:flex; padding;
// border }`, `.utrecht-accordion__*`, form-control state rules, etc. Tilburg
// `components-css/<name>/index.scss` rules below cascade on top.
import '@utrecht/component-library-css/dist/index.css';
import '@gemeente-tilburg/components-css/accordion/index.scss';
import '@gemeente-tilburg/components-css/alert/index.scss';
import '@gemeente-tilburg/components-css/breadcrumb/index.scss';
import '@gemeente-tilburg/components-css/button/index.scss';
import '@gemeente-tilburg/components-css/checkbox/index.scss';
import '@gemeente-tilburg/components-css/form-field/index.scss';
import '@gemeente-tilburg/components-css/heading-1/index.scss';
import '@gemeente-tilburg/components-css/heading-2/index.scss';
import '@gemeente-tilburg/components-css/heading-3/index.scss';
import '@gemeente-tilburg/components-css/heading-4/index.scss';
import '@gemeente-tilburg/components-css/heading-5/index.scss';
import '@gemeente-tilburg/components-css/heading-6/index.scss';
import '@gemeente-tilburg/components-css/language-toggle/index.scss';
import '@gemeente-tilburg/components-css/loading-spinner/index.scss';
import '@gemeente-tilburg/components-css/modal/index.scss';
import '@gemeente-tilburg/components-css/progress-bar/index.scss';
import '@gemeente-tilburg/components-css/radio-button/index.scss';
import '@gemeente-tilburg/components-css/textarea/index.scss';
import '@gemeente-tilburg/components-css/textbox/index.scss';
import '@gemeente-tilburg/components-css/validation-message/index.scss';
import '@gemeente-tilburg/font/src/index.scss';
import { defineCustomElements } from '@gemeente-tilburg/web-components-stencil/loader/index.js';
import { Controls, Description, Primary, Stories } from '@storybook/addon-docs';
import type { Preview } from '@storybook/react';
import { ParametersArgsDecorator } from './ParametersArgsDecorator';
import { theme } from './theme';

defineCustomElements();

const preview: Preview = {
  parameters: {
    controls: { expanded: false },
    options: {
      panelPosition: 'right',
      storySort: {
        order: ['Tilburg', 'CSS Component'],
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
