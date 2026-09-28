/* eslint-env node */
/* Jest for the React components: TypeScript and JSX go through babel-jest (the Babel presets are devDependencies), and
   stylesheets are stubbed because the tests check the DOM, not the styling. This used to be `next/jest`, which pulled
   in all of Next.js (and its security advisories) for just these two things. */
export default {
  testEnvironment: 'jest-environment-jsdom',
  testPathIgnorePatterns: ['/dist/', '/node_modules/'],
  moduleNameMapper: {
    '\\.(css|scss)$': '<rootDir>/jest.style-mock.cjs',
  },
  transform: {
    '^.+\\.[jt]sx?$': [
      'babel-jest',
      {
        presets: [
          ['@babel/preset-env', { targets: { node: 'current' } }],
          ['@babel/preset-react', { runtime: 'automatic' }],
          '@babel/preset-typescript',
        ],
      },
    ],
  },
};
