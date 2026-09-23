/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { FunctionalComponent, h } from '@stencil/core';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

interface HeadingProps {
  level: HeadingLevel;
  class?: string;
}

/**
 * Renders `<tilburg-wbc-heading-N>` for a numeric level — the Stencil
 * counterpart of the Angular `ngSwitch` over `<tilburg-heading-N>` and the
 * React `HEADINGS[level]` lookup.
 *
 * The tags are written out literally (not built from a template string) so
 * Stencil's compiler sees the dependency and the `dist-custom-elements`
 * build auto-defines the heading together with the component that uses it.
 */
export const Heading: FunctionalComponent<HeadingProps> = ({ level, class: className }, children) => {
  switch (Number(level)) {
    case 1:
      return <tilburg-wbc-heading-1 class={className}>{children}</tilburg-wbc-heading-1>;
    case 2:
      return <tilburg-wbc-heading-2 class={className}>{children}</tilburg-wbc-heading-2>;
    case 4:
      return <tilburg-wbc-heading-4 class={className}>{children}</tilburg-wbc-heading-4>;
    case 5:
      return <tilburg-wbc-heading-5 class={className}>{children}</tilburg-wbc-heading-5>;
    case 6:
      return <tilburg-wbc-heading-6 class={className}>{children}</tilburg-wbc-heading-6>;
    default:
      return <tilburg-wbc-heading-3 class={className}>{children}</tilburg-wbc-heading-3>;
  }
};
