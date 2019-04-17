module.exports = function (api) {
  api.cache(true);
  const presets = [
    "@babel/preset-env",
    "@vue/babel-preset-jsx",
  ];

  const plugins = [
    'macros'
  ];

  return {
    presets,
    plugins,
  };
}
