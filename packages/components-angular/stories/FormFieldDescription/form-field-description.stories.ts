import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { TilburgFormFieldDescription } from 'src/components';
import { TilburgComponentsModule } from 'src/index.module';

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
