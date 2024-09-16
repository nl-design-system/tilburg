import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { TilburgCheckbox, TilburgComponentsModule } from '@tilburg/component-library-angular';

export default {
  title: 'Tilburg Angular Components/Checkbox',
  id: 'tilburg-checkbox-1',
  component: TilburgCheckbox,
  decorators: [
    moduleMetadata({
      imports: [TilburgComponentsModule],
    }),
  ],
} as Meta;

type Story = StoryObj<TilburgCheckbox>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: '<div><tilburg-checkbox>Test Heading 1</tilburg-checkbox> <label>Checkbox</label></div>',
  }),
};
