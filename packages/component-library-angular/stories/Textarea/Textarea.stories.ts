import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { TilburgComponentsModule, TilburgTextareaAttr } from '@tilburg/component-library-angular';

export default {
  title: 'Tilburg Angular Components/Textarea',
  id: 'tilburg-text-area',
  component: TilburgTextareaAttr,
  decorators: [
    moduleMetadata({
      imports: [TilburgComponentsModule],
    }),
  ],
} as Meta;

type Story = StoryObj<TilburgTextareaAttr>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: '<textarea tilburg-textarea>this is a text area</textarea>',
  }),
};
