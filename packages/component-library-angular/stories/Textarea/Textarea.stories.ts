import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { TilburgComponentsModule, TilburgTextarea } from '@tilburg/component-library-angular';

export default {
  title: 'Tilburg Angular Components/Textarea',
  id: 'tilburg-text-area',
  component: TilburgTextarea,
  decorators: [
    moduleMetadata({
      imports: [TilburgComponentsModule],
    }),
  ],
} as Meta;

type Story = StoryObj<TilburgTextarea>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: '<tilburg-textarea>this is a text area</tilburg-textarea>',
  }),
};
