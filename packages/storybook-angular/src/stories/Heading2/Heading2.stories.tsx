import { componentWrapperDecorator, Meta, Story } from '@storybook/angular';
import { TilburgHeading2 } from '@utrecht/component-library-angular';

export default {
  title: 'Tilburg Angular Components/Heading 2',
  id: 'angular-tilburg-heading-2',
  decorators: [componentWrapperDecorator((story) => `<div class="utrecht-document utrecht-theme">${story}</div>`)],
  component: TilburgHeading2,
} as Meta<typeof TilburgHeading2>;

const Template: Story = (args) => ({
  props: args,
  template: `<tilburg-heading-2>The Quick Brown Fox Jumps Over The Lazy Dog</tilburg-heading-2>`,
  component: TilburgHeading2,
});

export const Default = Template.bind({});

Default.args = {};
