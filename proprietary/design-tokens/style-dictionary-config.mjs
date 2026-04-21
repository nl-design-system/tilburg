const stringSort = (a, b) => (a === b ? 0 : a > b ? 1 : -1);

const sortByName = (a, b) => stringSort(a.name, b.name);

export const createStyleDictionaryConfig = ({
  selector,
  source = [
    "src/**/tokens.json",
    "src/**/*.tokens.json",
    selector + "/**/*.tokens.json",
  ],
}) => {
  const prefix = selector.replace(/^\.(.+)-theme/, "$1");
  const themeName = `${prefix}-theme`;

  return {
    hooks: {
      formats: {
        "json/list": function ({ dictionary }) {
          return JSON.stringify(
            dictionary.allTokens.sort(sortByName),
            null,
            "  ",
          );
        },
      },
    },
    source,
    platforms: {
      js: {
        transformGroups: "tokens-studio",
        transforms: ["name/camel", "color/hsl-4"],
        buildPath: "dist/",
        files: [
          {
            destination: prefix + "/variables.cjs",
            format: "javascript/module-flat",
          },
          {
            destination: prefix + "/variables.mjs",
            format: "javascript/es6",
          },
        ],
      },
      tokenTree: {
        transformGroups: "tokens-studio",
        transforms: ["color/hsl-4"],
        buildPath: "dist/",
        files: [
          {
            format: "javascript/module",
            destination: prefix + "/tokens.cjs",
          },
        ],
      },
      json: {
        transformGroups: "tokens-studio",
        transforms: ["name/camel", "color/hsl-4"],
        buildPath: "dist/",
        files: [
          {
            destination: prefix + "/tokens.json",
            format: "json",
          },
          {
            destination: prefix + "/list.json",
            format: "json/list",
          },
          {
            destination: prefix + "/variables.json",
            format: "json/flat",
          },
        ],
      },
      css: {
        transformGroups: "tokens-studio",
        transforms: ["name/kebab", "color/hsl-4"],
        buildPath: "dist/",
        files: [
          {
            destination: prefix + "/theme.css",
            format: "css/variables",
            options: {
              selector: `.${themeName}`,
              outputReferences: true,
            },
          },
          {
            destination: prefix + "/variables.css",
            format: "css/variables",
            options: {
              selector: `:root`,
              outputReferences: true,
            },
          },
        ],
      },
      scss: {
        transformGroups: "tokens-studio",
        transforms: ["name/kebab", "color/hsl-4"],
        buildPath: "dist/",
        files: [
          {
            destination: prefix + "/_variables.scss",
            format: "scss/variables",
            options: {
              outputReferences: true,
            },
          },
        ],
      },
      "scss-theme-mixin": {
        transforms: ["name/kebab", "color/hsl-4"],
        buildPath: "dist/",
        files: [
          {
            destination: prefix + "/_mixin.scss",
            format: "css/variables",
            options: {
              selector: `@mixin ${themeName}`,
              outputReferences: true,
            },
          },
        ],
      },
      less: {
        transformGroups: "tokens-studio",
        transforms: ["name/kebab", "color/hsl-4"],
        buildPath: "dist/",
        files: [
          {
            destination: prefix + "/variables.less",
            format: "less/variables",
            options: {
              outputReferences: true,
            },
          },
        ],
      },
      typescript: {
        transforms: ["name/camel", "color/hsl-4"],
        transformGroup: "js",
        buildPath: "dist/",
        files: [
          {
            format: "typescript/es6-declarations",
            destination: prefix + "/variables.d.ts",
          },
          {
            format: "typescript/module-declarations",
            destination: prefix + "/tokens.d.ts",
          },
        ],
      },
    },
  };
};
