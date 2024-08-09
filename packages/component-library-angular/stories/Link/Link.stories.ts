import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { TilburgComponentsModule, TilburgLinkAttr } from '@tilburg/component-library-angular';

export default {
  title: 'Tilburg Angular Components/Link',
  id: 'tilburg-link',
  component: TilburgLinkAttr,
  decorators: [
    moduleMetadata({
      imports: [TilburgComponentsModule],
    }),
  ],
} as Meta;

type Story = StoryObj<TilburgLinkAttr>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: '<a href="http://localhost:6006" tilburg-link>This is a link</a>',
  }),
};
