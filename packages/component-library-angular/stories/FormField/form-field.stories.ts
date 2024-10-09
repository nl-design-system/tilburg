import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { TilburgComponentsModule, TilburgFormField } from '@tilburg/component-library-angular';

export default {
  title: 'Tilburg Angular Components/Form Field',
  id: 'tilburg-form-field',
  component: TilburgFormField,
  decorators: [
    moduleMetadata({
      imports: [TilburgComponentsModule],
    }),
  ],
} as Meta;

type Story = StoryObj<TilburgFormField>;

const templateString = `<tilburg-form-field [type]="type" [invalid]="invalid" [class]="class"> <input type="checkbox" id="1" utrecht-checkbox /> <label utrecht-form-label for="1">Form Field</label> </tilburg-form-field>`;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: templateString,
  }),
};
