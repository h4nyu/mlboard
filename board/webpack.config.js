const HtmlWebPackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin')


module.exports = {
  devServer: {
    disableHostCheck: true,
    host: '0.0.0.0',
    port: 80,
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./public/index.html",
    }),
    new VueLoaderPlugin(),
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
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.(css|scss|sass)$/,
          use: [
            'vue-style-loader',
            'css-loader',
            "sass-loader",
          ],
      },
    ]
  },
  resolve: {
    alias: {
      '@': '/srv/src',
    },
    extensions: ['*', '.js', '.json', '.vue']
  }
};
