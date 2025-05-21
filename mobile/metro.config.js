const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const { wrapWithReanimatedMetroConfig } = require("react-native-reanimated/metro-config");

const config = getDefaultConfig(__dirname);

// Adiciona suporte para arquivos SVG
config.transformer.babelTransformerPath = require.resolve(
  "react-native-svg-transformer",
);

const assetExts = config.resolver.assetExts.filter((ext) => ext !== "svg");
const sourceExts = [...config.resolver.sourceExts, "svg"];

config.resolver.assetExts = assetExts;
config.resolver.sourceExts = sourceExts;

const withNativeWindConfig = withNativeWind(config, { input: "./global.css" });
module.exports = wrapWithReanimatedMetroConfig(withNativeWindConfig);
