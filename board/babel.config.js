module.exports = function (api) {
  api.cache(true);

  const presets = [
    "@babel/preset-env", 
    "@vue/babel-preset-jsx",
  ];

  const plugins = [
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ["@babel/plugin-proposal-class-properties", { "loose" : true }]
  ];

  return {
    presets,
    plugins,
  };
}
