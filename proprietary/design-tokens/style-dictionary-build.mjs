import { register } from "@tokens-studio/sd-transforms";
import StyleDictionary from "style-dictionary";
import { typeDtcgDelegate } from "style-dictionary/utils";
import { readFile } from "node:fs/promises";
import { createStyleDictionaryConfig } from "./style-dictionary-config.mjs";

StyleDictionary.registerAction({
  name: "log-missing-tokens",
  do: function (dictionary) {
    console.log("Logging all tokens for debugging:");

    dictionary.allTokens.forEach((token) => {
      console.log(
        `Token: ${token.name}, Value: ${token.value || token.$value}`,
      );
    });

    // Check for unresolved references
    const unresolvedReferences = dictionary.allTokens.filter((token) => {
      return (
        typeof token.value === "string" &&
        token.value.includes("{") &&
        token.value.includes("}")
      );
    });

    if (unresolvedReferences.length > 0) {
      console.log("Unresolved Token References:");
      unresolvedReferences.forEach((token) => {
        console.log(
          `Token: ${token.name} has an unresolved reference: ${token.value}`,
        );
      });
    } else {
      console.log("No unresolved token references.");
    }
  },
  undo: function (dictionary) {},
});

const build = async () => {
  const themeConfig = JSON.parse(await readFile("./config.json", "utf-8"));
  console.log("Starting build..."); // Debugging statement

  // Register preprocessors and transformers
  StyleDictionary.registerPreprocessor({
    name: "dtcg-delegate",
    preprocessor: typeDtcgDelegate,
  });

  register(StyleDictionary, {
    excludeParentKeys: true,
  });

  const themes = themeConfig.themes;

  for (const theme of themes) {
    console.log("Instanting theme: " + theme);
    const sd = new StyleDictionary({
      ...createStyleDictionaryConfig({
        selector: `.${theme}-theme`,
        source: [`figma/${theme}/figma.tokens.json`, "src/**/*.tokens.json"],
      }),
      log: {
        verbosity: "verbose",
      },
      preprocessors: ["tokens-studio", "dtcg-delegate"],
    });

    // Ensure custom action is directly attached to the platform
    sd.platforms = {
      ...sd.platforms,
    };

    console.log("Cleaning platforms..."); // Debugging statement
    await sd.cleanAllPlatforms();

    console.log("Building platforms..."); // Debugging statement
    await sd.buildAllPlatforms();
    console.log("Build complete!"); // Debugging statement
  }
};

build();
