<!-- markdownlint-disable MD041 -- a pull request body has no title heading: GitHub shows the title above it -->

## What and why

<!-- What changes for someone using the components, and why. Link the issue or ticket (e.g. TIL-53). -->

## Checklist

- [ ] `pnpm verify` passes (what CI runs, plus `pnpm parity`)
- [ ] A changeset describes the change (`pnpm changeset`), or it needs no release (refactor, tests, docs)
- [ ] Every layer that exists for this component is updated: HTML/CSS, React, Angular, Web Components
      (`pnpm parity <name>` shows which), and `implementation-status.md` if a layer was added
- [ ] Stories show the change in both Storybooks; a Tilburg-only component has the `tilburg` tag
- [ ] Checked with the keyboard, a screen reader (or the accessibility tree), 200% zoom and high contrast
- [ ] Checked in the BAT theme as well as Tilburg (focus states especially: BAT focuses with light text on dark blue)

## Screenshots

<!-- Before and after, for anything visible. -->
