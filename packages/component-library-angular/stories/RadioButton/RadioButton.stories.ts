import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { TilburgComponentsModule, TilburgRadioButton } from '@tilburg/component-library-angular';

export default {
  title: 'Tilburg Angular Components/RadioButton',
  id: 'radio-button-1',
  component: TilburgRadioButton,
  decorators: [
    moduleMetadata({
      imports: [TilburgComponentsModule],
    }),
  ],
} as Meta;

type Story = StoryObj<TilburgRadioButton>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: '<div><tilburg-radio-button><label>Radio button</label></tilburg-radio-button></div>',
  }),
};
