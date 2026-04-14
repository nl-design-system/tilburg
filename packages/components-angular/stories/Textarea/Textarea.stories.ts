import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { TilburgTextarea } from 'src/components';
import { TilburgComponentsModule } from 'src/index.module';

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
