/* @license CC0-1.0 */

import { TilburgDocument } from '@gemeente-tilburg/components-angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description } from '../../storybook-shared/src/tilburg-document.examples';

const meta: Meta<TilburgDocument> = {
  title: 'Tilburg Angular/Document',
  id: 'tilburg-document-angular',
  component: TilburgDocument,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj<TilburgDocument>;

export const Default: Story = {
  name: 'Document scope',
  render: () => ({
    template: `
      <tilburg-document style="padding:1rem;max-inline-size:32rem;display:block">
        <tilburg-paragraph>
          Tekst binnen een <code>utrecht-document</code> erft de Tilburg-typografie en body-kleur via de design tokens.
        </tilburg-paragraph>
      </tilburg-document>
    `,
  }),
};
