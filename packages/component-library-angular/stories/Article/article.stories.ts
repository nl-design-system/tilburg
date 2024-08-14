import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { TilburgButtonAttr, TilburgComponentsModule } from '@tilburg/component-library-angular';

export default {
  title: 'Tilburg Angular Components/Article',
  id: 'article-1',
  component: TilburgButtonAttr,
  decorators: [
    moduleMetadata({
      imports: [TilburgComponentsModule],
    }),
  ],
} as Meta;

type Story = StoryObj<TilburgButtonAttr>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: '<tilburg-article><h1>Tilburg article</h1><p>Paragraph text</p></tilburg-article>',
  }),
};
