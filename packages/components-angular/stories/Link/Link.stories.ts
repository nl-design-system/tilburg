import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { TilburgLink } from 'src/components';
import { TilburgComponentsModule } from 'src/index.module';

export default {
  title: 'Tilburg Angular Components/Link',
  id: 'tilburg-link',
  component: TilburgLink,
  decorators: [
    moduleMetadata({
      imports: [TilburgComponentsModule],
    }),
  ],
} as Meta;

type Story = StoryObj<TilburgLink>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: '<a href="http://localhost:6006" tilburg-link>This is a link</a>',
  }),
};
