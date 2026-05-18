/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Tilburg/Progress Bar',
  id: 'tilburg-progress-bar',
  tags: ['autodocs'],
  parameters: {
    bugs: 'https://github.com/nl-design-system/tilburg/labels/component%2Fprogress-bar',
    docs: {
      description: {
        component: 'Step-progress indicator with optional back link, title, and "Stap X van Y" label.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const Track = ({ percent, valueText }: { percent: number; valueText: string }) => (
  <div
    className="tilburg-progress-bar__track"
    role="progressbar"
    aria-label="Voortgang"
    aria-valuemin={0}
    aria-valuemax={100}
    aria-valuenow={percent}
    aria-valuetext={valueText}
  >
    <div className="tilburg-progress-bar__indicator progress-bar-indicator" style={{ width: `${percent}%` }} />
  </div>
);

const Header = ({ title, label }: { title?: string; label?: string }) => (
  <div className="tilburg-progress-bar__header">
    {title && <h2 className="tilburg-progress-bar__title tilburg-step-title">{title}</h2>}
    {label && <div className="tilburg-progress-bar__label">{label}</div>}
  </div>
);

export const Quarter: Story = {
  name: '25% complete',
  render: () => (
    <>
      <Header title="Persoonlijke gegevens" label="Stap 1 van 4" />
      <Track percent={25} valueText="Stap 1 van 4" />
    </>
  ),
};

export const Half: Story = {
  name: '50% complete',
  render: () => (
    <>
      <Header title="Adresgegevens" label="Stap 2 van 4" />
      <Track percent={50} valueText="Stap 2 van 4" />
    </>
  ),
};

export const ThreeQuarter: Story = {
  name: '75% complete',
  render: () => (
    <>
      <Header title="Bevestiging" label="Stap 3 van 4" />
      <Track percent={75} valueText="Stap 3 van 4" />
    </>
  ),
};

export const Complete: Story = {
  name: '100% complete',
  render: () => (
    <>
      <Header title="Klaar" label="Stap 4 van 4" />
      <Track percent={100} valueText="Stap 4 van 4" />
    </>
  ),
};

export const WithBackLink: Story = {
  name: 'With back link',
  render: () => (
    <>
      <a
        className="tilburg-progress-bar__back utrecht-link utrecht-link--html-a"
        href="#"
        onClick={(event) => event.preventDefault()}
      >
        <span aria-hidden="true">←</span>
        <span className="tilburg-progress-bar__back-label">Vorige stap</span>
      </a>
      <Header title="Adresgegevens" label="Stap 2 van 4" />
      <Track percent={50} valueText="Stap 2 van 4" />
    </>
  ),
};
