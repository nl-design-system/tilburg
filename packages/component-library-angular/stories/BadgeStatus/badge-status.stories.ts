import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { TilburgBadgeStatus, TilburgComponentsModule } from '@tilburg/component-library-angular';

export default {
  title: 'Tilburg Angular Components/Badge Status',
  id: 'badge-status',
  component: TilburgBadgeStatus,
  decorators: [
    moduleMetadata({
      imports: [TilburgComponentsModule],
    }),
  ],
} as Meta;

type Story = StoryObj<TilburgBadgeStatus>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `<tilburg-badge-status>Default</tilburg-badge-status>`,
  }),
};

export const Error: Story = {
  render: (args) => ({
    props: args,
    template: `<tilburg-badge-status status="error">Error</tilburg-badge-status>`,
  }),
};

export const Neutral: Story = {
  render: (args) => ({
    props: args,
    template: `<tilburg-badge-status status="neutral">Neutral</tilburg-badge-status>`,
  }),
};

export const Danger: Story = {
  render: (args) => ({
    props: args,
    template: `<tilburg-badge-status status="danger">Danger</tilburg-badge-status>`,
  }),
};
export const Safe: Story = {
  render: (args) => ({
    props: args,
    template: `<tilburg-badge-status status="safe">Safe</tilburg-badge-status>`,
  }),
};

export const Invalid: Story = {
  render: (args) => ({
    props: args,
    template: `<tilburg-badge-status status="invalid">Invalid</tilburg-badge-status>`,
  }),
};

export const Valid: Story = {
  render: (args) => ({
    props: args,
    template: `<tilburg-badge-status status="valid">Valid</tilburg-badge-status>`,
  }),
};

export const Warning: Story = {
  render: (args) => ({
    props: args,
    template: `<tilburg-badge-status status="warning">warning</tilburg-badge-status>`,
  }),
};

export const Success: Story = {
  render: (args) => ({
    props: args,
    template: `<tilburg-badge-status status="success">Success</tilburg-badge-status>`,
  }),
};

export const Inactive: Story = {
  render: (args) => ({
    props: args,
    template: `<tilburg-badge-status status="inactive">Inactive</tilburg-badge-status>`,
  }),
};

export const Active: Story = {
  render: (args) => ({
    props: args,
    template: `<tilburg-badge-status status="active">Active</tilburg-badge-status>`,
  }),
};
