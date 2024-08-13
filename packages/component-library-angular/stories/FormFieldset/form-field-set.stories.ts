import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { TilburgComponentsModule, TilburgFieldset } from '@tilburg/component-library-angular';
export default {
  title: 'Tilburg Angular Components/Form Field Set',
  id: 'tilburg-form-field-set',
  component: TilburgFieldset,
  decorators: [
    moduleMetadata({
      imports: [TilburgComponentsModule],
    }),
  ],
} as Meta;

type Story = StoryObj<TilburgFieldset>;

const templateString = `<tilburg-fieldset [disabled]="disabled" [invalid]="invalid">This is a Tilburg fieldset</tilburg-fieldset>`;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: templateString,
  }),
};
