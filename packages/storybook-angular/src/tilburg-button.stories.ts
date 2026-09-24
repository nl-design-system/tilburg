/* @license CC0-1.0 */

import { TilburgButton } from '@gemeente-tilburg/components-angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description } from '../../storybook-shared/src/tilburg-button.examples';

const meta: Meta<TilburgButton> = {
  title: 'Tilburg Angular/Button',
  id: 'tilburg-button-angular',
  component: TilburgButton,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
  argTypes: {
    appearance: {
      control: 'select',
      options: ['primary-action-button', 'secondary-action-button', 'subtle-button'],
    },
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    type: { control: 'select', options: ['button', 'submit', 'reset'] },
    disabled: { control: 'boolean' },
    pressed: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<TilburgButton>;

export const Sizes: Story = {
  name: 'Sizes (small / medium / large)',
  render: () => ({
    template: `
      <div style="display:flex; gap:0.75rem; align-items:center; flex-wrap:wrap">
        <tilburg-button size="small">Small</tilburg-button>
        <tilburg-button size="medium">Medium</tilburg-button>
        <tilburg-button size="large">Large</tilburg-button>
      </div>
    `,
  }),
};

export const PrimaryAction: Story = {
  name: 'Primary action',
  render: () => ({
    template: `
      <div style="display:flex; gap:0.75rem; align-items:center; flex-wrap:wrap">
        <tilburg-button appearance="primary-action-button" size="small">Small</tilburg-button>
        <tilburg-button appearance="primary-action-button" size="medium">Medium</tilburg-button>
        <tilburg-button appearance="primary-action-button" size="large">Large</tilburg-button>
      </div>
    `,
  }),
};

export const SecondaryAction: Story = {
  name: 'Secondary action',
  render: () => ({
    template: `
      <div style="display:flex; gap:0.75rem; align-items:center; flex-wrap:wrap">
        <tilburg-button appearance="secondary-action-button" size="small">Small</tilburg-button>
        <tilburg-button appearance="secondary-action-button" size="medium">Medium</tilburg-button>
        <tilburg-button appearance="secondary-action-button" size="large">Large</tilburg-button>
      </div>
    `,
  }),
};

export const Subtle: Story = {
  name: 'Subtle',
  render: () => ({
    template: `
      <div style="display:flex; gap:0.75rem; align-items:center; flex-wrap:wrap">
        <tilburg-button appearance="subtle-button" size="small">Small</tilburg-button>
        <tilburg-button appearance="subtle-button" size="medium">Medium</tilburg-button>
        <tilburg-button appearance="subtle-button" size="large">Large</tilburg-button>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  name: 'Disabled (each size)',
  render: () => ({
    template: `
      <div style="display:flex; gap:0.75rem; align-items:center; flex-wrap:wrap">
        <tilburg-button appearance="primary-action-button" size="small" [disabled]="true">Small</tilburg-button>
        <tilburg-button appearance="primary-action-button" size="medium" [disabled]="true">Medium</tilburg-button>
        <tilburg-button appearance="primary-action-button" size="large" [disabled]="true">Large</tilburg-button>
      </div>
    `,
  }),
};

export const Primary: Story = {
  args: { appearance: 'primary-action-button', size: 'medium' },
  render: (args) => ({
    props: args,
    template: `<tilburg-button [appearance]="appearance" [size]="size" [disabled]="disabled" [pressed]="pressed" [type]="type">Click me</tilburg-button>`,
  }),
};

export const Secondary: Story = {
  args: { appearance: 'secondary-action-button', size: 'medium' },
  render: (args) => ({
    props: args,
    template: `<tilburg-button [appearance]="appearance" [size]="size" [disabled]="disabled">Meer info</tilburg-button>`,
  }),
};

export const AllPermutations: Story = {
  render: () => ({
    template: `
      <div style="display:flex; flex-direction:column; gap:1rem">
        <div>
          <h4>Default (no appearance)</h4>
          <div style="display:flex; gap:0.75rem; align-items:center; flex-wrap:wrap">
            <tilburg-button size="small">Small</tilburg-button>
            <tilburg-button size="medium">Medium</tilburg-button>
            <tilburg-button size="large">Large</tilburg-button>
          </div>
        </div>
        <div>
          <h4>Primary action × size</h4>
          <div style="display:flex; gap:0.75rem; align-items:center; flex-wrap:wrap">
            <tilburg-button appearance="primary-action-button" size="small">Small</tilburg-button>
            <tilburg-button appearance="primary-action-button" size="medium">Medium</tilburg-button>
            <tilburg-button appearance="primary-action-button" size="large">Large</tilburg-button>
          </div>
        </div>
        <div>
          <h4>Secondary action × size</h4>
          <div style="display:flex; gap:0.75rem; align-items:center; flex-wrap:wrap">
            <tilburg-button appearance="secondary-action-button" size="small">Small</tilburg-button>
            <tilburg-button appearance="secondary-action-button" size="medium">Medium</tilburg-button>
            <tilburg-button appearance="secondary-action-button" size="large">Large</tilburg-button>
          </div>
        </div>
        <div>
          <h4>Subtle × size</h4>
          <div style="display:flex; gap:0.75rem; align-items:center; flex-wrap:wrap">
            <tilburg-button appearance="subtle-button" size="small">Small</tilburg-button>
            <tilburg-button appearance="subtle-button" size="medium">Medium</tilburg-button>
            <tilburg-button appearance="subtle-button" size="large">Large</tilburg-button>
          </div>
        </div>
        <div>
          <h4>Disabled</h4>
          <div style="display:flex; gap:0.75rem; align-items:center; flex-wrap:wrap">
            <tilburg-button appearance="primary-action-button" size="small" [disabled]="true">Small</tilburg-button>
            <tilburg-button appearance="primary-action-button" size="medium" [disabled]="true">Medium</tilburg-button>
            <tilburg-button appearance="primary-action-button" size="large" [disabled]="true">Large</tilburg-button>
          </div>
        </div>
        <div>
          <h4>Pressed (aria-pressed=true)</h4>
          <div style="display:flex; gap:0.75rem; align-items:center; flex-wrap:wrap">
            <tilburg-button appearance="primary-action-button" size="small" [pressed]="true">Small</tilburg-button>
            <tilburg-button appearance="primary-action-button" size="medium" [pressed]="true">Medium</tilburg-button>
            <tilburg-button appearance="primary-action-button" size="large" [pressed]="true">Large</tilburg-button>
          </div>
        </div>
      </div>
    `,
  }),
};
