const projectConfig = require("../webpack.config.js");

module.exports = ({config}) => {
  config.module.rules.push({
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: {
      loader: "ts-loader"
    },
  });
  config.resolve.extensions.push('.ts', '.tsx');
  return config
};
