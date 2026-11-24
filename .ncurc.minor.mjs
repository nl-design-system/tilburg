import patchConfig from './.ncurc.patch.mjs';

/* Angular fixes the TypeScript and zone.js ranges per version (Angular 20: TypeScript >=5.8 <6.0, zone.js ~0.15;
   Angular 22: TypeScript >=6.0 <6.1), so even a minor bump breaks a build: those two move together with Angular. */
const MOVE_WITH_ANGULAR = ['typescript', 'zone.js'];
export const patchOnlyForAngularPins = (name, { currentVersionSemver, upgradedVersionSemver }) =>
  !MOVE_WITH_ANGULAR.includes(name) ||
  (upgradedVersionSemver?.major === currentVersionSemver?.[0]?.major &&
    upgradedVersionSemver?.minor === currentVersionSemver?.[0]?.minor);

export default {
  ...patchConfig,
  reject: [...patchConfig.reject],
  filterResults: patchOnlyForAngularPins,
  target: 'minor',
};
