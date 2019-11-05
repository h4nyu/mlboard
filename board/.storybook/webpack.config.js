const projectConfig = require("../webpack.config.js");
const path = require('path');

module.exports = ({config}) => {
  // config.module.rules = config.module.rules.filter(
  //   f => f.test.toString() !== '/\\.css$/'
  // )
  config.module.rules = projectConfig.module.rules

  // config.module.rules = config.module.rules.filter(
  //   f => f.test.toString() === /\.(svg|ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani)(\?.*)?$/.toString()
  // )
  // config.module.rules.push(...projectConfig.module.rules)
  config.resolve = projectConfig.resolve
  return config
};
