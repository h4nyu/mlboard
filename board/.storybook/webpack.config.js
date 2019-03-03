const config = require("../webpack.config.js");

module.exports = (baseConfig, env, defaultConfig) => {
  defaultConfig.resolve.alias = {
    ...defaultConfig.resolve.alias,
    ...config.resolve.alias
  };

  defaultConfig.module.rules = [
    ...config.module.rules,
  ];

  return defaultConfig;
};
