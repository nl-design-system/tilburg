import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { TilburgComponentsModule, TilburgFormFieldDescription } from '@tilburg/component-library-angular';

export default {
  title: 'Tilburg Angular Components/Form Field Description',
  id: 'tilburg-form-field-description',
  component: TilburgFormFieldDescription,
  decorators: [
    moduleMetadata({
      imports: [TilburgComponentsModule],
    }),
  ],
} as Meta;

type Story = StoryObj<TilburgFormFieldDescription>;

const templateString = `<tilburg-form-field-description [invalid]="invalid" [valid]="valid" [warning]="warning">
    This is a field description
  </tilburg-form-field-description>`;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: templateString,
  }),
};
