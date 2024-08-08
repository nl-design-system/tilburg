import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { TilburgComponentsModule, TilburgRadioButtonAttr } from '@tilburg/component-library-angular';

export default {
  title: 'Tilburg Angular Components/RadioButton',
  id: 'radio-button-1',
  component: TilburgRadioButtonAttr,
  decorators: [
    moduleMetadata({
      imports: [TilburgComponentsModule],
    }),
  ],
} as Meta;

type Story = StoryObj<TilburgRadioButtonAttr>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template:
      '<input type="radio" [invalid]="invalid" [value]="value" [checked]="checked" [disabled]="disabled" tilburg-radio-button />',
  }),
};
