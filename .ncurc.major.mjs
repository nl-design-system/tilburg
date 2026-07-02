import minorConfig from './.ncurc.minor.mjs';

export default {
  ...minorConfig,
  reject: [...minorConfig.reject, 'eslint'],
  target: 'latest',
};
