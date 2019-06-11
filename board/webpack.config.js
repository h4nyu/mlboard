const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  },
  entry: './src/index.ts',
  devtool: 'inline-cheap-source-map',
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
        test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[hash:7].[ext]'
        }
      },
    ]
  },
  resolve: {
    alias: {
      '~': '/srv/src',
      'package.json':'/srv/package.json',
    },
    extensions: [ '.tsx', '.ts', '.js' ]
  }
};
