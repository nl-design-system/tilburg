export default {
  sourceType: 'module',
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          chrome: 100,
        },
      },
    ],
    [
      '@babel/preset-typescript',
      {
        targets: {
          chrome: 100,
        },
      },
    ],
    [
      '@babel/preset-react',
      {
        targets: {
          chrome: 100,
        },
      },
    ],
  ],
  plugins: [['@babel/plugin-proposal-decorators', { version: '2023-11' }]],
};
