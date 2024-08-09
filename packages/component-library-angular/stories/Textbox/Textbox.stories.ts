import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { TilburgComponentsModule, TilburgTextboxAttr } from '@tilburg/component-library-angular';

export default {
  title: 'Tilburg Angular Components/Textbox',
  id: 'tilburg-textbox',
  component: TilburgTextboxAttr,
  decorators: [
    moduleMetadata({
      imports: [TilburgComponentsModule],
    }),
  ],
} as Meta;

type Story = StoryObj<TilburgTextboxAttr>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: '<input tilburg-textbox />',
  }),
};
