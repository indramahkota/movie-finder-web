const path = require("path");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    polyfill: "babel-polyfill",
    index: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name].[contenthash].js",
  },
  mode: "development",
  devtool: "eval-source-map",
  module: {
    rules: [
      /* rules component style */
      {
        test: /\.css$/i,
        exclude: /styles/,
        use: ["to-string-loader", "css-loader"]
      },
      /* rules global style */
      {
        test: /\.css$/i,
        include: /styles/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
        options: {
          minimize: true
        }
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[contenthash].[ext]',
            },
          },
        ],
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/template.html",
      filename: "index.html",
      minify: { collapseWhitespace: true, removeComments: true }
    })
  ]
};
