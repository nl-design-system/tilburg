import { Config } from '@stencil/core';
import { reactOutputTarget } from '@stencil/react-output-target';
import { sass } from '@stencil/sass';
import { safeTextContent } from './src/utils/safe-text-content';

export const config: Config = {
  namespace: 'tilburg',
  srcDir: './src/',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'bundle',
      externalRuntime: false, // bundle the runtime so the `safeTextContent` rollup plugin patches it here too
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
    reactOutputTarget({
      componentCorePackage: '@gemeente-tilburg/web-components-stencil',
      proxiesFile: '../web-components-react/src/components.ts',
    }),
  ],
  plugins: [sass()],
  /* Makes `textContent` / `insertAdjacentText` on hosts insert text instead of HTML; see the util. */
  rollupPlugins: { before: [safeTextContent()] },
  extras: {
    enableImportInjection: true,
    /* Every component renders into light DOM (`shadow: false`) so the global
       utrecht + components-css styles apply to the same markup as the HTML
       layer. Light-DOM `<slot>`s are emulated by Stencil; these fixes make
       slot relocation, fallback content and `textContent`/`childNodes` behave
       like real slots. Their `textContent` setter parses the value as HTML (XSS
       via React string children); the `safeTextContent` rollup plugin
       rewrites it to insert a text node. */
    experimentalSlotFixes: true,
  },
  testing: {
    testPathIgnorePatterns: ['/node_modules/', '/dist/', '/www/'],
  },
};
