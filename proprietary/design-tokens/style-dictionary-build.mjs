import { register } from "@tokens-studio/sd-transforms";
import StyleDictionary from "style-dictionary";
import { typeDtcgDelegate } from "style-dictionary/utils";
import { readFile } from "node:fs/promises";
import { createStyleDictionaryConfig } from "./style-dictionary-config.mjs";

const build = async () => {
  const themeConfig = JSON.parse(await readFile("./config.json", "utf-8"));
  StyleDictionary.registerPreprocessor({
    name: "dtcg-delegate",
    preprocessor: typeDtcgDelegate,
  });

  register(StyleDictionary, {
    // TODO: Enable `excludeParentKeys` when Figma is the source of design tokens
    // excludeParentKeys: true,
  });

  const sd = new StyleDictionary({
    ...createStyleDictionaryConfig({
      selector: `.${themeConfig.prefix}-theme`,
    }),
    log: "warn",
    preprocessors: ["tokens-studio", "dtcg-delegate"],
  });

  sd.platforms = {
    ...sd.platforms,
    ...{
      // Do a MAJOR release when removing the `index.css` file
      "css-for-backwards-compatibility": {
        transformGroups: "tokens-studio",
        transforms: ["name/kebab", "color/hsl-4"],
        buildPath: "dist/",
        files: [
          {
            destination: "index.css",
            format: "css/variables",
            options: {
              selector: `.tilburg-theme`,
              outputReferences: true,
            },
          },
        ],
      },
    },
  };

  await sd.cleanAllPlatforms();
  await sd.buildAllPlatforms();
};

build();
