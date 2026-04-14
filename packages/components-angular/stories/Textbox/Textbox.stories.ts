import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { TilburgTextbox } from 'src/components';
import { TilburgComponentsModule } from 'src/index.module';

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
