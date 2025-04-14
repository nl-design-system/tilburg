import { register } from "@tokens-studio/sd-transforms";
import StyleDictionary from "style-dictionary";
import { typeDtcgDelegate } from "style-dictionary/utils";
import { readFile } from "node:fs/promises";
import { createStyleDictionaryConfig } from "./style-dictionary-config.mjs"; // Assuming this file exists

// --- Original Custom Action ---
StyleDictionary.registerAction({
  name: "log-missing-tokens",
  do: function (dictionary) {
    console.log("Logging all tokens for debugging:");

    // Original logging (can be verbose)
    // dictionary.allTokens.forEach((token) => {
    //   console.log(
    //     `Token: ${token.name}, Value: ${token.value || token.$value}`,
    //   );
    // });

    // Check for unresolved references (using original logic)
    const unresolvedReferences = dictionary.allTokens.filter((token) => {
      // A simple check: if the value is still a string containing { } it might be unresolved
      // Note: This isn't foolproof as transforms might output strings with braces.
      // A more robust check would compare original.value to final value if original contained braces.
      return (
          typeof token.value === "string" &&
          token.value.includes("{") &&
          token.value.includes("}") &&
          // Add check to see if original value was also a reference
          typeof token.original.value === 'string' &&
          token.original.value.includes("{") &&
          token.original.value.includes("}") &&
          token.value === token.original.value // Only flag if final value is identical to original reference string
      );
    });

    if (unresolvedReferences.length > 0) {
      console.warn("⚠️ Unresolved Token References Found:"); // Use warn for visibility
      unresolvedReferences.forEach((token) => {
        console.warn(
            `  - Token: ${token.name} (Path: ${token.path.join(".")}) has an unresolved reference: ${token.original.value}`
        );
      });
    } else {
      console.log("✅ No unresolved token references found.");
    }
  },
  undo: function (dictionary) {},
});

// --- Build Function ---
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
    // Add other sd-transforms options if necessary
  });

  const themes = themeConfig.themes;

  // --- Theme Loop ---
  for (const theme of themes) {
    console.log("Instantiating theme: " + theme);

    // --- MINIMAL CHANGE START ---
    // Define base source files
    const baseSource = [`figma/${theme}/figma.tokens.json`, "src/**/*.tokens.json"];

    // Conditionally add patch files for 'bat' theme
    let sourceFiles = [...baseSource]; // Start with base sources
    if (theme === 'bat') {
      // Use a glob pattern to include all .tokens.json files in the directory and subdirectories
      sourceFiles.push("src/patches/bat/**/*.tokens.json");
      console.log(`   - Including 'patches/bat/**/*.tokens.json' for theme '${theme}'`); // Optional log
    }
    // --- MINIMAL CHANGE END ---

    const sd = new StyleDictionary({
      // Pass the dynamically created sourceFiles array
      ...createStyleDictionaryConfig({
        selector: `.${theme}-theme`,
        source: sourceFiles, // Use the dynamic array here
      }),
      log: {
        // verbosity: "verbose", // Deprecated, use level
        level: "verbose"
      },
      preprocessors: ["tokens-studio", "dtcg-delegate"],
      // **Important Reminder**: Ensure 'log-missing-tokens' action is added
      // to the relevant platform's 'actions' array within your
      // `createStyleDictionaryConfig` function for it to execute.
      // This script part assumes createStyleDictionaryConfig handles that.
    });

    // Ensure custom action is directly attached to the platform
    // This part might be redundant if createStyleDictionaryConfig handles actions properly.
    // sd.platforms = {
    //   ...sd.platforms,
    // };

    console.log("Cleaning platforms..."); // Debugging statement
    await sd.cleanAllPlatforms();

    console.log("Building platforms..."); // Debugging statement
    await sd.buildAllPlatforms();
    console.log(`Build complete for theme: ${theme}!`); // Debugging statement
  }
  console.log("Build process finished!"); // Overall completion log
};

// --- Run Build ---
build().catch(error => {
  console.error("❌ Build script failed:", error);
  process.exit(1);
});
