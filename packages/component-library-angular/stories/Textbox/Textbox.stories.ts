import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { TilburgComponentsModule, TilburgTextbox } from '@tilburg/component-library-angular';

export default {
  title: 'Tilburg Angular Components/Textbox',
  id: 'tilburg-textbox',
  component: TilburgTextbox,
  decorators: [
    moduleMetadata({
      imports: [TilburgComponentsModule],
    }),
  ],
} as Meta;

type Story = StoryObj<TilburgTextbox>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: '<input tilburg-textbox />',
  }),
};
