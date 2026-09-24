/* @license CC0-1.0 */

import { TilburgPageContent } from '@gemeente-tilburg/components-angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description } from '../../storybook-shared/src/tilburg-page-content.examples';

const meta: Meta<TilburgPageContent> = {
  title: 'Tilburg Angular/Page Content',
  id: 'tilburg-page-content-angular',
  component: TilburgPageContent,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj<TilburgPageContent>;

export const Default: Story = {
  name: 'Default',
  render: () => ({
    template: `
      <tilburg-page-content>
        <tilburg-heading-1>Aanvraag indienen</tilburg-heading-1>
        <tilburg-paragraph>Vul de gegevens in om de aanvraag te starten.</tilburg-paragraph>
      </tilburg-page-content>
    `,
  }),
};
