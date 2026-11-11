import minorConfig, { patchOnlyForAngularPins } from './.ncurc.minor.mjs';

/* components-angular builds with the oldest Angular it supports (20), so its Angular toolchain stays on major 20. ncu
   cannot filter per workspace package; only the library pins major 20, so the Storybook still gets Angular majors. */
const ANGULAR_TOOLCHAIN = /^(@angular\/|@angular-devkit\/|@angular-eslint\/|ng-packagr$)/;

export default {
  ...minorConfig,
  reject: [...minorConfig.reject, 'eslint'],
  filterResults: (name, versions) =>
    patchOnlyForAngularPins(name, versions) &&
    !(ANGULAR_TOOLCHAIN.test(name) && versions.currentVersionSemver?.[0]?.major === '20'),
  target: 'latest',
};
