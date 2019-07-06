const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');

module.exports = {
  watchOptions: {
    aggregateTimeout: 600,
    poll: 1000
  },
  entry: './src/index.tsx',
  plugins: [
    new HtmlWebPackPlugin({
      template: "./public/index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader"
        },
      },
      {
        test: /\.(css|scss)$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          limit: 10000,
          name: '[name].[hash:7].[ext]'
        },
      },
    ]
  },
  resolve: {
    alias: {
      '~': '/srv/src',
      'package.json':'/srv/package.json',
    },
    extensions: ['*', '.tsx', '.ts', '.js' ]
  }
};
