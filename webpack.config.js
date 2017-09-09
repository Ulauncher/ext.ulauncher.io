var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');
var Dotenv = require('dotenv-webpack');

module.exports = {
  context: path.join(__dirname, "src"),
  devtool: debug ? "inline-sourcemap" : null,
  entry: "./js/client.js",
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['react-html-attrs', 'transform-decorators-legacy', 'transform-class-properties'],
        }
      }
    ]
  },
  output: {
    path: __dirname + "/src/",
    filename: "client.min.js"
  },
  plugins: debug ? [
    new Dotenv({
      path: __dirname + "/src/.env",
      safe: false
    })
  ] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    new Dotenv({
      path: __dirname + "/src/.env",
      safe: false
    })
  ],
  devServer: {
    historyApiFallback: true
  }
};