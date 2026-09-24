/* @license CC0-1.0 */

import { TilburgArticle } from '@gemeente-tilburg/components-angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description } from '../../storybook-shared/src/tilburg-article.examples';

const meta: Meta<TilburgArticle> = {
  title: 'Tilburg Angular/Article',
  id: 'tilburg-article-angular',
  component: TilburgArticle,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj<TilburgArticle>;

export const Default: Story = {
  name: 'Default',
  render: () => ({
    template: `
      <tilburg-article style="max-inline-size:32rem;display:block">
        <tilburg-heading-2>Vergunning aanvragen</tilburg-heading-2>
        <tilburg-paragraph>
          Je kunt een vergunning aanvragen via het online formulier op deze website. Vul alle verplichte velden in en
          upload de benodigde documenten.
        </tilburg-paragraph>
      </tilburg-article>
    `,
  }),
};
