const stringSort = (a, b) => (a === b ? 0 : a > b ? 1 : -1);

const sortByName = (a, b) => stringSort(a.name, b.name);

/* The figma export carries token sets for components Tilburg does not have (`todo.*` for the NL Design System
   candidates, `voorbeeld.*` and `denhaag.*` from the example theme). They are left out of every output, except the ones
   that are referenced by a kept token or already used by consumers (bq-tlb-frontend), so nothing that resolves today
   stops resolving. */
const placeholderSets = ['todo', 'voorbeeld', 'denhaag'];
const keptPlaceholderTokens = new Set([
  'voorbeeld.code.font-family', // --utrecht-code(-block)-font-family refer to it
  'todo.checkbox-group.row-gap',
  'todo.radio-group.row-gap',
  'todo.status-badge.color',
  'todo.status-badge.informative.marker',
  'todo.status-badge.negative.marker',
  'todo.status-badge.positive.marker',
  'todo.status-badge.warning.marker',
]);

export const isPublicToken = (token) =>
  !placeholderSets.includes(token.path[0]) || keptPlaceholderTokens.has(token.path.join('.'));

/** Applies `isPublicToken` to every file of every platform (combined with a file's own filter, if it has one). */
export const withPublicTokensOnly = (platforms) =>
  Object.fromEntries(
    Object.entries(platforms).map(([name, platform]) => [
      name,
      {
        ...platform,
        files: platform.files?.map((file) => ({
          ...file,
          filter: file.filter ? (token, options) => isPublicToken(token) && file.filter(token, options) : isPublicToken,
        })),
      },
    ]),
  );

export const createStyleDictionaryConfig = ({
  selector,
  source = ['src/**/tokens.json', 'src/**/*.tokens.json', 'figma/**/*.tokens.json'],
}) => {
  const prefix = selector.replace(/^\.(.+)-theme/, '$1');
  const themeName = `${prefix}-theme`;

  return {
    hooks: {
      formats: {
        'json/list': function ({ dictionary }) {
          return JSON.stringify(dictionary.allTokens.sort(sortByName), null, '  ');
        },
      },
    },
    source,
    platforms: withPublicTokensOnly({
      js: {
        transformGroup: 'tilburg/tokens-studio',
        transforms: ['name/camel', 'color/hsl-4'],
        buildPath: 'dist/',
        files: [
          {
            destination: prefix + '/variables.cjs',
            format: 'javascript/module-flat',
          },
          {
            destination: prefix + '/variables.mjs',
            format: 'javascript/es6',
          },
        ],
      },
      tokenTree: {
        transformGroup: 'tilburg/tokens-studio',
        transforms: ['color/hsl-4'],
        buildPath: 'dist/',
        files: [
          {
            format: 'javascript/module',
            destination: prefix + '/tokens.cjs',
          },
        ],
      },
      json: {
        transformGroup: 'tilburg/tokens-studio',
        transforms: ['name/camel', 'color/hsl-4'],
        buildPath: 'dist/',
        files: [
          {
            destination: prefix + '/tokens.json',
            format: 'json',
          },
          {
            destination: prefix + '/list.json',
            format: 'json/list',
          },
          {
            destination: prefix + '/variables.json',
            format: 'json/flat',
          },
        ],
      },
      css: {
        transformGroup: 'tilburg/tokens-studio',
        transforms: ['name/kebab', 'color/hsl-4'],
        buildPath: 'dist/',
        files: [
          {
            destination: prefix + '/theme.css',
            format: 'css/variables',
            options: {
              selector: `.${themeName}`,
              outputReferences: true,
            },
          },
          {
            destination: prefix + '/variables.css',
            format: 'css/variables',
            options: {
              selector: `:root`,
              outputReferences: true,
            },
          },
        ],
      },
      scss: {
        transformGroup: 'tilburg/tokens-studio',
        transforms: ['name/kebab', 'color/hsl-4'],
        buildPath: 'dist/',
        files: [
          {
            destination: prefix + '/_variables.scss',
            format: 'scss/variables',
            options: {
              outputReferences: true,
            },
          },
        ],
      },
      'scss-theme-mixin': {
        transforms: ['name/kebab', 'color/hsl-4'],
        buildPath: 'dist/',
        files: [
          {
            destination: prefix + '/_mixin.scss',
            format: 'css/variables',
            options: {
              selector: `@mixin ${themeName}`,
              outputReferences: true,
            },
          },
        ],
      },
      less: {
        transformGroup: 'tilburg/tokens-studio',
        transforms: ['name/kebab', 'color/hsl-4'],
        buildPath: 'dist/',
        files: [
          {
            destination: prefix + '/variables.less',
            format: 'less/variables',
            options: {
              outputReferences: true,
            },
          },
        ],
      },
      typescript: {
        transforms: ['name/camel', 'color/hsl-4'],
        transformGroup: 'js',
        buildPath: 'dist/',
        files: [
          {
            format: 'typescript/es6-declarations',
            destination: prefix + '/variables.d.ts',
          },
          {
            format: 'typescript/module-declarations',
            destination: prefix + '/tokens.d.ts',
          },
        ],
      },
    }),
  };
};
