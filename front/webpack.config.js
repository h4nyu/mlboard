const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  plugins: [
    new HtmlWebPackPlugin({
      template: "./public/index.html",
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
          use: [
            "style-loader",
            "css-loader?modules",
          ],
      },
    ]
  },
  resolve: {
    alias: {
      '@': '/srv/src',
    },
    extensions: ['*', '.js', '.json']
  }
};
