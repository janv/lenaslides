'use strict';

var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/dev-server',
    './src/index.js'
  ],
  output: {
    publicPath: '//localhost:8080/',
    path: path.resolve('./public'),
    filename: 'application.js'
  },
  module: {
    loaders: [
      {test: /\.html$/, loader: 'html'},
      {test: /\.sass$/, loader: 'style!css!sass?indentedSyntax'},
      {test: /\.png$/,  loader: 'url-loader?limit=10000' }
    ]
  },
  devtool: 'source-map',
  devServer: {
    contentBase: './public',
    publicPath: '/',
    colors: true,
    hot: true
  },
  plugins: [
    //new webpack.optimize.UglifyJsPlugin({minimize: true})
    new webpack.HotModuleReplacementPlugin()
  ]
};

