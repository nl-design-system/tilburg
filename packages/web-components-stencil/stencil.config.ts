import { Config } from '@stencil/core';
import { reactOutputTarget } from '@stencil/react-output-target';
import { sass } from '@stencil/sass';

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
  extras: { enableImportInjection: true },
};
