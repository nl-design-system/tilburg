/* @license CC0-1.0 */

import { TilburgHtmlContent } from '@gemeente-tilburg/components-angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description } from '../../storybook-shared/src/tilburg-html-content.examples';

const meta: Meta<TilburgHtmlContent> = {
  title: 'Tilburg Angular/HTML Content',
  id: 'tilburg-html-content-angular',
  component: TilburgHtmlContent,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj<TilburgHtmlContent>;

export const Default: Story = {
  name: 'Default',
  render: () => ({
    template: `
      <tilburg-html-content lang="nl" style="max-inline-size:32rem;display:block">
        <p>CMS-geleverde HTML krijgt automatisch de Tilburg-typografie zonder per tag een class te zetten.</p>
        <ul>
          <li>Eerste item</li>
          <li>Tweede item</li>
        </ul>
        <p>
          Inline <strong>nadruk</strong> en <a href="#">links</a> werken zoals verwacht.
        </p>
      </tilburg-html-content>
    `,
  }),
};
