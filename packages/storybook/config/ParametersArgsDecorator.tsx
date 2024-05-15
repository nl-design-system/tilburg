import type { Decorator } from '@storybook/react';
import { Document } from '@utrecht/component-library-react/dist/css-module';

export const ParametersArgsDecorator: Decorator = (Story, context) => {
  context.parameters['args'] = context.args;

  return (
    <div className="tilburg-theme">
      <Document>
        <Story />
      </Document>
    </div>
  );
};
